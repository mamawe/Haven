import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'

export function SWUpdateBanner() {
  const { t } = useI18n()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onUpdate = () => setShow(true)
    window.addEventListener('app-update', onUpdate as EventListener)
    return () => window.removeEventListener('app-update', onUpdate as EventListener)
  }, [])

  if (!show) return null

  const apply = async () => {
    const reg = await navigator.serviceWorker.getRegistration()
    const waiting = reg?.waiting
    if (waiting) {
      waiting.postMessage('SKIP_WAITING')
      // 等待新 SW 接管后再刷新
      navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload(), { once: true })
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[80] w-[calc(100%-2rem)] max-w-sm">
      <div className="card-apple flex items-center justify-between gap-3 shadow-lg border border-hairline">
        <span className="text-sm text-calm-800 font-medium">{t('update.title')}</span>
        <button onClick={apply} className="btn-apple text-sm px-4 py-2 shrink-0">
          {t('update.reload')}
        </button>
      </div>
    </div>
  )
}
