import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'

interface SplashProps {
  onDone: () => void
  duration?: number
}

export function SplashScreen({ onDone, duration = 2000 }: SplashProps) {
  const [hiding, setHiding] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    const fadeT = setTimeout(() => setHiding(true), duration - 300)
    const doneT = setTimeout(onDone, duration)
    return () => {
      clearTimeout(fadeT)
      clearTimeout(doneT)
    }
  }, [duration, onDone])

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white flex items-center justify-center transition-opacity duration-300 ${
        hiding ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      <picture>
        <source srcSet="/splash.webp" type="image/webp" />
        <img
          src="/splash.jpg"
          alt={t('app.name')}
          className="max-h-full max-w-full object-contain select-none"
          draggable={false}
        />
      </picture>
    </div>
  )
}