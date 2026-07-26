import { useState } from 'react'
import { useProfile } from '../context/ProfileContext'
import { getLatestScaleResult, getTodayRecord, getProfileName } from '../utils/storage'
import { getWhisperForDate } from '../data/whispers'

const APPLE_BLUE = '#0066cc'
const INK = '#1d1d1f'
const MUTED = '#7a7a7a'
const PARCHMENT = '#f5f5f7'
const HAIR = '#e0e0e0'

function levelLabel(level: string): string {
  switch (level) {
    case 'low': return '状态良好'
    case 'moderate': return '轻度焦虑'
    case 'high': return '焦虑偏高'
    case 'severe': return '需要关注'
    default: return ''
  }
}
function moodEmoji(level: string): string {
  switch (level) {
    case 'low': return '😊'
    case 'moderate': return '😐'
    case 'high': return '😟'
    case 'severe': return '😢'
    default: return '🌿'
  }
}

export function ShareCard({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { profile } = useProfile()
  const [saved, setSaved] = useState(false)

  if (!open) return null

  const name = getProfileName(profile)
  const result = getLatestScaleResult(profile)
  const today = getTodayRecord(profile)
  const whisper = getWhisperForDate()
  const dateStr = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })

  // 状态文案
  let statusEmoji = '🌿'
  let statusText = '今天也在好好照顾自己'
  if (result) {
    statusEmoji = moodEmoji(result.level)
    statusText = levelLabel(result.level)
  } else if (today) {
    const moodMap = ['😫', '😟', '😐', '🙂', '😊']
    statusEmoji = moodMap[today.mood - 1] || '🌿'
    statusText = `今日焦虑 ${today.anxiety}/10`
  }

  const drawCard = () => {
    const W = 1080
    const H = 1350
    const scale = 2
    const canvas = document.createElement('canvas')
    canvas.width = W * scale
    canvas.height = H * scale
    const ctx = canvas.getContext('2d')!
    ctx.scale(scale, scale)

    // 背景
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, W, H)

    // 内层面板
    const mx = 60
    ctx.fillStyle = PARCHMENT
    roundRect(ctx, mx, mx, W - mx * 2, H - mx * 2, 36)
    ctx.fill()

    const cx = W / 2
    ctx.textAlign = 'center'

    // 顶部 wordmark
    ctx.fillStyle = APPLE_BLUE
    ctx.font = '600 44px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
    ctx.fillText('锚点', cx, 200)
    ctx.fillStyle = MUTED
    ctx.font = '400 26px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
    ctx.fillText(`${name} · 今日状态`, cx, 245)

    // 中央 emoji
    ctx.font = '160px "Apple Color Emoji", "Segoe UI Emoji", system-ui, sans-serif'
    ctx.fillText(statusEmoji, cx, 470)

    // 状态文案
    ctx.fillStyle = INK
    ctx.font = '600 46px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
    ctx.fillText(statusText, cx, 560)

    // 分隔线
    ctx.strokeStyle = HAIR
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(mx + 120, 640)
    ctx.lineTo(W - mx - 120, 640)
    ctx.stroke()

    // 今日一句（自动换行）
    ctx.fillStyle = '#515154'
    ctx.font = '400 30px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
    wrapText(ctx, `“${whisper}”`, cx, 720, W - mx * 2 - 160, 46)

    // 底部：日期 + 标语
    ctx.fillStyle = MUTED
    ctx.font = '400 24px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
    ctx.fillText(dateStr, cx, H - mx - 70)
    ctx.fillStyle = APPLE_BLUE
    ctx.font = '400 24px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
    ctx.fillText('育儿这条路，你不需要完美', cx, H - mx - 30)

    // 导出
    canvas.toBlob(blob => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `锚点-${name}-${new Date().toISOString().slice(0, 10)}.png`
      a.click()
      URL.revokeObjectURL(url)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 'image/png')
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="card-apple w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-ink tracking-apple mb-4 text-center">分享卡片</h3>

        {/* 预览（Apple 风格）*/}
        <div className="rounded-[18px] bg-parchment border border-hairline p-6 space-y-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-semibold" style={{ color: APPLE_BLUE }}>锚点</span>
            <span className="text-xs text-calm-500">{name} · 今日状态</span>
          </div>
          <div className="text-6xl py-2">{statusEmoji}</div>
          <div className="text-lg font-semibold text-ink tracking-apple">{statusText}</div>
          <div className="h-px bg-hairline mx-6" />
          <p className="text-sm text-calm-600 leading-relaxed px-2">“{whisper}”</p>
          <div className="text-[11px] text-calm-400 pt-1">{dateStr}</div>
          <div className="text-[11px]" style={{ color: APPLE_BLUE }}>育儿这条路，你不需要完美</div>
        </div>

        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="btn-ghost flex-1 border border-hairline">
            关闭
          </button>
          <button onClick={drawCard} className="btn-apple flex-1">
            {saved ? '已保存 ✓' : '保存图片'}
          </button>
        </div>
      </div>
    </div>
  )
}

// 圆角矩形路径
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

// 自动换行
function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const chars = text.split('')
  let line = ''
  let yy = y
  for (const ch of chars) {
    const test = line + ch
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, yy)
      line = ch
      yy += lineHeight
    } else {
      line = test
    }
  }
  if (line) ctx.fillText(line, x, yy)
}
