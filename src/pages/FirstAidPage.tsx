import { useState, useEffect, useRef } from 'react'
import { reassuranceCards } from '../data/whispers'
import { HOTLINES } from '../data/hotlines'
import { getHotlineRegion, setHotlineRegion } from '../utils/storage'
import { useI18n } from '../i18n'
import type { Region } from '../types'

// ============ 箱式呼吸 (4-4-4-4) ============
const PHASES = [
  { key: 'inhale', duration: 4000, from: 0.5, to: 1.0 },
  { key: 'hold', duration: 4000, from: 1.0, to: 1.0 },
  { key: 'exhale', duration: 4000, from: 1.0, to: 0.5 },
  { key: 'hold', duration: 4000, from: 0.5, to: 0.5 },
]

function BreathingExercise() {
  const { t } = useI18n()
  const [running, setRunning] = useState(false)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [round, setRound] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number>(0)

  useEffect(() => {
    if (!running) return
    startRef.current = performance.now() - progress * PHASES[phaseIdx].duration
    const tick = (now: number) => {
      const elapsed = now - startRef.current
      const phase = PHASES[phaseIdx]
      if (elapsed >= phase.duration) {
        // 进入下一阶段
        const nextIdx = (phaseIdx + 1) % PHASES.length
        if (nextIdx === 0) setRound(r => r + 1)
        setPhaseIdx(nextIdx)
        setProgress(0)
        startRef.current = now
      } else {
        setProgress(elapsed / phase.duration)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [running, phaseIdx, progress])

  const phase = PHASES[phaseIdx]
  const scale = phase.from + (phase.to - phase.from) * progress
  const secondsLeft = Math.ceil((phase.duration * (1 - progress)) / 1000)

  const reset = () => {
    setRunning(false)
    setPhaseIdx(0)
    setProgress(0)
    setRound(0)
  }

  return (
    <div className="card flex flex-col items-center py-8">
      <h3 className="text-sm font-medium text-calm-700 mb-1">{t('breath.title')}</h3>
      <p className="text-xs text-calm-400 mb-6">{t('breath.sub')}</p>

      <div className="relative w-44 h-44 flex items-center justify-center mb-6">
        <div
          className="absolute rounded-full bg-gradient-to-br from-warm-200 to-warm-400 opacity-40 transition-none"
          style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
        />
        <div
          className="relative rounded-full bg-gradient-to-br from-warm-300 to-warm-500 shadow-lg flex items-center justify-center text-white"
          style={{ width: `${scale * 100}%`, height: `${scale * 100}%`, transition: 'none' }}
        >
          <div className="text-center">
            <div className="text-lg font-medium">{t(`breath.${phase.key}`)}</div>
            <div className="text-2xl font-bold tabular-nums">{secondsLeft}</div>
          </div>
        </div>
      </div>

      <div className="text-xs text-calm-500 mb-4">{t('breath.rounds').replace('{n}', String(round))}</div>

      {!running ? (
        <button onClick={() => setRunning(true)} className="btn-primary text-center">
          {round === 0 ? t('breath.start') : t('breath.continue')}
        </button>
      ) : (
        <button onClick={reset} className="btn-ghost text-center">
          {t('breath.stop')}
        </button>
      )}
    </div>
  )
}

// ============ 5-4-3-2-1 接地练习 ============
const GROUNDING = [
  { n: 5, key: 'see', emoji: '👀' },
  { n: 4, key: 'hear', emoji: '👂' },
  { n: 3, key: 'touch', emoji: '✋' },
  { n: 2, key: 'smell', emoji: '👃' },
  { n: 1, key: 'taste', emoji: '👅' },
]

function GroundingExercise() {
  const { t, lang } = useI18n()
  const [taps, setTaps] = useState<number[]>([0, 0, 0, 0, 0])

  return (
    <div className="card">
      <h3 className="text-sm font-medium text-calm-700 mb-1">{t('ground.title')}</h3>
      <p className="text-xs text-calm-400 mb-4">{t('ground.sub')}</p>
      <div className="space-y-2">
        {GROUNDING.map((g, i) => {
          const senseLabel = t(`ground.${g.key}`)
          const line = lang === 'zh'
            ? `${g.n} 样你能${senseLabel}的`
            : `${g.n} things you can ${senseLabel.toLowerCase()}`
          return (
            <div key={g.key} className="flex items-center gap-3">
              <span className="text-xl w-7">{g.emoji}</span>
              <div className="flex-1">
                <div className="text-sm text-calm-800">{line}</div>
                <div className="text-xs text-calm-400">{t(`ground.hint.${g.key}`)}</div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setTaps(prev => prev.map((tp, idx) => idx === i ? Math.max(0, tp - 1) : tp))}
                  className="w-7 h-7 rounded-full bg-calm-100 text-calm-600 font-bold"
                >−</button>
                <span className="w-5 text-center font-medium text-calm-800 tabular-nums">{taps[i]}/{g.n}</span>
                <button
                  onClick={() => setTaps(prev => prev.map((tp, idx) => idx === i ? Math.min(g.n, tp + 1) : tp))}
                  className="w-7 h-7 rounded-full bg-warm-100 text-warm-600 font-bold"
                >+</button>
              </div>
            </div>
          )
        })}
      </div>
      {taps.every((tp, i) => tp >= GROUNDING[i].n) && (
        <p className="text-xs text-soft-green-600 font-medium mt-3 text-center">
          {t('ground.done')}
        </p>
      )}
    </div>
  )
}

// ============ 快速安抚语句 ============
function ReassuranceCards() {
  const { t, L } = useI18n()
  const [idx, setIdx] = useState(0)
  return (
    <div className="card">
      <h3 className="text-sm font-medium text-calm-700 mb-3">{t('reassurance.title')}</h3>
      <div className="bg-calm-50 rounded-xl p-4 min-h-[88px] flex items-center">
        <p className="text-sm text-calm-700 leading-relaxed">{L(reassuranceCards[idx])}</p>
      </div>
      <div className="flex items-center justify-between mt-3">
        <button
          onClick={() => setIdx(i => (i - 1 + reassuranceCards.length) % reassuranceCards.length)}
          className="text-calm-400 text-sm px-2 py-1"
        >{t('reassurance.prev')}</button>
        <span className="text-xs text-calm-400">{idx + 1} / {reassuranceCards.length}</span>
        <button
          onClick={() => setIdx(i => (i + 1) % reassuranceCards.length)}
          className="text-calm-400 text-sm px-2 py-1"
        >{t('reassurance.next')}</button>
      </div>
    </div>
  )
}

export function FirstAidPage({ onNavigate }: { onNavigate: (tab: 'journal') => void }) {
  const { t, L } = useI18n()
  const [region, setRegion] = useState<Region>(() => getHotlineRegion())
  const hotlines = HOTLINES[region]

  const onRegion = (r: Region) => {
    setRegion(r)
    setHotlineRegion(r)
  }

  return (
    <div className="px-4 py-6 space-y-5">
      <div className="text-center">
        <span className="text-3xl">🆘</span>
        <h1 className="text-2xl font-serif text-calm-800 mt-1">{t('firstaid.title')}</h1>
        <p className="text-sm text-calm-500 mt-1">{t('firstaid.sub')}</p>
      </div>

      {/* 紧急求助（常驻） */}
      <div className="card bg-red-50 border-red-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🚨</span>
          <div>
            <h3 className="text-sm font-semibold text-red-700">{t('firstaid.emergency')}</h3>
            <p className="text-xs text-red-500 leading-snug">{t('firstaid.emergencyDesc')}</p>
          </div>
        </div>
        <label className="text-xs text-red-600 font-medium block mb-1">{t('firstaid.region')}</label>
        <select
          value={region}
          onChange={e => onRegion(e.target.value as Region)}
          className="w-full rounded-xl border border-red-200 bg-white px-3 py-2 text-sm text-red-700 mb-3 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <option value="CN">{t('firstaid.regionCN')}</option>
          <option value="HK">{t('firstaid.regionHK')}</option>
          <option value="TW">{t('firstaid.regionTW')}</option>
          <option value="US">{t('firstaid.regionUS')}</option>
          <option value="UK">{t('firstaid.regionUK')}</option>
        </select>
        <div className="space-y-2">
          {hotlines.map(h => (
            <a
              key={h.number}
              href={`tel:${h.number}`}
              className="flex items-center justify-between rounded-xl bg-white border border-red-200 px-3 py-2 active:scale-[0.98] transition"
            >
              <span className="text-sm text-red-700">
                <span className="font-bold">{h.number}</span>
                <span className="text-red-500 text-xs ml-2">{L(h.label)}</span>
              </span>
              <span className="text-xs text-red-600 font-medium">{t('firstaid.callHotline')} →</span>
            </a>
          ))}
        </div>
        <p className="text-[11px] text-red-400 mt-2">{t('firstaid.hotlineNote')}</p>
      </div>

      <BreathingExercise />
      <GroundingExercise />
      <ReassuranceCards />

      <button
        onClick={() => onNavigate('journal')}
        className="card w-full text-left hover:border-warm-300 transition-colors flex items-center justify-between"
      >
        <div>
          <h3 className="font-medium text-calm-800 text-sm">{t('firstaid.journal')}</h3>
          <p className="text-xs text-calm-500 mt-0.5">{t('firstaid.journalSub')}</p>
        </div>
        <span className="text-xl">✍️</span>
      </button>
    </div>
  )
}
