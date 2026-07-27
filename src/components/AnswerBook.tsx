import { useRef, useState, useEffect } from 'react'
import { useI18n } from '../i18n'
import { Modal } from './Modal'
import { answers } from '../data/answers'
import type { Localized } from '../types'

type Phase = 'idle' | 'flipping' | 'revealed'

export function AnswerBook({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang, t, L } = useI18n()
  const [phase, setPhase] = useState<Phase>('idle')
  const [current, setCurrent] = useState<Localized | null>(null)
  const lastIndex = useRef(-1)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 打开时重置到初始态
  useEffect(() => {
    if (open) {
      setPhase('idle')
      setCurrent(null)
    }
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [open])

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
    <Modal open={open} onClose={onClose} ariaLabel={t('answerbook.title')}>
      {/* 关闭 */}
      <div className="flex justify-end -mt-2 -mr-2">
        <button
          onClick={onClose}
          aria-label={t('answerbook.close')}
          className="w-8 h-8 rounded-full bg-calm-100 text-calm-500 text-lg leading-none flex items-center justify-center active:scale-95 transition"
        >
          ×
        </button>
      </div>

      <div className="px-2 pb-2 text-center">
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
    </Modal>
  )
}
