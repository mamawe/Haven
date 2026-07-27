import { useState, useEffect, lazy, Suspense } from 'react'
import { ProfileProvider } from './context/ProfileContext'
import { SplashScreen } from './components/SplashScreen'
import { I18nProvider, useI18n } from './i18n'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Onboarding } from './components/Onboarding'
import { SWUpdateBanner } from './components/SWUpdateBanner'
import { getOnboarded } from './utils/storage'
import type { Tab } from './types'

// 代码分包：页面按需加载，首屏只加载 Home + 壳
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })))
const ScalePage = lazy(() => import('./pages/ScalePage').then(m => ({ default: m.ScalePage })))
const KnowledgePage = lazy(() => import('./pages/KnowledgePage').then(m => ({ default: m.KnowledgePage })))
const JournalPage = lazy(() => import('./pages/JournalPage').then(m => ({ default: m.JournalPage })))
const TrendsPage = lazy(() => import('./pages/TrendsPage').then(m => ({ default: m.TrendsPage })))
const FirstAidPage = lazy(() => import('./pages/FirstAidPage').then(m => ({ default: m.FirstAidPage })))

const TAB_KEYS: Tab[] = ['home', 'scale', 'knowledge', 'journal', 'trends', 'firstaid']
const TAB_ICONS: Record<Tab, string> = {
  home: '🏠', scale: '📋', knowledge: '📚', journal: '✍️', trends: '📊', firstaid: '🆘',
}

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-calm-400">
      <div className="animate-pulse text-2xl">🌿</div>
    </div>
  )
}

function Shell() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [showSplash, setShowSplash] = useState(
    () => sessionStorage.getItem('parent-calm-splash-shown') !== '1'
  )
  const { t } = useI18n()

  useEffect(() => {
    if (showSplash) sessionStorage.setItem('parent-calm-splash-shown', '1')
  }, [showSplash])

  const renderPage = () => {
    switch (activeTab) {
      case 'home': return <HomePage onNavigate={setActiveTab} />
      case 'scale': return <ScalePage />
      case 'knowledge': return <KnowledgePage />
      case 'journal': return <JournalPage />
      case 'trends': return <TrendsPage />
      case 'firstaid': return <FirstAidPage onNavigate={setActiveTab} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto bg-parchment">
      {/* Page Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-calm-100 z-50">
        <div className="max-w-lg mx-auto flex justify-around py-2 px-1">
          {TAB_KEYS.map(key => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              aria-label={t(`nav.${key}`)}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all min-w-0 ${
                activeTab === key
                  ? 'text-warm-500 scale-105'
                  : 'text-calm-400 hover:text-calm-600'
              }`}
            >
              <span className="text-xl leading-none">{TAB_ICONS[key]}</span>
              <span className="text-[11px] font-medium leading-tight">{t(`nav.${key}`)}</span>
              {activeTab === key && (
                <span className="w-1 h-1 rounded-full bg-warm-500 mt-0.5" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
    </div>
  )
}

function AppInner() {
  const [onboarded, setOnboarded] = useState<boolean | null>(null)

  useEffect(() => {
    setOnboarded(getOnboarded())
  }, [])

  if (onboarded === null) return <PageLoader />
  if (!onboarded) return <Onboarding onDone={() => setOnboarded(true)} />

  return (
    <>
      <Shell />
      <SWUpdateBanner />
    </>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <ProfileProvider>
        <ErrorBoundary>
          <AppInner />
        </ErrorBoundary>
      </ProfileProvider>
    </I18nProvider>
  )
}
