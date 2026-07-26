import { useState, useMemo } from 'react'
import { knowledgeBase } from '../data/knowledge'
import { getBabyAgeInMonths } from '../utils/storage'
import { useI18n } from '../i18n'
import type { Lang } from '../i18n'
import type { Localized, Stage } from '../types'

type Category = 'all' | 'sleep' | 'feeding' | 'development' | 'health' | 'mama'

const categoryIcons: Record<Category, string> = {
  all: '📖', sleep: '😴', feeding: '🍼', development: '🧠', health: '🏥', mama: '💝',
}

const stageTabs: { key: Stage; labelKey: string; icon: string }[] = [
  { key: 'prepregnancy', labelKey: 'knowledge.stage.prepregnancy', icon: '🌱' },
  { key: 'pregnancy', labelKey: 'knowledge.stage.pregnancy', icon: '🤰' },
  { key: 'infant', labelKey: 'knowledge.stage.infant', icon: '👶' },
  { key: 'toddler', labelKey: 'knowledge.stage.toddler', icon: '🧒' },
]

// 每个阶段的"期"筛选（仅匹配逻辑，标签在渲染时按语言生成）
const periodMatch: Record<Stage, ((m: number) => boolean)[]> = {
  prepregnancy: [() => true],
  pregnancy: [m => m === 1, m => m === 2, m => m === 3],
  infant: Array.from({ length: 13 }, (_, m) => (month: number) => month === m),
  toddler: [m => m >= 13 && m <= 24, m => m >= 25 && m <= 36],
}

function periodLabel(stage: Stage, idx: number, t: (k: string) => string, lang: Lang): string {
  if (stage === 'prepregnancy') return t('knowledge.stage.prepregnancy')
  if (stage === 'pregnancy') return t(`knowledge.period.t${idx + 1}`)
  if (stage === 'infant') {
    if (idx === 0) return t('knowledge.newborn')
    return `${idx}${lang === 'zh' ? '个月' : ' mo'}`
  }
  return idx === 0 ? t('knowledge.period.toddler12') : t('knowledge.period.toddler23')
}

function stageMonthLabel(stage: Stage, month: number, t: (k: string) => string, lang: Lang): string {
  if (stage === 'prepregnancy') return t('knowledge.stage.prepregnancy')
  if (stage === 'pregnancy') return t(`knowledge.period.t${month}`)
  if (stage === 'infant') {
    return month === 0 ? t('knowledge.newborn') : `${month}${lang === 'zh' ? '个月' : ' mo'}`
  }
  // toddler
  const y = Math.floor(month / 12)
  const r = month % 12
  if (lang === 'en') {
    if (y === 0) return `${r} mo`
    if (r === 0) return `${y} yr`
    if (r === 6) return `${y}.5 yr`
    return `${y} yr ${r} mo`
  }
  if (y === 0) return `${r}个月`
  if (r === 0) return `${y}岁`
  if (r === 6) return `${y}岁半`
  return `${y}岁${r}个月`
}

export function KnowledgePage() {
  const { t, L, lang } = useI18n()
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

  const handleStage = (s: Stage) => {
    setSelectedStage(s)
    setSelectedPeriodIdx(null)
  }

  const filtered = useMemo(() => {
    let items = knowledgeBase.filter(i => i.stage === selectedStage)
    if (selectedPeriodIdx !== null) {
      const match = periodMatch[selectedStage][selectedPeriodIdx]
      items = items.filter(i => match(i.month))
    }
    if (selectedCategory !== 'all') {
      items = items.filter(i => i.category === selectedCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(i =>
        L(i.title).toLowerCase().includes(q) ||
        L(i.summary).toLowerCase().includes(q) ||
        i.tags.some(tag => L(tag).toLowerCase().includes(q))
      )
    }
    return items
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStage, selectedPeriodIdx, selectedCategory, search, lang])

  const currentPeriods = periodMatch[selectedStage]

  return (
    <div className="px-4 py-6 space-y-5">
      <h1 className="text-2xl font-serif text-calm-800 text-center">{t('knowledge.title')}</h1>

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
            <span className="mr-1">{s.icon}</span>{t(s.labelKey)}
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
          {t('knowledge.period.all')}
        </button>
        {currentPeriods.map((_m, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedPeriodIdx(idx === selectedPeriodIdx ? null : idx)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedPeriodIdx === idx
                ? 'bg-warm-500 text-white'
                : 'bg-white text-calm-600 border border-calm-200 hover:border-calm-300'
            }`}
          >
            {periodLabel(selectedStage, idx, t, lang)}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder={t('knowledge.searchPlaceholder')}
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="input-field text-sm"
      />

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'sleep', 'feeding', 'development', 'health', 'mama'] as Category[]).map(key => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === key
                ? 'bg-calm-800 text-white'
                : 'bg-white text-calm-600 border border-calm-200 hover:border-calm-400'
            }`}
          >
            {categoryIcons[key]} {t(`knowledge.cat.${key}`)}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="card text-center py-8">
            <span className="text-3xl block mb-2">🔍</span>
            <p className="text-calm-500 text-sm">{t('knowledge.empty')}</p>
            <p className="text-calm-400 text-xs mt-1">{t('knowledge.emptySub')}</p>
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
                        {stageMonthLabel(item.stage, item.month, t, lang)}
                      </span>
                      <span className="text-xs text-calm-400">
                        {categoryIcons[item.category]} {t(`knowledge.cat.${item.category}`)}
                      </span>
                    </div>
                    <h3 className="font-medium text-calm-800 text-sm leading-snug">{L(item.title)}</h3>
                    <p className="text-xs text-calm-500 mt-1 line-clamp-1">{L(item.summary)}</p>
                  </div>
                  <span className={`text-lg transition-transform mt-1 ${expandedId === item.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {expandedId === item.id && (
                <div className="mt-4 pt-4 border-t border-calm-100 space-y-3">
                  <div className="text-sm text-calm-700 leading-relaxed whitespace-pre-line">
                    {L(item.content)}
                  </div>

                  {item.quickTip && (
                    <div className="bg-warm-50 rounded-xl p-3 flex items-start gap-2">
                      <span className="text-warm-500 text-sm mt-0.5">💡</span>
                      <p className="text-xs text-calm-700 leading-relaxed">{L(item.quickTip)}</p>
                    </div>
                  )}

                  <div className="flex gap-1.5 flex-wrap">
                    {item.tags.map((tag: Localized) => (
                      <span key={L(tag)} className="text-xs px-2 py-0.5 bg-calm-100 rounded-full text-calm-500">
                        #{L(tag)}
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
