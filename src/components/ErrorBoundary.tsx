import { Component, type ReactNode } from 'react'
import { useI18n } from '../i18n'

interface Props {
  children: ReactNode
}
interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    // 本地兜底：不依赖外部服务，避免隐私数据外泄
    console.error('[Haven] 渲染错误已捕获：', error)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onReload={() => this.setState({ hasError: false })} />
    }
    return this.props.children
  }
}

function ErrorFallback({ onReload }: { onReload: () => void }) {
  // 用函数组件以便使用 hook
  return <ErrorFallbackInner onReload={onReload} />
}

function ErrorFallbackInner({ onReload }: { onReload: () => void }) {
  const { t } = useI18n()
  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment px-6">
      <div className="card text-center max-w-sm w-full">
        <div className="text-4xl mb-3">🌿</div>
        <h2 className="text-lg font-semibold text-calm-800 mb-2">{t('error.title')}</h2>
        <p className="text-sm text-calm-500 mb-5 leading-relaxed">{t('error.sub')}</p>
        <button
          onClick={() => {
            onReload()
            window.location.reload()
          }}
          className="btn-apple w-full"
        >
          {t('error.reload')}
        </button>
      </div>
    </div>
  )
}
