import { useState, useEffect } from 'react'
import { getScaleHistory, getDailyRecords } from '../utils/storage'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { ScaleResult, DailyRecord } from '../types'

export function TrendsPage() {
  const [scaleHistory, setScaleHistory] = useState<ScaleResult[]>([])
  const [dailyRecords, setDailyRecords] = useState<DailyRecord[]>([])

  useEffect(() => {
    setScaleHistory(getScaleHistory())
    setDailyRecords(getDailyRecords())
  }, [])

  // 最近 14 天的情绪数据
  const recentRecords = dailyRecords
    .slice(-14)
    .map(r => ({
      date: r.date.slice(5), // MM-DD
      mood: r.mood,
      anxiety: r.anxiety,
    }))

  // 情绪日历数据：最近 30 天
  const today = new Date()
  const calendarDays: { date: string; day: number; mood: number | null }[] = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const record = dailyRecords.find(r => r.date === dateStr)
    calendarDays.push({
      date: dateStr,
      day: d.getDate(),
      mood: record ? record.mood : null,
    })
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

  // Stats
  const avgAnxiety = recentRecords.length > 0
    ? (recentRecords.reduce((s, r) => s + r.anxiety, 0) / recentRecords.length).toFixed(1)
    : null

  const avgMood = recentRecords.length > 0
    ? (recentRecords.reduce((s, r) => s + r.mood, 0) / recentRecords.length).toFixed(1)
    : null

  const totalJournals = dailyRecords.length
  const scaleCount = scaleHistory.length

  return (
    <div className="px-4 py-6 space-y-5">
      <h1 className="text-2xl font-serif text-calm-800 text-center">趋势追踪</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card text-center">
          <div className="text-2xl font-bold text-calm-800">{scaleCount}</div>
          <div className="text-xs text-calm-500">次自测</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-calm-800">{totalJournals}</div>
          <div className="text-xs text-calm-500">天记录</div>
        </div>
        {avgAnxiety && (
          <div className="card text-center">
            <div className={`text-2xl font-bold ${getAnxietyColor(parseFloat(avgAnxiety))}`}>{avgAnxiety}</div>
            <div className="text-xs text-calm-500">平均焦虑 /10</div>
          </div>
        )}
        {avgMood && (
          <div className="card text-center">
            <div className="text-2xl font-bold text-calm-800">{avgMood}</div>
            <div className="text-xs text-calm-500">平均心情 /5</div>
          </div>
        )}
      </div>

      {/* Anxiety Chart */}
      {recentRecords.length >= 2 ? (
        <div className="card">
          <h3 className="text-sm font-medium text-calm-700 mb-4">近 14 天焦虑趋势</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={recentRecords}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ebe0d5" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: '#9b8b7e' }}
                  axisLine={{ stroke: '#ebe0d5' }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 10]}
                  ticks={[0, 2, 4, 6, 8, 10]}
                  tick={{ fontSize: 10, fill: '#9b8b7e' }}
                  axisLine={{ stroke: '#ebe0d5' }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ebe0d5',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#634432',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="anxiety"
                  stroke="#f19432"
                  strokeWidth={2.5}
                  dot={{ fill: '#f19432', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-calm-400 mt-3 text-center">坚持每天记录，就能看到自己的变化轨迹</p>
        </div>
      ) : (
        <div className="card text-center py-8">
          <span className="text-3xl block mb-2">📊</span>
          <p className="text-calm-500 text-sm">还没有足够的数据</p>
          <p className="text-calm-400 text-xs mt-1">坚持记录几天就能看到趋势了</p>
        </div>
      )}

      {/* Mood Calendar */}
      <div className="card">
        <h3 className="text-sm font-medium text-calm-700 mb-4">近 30 天心情日历</h3>
        <div className="grid grid-cols-7 gap-1">
          {['一', '二', '三', '四', '五', '六', '日'].map(d => (
            <div key={d} className="text-[10px] text-calm-400 text-center pb-1">{d}</div>
          ))}
          {/* Fill in empty cells for correct alignment */}
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
        <div className="flex items-center gap-3 justify-center mt-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-red-300" />
            <span className="text-[10px] text-calm-500">差</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-yellow-300" />
            <span className="text-[10px] text-calm-500">一般</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-soft-green-500" />
            <span className="text-[10px] text-calm-500">好</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-calm-100" />
            <span className="text-[10px] text-calm-500">无记录</span>
          </div>
        </div>
      </div>

      {/* Scale History */}
      {scaleHistory.length > 0 && (
        <div className="card">
          <h3 className="text-sm font-medium text-calm-700 mb-4">自测历史</h3>
          <div className="space-y-2">
            {scaleHistory.slice(-5).reverse().map((result, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-calm-50 last:border-0">
                <div>
                  <div className="text-sm text-calm-700">{result.category}</div>
                  <div className="text-xs text-calm-400">
                    {new Date(result.timestamp).toLocaleDateString('zh-CN')}
                  </div>
                </div>
                <span className={`text-sm font-medium ${getLevelColor(result.level)}`}>
                  {getLevelLabel(result.level)}
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
    case 'low': return '良好'
    case 'moderate': return '轻度'
    case 'high': return '偏高'
    case 'severe': return '需关注'
    default: return ''
  }
}
