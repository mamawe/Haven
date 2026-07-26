import { useState } from 'react'
import { getTheme, setTheme, type ThemeKey } from '../utils/storage'
import { useI18n } from '../i18n'

const themes: { key: ThemeKey; swatch: string[] }[] = [
  { key: 'calm', swatch: ['#f5f0eb', '#bc8f65', '#439547'] },
  { key: 'ocean', swatch: ['#e8f1f7', '#1f9486', '#3a8f60'] },
  { key: 'blossom', swatch: ['#f6e9ed', '#d83b78', '#3fa356'] },
]

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<ThemeKey>(getTheme())
  const { t } = useI18n()

  const handleSelect = (key: ThemeKey) => {
    setTheme(key)
    setCurrent(key)
    setOpen(false)
  }

  const nameOf = (key: ThemeKey) =>
    key === 'calm' ? t('theme.calm') : key === 'ocean' ? t('theme.ocean') : t('theme.blossom')
  const descOf = (key: ThemeKey) =>
    key === 'calm' ? t('theme.calmDesc') : key === 'ocean' ? t('theme.oceanDesc') : t('theme.blossomDesc')

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/70 border border-calm-200 text-calm-600 text-xs font-medium hover:border-warm-300 transition-all"
        aria-label={t('theme.label')}
      >
        <span className="flex gap-0.5">
          {themes.find(t => t.key === current)?.swatch.map((c, i) => (
            <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </span>
        <span>{nameOf(current)}</span>
        <span className="text-calm-400">▾</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 z-50 w-44 bg-white rounded-2xl shadow-lg border border-calm-100 p-2 space-y-1">
            <p className="text-[11px] text-calm-400 px-2 pt-1 pb-0.5">{t('theme.choose')}</p>
            {themes.map(th => (
              <button
                key={th.key}
                onClick={() => handleSelect(th.key)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all ${
                  current === th.key ? 'bg-calm-100' : 'hover:bg-calm-50'
                }`}
              >
                <span className="flex gap-0.5">
                  {th.swatch.map((c, i) => (
                    <span key={i} className="w-3 h-3 rounded-full ring-1 ring-black/5" style={{ backgroundColor: c }} />
                  ))}
                </span>
                <span className="flex-1 text-left">
                  <span className="block text-sm text-calm-800 font-medium leading-tight">{nameOf(th.key)}</span>
                  <span className="block text-[10px] text-calm-400 leading-tight">{descOf(th.key)}</span>
                </span>
                {current === th.key && <span className="text-warm-500 text-sm">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
