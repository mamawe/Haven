import { useEffect, useState } from 'react'
import { getLatestScaleResult, getBabyAgeInMonths, getBabyBirthday, setBabyBirthday } from '../utils/storage'
import { ThemeSwitcher } from '../components/ThemeSwitcher'
import type { ScaleResult } from '../types'

type Tab = 'home' | 'scale' | 'knowledge' | 'journal' | 'trends'

export function HomePage({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const [latestResult, setLatestResult] = useState<ScaleResult | null>(null)
  const [ageMonths, setAgeMonths] = useState<number | null>(null)
  const [showBirthdayInput, setShowBirthdayInput] = useState(false)
  const [birthdayInput, setBirthdayInput] = useState('')

  useEffect(() => {
    setLatestResult(getLatestScaleResult())
    setAgeMonths(getBabyAgeInMonths())
    const bday = getBabyBirthday()
    if (!bday) setShowBirthdayInput(true)
  }, [])

  const handleSaveBirthday = () => {
    if (birthdayInput) {
      setBabyBirthday(birthdayInput)
      setAgeMonths(getBabyAgeInMonths())
      setShowBirthdayInput(false)
    }
  }

  const moodEmoji = (level: string) => {
    switch (level) {
      case 'low': return '😊'
      case 'moderate': return '😐'
      case 'high': return '😟'
      case 'severe': return '😢'
      default: return '😊'
    }
  }

  return (
    <div className="px-4 py-6 space-y-5">
      {/* Top bar with theme switcher */}
      <div className="flex justify-end pt-1">
        <ThemeSwitcher />
      </div>

      {/* Header */}
      <div className="text-center pt-2 pb-1">
        <h1 className="text-3xl font-serif text-calm-800 mb-1">安心养</h1>
        <p className="text-calm-500 text-sm">育儿这条路，你不需要完美</p>
        {ageMonths !== null && (
          <span className="inline-block mt-2 px-3 py-1 bg-calm-100 rounded-full text-xs text-calm-600 font-medium">
            宝宝 {ageMonths} 个月
          </span>
        )}
      </div>

      {/* Birthday Input Modal */}
      {showBirthdayInput && (
        <div className="card bg-warm-50 border-warm-200">
          <p className="text-sm text-calm-700 mb-3 font-medium">设置宝宝生日，获取个性化内容</p>
          <div className="flex gap-2">
            <input
              type="date"
              value={birthdayInput}
              onChange={e => setBirthdayInput(e.target.value)}
              className="input-field flex-1 text-sm"
              max={new Date().toISOString().split('T')[0]}
            />
            <button onClick={handleSaveBirthday} className="btn-primary text-sm py-2 px-4" disabled={!birthdayInput}>
              确定
            </button>
          </div>
        </div>
      )}

      {/* Latest Assessment Result */}
      {latestResult ? (
        <div className="card cursor-pointer" onClick={() => onNavigate('trends')}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-calm-500">最近自测</h3>
            <span className="text-xs text-calm-400">
              {new Date(latestResult.timestamp).toLocaleDateString('zh-CN')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{moodEmoji(latestResult.level)}</span>
            <div>
              <div className="text-lg font-medium text-calm-800">{latestResult.category}</div>
              <div className={`text-sm ${getLevelColor(latestResult.level)}`}>
                {getLevelLabel(latestResult.level)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => onNavigate('scale')}
          className="card w-full text-left hover:border-warm-300 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-calm-800 mb-1">焦虑自测</h3>
              <p className="text-sm text-calm-500">了解自己的情绪状态，只需 3 分钟</p>
            </div>
            <span className="text-2xl">📋</span>
          </div>
        </button>
      )}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onNavigate('scale')} className="card hover:border-warm-300 transition-colors py-4">
          <span className="text-2xl block mb-1">📋</span>
          <span className="text-sm font-medium text-calm-700">焦虑自测</span>
          <span className="text-xs text-calm-400">3 分钟了解自己</span>
        </button>
        <button onClick={() => onNavigate('knowledge')} className="card hover:border-warm-300 transition-colors py-4">
          <span className="text-2xl block mb-1">📚</span>
          <span className="text-sm font-medium text-calm-700">知识库</span>
          <span className="text-xs text-calm-400">分月龄育儿指南</span>
        </button>
        <button onClick={() => onNavigate('journal')} className="card hover:border-warm-300 transition-colors py-4">
          <span className="text-2xl block mb-1">✍️</span>
          <span className="text-sm font-medium text-calm-700">每日记录</span>
          <span className="text-xs text-calm-400">情绪 + 宝宝日记</span>
        </button>
        <button onClick={() => onNavigate('trends')} className="card hover:border-warm-300 transition-colors py-4">
          <span className="text-2xl block mb-1">📊</span>
          <span className="text-sm font-medium text-calm-700">趋势追踪</span>
          <span className="text-xs text-calm-400">看见自己的变化</span>
        </button>
      </div>

      {/* Daily Quote */}
      <div className="card bg-gradient-to-br from-calm-100/50 to-warm-50/50 border-calm-100">
        <p className="text-sm text-calm-600 italic leading-relaxed">
          "你不必成为完美的父母。你只需要成为'足够好'的父母——而那些不完美的时刻，恰恰是孩子学会面对真实世界的第一课。"
        </p>
      </div>
    </div>
  )
}

function getLevelColor(level: string): string {
  switch (level) {
    case 'low': return 'text-soft-green-600'
    case 'moderate': return 'text-warm-500'
    case 'high': return 'text-orange-600'
    case 'severe': return 'text-red-600'
    default: return 'text-calm-500'
  }
}

function getLevelLabel(level: string): string {
  switch (level) {
    case 'low': return '情绪状态良好'
    case 'moderate': return '存在轻度焦虑'
    case 'high': return '焦虑水平偏高'
    case 'severe': return '建议寻求帮助'
    default: return ''
  }
}
