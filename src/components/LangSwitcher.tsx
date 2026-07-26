import { useI18n } from '../i18n'

export function LangSwitcher() {
  const { lang, setLang, t } = useI18n()
  return (
    <button
      onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
      aria-label={t('lang.label')}
      className="flex items-center gap-0.5 px-2.5 py-1.5 rounded-full bg-white/70 border border-calm-200 text-calm-600 text-xs font-medium hover:border-warm-300 transition-all"
    >
      <span className={lang === 'zh' ? 'text-warm-500 font-semibold' : ''}>{t('lang.zh')}</span>
      <span className="text-calm-300">/</span>
      <span className={lang === 'en' ? 'text-warm-500 font-semibold' : ''}>{t('lang.en')}</span>
    </button>
  )
}
