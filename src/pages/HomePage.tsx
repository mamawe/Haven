import { useEffect, useState } from 'react'
import {
  getLatestScaleResult, getBabyAgeInMonths, getBabyBirthday, setBabyBirthday,
  getProfileName, type Profile,
} from '../utils/storage'
import { useProfile } from '../context/ProfileContext'
import { ThemeSwitcher } from '../components/ThemeSwitcher'
import { ProfileSwitcher } from '../components/ProfileSwitcher'
import { DailyWhisper } from '../components/DailyWhisper'
import { ShareCard } from '../components/ShareCard'
import type { ScaleResult } from '../types'

type Tab = 'home' | 'scale' | 'knowledge' | 'journal' | 'trends'

export function HomePage({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { profile, profileName, setProfile } = useProfile()
  const [latestResult, setLatestResult] = useState<ScaleResult | null>(null)
  const [ageMonths, setAgeMonths] = useState<number | null>(null)
  const [showBirthdayInput, setShowBirthdayInput] = useState(false)
  const [birthdayInput, setBirthdayInput] = useState('')
  const [shareOpen, setShareOpen] = useState(false)

  useEffect(() => {
    setLatestResult(getLatestScaleResult())
    setAgeMonths(getBabyAgeInMonths())
    const bday = getBabyBirthday()
    if (!bday) setShowBirthdayInput(true)
  }, [profile])

  // 伴侣视角：查看另一位档案的最近自测
  const otherProfile: Profile = profile === 'me' ? 'partner' : 'me'
  const otherResult = getLatestScaleResult(otherProfile)
  const otherName = getProfileName(otherProfile)

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
      {/* Top bar: profile + theme switcher */}
      <div className="flex justify-between items-center pt-1">
        <ProfileSwitcher />
        <ThemeSwitcher />
      </div>

      {/* Header */}
      <div className="text-center pt-2 pb-1">
        <h1 className="text-3xl font-serif text-calm-800 mb-1">锚点</h1>
        <p className="text-calm-500 text-sm">
          {profileName}，育儿这条路你不需要完美
        </p>
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

      {/* Latest Assessment Result (current profile) */}
      {latestResult ? (
        <div className="card cursor-pointer" onClick={() => onNavigate('trends')}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-calm-500">{profileName} · 最近自测</h3>
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
              <h3 className="font-medium text-calm-800 mb-1">{profileName} · 焦虑自测</h3>
              <p className="text-sm text-calm-500">了解自己的情绪状态，只需 3 分钟</p>
            </div>
            <span className="text-2xl">📋</span>
          </div>
        </button>
      )}

      {/* Partner View Peek */}
      {otherResult && (
        <div className="card bg-calm-50/60 border-calm-100 cursor-pointer" onClick={() => setProfile(otherProfile)}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-calm-500">{otherName}的视角</span>
            <span className="text-[11px] text-warm-500">切换查看 →</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{moodEmoji(otherResult.level)}</span>
            <div>
              <div className="text-sm font-medium text-calm-700">{otherResult.category}</div>
              <div className={`text-xs ${getLevelColor(otherResult.level)}`}>
                {getLevelLabel(otherResult.level)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Daily Whisper + gentle reminder */}
      <DailyWhisper />

      {/* Share Card */}
      <button
        onClick={() => setShareOpen(true)}
        className="card w-full text-left hover:border-apple/40 transition-colors flex items-center justify-between"
      >
        <div>
          <h3 className="font-medium text-calm-800 mb-1">生成分享卡片</h3>
          <p className="text-sm text-calm-500">把今天的状态做成一张图，分享给在意的人</p>
        </div>
        <span className="text-2xl">📤</span>
      </button>

      <ShareCard open={shareOpen} onClose={() => setShareOpen(false)} />

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
