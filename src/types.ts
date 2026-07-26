// ============ 类型定义 ============

// 双语字符串：中文 + 英文
export type Localized = { zh: string; en: string }

// 底部导航标签页
export type Tab = 'home' | 'scale' | 'knowledge' | 'journal' | 'trends' | 'firstaid'

export interface ScaleQuestion {
  id: number
  text: Localized
  options: { score: number; label: Localized }[]
  quick?: boolean  // 是否属于快速版（精选 7 题）
}

export interface ScaleResult {
  totalScore: number
  level: 'low' | 'moderate' | 'high' | 'severe'
  category: Localized
  suggestions: Localized[]
  timestamp: number
}

export interface DailyRecord {
  date: string
  mood: number       // 1-5
  anxiety: number    // 1-10
  sleep: number      // 0-12 hours
  babyMilestone?: string
  gratitude?: string
  note?: string
}

export type Stage = 'prepregnancy' | 'pregnancy' | 'infant' | 'toddler'

export interface KnowledgeItem {
  id: string
  stage: Stage        // 备孕 / 孕期 / 0-1岁(infant) / 1-3岁(toddler)
  month: number       // infant/toddler: 宝宝月龄; pregnancy: 1-3 代表早/中/晚孕; prepregnancy: 0
  category: 'sleep' | 'feeding' | 'development' | 'health' | 'mama'
  title: Localized
  summary: Localized
  content: Localized
  tags: Localized[]
  quickTip?: Localized
}

export interface Milestone {
  month: number
  category: Localized
  title: Localized
}
