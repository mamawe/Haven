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
