import { useState, useEffect, useRef, type ChangeEvent } from 'react'
import {
  getProfileName, setProfileName, exportAll, importAll, clearAllData, type Profile,
} from '../utils/storage'
import { useI18n } from '../i18n'

export function ProfileSettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [me, setMe] = useState('')
  const [partner, setPartner] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const { t } = useI18n()

  useEffect(() => {
    if (open) {
      setMe(getProfileName('me'))
      setPartner(getProfileName('partner'))
      setToast(null)
    }
  }, [open])

  if (!open) return null

  const flash = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2600)
  }

  const handleSave = () => {
    const meName = me.trim() || t('profile.placeholderMe')
    const partnerName = partner.trim() || t('profile.placeholderPartner')
    setProfileName('me' as Profile, meName)
    setProfileName('partner' as Profile, partnerName)
    onClose()
  }

  const handleExport = () => {
    const json = exportAll()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `haven-backup-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    flash(t('profile.exportDone'))
  }

  const handleImportClick = () => fileRef.current?.click()
  const handleImportFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const text = await file.text()
      flash(importAll(text) ? t('profile.importDone') : t('profile.importFail'))
    } catch {
      flash(t('profile.importFail'))
    }
  }

  const handleClear = () => {
    if (window.confirm(t('profile.clearConfirm'))) {
      clearAllData()
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/40 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="card-apple w-full max-w-sm mx-4 mb-0 sm:mb-4 rounded-b-none sm:rounded-[18px] max-h-[88vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-ink tracking-apple mb-1">{t('profile.title')}</h3>
        <p className="text-xs text-calm-500 mb-5">{t('profile.sub')}</p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-calm-700 block mb-1.5">{t('profile.me')}</label>
            <input
              value={me}
              onChange={e => setMe(e.target.value)}
              maxLength={8}
              placeholder={t('profile.placeholderMe')}
              className="input-field rounded-full"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-calm-700 block mb-1.5">{t('profile.partner')}</label>
            <input
              value={partner}
              onChange={e => setPartner(e.target.value)}
              maxLength={8}
              placeholder={t('profile.placeholderPartner')}
              className="input-field rounded-full"
            />
          </div>
        </div>

        {/* 数据备份 */}
        <div className="mt-6 pt-4 border-t border-hairline">
          <h4 className="text-sm font-semibold text-ink mb-1">{t('profile.backupTitle')}</h4>
          <p className="text-xs text-calm-500 leading-relaxed mb-3">{t('profile.backupHint')}</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={handleExport} className="btn-ghost border border-hairline text-sm py-2">
              ⬇️ {t('profile.export')}
            </button>
            <button onClick={handleImportClick} className="btn-ghost border border-hairline text-sm py-2">
              ⬆️ {t('profile.import')}
            </button>
          </div>
          <button
            onClick={handleClear}
            className="w-full mt-2 text-xs text-red-500 hover:text-red-600 py-2 rounded-full border border-red-200"
          >
            🗑 {t('profile.clear')}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={handleImportFile}
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="btn-ghost flex-1 border border-hairline">
            {t('profile.cancel')}
          </button>
          <button onClick={handleSave} className="btn-apple flex-1">
            {t('profile.save')}
          </button>
        </div>

        {toast && (
          <div className="mt-3 text-center text-xs text-soft-green-700 bg-soft-green-50 rounded-full py-2">
            {toast}
          </div>
        )}
      </div>
    </div>
  )
}
