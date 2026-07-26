import { useState, useMemo } from 'react'
import { knowledgeBase } from '../data/knowledge'
import { getBabyAgeInMonths } from '../utils/storage'

type Category = 'all' | 'sleep' | 'feeding' | 'development' | 'health' | 'mama'

const categoryLabels: Record<Category, string> = {
  all: '全部',
  sleep: '睡眠',
  feeding: '喂养',
  development: '发育',
  health: '健康',
  mama: '妈妈',
}

const categoryIcons: Record<Category, string> = {
  all: '📖',
  sleep: '😴',
  feeding: '🍼',
  development: '🧠',
  health: '🏥',
  mama: '💝',
}

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export function KnowledgePage() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const babyAge = getBabyAgeInMonths()

  // 默认选中宝宝当前月龄
  useState(() => {
    if (babyAge !== null && babyAge <= 12) {
      setSelectedMonth(babyAge)
    }
  })

  const filtered = useMemo(() => {
    let items = knowledgeBase
    if (selectedMonth !== null) {
      items = items.filter(i => i.month === selectedMonth)
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
  }, [selectedMonth, selectedCategory, search])

  return (
    <div className="px-4 py-6 space-y-5">
      <h1 className="text-2xl font-serif text-calm-800 text-center">知识库</h1>
      {babyAge !== null && babyAge <= 12 && (
        <p className="text-center text-sm text-calm-500 -mt-3">
          宝宝 {babyAge} 个月 · 为你筛选了这个阶段的内容
        </p>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="搜索你关心的问题..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="input-field text-sm"
      />

      {/* Month Filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 scrollbar-hide">
        <button
          onClick={() => setSelectedMonth(null)}
          className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            selectedMonth === null
              ? 'bg-warm-500 text-white'
              : 'bg-white text-calm-600 border border-calm-200 hover:border-calm-300'
          }`}
        >
          全部月龄
        </button>
        {months.map(m => (
          <button
            key={m}
            onClick={() => setSelectedMonth(m === selectedMonth ? null : m)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedMonth === m
                ? 'bg-warm-500 text-white'
                : m === babyAge
                  ? 'bg-warm-100 text-warm-700 border border-warm-300'
                  : 'bg-white text-calm-600 border border-calm-200 hover:border-calm-300'
            }`}
          >
            {m === 0 ? '新生儿' : `${m}个月`}
            {m === babyAge && selectedMonth !== m && <span className="ml-0.5">👶</span>}
          </button>
        ))}
      </div>

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
            <p className="text-calm-400 text-xs mt-1">试试换个月龄或分类</p>
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
                        {item.month === 0 ? '新生儿' : `${item.month}个月`}
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

                  {/* Quick Tip */}
                  {item.quickTip && (
                    <div className="bg-warm-50 rounded-xl p-3 flex items-start gap-2">
                      <span className="text-warm-500 text-sm mt-0.5">💡</span>
                      <p className="text-xs text-calm-700 leading-relaxed">{item.quickTip}</p>
                    </div>
                  )}

                  {/* Tags */}
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
