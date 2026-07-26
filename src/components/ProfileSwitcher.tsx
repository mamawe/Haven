import { useState } from 'react'
import { useProfile } from '../context/ProfileContext'
import { getProfileName, type Profile } from '../utils/storage'
import { useI18n } from '../i18n'
import { ProfileSettingsModal } from './ProfileSettingsModal'

const ORDER: Profile[] = ['me', 'partner']

export function ProfileSwitcher() {
  const { profile, setProfile } = useProfile()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { t } = useI18n()

  return (
    <>
      <div className="flex items-center gap-1.5">
        <div className="flex items-center bg-calm-100 rounded-full p-0.5">
          {ORDER.map(p => {
            const active = profile === p
            return (
              <button
                key={p}
                onClick={() => setProfile(p)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  active
                    ? 'bg-white text-calm-800 shadow-sm'
                    : 'text-calm-500 hover:text-calm-700'
                }`}
              >
                {getProfileName(p)}
              </button>
            )
          })}
        </div>
        <button
          onClick={() => setSettingsOpen(true)}
          aria-label={t('profile.editAria')}
          className="w-7 h-7 rounded-full bg-calm-100 text-calm-500 flex items-center justify-center text-xs hover:bg-calm-200 transition-colors"
        >
          ✎
        </button>
      </div>

      <ProfileSettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  )
}
