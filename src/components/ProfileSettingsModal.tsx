import { useState, useEffect } from 'react'
import { getProfileName, setProfileName, type Profile } from '../utils/storage'

export function ProfileSettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [me, setMe] = useState('')
  const [partner, setPartner] = useState('')

  useEffect(() => {
    if (open) {
      setMe(getProfileName('me'))
      setPartner(getProfileName('partner'))
    }
  }, [open])

  if (!open) return null

  const handleSave = () => {
    const meName = me.trim() || '我'
    const partnerName = partner.trim() || '伴侣'
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
        <h3 className="text-lg font-semibold text-ink tracking-apple mb-1">档案称呼</h3>
        <p className="text-xs text-calm-500 mb-5">给两个视角起个你喜欢的名字</p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-calm-700 block mb-1.5">我的视角</label>
            <input
              value={me}
              onChange={e => setMe(e.target.value)}
              maxLength={8}
              placeholder="我"
              className="input-field rounded-full"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-calm-700 block mb-1.5">伴侣的视角</label>
            <input
              value={partner}
              onChange={e => setPartner(e.target.value)}
              maxLength={8}
              placeholder="伴侣"
              className="input-field rounded-full"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="btn-ghost flex-1 border border-hairline">
            取消
          </button>
          <button onClick={handleSave} className="btn-apple flex-1">
            保存
          </button>
        </div>
      </div>
    </div>
  )
}
