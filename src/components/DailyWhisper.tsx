import { useState, useEffect } from 'react'
import { getWhisperForDate } from '../data/whispers'
import {
  getReminderTime, isReminderEnabled, setReminder,
  notificationSupported, requestPermission,
} from '../utils/reminder'
import { useI18n } from '../i18n'

export function DailyWhisper() {
  const [whisper] = useState(() => getWhisperForDate())
  const [enabled, setEnabled] = useState(false)
  const [time, setTime] = useState('21:00')
  const [perm, setPerm] = useState<NotificationPermission>('default')
  const [showTime, setShowTime] = useState(false)
  const { t, L } = useI18n()

  useEffect(() => {
    setEnabled(isReminderEnabled())
    const t = getReminderTime()
    if (t) setTime(t)
    if ('Notification' in window) setPerm(Notification.permission)
  }, [])

  const handleToggle = async () => {
    if (!enabled) {
      // 开启：请求通知权限
      if (notificationSupported()) {
        const p = await requestPermission()
        setPerm(p)
        if (p === 'granted') {
          setReminder(time)
          setEnabled(true)
        } else if (p === 'denied') {
          // 被拒绝，仅保留今日一句，不开启推送
          setEnabled(false)
        } else {
          // 忽略（default），先不开推送
          setEnabled(false)
        }
      } else {
        // 不支持通知，仍可开启"今日一句"常驻（无意义推送，仅 UI）
        setEnabled(false)
      }
    } else {
      setReminder(null)
      setEnabled(false)
    }
  }

  const handleTimeChange = (t: string) => {
    setTime(t)
    if (enabled) setReminder(t)
  }

  return (
    <div className="card bg-gradient-to-br from-warm-50 to-calm-50 border-warm-100">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm">🌿</span>
        <span className="text-xs font-medium text-calm-500">{t('whisper.label')}</span>
        <span className="text-xs text-calm-300">{new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}</span>
      </div>
      <p className="text-sm text-calm-700 leading-relaxed font-serif">{L(whisper)}</p>

      {/* 通知开关 */}
      <div className="mt-3 pt-3 border-t border-calm-100 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-calm-700">{t('whisper.reminderTitle')}</div>
          <div className="text-[11px] text-calm-400">
            {notificationSupported()
              ? (enabled ? t('whisper.reminderOn').replace('{time}', time) : t('whisper.reminderOff'))
              : t('whisper.notSupported')}
          </div>
        </div>
        {notificationSupported() && (
          <button
            onClick={handleToggle}
            className={`shrink-0 ml-3 relative w-12 h-7 rounded-full transition-all ${
              enabled ? 'bg-warm-500' : 'bg-calm-200'
            }`}
            aria-label="切换提醒"
          >
            <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${
              enabled ? 'left-6' : 'left-1'
            }`} />
          </button>
        )}
      </div>

      {enabled && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-calm-500">{t('whisper.timeLabel')}</span>
          <input
            type="time"
            value={time}
            onChange={e => handleTimeChange(e.target.value)}
            className="text-sm rounded-lg border border-calm-200 px-2 py-1 text-calm-700 bg-white"
          />
        </div>
      )}

      {enabled && perm === 'denied' && (
        <p className="text-[11px] text-orange-600 mt-2">
          {t('whisper.denied')}
        </p>
      )}
    </div>
  )
}
