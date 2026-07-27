import { useEffect, useRef, type ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  ariaLabel: string
  children: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg'
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function Modal({ open, onClose, ariaLabel, children, maxWidth = 'sm' }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    lastFocused.current = document.activeElement as HTMLElement

    const panel = panelRef.current
    // 打开时把焦点移入弹窗
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE)
    ;(first ?? panel)?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key === 'Tab' && panel) {
        const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          el => el.offsetParent !== null,
        )
        if (nodes.length === 0) {
          e.preventDefault()
          return
        }
        const firstEl = nodes[0]
        const lastEl = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey, true)
    // 锁定背景滚动
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey, true)
      document.body.style.overflow = prevOverflow
      lastFocused.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  const maxCls = maxWidth === 'md' ? 'max-w-md' : maxWidth === 'lg' ? 'max-w-lg' : 'max-w-sm'

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={`card-apple w-full ${maxCls} max-h-[90vh] overflow-y-auto outline-none`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
