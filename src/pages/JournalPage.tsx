import { useState, useEffect } from 'react'
import { getTodayRecord, addDailyRecord } from '../utils/storage'
import { useProfile } from '../context/ProfileContext'
import { useI18n } from '../i18n'
import type { DailyRecord } from '../types'

export function JournalPage() {
  const { profile, profileName } = useProfile()
  const { t, lang } = useI18n()
  const today = new Date().toISOString().split('T')[0]
  const [record, setRecord] = useState<DailyRecord>({
    date: today,
    mood: 3,
    anxiety: 5,
    sleep: 0,
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const existing = getTodayRecord()
    if (existing) {
      setRecord(existing)
    }
  }, [profile])

  const handleSave = () => {
    addDailyRecord(record)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleMoodSelect = (val: number) => {
    setRecord(prev => ({ ...prev, mood: val }))
  }

  const moodLabels = ['😫', '😟', '😐', '🙂', '😊']
  const moodTexts = [0, 1, 2, 3, 4].map(i => t(`journal.mood.${i}`))

  const dateStr = new Date().toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'long', day: 'numeric', weekday: 'long',
  })

  return (
    <div className="px-4 py-6 space-y-5">
      <h1 className="text-2xl font-serif text-calm-800 text-center">{t('journal.title')}</h1>
      <p className="text-center text-sm text-calm-500 -mt-3">
        {profileName} · {dateStr}
      </p>

      {/* Mood */}
      <div className="card">
        <h3 className="text-sm font-medium text-calm-700 mb-3">{t('journal.moodQ')}</h3>
        <div className="flex justify-between">
          {moodLabels.map((emoji, i) => (
            <button
              key={i}
              onClick={() => handleMoodSelect(i + 1)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                record.mood === i + 1
                  ? 'bg-warm-100 scale-110 ring-2 ring-warm-400'
                  : 'hover:bg-calm-100'
              }`}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-[10px] text-calm-500">{moodTexts[i]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Anxiety Level */}
      <div className="card">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-calm-700">{t('journal.anxietyQ')}</h3>
          <span className="text-lg font-bold text-warm-500">{record.anxiety}/10</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={record.anxiety}
          onChange={e => setRecord(prev => ({ ...prev, anxiety: parseInt(e.target.value) }))}
          className="w-full h-2 bg-calm-200 rounded-full appearance-none cursor-pointer accent-warm-500"
          style={{
            background: `linear-gradient(to right, #64b165 ${(record.anxiety - 1) * 11.1}%, #d2d2d7 ${(record.anxiety - 1) * 11.1}%)`
          }}
        />
        <div className="flex justify-between text-[10px] text-calm-400 mt-1">
          <span>{t('journal.anxietyCalm')}</span>
          <span>{t('journal.anxietyHigh')}</span>
        </div>
      </div>

      {/* Sleep */}
      <div className="card">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-calm-700">{t('journal.sleepQ')}</h3>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setRecord(prev => ({ ...prev, sleep: Math.max(0, prev.sleep - 0.5) }))}
              className="w-8 h-8 rounded-full bg-calm-100 text-calm-600 font-bold text-lg leading-none"
            >−</button>
            <span className="text-lg font-bold text-calm-800 w-12 text-center">{record.sleep}</span>
            <button
              onClick={() => setRecord(prev => ({ ...prev, sleep: Math.min(12, prev.sleep + 0.5) }))}
              className="w-8 h-8 rounded-full bg-calm-100 text-calm-600 font-bold text-lg leading-none"
            >+</button>
            <span className="text-xs text-calm-500 ml-1">{t('journal.sleepHour')}</span>
          </div>
        </div>
        {record.sleep < 4 && record.sleep > 0 && (
          <p className="text-xs text-warm-600 bg-warm-50 rounded-lg p-2">
            {t('journal.sleepTip')}
          </p>
        )}
      </div>

      {/* Baby Milestone */}
      <div className="card">
        <h3 className="text-sm font-medium text-calm-700 mb-3">{t('journal.milestoneQ')}</h3>
        <textarea
          value={record.babyMilestone || ''}
          onChange={e => setRecord(prev => ({ ...prev, babyMilestone: e.target.value }))}
          placeholder={t('journal.milestonePh')}
          className="input-field text-sm min-h-[80px] resize-none"
          rows={3}
        />
      </div>

      {/* Gratitude - 三件好事 */}
      <div className="card">
        <h3 className="text-sm font-medium text-calm-700 mb-3">
          {t('journal.gratitude')}
        </h3>
        <p className="text-xs text-calm-500 mb-3">{t('journal.gratitudeSub')}</p>
        <textarea
          value={record.gratitude || ''}
          onChange={e => setRecord(prev => ({ ...prev, gratitude: e.target.value }))}
          placeholder={t('journal.gratitudePh')}
          className="input-field text-sm min-h-[80px] resize-none"
          rows={3}
        />
      </div>

      {/* Notes */}
      <div className="card">
        <h3 className="text-sm font-medium text-calm-700 mb-3">{t('journal.noteQ')}</h3>
        <textarea
          value={record.note || ''}
          onChange={e => setRecord(prev => ({ ...prev, note: e.target.value }))}
          placeholder={t('journal.notePh')}
          className="input-field text-sm min-h-[60px] resize-none"
          rows={2}
        />
      </div>

      {/* Save */}
      <button onClick={handleSave} className={`btn-primary w-full text-center transition-all ${saved ? 'bg-soft-green-500' : ''}`}>
        {saved ? t('journal.saved') : t('journal.save')}
      </button>

      <div className="h-8" />
    </div>
  )
}
