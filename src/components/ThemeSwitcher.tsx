import { useState } from 'react'
import { getTheme, setTheme, type ThemeKey } from '../utils/storage'

const themes: { key: ThemeKey; name: string; swatch: string[]; desc: string }[] = [
  { key: 'calm', name: '暖杏', swatch: ['#f5f0eb', '#bc8f65', '#439547'], desc: '温暖米杏色' },
  { key: 'ocean', name: '深海', swatch: ['#e8f1f7', '#1f9486', '#3a8f60'], desc: '沉静海蓝色' },
  { key: 'blossom', name: '樱花', swatch: ['#f6e9ed', '#d83b78', '#3fa356'], desc: '柔嫩樱粉色' },
]

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<ThemeKey>(getTheme())

  const handleSelect = (key: ThemeKey) => {
    setTheme(key)
    setCurrent(key)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/70 border border-calm-200 text-calm-600 text-xs font-medium hover:border-warm-300 transition-all"
        aria-label="切换主题"
      >
        <span className="flex gap-0.5">
          {themes.find(t => t.key === current)?.swatch.map((c, i) => (
            <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </span>
        <span>{themes.find(t => t.key === current)?.name}</span>
        <span className="text-calm-400">▾</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 z-50 w-44 bg-white rounded-2xl shadow-lg border border-calm-100 p-2 space-y-1">
            <p className="text-[11px] text-calm-400 px-2 pt-1 pb-0.5">选择主题风格</p>
            {themes.map(t => (
              <button
                key={t.key}
                onClick={() => handleSelect(t.key)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all ${
                  current === t.key ? 'bg-calm-100' : 'hover:bg-calm-50'
                }`}
              >
                <span className="flex gap-0.5">
                  {t.swatch.map((c, i) => (
                    <span key={i} className="w-3 h-3 rounded-full ring-1 ring-black/5" style={{ backgroundColor: c }} />
                  ))}
                </span>
                <span className="flex-1 text-left">
                  <span className="block text-sm text-calm-800 font-medium leading-tight">{t.name}</span>
                  <span className="block text-[10px] text-calm-400 leading-tight">{t.desc}</span>
                </span>
                {current === t.key && <span className="text-warm-500 text-sm">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
