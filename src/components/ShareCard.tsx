import { useState, useEffect } from 'react'
import { useProfile } from '../context/ProfileContext'
import { getLatestScaleResult, getTodayRecord, getProfileName } from '../utils/storage'
import { getWhisperForDate } from '../data/whispers'
import { useI18n, pick } from '../i18n'
import { Modal } from './Modal'
import type { Lang } from '../i18n'
import type { DailyRecord, ScaleResult, Localized } from '../types'

const WHITE = '#ffffff'
const WHITE_90 = 'rgba(255,255,255,0.90)'
const WHITE_75 = 'rgba(255,255,255,0.75)'
const WHITE_60 = 'rgba(255,255,255,0.60)'

function padNo(no: number): string {
  return String(no).padStart(2, '0')
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

const MOOD_EMOJIS = ['😫', '😟', '😐', '🙂', '😊']
const MOOD_ZH = ['很差', '低落', '一般', '不错', '很好']
const MOOD_EN = ['awful', 'low', 'okay', 'good', 'great']

// 根据今日记录 + 最新量表结果 + 今日一句，组合一段可编辑的分享文案
function buildAutoCaption(
  lang: Lang,
  today: DailyRecord | null,
  result: ScaleResult | null,
  whisper: Localized,
): string {
  const w = pick(whisper, lang)
  const parts: string[] = []

  if (today) {
    const mi = Math.min(5, Math.max(1, today.mood)) - 1
    if (lang === 'zh') {
      parts.push(`${MOOD_EMOJIS[mi]} 今天心情${MOOD_ZH[mi]}，睡了 ${today.sleep} 小时。`)
      if (today.babyMilestone) parts.push(`宝宝今天：${today.babyMilestone}`)
      if (today.gratitude) parts.push(`今日感恩：${today.gratitude}`)
    } else {
      parts.push(`${MOOD_EMOJIS[mi]} Today I feel ${MOOD_EN[mi]}, slept ${today.sleep}h.`)
      if (today.babyMilestone) parts.push(`Baby today: ${today.babyMilestone}`)
      if (today.gratitude) parts.push(`Grateful for: ${today.gratitude}`)
    }
  } else if (result) {
    const cat = pick(result.category, lang)
    parts.push(lang === 'zh' ? `最近一次自测：${cat}。` : `Latest self-check: ${cat}.`)
  }

  // 收尾金句
  parts.push(lang === 'zh' ? `「${w}」` : `“${w}”`)
  return parts.join('\n')
}

const CARD_COUNT = 12
const EXT = 'webp'

export function ShareCard({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { profile } = useProfile()
  const { lang, t } = useI18n()
  const [saved, setSaved] = useState(false)
  const [bgIndex, setBgIndex] = useState(0) // 0-11，对应 cards/01..12

  const name = getProfileName(profile)
  const result = getLatestScaleResult(profile)
  const today = getTodayRecord(profile)
  const whisper = getWhisperForDate()

  // 分享文案：默认可编辑，每次打开重新按今日记录生成
  const [caption, setCaption] = useState<string>(() => buildAutoCaption(lang, today, result, whisper))

  useEffect(() => {
    if (open) setCaption(buildAutoCaption(lang, today, result, whisper))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const dateLocale = lang === 'zh' ? 'zh-CN' : 'en-US'
  const dateStr = new Date().toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })
  const appName = t('app.name')

  let statusEmoji = '🌿'
  let statusText = t('share.statusDefault')
  if (result) {
    statusEmoji = moodEmoji(result.level)
    statusText = t(`trends.level.${result.level}`)
  } else if (today) {
    const moodMap = ['😫', '😟', '😐', '🙂', '😊']
    statusEmoji = moodMap[today.mood - 1] || '🌿'
    statusText = t('share.anxietyToday').replace('{n}', String(today.anxiety))
  }

  const bgNo = bgIndex + 1
  const bgPath = `/cards/${padNo(bgNo)}.${EXT}`
  const subHeader = t('share.todayStatus').replace('{name}', name)

  const regenerate = () => setCaption(buildAutoCaption(lang, today, result, whisper))

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
      const s = Math.max(W / img.width, H / img.height)
      const dw = img.width * s
      const dh = img.height * s
      ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh)

      const g = ctx.createLinearGradient(0, 0, 0, H)
      g.addColorStop(0, 'rgba(0,0,0,0.42)')
      g.addColorStop(0.5, 'rgba(0,0,0,0.28)')
      g.addColorStop(1, 'rgba(0,0,0,0.62)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)

      ctx.textAlign = 'center'

      ctx.fillStyle = WHITE
      ctx.font = '600 46px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
      ctx.fillText(appName, W / 2, 110)
      ctx.fillStyle = WHITE_75
      ctx.font = '400 28px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
      ctx.fillText(subHeader, W / 2, 158)

      ctx.font = '170px "Apple Color Emoji", "Segoe UI Emoji", system-ui, sans-serif'
      ctx.fillText(statusEmoji, W / 2, 500)

      ctx.fillStyle = WHITE
      ctx.font = '600 50px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
      ctx.fillText(statusText, W / 2, 600)

      ctx.fillStyle = WHITE_90
      ctx.font = '400 30px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
      wrapText(ctx, caption, W / 2, 720, W - 200, 44)

      ctx.fillStyle = WHITE_60
      ctx.font = '400 26px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
      ctx.fillText(dateStr, W / 2, H - 120)
      ctx.fillStyle = WHITE
      ctx.font = '400 26px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif'
      ctx.fillText(t('share.tagline'), W / 2, H - 75)

      canvas.toBlob(blob => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${appName}-${name}-${new Date().toISOString().slice(0, 10)}.png`
        a.click()
        URL.revokeObjectURL(url)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }, 'image/png')
    }
    img.src = bgPath
  }

  return (
    <Modal open={open} onClose={onClose} ariaLabel={t('share.title')}>
      <h3 className="text-lg font-semibold text-ink tracking-apple mb-3 text-center">{t('share.title')}</h3>

      {/* 预览：背景图 + 暗蒙版 + 白字，与导出一致 */}
      <div className="relative rounded-[18px] overflow-hidden border border-hairline aspect-[4/5] bg-calm-100 select-none">
        <img src={bgPath} alt="卡片背景" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/45" />
        <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold tracking-apple">{appName}</span>
            <span className="opacity-90">{subHeader}</span>
          </div>
          <div className="text-center">
            <div className="text-6xl">{statusEmoji}</div>
            <div className="text-lg font-semibold tracking-apple mt-1">{statusText}</div>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm leading-relaxed px-1 whitespace-pre-line">{caption}</p>
            <div className="text-[11px] opacity-80">{dateStr}</div>
            <div className="text-[11px] font-medium">{t('share.tagline')}</div>
          </div>
        </div>
      </div>

      {/* 可编辑分享文案 */}
      <div className="mt-3">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-calm-500">{t('share.captionLabel')}</label>
          <button
            onClick={regenerate}
            className="text-xs text-apple font-medium px-2 py-1 rounded-full bg-apple/10 active:scale-95 transition"
          >
            ✨ {t('share.generate')}
          </button>
        </div>
        <textarea
          value={caption}
          onChange={e => setCaption(e.target.value)}
          rows={4}
          placeholder={t('share.captionPlaceholder')}
          className="w-full rounded-[12px] border border-hairline bg-calm-50 p-3 text-sm text-ink resize-none leading-relaxed focus:outline-none focus:ring-2 focus:ring-apple/30"
        />
      </div>

      {/* 背景选择 */}
      <div className="mt-3">
        <p className="text-xs text-calm-500 mb-2">{t('share.chooseBg')}</p>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {Array.from({ length: CARD_COUNT }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              onClick={() => setBgIndex(n - 1)}
              aria-label={`${t('share.chooseBg')} ${n}`}
              className={`relative shrink-0 w-12 h-16 rounded-[10px] overflow-hidden border transition-all ${
                bgIndex === n - 1 ? 'border-apple ring-2 ring-apple/30' : 'border-hairline'
              }`}
            >
              <img src={`/cards/${padNo(n)}.${EXT}`} alt={`背景${n}`} className="w-full h-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button onClick={onClose} className="btn-ghost flex-1 border border-hairline">
          {t('share.close')}
        </button>
        <button onClick={drawCard} className="btn-apple flex-1">
          {saved ? t('share.saved') : t('share.saveImg')}
        </button>
      </div>
    </Modal>
  )
}

// 自动换行（支持显式 \n 分段 + 中文逐字 + emoji 安全）
function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const paragraphs = text.split('\n')
  let yy = y
  for (const para of paragraphs) {
    const chars = Array.from(para)
    let line = ''
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
    yy += lineHeight
  }
}
