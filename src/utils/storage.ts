import type { ScaleResult, DailyRecord } from '../types'

export type Profile = 'me' | 'partner'

const KEYS = {
  CURRENT_PROFILE: 'parent-calm-current-profile',
  PROFILE_NAMES: 'parent-calm-profile-names',
  SCALE_HISTORY: (p: Profile) => `parent-calm-${p}-scale-history`,
  DAILY_RECORDS: (p: Profile) => `parent-calm-${p}-daily-records`,
  BABY_BIRTHDAY: 'parent-calm-baby-birthday',
  MIGRATED: 'parent-calm-profile-migrated',
}

// 旧版（v1 单用户）扁平 key，用于一次性迁移
const LEGACY = {
  SCALE_HISTORY: 'parent-calm-scale-history',
  DAILY_RECORDS: 'parent-calm-daily-records',
}

const DEFAULT_NAMES: Record<Profile, string> = { me: '我', partner: '伴侣' }

// ===== 当前档案 =====
export function getCurrentProfile(): Profile {
  return (localStorage.getItem(KEYS.CURRENT_PROFILE) as Profile) || 'me'
}
export function setCurrentProfile(p: Profile): void {
  localStorage.setItem(KEYS.CURRENT_PROFILE, p)
}
export function getProfileName(p: Profile): string {
  const names = readNames()
  return names[p] || DEFAULT_NAMES[p]
}
export function setProfileName(p: Profile, name: string): void {
  const names = readNames()
  names[p] = name
  localStorage.setItem(KEYS.PROFILE_NAMES, JSON.stringify(names))
}
function readNames(): Record<Profile, string> {
  try {
    const raw = localStorage.getItem(KEYS.PROFILE_NAMES)
    const parsed = raw ? JSON.parse(raw) : {}
    return { ...DEFAULT_NAMES, ...parsed }
  } catch {
    return { ...DEFAULT_NAMES }
  }
}

// 首次升级：把旧单用户数据并入「我」档案（只跑一次）
export function migrateProfiles(): void {
  if (localStorage.getItem(KEYS.MIGRATED) === '1') return
  const legacyScale = localStorage.getItem(LEGACY.SCALE_HISTORY)
  if (legacyScale) {
    localStorage.setItem(KEYS.SCALE_HISTORY('me'), legacyScale)
    localStorage.removeItem(LEGACY.SCALE_HISTORY)
  }
  const legacyDaily = localStorage.getItem(LEGACY.DAILY_RECORDS)
  if (legacyDaily) {
    localStorage.setItem(KEYS.DAILY_RECORDS('me'), legacyDaily)
    localStorage.removeItem(LEGACY.DAILY_RECORDS)
  }
  localStorage.setItem(KEYS.MIGRATED, '1')
}

// ===== 焦虑量表历史（按档案）=====
export function getScaleHistory(profile: Profile = getCurrentProfile()): ScaleResult[] {
  try {
    const raw = localStorage.getItem(KEYS.SCALE_HISTORY(profile))
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}
export function addScaleResult(result: ScaleResult, profile: Profile = getCurrentProfile()): void {
  const history = getScaleHistory(profile)
  history.push(result)
  localStorage.setItem(KEYS.SCALE_HISTORY(profile), JSON.stringify(history))
}
export function getLatestScaleResult(profile: Profile = getCurrentProfile()): ScaleResult | null {
  const history = getScaleHistory(profile)
  return history.length > 0 ? history[history.length - 1] : null
}

// ===== 每日记录（按档案）=====
export function getDailyRecords(profile: Profile = getCurrentProfile()): DailyRecord[] {
  try {
    const raw = localStorage.getItem(KEYS.DAILY_RECORDS(profile))
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}
export function addDailyRecord(record: DailyRecord, profile: Profile = getCurrentProfile()): void {
  const records = getDailyRecords(profile)
  const idx = records.findIndex(r => r.date === record.date)
  if (idx >= 0) {
    records[idx] = record
  } else {
    records.push(record)
  }
  localStorage.setItem(KEYS.DAILY_RECORDS(profile), JSON.stringify(records))
}
export function getTodayRecord(profile: Profile = getCurrentProfile()): DailyRecord | null {
  const today = new Date().toISOString().split('T')[0]
  return getDailyRecords(profile).find(r => r.date === today) || null
}
export function getRecordsByDateRange(start: string, end: string, profile: Profile = getCurrentProfile()): DailyRecord[] {
  return getDailyRecords(profile).filter(r => r.date >= start && r.date <= end)
}

// ===== 宝宝生日（共享，不按档案区分）=====
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

// ===== 主题（共享）=====
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
