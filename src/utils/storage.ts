import type { ScaleResult, DailyRecord } from '../types'

const KEYS = {
  SCALE_HISTORY: 'parent-calm-scale-history',
  DAILY_RECORDS: 'parent-calm-daily-records',
  BABY_BIRTHDAY: 'parent-calm-baby-birthday',
}

// ===== 焦虑量表历史 =====
export function getScaleHistory(): ScaleResult[] {
  try {
    const raw = localStorage.getItem(KEYS.SCALE_HISTORY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function addScaleResult(result: ScaleResult): void {
  const history = getScaleHistory()
  history.push(result)
  localStorage.setItem(KEYS.SCALE_HISTORY, JSON.stringify(history))
}

export function getLatestScaleResult(): ScaleResult | null {
  const history = getScaleHistory()
  return history.length > 0 ? history[history.length - 1] : null
}

// ===== 每日记录 =====
export function getDailyRecords(): DailyRecord[] {
  try {
    const raw = localStorage.getItem(KEYS.DAILY_RECORDS)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function addDailyRecord(record: DailyRecord): void {
  const records = getDailyRecords()
  // 如果当天已有记录，替换
  const idx = records.findIndex(r => r.date === record.date)
  if (idx >= 0) {
    records[idx] = record
  } else {
    records.push(record)
  }
  localStorage.setItem(KEYS.DAILY_RECORDS, JSON.stringify(records))
}

export function getTodayRecord(): DailyRecord | null {
  const today = new Date().toISOString().split('T')[0]
  const records = getDailyRecords()
  return records.find(r => r.date === today) || null
}

export function getRecordsByDateRange(start: string, end: string): DailyRecord[] {
  const records = getDailyRecords()
  return records.filter(r => r.date >= start && r.date <= end)
}

// ===== 宝宝生日 =====
export function getBabyBirthday(): string | null {
  return localStorage.getItem(KEYS.BABY_BIRTHDAY)
}

export function setBabyBirthday(date: string): void {
  localStorage.setItem(KEYS.BABY_BIRTHDAY, date)
}

export function getBabyAgeInMonths(): number | null {
  const birthday = getBabyBirthday()
  if (!birthday) return null
  const birth = new Date(birthday)
  const now = new Date()
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
  return Math.max(0, months)
}

// ===== 主题 =====
export type ThemeKey = 'calm' | 'ocean' | 'blossom'

export function getTheme(): ThemeKey {
  const t = localStorage.getItem('parent-calm-theme') as ThemeKey | null
  return t || 'calm'
}

export function setTheme(theme: ThemeKey): void {
  localStorage.setItem('parent-calm-theme', theme)
  document.documentElement.setAttribute('data-theme', theme)
}

export function applyStoredTheme(): void {
  const theme = getTheme()
  document.documentElement.setAttribute('data-theme', theme)
}
