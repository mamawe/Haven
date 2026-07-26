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

export interface KnowledgeItem {
  id: string
  month: number       // 宝宝月龄 0-12
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
