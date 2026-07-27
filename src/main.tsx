import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { applyStoredTheme, migrateProfiles } from './utils/storage'
import { initReminder } from './utils/reminder'
import './index.css'

migrateProfiles()
applyStoredTheme()
initReminder()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// ============ Service Worker 注册（PWA 离线 + 更新提示）============
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* 注册失败不影响主功能 */
    })

    // 监听新版本：安装完成后若已有旧 worker 在控制，则提示更新
    navigator.serviceWorker.addEventListener('message', () => {})
    const onUpdate = () => window.dispatchEvent(new CustomEvent('app-update'))
    navigator.serviceWorker.getRegistration().then(reg => {
      if (!reg) return
      reg.addEventListener('updatefound', () => {
        const installing = reg.installing
        if (!installing) return
        installing.addEventListener('statechange', () => {
          if (installing.state === 'installed' && navigator.serviceWorker.controller) {
            onUpdate()
          }
        })
      })
    })
  })
}
