import { getWhisperForDate } from '../data/whispers'

const KEY_TIME = 'parent-calm-reminder-time'     // "HH:MM" 或 null
const KEY_ENABLED = 'parent-calm-reminder-enabled'
const KEY_LAST_SHOWN = 'parent-calm-reminder-last' // YYYY-MM-DD

export function getReminderTime(): string | null {
  return localStorage.getItem(KEY_TIME)
}

export function isReminderEnabled(): boolean {
  return localStorage.getItem(KEY_ENABLED) === '1'
}

export function setReminder(time: string | null) {
  if (time) {
    localStorage.setItem(KEY_TIME, time)
    localStorage.setItem(KEY_ENABLED, '1')
  } else {
    localStorage.setItem(KEY_ENABLED, '0')
    localStorage.removeItem(KEY_TIME)
  }
}

export function notificationSupported(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator
}

export async function requestPermission(): Promise<NotificationPermission> {
  if (!notificationSupported()) return 'denied'
  return await Notification.requestPermission()
}

function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}

function currentLang(): 'zh' | 'en' {
  const saved = localStorage.getItem('parent-calm-lang')
  return saved === 'en' ? 'en' : 'zh'
}

function alreadyShownToday(): boolean {
  return localStorage.getItem(KEY_LAST_SHOWN) === todayStr()
}

function markShown() {
  localStorage.setItem(KEY_LAST_SHOWN, todayStr())
}

export function fireNotification() {
  if (!notificationSupported()) return
  const reg = (navigator.serviceWorker as any).registration as ServiceWorkerRegistration | undefined
  const lang = currentLang()
  const whisper = getWhisperForDate()
  const body = lang === 'zh' ? whisper.zh : whisper.en
  const appName = lang === 'zh' ? '锚点' : 'Haven'
  const title = lang === 'zh' ? '锚点 · 今日一句' : 'Haven · Daily Whisper'
  const options: NotificationOptions = {
    body,
    icon: '/icon.svg',
    badge: '/icon.svg',
    tag: 'daily-whisper',
  }
  if (reg) {
    reg.showNotification(title, options)
  } else if ('Notification' in window) {
    new Notification(title, options)
  }
  markShown()
}

// 计算到今天/明天目标时间的毫秒数
function msUntil(time: string): number {
  const [h, m] = time.split(':').map(Number)
  const now = new Date()
  const target = new Date()
  target.setHours(h, m, 0, 0)
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1) // 已过今天时间，排到明天
  }
  return target.getTime() - now.getTime()
}

let timer: ReturnType<typeof setTimeout> | null = null

// 在应用加载时调用：注册 SW + 安排每日提醒
export async function initReminder() {
  if (!notificationSupported()) return
  try {
    await navigator.serviceWorker.register('/sw.js')
  } catch {
    // SW 注册失败不影响核心功能
  }

  if (!isReminderEnabled()) return

  // 若今天还没提醒且已经过了设定时间，立即补发
  const time = getReminderTime()
  if (time && Notification.permission === 'granted' && !alreadyShownToday()) {
    const [h, m] = time.split(':').map(Number)
    const now = new Date()
    if (now.getHours() > h || (now.getHours() === h && now.getMinutes() >= m)) {
      fireNotification()
    }
  }

  scheduleNext()
}

function scheduleNext() {
  const time = getReminderTime()
  if (!time || !isReminderEnabled()) return
  if (timer) clearTimeout(timer)
  const delay = msUntil(time)
  timer = setTimeout(() => {
    if (Notification.permission === 'granted' && !alreadyShownToday()) {
      fireNotification()
    } else {
      scheduleNext() // 权限丢失或已发，重新排
    }
  }, delay)
}
