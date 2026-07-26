// ============ 类型定义 ============

export interface ScaleQuestion {
  id: number
  text: string
  options: { score: number; label: string }[]
  quick?: boolean  // 是否属于快速版（精选 7 题）
}

export interface ScaleResult {
  totalScore: number
  level: 'low' | 'moderate' | 'high' | 'severe'
  category: string
  suggestions: string[]
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
  title: string
  summary: string
  content: string
  tags: string[]
  quickTip?: string
}

export interface Milestone {
  month: number
  category: string
  title: string
  description: string
  normal: boolean
}
