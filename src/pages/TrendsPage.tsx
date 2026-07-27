import { useState, useEffect } from 'react'
import { getScaleHistory, getDailyRecords } from '../utils/storage'
import { useProfile } from '../context/ProfileContext'
import { useI18n } from '../i18n'
import { ShareCard } from '../components/ShareCard'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { ScaleResult, DailyRecord } from '../types'

const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const
type Metric = 'anxiety' | 'mood' | 'sleep'

export function TrendsPage() {
  const { profile, profileName } = useProfile()
  const { t, L, lang } = useI18n()
  const [scaleHistory, setScaleHistory] = useState<ScaleResult[]>([])
  const [dailyRecords, setDailyRecords] = useState<DailyRecord[]>([])
  const [shareOpen, setShareOpen] = useState(false)
  const [metric, setMetric] = useState<Metric>('anxiety')

  useEffect(() => {
    setScaleHistory(getScaleHistory())
    setDailyRecords(getDailyRecords())
  }, [profile])

  const dateFmt = lang === 'zh' ? 'zh-CN' : 'en-US'

  // 最近 14 天
  const recentRecords = dailyRecords
    .slice(-14)
    .map(r => ({
      date: r.date.slice(5), // MM-DD
      mood: r.mood,
      anxiety: r.anxiety,
      sleep: r.sleep,
    }))

  // 情绪日历数据：最近 30 天
  const today = new Date()
  const calendarDays: { date: string; day: number; mood: number | null }[] = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const record = dailyRecords.find(r => r.date === dateStr)
    calendarDays.push({ date: dateStr, day: d.getDate(), mood: record ? record.mood : null })
  }

  const getMoodColor = (mood: number | null): string => {
    if (mood === null) return 'bg-calm-100'
    if (mood <= 1) return 'bg-red-300'
    if (mood <= 2) return 'bg-orange-300'
    if (mood <= 3) return 'bg-yellow-300'
    if (mood <= 4) return 'bg-soft-green-300'
    return 'bg-soft-green-500'
  }

  const getAnxietyColor = (val: number): string => {
    if (val <= 3) return 'text-soft-green-600'
    if (val <= 6) return 'text-warm-500'
    if (val <= 8) return 'text-orange-600'
    return 'text-red-600'
  }
  const getLevelColor = (level: string): string => {
    switch (level) {
      case 'low': return 'text-soft-green-600'
      case 'moderate': return 'text-warm-500'
      case 'high': return 'text-orange-600'
      case 'severe': return 'text-red-600'
      default: return 'text-calm-500'
    }
  }

  // Stats
  const avg = (key: 'anxiety' | 'mood') => {
    const arr = recentRecords.map(r => r[key])
    return arr.length ? (arr.reduce((s, v) => s + v, 0) / arr.length).toFixed(1) : null
  }
  const avgAnxiety = avg('anxiety')
  const avgMood = avg('mood')
  const totalJournals = dailyRecords.length
  const scaleCount = scaleHistory.length

  // 关联洞察：睡眠 / 心情 与焦虑的关系
  const insight = (() => {
    if (recentRecords.length < 4) return null
    const splitBySleep = (hi: boolean) => {
      const subset = recentRecords.filter(r => (hi ? r.sleep >= 7 : r.sleep < 7))
      if (subset.length < 2) return null
      return subset.reduce((s, r) => s + r.anxiety, 0) / subset.length
    }
    const hiSleep = splitBySleep(true)
    const loSleep = splitBySleep(false)
    if (hiSleep !== null && loSleep !== null) {
      const diff = loSleep - hiSleep
      if (diff >= 0.5) {
        return t('trends.insightSleep').replace('{d}', diff.toFixed(1))
      }
    }
    const hiMood = recentRecords.filter(r => r.mood >= 4)
    const loMood = recentRecords.filter(r => r.mood <= 2)
    if (hiMood.length >= 2 && loMood.length >= 2) {
      const avgA = (sub: typeof recentRecords) => sub.reduce((s, r) => s + r.anxiety, 0) / sub.length
      const diff = avgA(loMood) - avgA(hiMood)
      if (diff >= 0.5) {
        return t('trends.insightMood').replace('{d}', diff.toFixed(1))
      }
    }
    return null
  })()

  const metricConfig: Record<Metric, { label: string; color: string; domain: [number, number]; ticks?: number[] }> = {
    anxiety: { label: t('trends.showAnxiety'), color: '#0066cc', domain: [0, 10], ticks: [0, 2, 4, 6, 8, 10] },
    mood: { label: t('trends.showMood'), color: '#439547', domain: [1, 5], ticks: [1, 2, 3, 4, 5] },
    sleep: { label: t('trends.showSleep'), color: '#d83b78', domain: [0, 12], ticks: [0, 3, 6, 9, 12] },
  }

  return (
    <div className="px-4 py-6 space-y-5">
      <h1 className="text-2xl font-serif text-calm-800 text-center">{t('trends.title')}</h1>
      <p className="text-center text-xs text-calm-400 -mt-3">{t('trends.viewOf').replace('{name}', profileName)}</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card text-center">
          <div className="text-2xl font-bold text-calm-800">{scaleCount}</div>
          <div className="text-xs text-calm-500">{t('trends.scaleCount')}</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-calm-800">{totalJournals}</div>
          <div className="text-xs text-calm-500">{t('trends.journalCount')}</div>
        </div>
        {avgAnxiety && (
          <div className="card text-center">
            <div className={`text-2xl font-bold ${getAnxietyColor(parseFloat(avgAnxiety))}`}>{avgAnxiety}</div>
            <div className="text-xs text-calm-500">{t('trends.avgAnxiety')}</div>
          </div>
        )}
        {avgMood && (
          <div className="card text-center">
            <div className="text-2xl font-bold text-calm-800">{avgMood}</div>
            <div className="text-xs text-calm-500">{t('trends.avgMood')}</div>
          </div>
        )}
      </div>

      {/* Share Card */}
      <button
        onClick={() => setShareOpen(true)}
        className="card w-full text-left hover:border-apple/40 transition-colors flex items-center justify-between"
      >
        <div>
          <h3 className="font-medium text-calm-800 mb-1">{t('trends.shareCard')}</h3>
          <p className="text-sm text-calm-500">{t('trends.shareCardDesc').replace('{name}', profileName)}</p>
        </div>
        <span className="text-2xl">📤</span>
      </button>

      <ShareCard open={shareOpen} onClose={() => setShareOpen(false)} />

      {/* 关联洞察 */}
      {insight && (
        <div className="card bg-warm-50 border-warm-200">
          <div className="flex items-start gap-2">
            <span className="text-warm-500 text-sm mt-0.5">💡</span>
            <div>
              <div className="text-xs font-medium text-warm-700 mb-0.5">{t('trends.insight')}</div>
              <p className="text-sm text-calm-700 leading-relaxed">{insight}</p>
            </div>
          </div>
        </div>
      )}

      {/* 多指标趋势图 */}
      {recentRecords.length >= 2 ? (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-calm-700">{t('trends.anxietyTrend')}</h3>
            <div className="flex gap-1">
              {(['anxiety', 'mood', 'sleep'] as Metric[]).map(m => (
                <button
                  key={m}
                  onClick={() => setMetric(m)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    metric === m ? 'text-white' : 'text-calm-500 bg-calm-100'
                  }`}
                  style={metric === m ? { backgroundColor: metricConfig[m].color } : undefined}
                >
                  {metricConfig[m].label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={recentRecords}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: '#86868b' }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={false}
                />
                <YAxis
                  domain={metricConfig[metric].domain}
                  ticks={metricConfig[metric].ticks}
                  tick={{ fontSize: 10, fill: '#86868b' }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '18px',
                    fontSize: '12px',
                    color: '#1d1d1f',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={metric}
                  stroke={metricConfig[metric].color}
                  strokeWidth={2.5}
                  dot={{ fill: metricConfig[metric].color, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-calm-400 mt-3 text-center">{t('trends.keepRecording')}</p>
        </div>
      ) : (
        <div className="card text-center py-8">
          <span className="text-3xl block mb-2">📊</span>
          <p className="text-calm-500 text-sm">{t('trends.noData')}</p>
          <p className="text-calm-400 text-xs mt-1">{t('trends.noDataSub')}</p>
        </div>
      )}

      {/* Mood Calendar */}
      <div className="card">
        <h3 className="text-sm font-medium text-calm-700 mb-4">{t('trends.moodCalendar')}</h3>
        <div className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map(d => (
            <div key={d} className="text-[10px] text-calm-400 text-center pb-1">{t(`trends.weekday.${d}`)}</div>
          ))}
          {(() => {
            const firstDay = new Date(calendarDays[0].date).getDay() || 7 // Monday=1
            const emptyCells = []
            for (let i = 1; i < firstDay; i++) {
              emptyCells.push(<div key={`empty-${i}`} className="aspect-square" />)
            }
            return emptyCells
          })()}
          {calendarDays.map(d => (
            <div
              key={d.date}
              className={`aspect-square rounded-md flex items-center justify-center text-xs font-medium transition-all
                ${d.mood !== null ? getMoodColor(d.mood) + ' text-white scale-90 hover:scale-100' : 'text-calm-400'}`}
              title={d.date}
            >
              {d.day}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 justify-center mt-4 flex-wrap">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-red-300" />
            <span className="text-[10px] text-calm-500">{t('trends.legend.bad')}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-yellow-300" />
            <span className="text-[10px] text-calm-500">{t('trends.legend.mid')}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-soft-green-500" />
            <span className="text-[10px] text-calm-500">{t('trends.legend.good')}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-calm-100" />
            <span className="text-[10px] text-calm-500">{t('trends.legend.none')}</span>
          </div>
        </div>
      </div>

      {/* Scale History */}
      {scaleHistory.length > 0 && (
        <div className="card">
          <h3 className="text-sm font-medium text-calm-700 mb-4">{t('trends.history')}</h3>
          <div className="space-y-2">
            {scaleHistory.slice(-5).reverse().map((result, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-calm-50 last:border-0">
                <div>
                  <div className="text-sm text-calm-700">{L(result.category)}</div>
                  <div className="text-xs text-calm-400">
                    {new Date(result.timestamp).toLocaleDateString(dateFmt)}
                  </div>
                </div>
                <span className={`text-sm font-medium ${getLevelColor(result.level)}`}>
                  {t(`trends.level.${result.level}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="h-8" />
    </div>
  )
}
