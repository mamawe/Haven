import { useRef, useState, useEffect } from 'react'
import { useI18n } from '../i18n'
import { answers } from '../data/answers'
import type { Localized } from '../types'

type Phase = 'idle' | 'flipping' | 'revealed'

export function AnswerBook({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang, t, L } = useI18n()
  const [phase, setPhase] = useState<Phase>('idle')
  const [current, setCurrent] = useState<Localized | null>(null)
  const lastIndex = useRef(-1)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  if (!open) return null

  const pickAnswer = (): Localized => {
    let idx = Math.floor(Math.random() * answers.length)
    if (answers.length > 1 && idx === lastIndex.current) {
      idx = (idx + 1) % answers.length
    }
    lastIndex.current = idx
    return answers[idx]
  }

  const flip = () => {
    setPhase('flipping')
    setCurrent(null)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setCurrent(pickAnswer())
      setPhase('revealed')
    }, 900)
  }

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="card-apple w-full max-w-sm max-h-[90vh] overflow-y-auto bg-parchment"
        onClick={e => e.stopPropagation()}
      >
        {/* 关闭 */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            aria-label={t('answerbook.close')}
            className="w-8 h-8 rounded-full bg-calm-100 text-calm-500 text-lg leading-none flex items-center justify-center active:scale-95 transition"
          >
            ×
          </button>
        </div>

        <div className="px-2 pb-4 text-center">
          <div className="text-5xl mb-3">📖</div>
          <h3 className="text-xl font-semibold text-calm-800 tracking-apple mb-1">{t('answerbook.title')}</h3>
          <p className="text-sm text-calm-500 mb-6">{t('answerbook.hint')}</p>

          {phase === 'idle' && (
            <button onClick={flip} className="btn-apple w-full">
              {t('answerbook.open')}
            </button>
          )}

          {phase === 'flipping' && (
            <div className="py-10">
              <div className="text-6xl animate-book-pulse mb-4">📖</div>
              <p className="text-calm-400 text-sm">{t('answerbook.flipping')}</p>
            </div>
          )}

          {phase === 'revealed' && current && (
            <div className="space-y-6">
              <div
                key={`${current.zh}-${current.en}`}
                className="animate-answer-in rounded-[18px] bg-white border border-hairline p-6 shadow-sm"
              >
                <p className="text-lg leading-relaxed text-calm-800 font-medium">
                  “{L(current)}”
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={onClose} className="btn-ghost flex-1 border border-hairline">
                  {t('answerbook.close')}
                </button>
                <button onClick={flip} className="btn-apple flex-1">
                  {t('answerbook.again')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
