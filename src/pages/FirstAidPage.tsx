import { useState, useEffect, useRef } from 'react'
import { reassuranceCards } from '../data/whispers'

// ============ 箱式呼吸 (4-4-4-4) ============
const PHASES = [
  { key: 'inhale', label: '吸气', duration: 4000, from: 0.5, to: 1.0 },
  { key: 'hold1', label: '屏息', duration: 4000, from: 1.0, to: 1.0 },
  { key: 'exhale', label: '呼气', duration: 4000, from: 1.0, to: 0.5 },
  { key: 'hold2', label: '屏息', duration: 4000, from: 0.5, to: 0.5 },
]

function BreathingExercise() {
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
      <h3 className="text-sm font-medium text-calm-700 mb-1">箱式呼吸</h3>
      <p className="text-xs text-calm-400 mb-6">吸气 4 秒 · 屏息 4 秒 · 呼气 4 秒 · 屏息 4 秒</p>

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
            <div className="text-lg font-medium">{phase.label}</div>
            <div className="text-2xl font-bold tabular-nums">{secondsLeft}</div>
          </div>
        </div>
      </div>

      <div className="text-xs text-calm-500 mb-4">已完成 {round} 轮</div>

      {!running ? (
        <button onClick={() => setRunning(true)} className="btn-primary text-center">
          {round === 0 ? '开始呼吸' : '继续'}
        </button>
      ) : (
        <button onClick={reset} className="btn-ghost text-center">
          停止
        </button>
      )}
    </div>
  )
}

// ============ 5-4-3-2-1 接地练习 ============
const GROUNDING = [
  { n: 5, sense: '看见', emoji: '👀', hint: '5 样你能看到的东西' },
  { n: 4, sense: '听见', emoji: '👂', hint: '4 种你能听到的声音' },
  { n: 3, sense: '触摸', emoji: '✋', hint: '3 样你能摸到的质感' },
  { n: 2, sense: '闻到', emoji: '👃', hint: '2 种你能闻到的气味' },
  { n: 1, sense: '尝到', emoji: '👅', hint: '1 种你能尝到的味道' },
]

function GroundingExercise() {
  const [taps, setTaps] = useState<number[]>([0, 0, 0, 0, 0])

  return (
    <div className="card">
      <h3 className="text-sm font-medium text-calm-700 mb-1">5-4-3-2-1  grounding</h3>
      <p className="text-xs text-calm-400 mb-4">焦虑时大脑在跑，用感官把它拉回此刻。逐项点一下，数够数量。</p>
      <div className="space-y-2">
        {GROUNDING.map((g, i) => (
          <div key={g.sense} className="flex items-center gap-3">
            <span className="text-xl w-7">{g.emoji}</span>
            <div className="flex-1">
              <div className="text-sm text-calm-800">{g.n} 样你能{g.sense}的</div>
              <div className="text-xs text-calm-400">{g.hint}</div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setTaps(prev => prev.map((t, idx) => idx === i ? Math.max(0, t - 1) : t))}
                className="w-7 h-7 rounded-full bg-calm-100 text-calm-600 font-bold"
              >−</button>
              <span className="w-5 text-center font-medium text-calm-800 tabular-nums">{taps[i]}/{g.n}</span>
              <button
                onClick={() => setTaps(prev => prev.map((t, idx) => idx === i ? Math.min(g.n, t + 1) : t))}
                className="w-7 h-7 rounded-full bg-warm-100 text-warm-600 font-bold"
              >+</button>
            </div>
          </div>
        ))}
      </div>
      {taps.every((t, i) => t >= GROUNDING[i].n) && (
        <p className="text-xs text-soft-green-600 font-medium mt-3 text-center">
          ✓ 做得好。你已经被拉回此刻了。
        </p>
      )}
    </div>
  )
}

// ============ 快速安抚语句 ============
function ReassuranceCards() {
  const [idx, setIdx] = useState(0)
  return (
    <div className="card">
      <h3 className="text-sm font-medium text-calm-700 mb-3">一句话，先稳住</h3>
      <div className="bg-calm-50 rounded-xl p-4 min-h-[88px] flex items-center">
        <p className="text-sm text-calm-700 leading-relaxed">{reassuranceCards[idx]}</p>
      </div>
      <div className="flex items-center justify-between mt-3">
        <button
          onClick={() => setIdx(i => (i - 1 + reassuranceCards.length) % reassuranceCards.length)}
          className="text-calm-400 text-sm px-2 py-1"
        >← 上一条</button>
        <span className="text-xs text-calm-400">{idx + 1} / {reassuranceCards.length}</span>
        <button
          onClick={() => setIdx(i => (i + 1) % reassuranceCards.length)}
          className="text-calm-400 text-sm px-2 py-1"
        >下一条 →</button>
      </div>
    </div>
  )
}

export function FirstAidPage({ onNavigate }: { onNavigate: (tab: 'journal') => void }) {
  return (
    <div className="px-4 py-6 space-y-5">
      <div className="text-center">
        <span className="text-3xl">🆘</span>
        <h1 className="text-2xl font-serif text-calm-800 mt-1">焦虑急救箱</h1>
        <p className="text-sm text-calm-500 mt-1">情绪上头时，先别想，跟着做</p>
      </div>

      <BreathingExercise />
      <GroundingExercise />
      <ReassuranceCards />

      <button
        onClick={() => onNavigate('journal')}
        className="card w-full text-left hover:border-warm-300 transition-colors flex items-center justify-between"
      >
        <div>
          <h3 className="font-medium text-calm-800 text-sm">记一笔此刻</h3>
          <p className="text-xs text-calm-500 mt-0.5">把现在的感受写下来，会轻一点</p>
        </div>
        <span className="text-xl">✍️</span>
      </button>
    </div>
  )
}
