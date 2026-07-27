import { useEffect, useState } from 'react'
import {
  getLatestScaleResult, getBabyAgeInMonths, getBabyBirthday, setBabyBirthday,
  getProfileName, type Profile,
} from '../utils/storage'
import { useProfile } from '../context/ProfileContext'
import { ThemeSwitcher } from '../components/ThemeSwitcher'
import { LangSwitcher } from '../components/LangSwitcher'
import { ProfileSwitcher } from '../components/ProfileSwitcher'
import { DailyWhisper } from '../components/DailyWhisper'
import { ShareCard } from '../components/ShareCard'
import { AnswerBook } from '../components/AnswerBook'
import { useI18n } from '../i18n'
import type { ScaleResult, Tab } from '../types'

export function HomePage({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { profile, profileName, setProfile } = useProfile()
  const { t, L, lang } = useI18n()
  const [latestResult, setLatestResult] = useState<ScaleResult | null>(null)
  const [ageMonths, setAgeMonths] = useState<number | null>(null)
  const [showBirthdayInput, setShowBirthdayInput] = useState(false)
  const [birthdayInput, setBirthdayInput] = useState('')
  const [shareOpen, setShareOpen] = useState(false)
  const [answerOpen, setAnswerOpen] = useState(false)

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

  const fmtDate = (ts: number) =>
    new Date(ts).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US')

  return (
    <div className="px-4 py-6 space-y-5">
      {/* Top bar: profile + language + theme switcher */}
      <div className="flex justify-between items-center pt-1 gap-2">
        <ProfileSwitcher />
        <div className="flex items-center gap-2">
          <LangSwitcher />
          <ThemeSwitcher />
        </div>
      </div>

      {/* Header */}
      <div className="text-center pt-2 pb-1">
        <h1 className="text-3xl font-serif text-calm-800 mb-1">{t('app.name')}</h1>
        <p className="text-calm-500 text-sm">
          {profileName}，{t('home.subtitle')}
        </p>
        {ageMonths !== null && (
          <span className="inline-block mt-2 px-3 py-1 bg-calm-100 rounded-full text-xs text-calm-600 font-medium">
            {t('home.babyAge').replace('{n}', String(ageMonths))}
          </span>
        )}
      </div>

      {/* Birthday Input Modal */}
      {showBirthdayInput && (
        <div className="card bg-warm-50 border-warm-200">
          <p className="text-sm text-calm-700 mb-3 font-medium">{t('home.setBabyBirthday')}</p>
          <div className="flex gap-2">
            <input
              type="date"
              value={birthdayInput}
              onChange={e => setBirthdayInput(e.target.value)}
              className="input-field flex-1 text-sm"
              max={new Date().toISOString().split('T')[0]}
            />
            <button onClick={handleSaveBirthday} className="btn-primary text-sm py-2 px-4" disabled={!birthdayInput}>
              {t('home.confirm')}
            </button>
          </div>
        </div>
      )}

      {/* Latest Assessment Result (current profile) */}
      {latestResult ? (
        <div className="card cursor-pointer" onClick={() => onNavigate('trends')}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-calm-500">{t('home.recentSelfTest').replace('{name}', profileName)}</h3>
            <span className="text-xs text-calm-400">{fmtDate(latestResult.timestamp)}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{moodEmoji(latestResult.level)}</span>
            <div>
              <div className="text-lg font-medium text-calm-800">{L(latestResult.category)}</div>
              <div className={`text-sm ${getLevelColor(latestResult.level)}`}>
                {t(`scale.level.${latestResult.level}`)}
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
              <h3 className="font-medium text-calm-800 mb-1">{t('home.anxietySelfTest').replace('{name}', profileName)}</h3>
              <p className="text-sm text-calm-500">{t('home.understand')}</p>
            </div>
            <span className="text-2xl">📋</span>
          </div>
        </button>
      )}

      {/* Partner View Peek */}
      {otherResult && (
        <div className="card bg-calm-50/60 border-calm-100 cursor-pointer" onClick={() => setProfile(otherProfile)}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-calm-500">{t('home.otherView').replace('{name}', otherName)}</span>
            <span className="text-[11px] text-warm-500">{t('home.switchView')}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{moodEmoji(otherResult.level)}</span>
            <div>
              <div className="text-sm font-medium text-calm-700">{L(otherResult.category)}</div>
              <div className={`text-xs ${getLevelColor(otherResult.level)}`}>
                {t(`scale.level.${otherResult.level}`)}
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
          <h3 className="font-medium text-calm-800 mb-1">{t('home.shareCard')}</h3>
          <p className="text-sm text-calm-500">{t('home.shareCardDesc')}</p>
        </div>
        <span className="text-2xl">📤</span>
      </button>

      <ShareCard open={shareOpen} onClose={() => setShareOpen(false)} />

      {/* 答案之书 */}
      <button
        onClick={() => setAnswerOpen(true)}
        className="card w-full text-left hover:border-warm-300 transition-colors flex items-center justify-between"
      >
        <div>
          <h3 className="font-medium text-calm-800 mb-1">{t('home.answerBook')}</h3>
          <p className="text-sm text-calm-500">{t('home.answerBookDesc')}</p>
        </div>
        <span className="text-2xl">📖</span>
      </button>

      <AnswerBook open={answerOpen} onClose={() => setAnswerOpen(false)} />

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onNavigate('scale')} className="card hover:border-warm-300 transition-colors py-4">
          <span className="text-2xl block mb-1">📋</span>
          <span className="text-sm font-medium text-calm-700">{t('home.qaScale')}</span>
          <span className="text-xs text-calm-400">{t('home.qaScaleSub')}</span>
        </button>
        <button onClick={() => onNavigate('knowledge')} className="card hover:border-warm-300 transition-colors py-4">
          <span className="text-2xl block mb-1">📚</span>
          <span className="text-sm font-medium text-calm-700">{t('home.qaKnowledge')}</span>
          <span className="text-xs text-calm-400">{t('home.qaKnowledgeSub')}</span>
        </button>
        <button onClick={() => onNavigate('journal')} className="card hover:border-warm-300 transition-colors py-4">
          <span className="text-2xl block mb-1">✍️</span>
          <span className="text-sm font-medium text-calm-700">{t('home.qaJournal')}</span>
          <span className="text-xs text-calm-400">{t('home.qaJournalSub')}</span>
        </button>
        <button onClick={() => onNavigate('trends')} className="card hover:border-warm-300 transition-colors py-4">
          <span className="text-2xl block mb-1">📊</span>
          <span className="text-sm font-medium text-calm-700">{t('home.qaTrends')}</span>
          <span className="text-xs text-calm-400">{t('home.qaTrendsSub')}</span>
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
