import { useState } from 'react'
import { useProfile } from '../context/ProfileContext'
import { getLatestScaleResult, getTodayRecord, getProfileName } from '../utils/storage'
import { getWhisperForDate } from '../data/whispers'

const WHITE = '#ffffff'
const WHITE_90 = 'rgba(255,255,255,0.90)'
const WHITE_75 = 'rgba(255,255,255,0.75)'
const WHITE_60 = 'rgba(255,255,255,0.60)'

function padNo(no: number): string {
  return String(no).padStart(2, '0')
}

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

const CARD_COUNT = 12

export function ShareCard({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { profile } = useProfile()
  const [saved, setSaved] = useState(false)
  const [bgIndex, setBgIndex] = useState(0) // 0-11，对应 cards/01..12

  if (!open) return null

  const name = getProfileName(profile)
  const result = getLatestScaleResult(profile)
  const today = getTodayRecord(profile)
  const whisper = getWhisperForDate()
  const dateStr = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })

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

  const bgNo = bgIndex + 1
  const bgPath = `/cards/${padNo(bgNo)}.jpg`

  const drawCard = () => {
    const W = 1080
    const H = 1350
    const scale = 2
    const canvas = document.createElement('canvas')
    canvas.width = W * scale
    canvas.height = H * scale
    const ctx = canvas.getContext('2d')!
    ctx.scale(scale, scale)

    const img = new Image()
    img.onload = () => {
      // 背景图：cover 铺满
      const s = Math.max(W / img.width, H / img.height)
      const dw = img.width * s
      const dh = img.height * s
      ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh)

      // 暗色蒙版，保证白字可读
      const g = ctx.createLinearGradient(0, 0, 0, H)
      g.addColorStop(0, 'rgba(0,0,0,0.42)')
      g.addColorStop(0.5, 'rgba(0,0,0,0.28)')
      g.addColorStop(1, 'rgba(0,0,0,0.62)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)

      ctx.textAlign = 'center'

      // 顶部 wordmark
      ctx.fillStyle = WHITE
      ctx.font = '600 46px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
      ctx.fillText('锚点', W / 2, 110)
      ctx.fillStyle = WHITE_75
      ctx.font = '400 28px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
      ctx.fillText(`${name} · 今日状态`, W / 2, 158)

      // 中央 emoji
      ctx.font = '170px "Apple Color Emoji", "Segoe UI Emoji", system-ui, sans-serif'
      ctx.fillText(statusEmoji, W / 2, 500)

      // 状态文案
      ctx.fillStyle = WHITE
      ctx.font = '600 50px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
      ctx.fillText(statusText, W / 2, 600)

      // 今日一句（自动换行）
      ctx.fillStyle = WHITE_90
      ctx.font = '400 32px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
      wrapText(ctx, `“${whisper}”`, W / 2, 760, W - 200, 48)

      // 底部：日期 + 标语
      ctx.fillStyle = WHITE_60
      ctx.font = '400 26px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
      ctx.fillText(dateStr, W / 2, H - 120)
      ctx.fillStyle = WHITE
      ctx.font = '400 26px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
      ctx.fillText('育儿这条路，你不需要完美', W / 2, H - 75)

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
    img.src = bgPath
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="card-apple w-full max-w-sm max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-ink tracking-apple mb-3 text-center">分享卡片</h3>

        {/* 预览：背景图 + 暗蒙版 + 白字，与导出一致 */}
        <div className="relative rounded-[18px] overflow-hidden border border-hairline aspect-[4/5] bg-calm-100 select-none">
          <img src={bgPath} alt="卡片背景" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/45" />
          <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold tracking-apple">锚点</span>
              <span className="opacity-90">{name} · 今日状态</span>
            </div>
            <div className="text-center">
              <div className="text-6xl">{statusEmoji}</div>
              <div className="text-lg font-semibold tracking-apple mt-1">{statusText}</div>
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm leading-relaxed px-1">“{whisper}”</p>
              <div className="text-[11px] opacity-80">{dateStr}</div>
              <div className="text-[11px] font-medium">育儿这条路，你不需要完美</div>
            </div>
          </div>
        </div>

        {/* 背景选择 */}
        <div className="mt-3">
          <p className="text-xs text-calm-500 mb-2">选择卡片背景</p>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {Array.from({ length: CARD_COUNT }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setBgIndex(n - 1)}
                className={`relative shrink-0 w-12 h-16 rounded-[10px] overflow-hidden border transition-all ${
                  bgIndex === n - 1 ? 'border-apple ring-2 ring-apple/30' : 'border-hairline'
                }`}
              >
                <img src={`/cards/${padNo(n)}.jpg`} alt={`背景${n}`} className="w-full h-full object-cover" draggable={false} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-4">
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
