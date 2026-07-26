import { useState, useMemo } from 'react'
import { knowledgeBase } from '../data/knowledge'
import { getBabyAgeInMonths } from '../utils/storage'
import type { Stage } from '../types'

type Category = 'all' | 'sleep' | 'feeding' | 'development' | 'health' | 'mama'

const categoryLabels: Record<Category, string> = {
  all: '全部', sleep: '睡眠', feeding: '喂养', development: '发育', health: '健康', mama: '妈妈',
}
const categoryIcons: Record<Category, string> = {
  all: '📖', sleep: '😴', feeding: '🍼', development: '🧠', health: '🏥', mama: '💝',
}

const stageTabs: { key: Stage; label: string; icon: string }[] = [
  { key: 'prepregnancy', label: '备孕', icon: '🌱' },
  { key: 'pregnancy', label: '孕期', icon: '🤰' },
  { key: 'infant', label: '0-1岁', icon: '👶' },
  { key: 'toddler', label: '1-3岁', icon: '🧒' },
]

// 每个阶段的"期"筛选
const periodOptions: Record<Stage, { label: string; match: (m: number) => boolean }[]> = {
  prepregnancy: [{ label: '备孕', match: () => true }],
  pregnancy: [
    { label: '孕早期', match: m => m === 1 },
    { label: '孕中期', match: m => m === 2 },
    { label: '孕晚期', match: m => m === 3 },
  ],
  infant: Array.from({ length: 13 }, (_, m) => ({
    label: m === 0 ? '新生儿' : `${m}个月`,
    match: (month: number) => month === m,
  })),
  toddler: [
    { label: '1-2岁', match: m => m >= 13 && m <= 24 },
    { label: '2-3岁', match: m => m >= 25 && m <= 36 },
  ],
}

function stageMonthLabel(stage: Stage, month: number): string {
  if (stage === 'pregnancy') {
    return month === 1 ? '孕早期' : month === 2 ? '孕中期' : '孕晚期'
  }
  if (stage === 'prepregnancy') return '备孕'
  if (stage === 'infant') return month === 0 ? '新生儿' : `${month}个月`
  // toddler
  const y = Math.floor(month / 12)
  const r = month % 12
  if (y === 0) return `${r}个月`
  if (r === 0) return `${y}岁`
  if (r === 6) return `${y}岁半`
  return `${y}岁${r}个月`
}

export function KnowledgePage() {
  const babyAge = getBabyAgeInMonths()

  const defaultStage: Stage =
    babyAge === null ? 'infant'
    : babyAge <= 12 ? 'infant'
    : babyAge <= 36 ? 'toddler'
    : 'infant'

  const [selectedStage, setSelectedStage] = useState<Stage>(defaultStage)
  const [selectedPeriodIdx, setSelectedPeriodIdx] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  // 切换阶段时重置期筛选
  const handleStage = (s: Stage) => {
    setSelectedStage(s)
    setSelectedPeriodIdx(null)
  }

  const filtered = useMemo(() => {
    let items = knowledgeBase.filter(i => i.stage === selectedStage)
    if (selectedPeriodIdx !== null) {
      const period = periodOptions[selectedStage][selectedPeriodIdx]
      items = items.filter(i => period.match(i.month))
    }
    if (selectedCategory !== 'all') {
      items = items.filter(i => i.category === selectedCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q) ||
        i.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    return items
  }, [selectedStage, selectedPeriodIdx, selectedCategory, search])

  const currentPeriods = periodOptions[selectedStage]

  return (
    <div className="px-4 py-6 space-y-5">
      <h1 className="text-2xl font-serif text-calm-800 text-center">知识库</h1>

      {/* Stage Tabs */}
      <div className="flex gap-2 bg-calm-100 rounded-2xl p-1">
        {stageTabs.map(s => (
          <button
            key={s.key}
            onClick={() => handleStage(s.key)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
              selectedStage === s.key
                ? 'bg-white text-calm-800 shadow-sm'
                : 'text-calm-500 hover:text-calm-700'
            }`}
          >
            <span className="mr-1">{s.icon}</span>{s.label}
          </button>
        ))}
      </div>

      {/* Period Filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 scrollbar-hide">
        <button
          onClick={() => setSelectedPeriodIdx(null)}
          className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            selectedPeriodIdx === null
              ? 'bg-warm-500 text-white'
              : 'bg-white text-calm-600 border border-calm-200 hover:border-calm-300'
          }`}
        >
          全部
        </button>
        {currentPeriods.map((p, idx) => (
          <button
            key={p.label}
            onClick={() => setSelectedPeriodIdx(idx === selectedPeriodIdx ? null : idx)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedPeriodIdx === idx
                ? 'bg-warm-500 text-white'
                : 'bg-white text-calm-600 border border-calm-200 hover:border-calm-300'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="搜索你关心的问题..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="input-field text-sm"
      />

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {(Object.entries(categoryLabels) as [Category, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === key
                ? 'bg-calm-800 text-white'
                : 'bg-white text-calm-600 border border-calm-200 hover:border-calm-400'
            }`}
          >
            {categoryIcons[key]} {label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="card text-center py-8">
            <span className="text-3xl block mb-2">🔍</span>
            <p className="text-calm-500 text-sm">没有找到相关内容</p>
            <p className="text-calm-400 text-xs mt-1">试试换个阶段或分类</p>
          </div>
        ) : (
          filtered.map(item => (
            <div key={item.id} className="card hover:border-calm-300 transition-colors">
              <button
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                className="w-full text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 bg-calm-100 rounded-full text-calm-600 font-medium">
                        {stageMonthLabel(item.stage, item.month)}
                      </span>
                      <span className="text-xs text-calm-400">{categoryIcons[item.category]} {categoryLabels[item.category]}</span>
                    </div>
                    <h3 className="font-medium text-calm-800 text-sm leading-snug">{item.title}</h3>
                    <p className="text-xs text-calm-500 mt-1 line-clamp-1">{item.summary}</p>
                  </div>
                  <span className={`text-lg transition-transform mt-1 ${expandedId === item.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {expandedId === item.id && (
                <div className="mt-4 pt-4 border-t border-calm-100 space-y-3">
                  <div className="text-sm text-calm-700 leading-relaxed whitespace-pre-line">
                    {item.content}
                  </div>

                  {item.quickTip && (
                    <div className="bg-warm-50 rounded-xl p-3 flex items-start gap-2">
                      <span className="text-warm-500 text-sm mt-0.5">💡</span>
                      <p className="text-xs text-calm-700 leading-relaxed">{item.quickTip}</p>
                    </div>
                  )}

                  <div className="flex gap-1.5 flex-wrap">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-calm-100 rounded-full text-calm-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
