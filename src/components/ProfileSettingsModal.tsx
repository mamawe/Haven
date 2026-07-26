import { useState, useEffect } from 'react'
import { getProfileName, setProfileName, type Profile } from '../utils/storage'
import { useI18n } from '../i18n'

export function ProfileSettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [me, setMe] = useState('')
  const [partner, setPartner] = useState('')
  const { t } = useI18n()

  useEffect(() => {
    if (open) {
      setMe(getProfileName('me'))
      setPartner(getProfileName('partner'))
    }
  }, [open])

  if (!open) return null

  const handleSave = () => {
    const meName = me.trim() || t('profile.placeholderMe')
    const partnerName = partner.trim() || t('profile.placeholderPartner')
    setProfileName('me' as Profile, meName)
    setProfileName('partner' as Profile, partnerName)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/40 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="card-apple w-full max-w-sm mx-4 mb-0 sm:mb-4 rounded-b-none sm:rounded-[18px]"
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

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="btn-ghost flex-1 border border-hairline">
            {t('profile.cancel')}
          </button>
          <button onClick={handleSave} className="btn-apple flex-1">
            {t('profile.save')}
          </button>
        </div>
      </div>
    </div>
  )
}
