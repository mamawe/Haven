import { useState, useEffect } from 'react'
import { HomePage } from './pages/HomePage'
import { ScalePage } from './pages/ScalePage'
import { KnowledgePage } from './pages/KnowledgePage'
import { JournalPage } from './pages/JournalPage'
import { TrendsPage } from './pages/TrendsPage'

type Tab = 'home' | 'scale' | 'knowledge' | 'journal' | 'trends'

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: 'home', label: '首页', icon: '🏠' },
  { key: 'scale', label: '自测', icon: '📋' },
  { key: 'knowledge', label: '知识', icon: '📚' },
  { key: 'journal', label: '记录', icon: '✍️' },
  { key: 'trends', label: '趋势', icon: '📊' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')

  const renderPage = () => {
    switch (activeTab) {
      case 'home': return <HomePage onNavigate={setActiveTab} />
      case 'scale': return <ScalePage />
      case 'knowledge': return <KnowledgePage />
      case 'journal': return <JournalPage />
      case 'trends': return <TrendsPage />
    }
  }

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto bg-calm-50">
      {/* Page Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {renderPage()}
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-calm-100 z-50">
        <div className="max-w-lg mx-auto flex justify-around py-2 px-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all min-w-0 ${
                activeTab === tab.key
                  ? 'text-warm-500 scale-105'
                  : 'text-calm-400 hover:text-calm-600'
              }`}
            >
              <span className="text-xl leading-none">{tab.icon}</span>
              <span className="text-[11px] font-medium leading-tight">{tab.label}</span>
              {activeTab === tab.key && (
                <span className="w-1 h-1 rounded-full bg-warm-500 mt-0.5" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
