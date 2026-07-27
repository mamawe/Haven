import { useState } from 'react'
import { useI18n } from '../i18n'
import { setProfileName, setBabyBirthday, setBabyStagePref, setOnboarded } from '../utils/storage'
import type { BabyStagePref } from '../utils/storage'

type Role = 'mom' | 'dad' | 'other'
type Stage = 'pre' | 'preg' | 'born' | 'unsure'

const ROLE_NAME: Record<Role, { zh: string; en: string }> = {
  mom: { zh: '妈妈', en: 'Mom' },
  dad: { zh: '爸爸', en: 'Dad' },
  other: { zh: '照护者', en: 'Caregiver' },
}
const STAGE_MAP: Record<Stage, BabyStagePref> = {
  pre: 'prepregnancy',
  preg: 'pregnancy',
  born: 'infant',
  unsure: null,
}

export function Onboarding({ onDone }: { onDone: () => void }) {
  const { t, lang } = useI18n()
  const [step, setStep] = useState(0)
  const [role, setRole] = useState<Role | null>(null)
  const [stage, setStage] = useState<Stage | null>(null)
  const [birthday, setBirthday] = useState('')

  const finish = () => {
    if (role) setProfileName('me', ROLE_NAME[role][lang])
    if (stage) {
      setBabyStagePref(STAGE_MAP[stage] as Exclude<BabyStagePref, null>)
      if (stage === 'born' && birthday) setBabyBirthday(birthday)
    }
    setOnboarded()
    onDone()
  }

  const canNext = step === 0 ? role !== null : stage !== null && (stage !== 'born' || !!birthday)

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">⚓</div>
          <h1 className="text-2xl font-serif text-calm-800">{t('onboard.title')}</h1>
          <p className="text-sm text-calm-500 mt-2">{t('onboard.sub')}</p>
        </div>

        {step === 0 ? (
          <div className="space-y-3">
            <p className="text-sm font-medium text-calm-700">{t('onboard.role')}</p>
            {([
              ['mom', t('onboard.roleMom'), '🤱'],
              ['dad', t('onboard.roleDad'), '🧔'],
              ['other', t('onboard.roleOther'), '🤝'],
            ] as [Role, string, string][]).map(([key, label, icon]) => (
              <button
                key={key}
                onClick={() => setRole(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-[14px] border text-left transition-all ${
                  role === key
                    ? 'border-apple bg-apple/5 text-calm-800'
                    : 'border-hairline bg-white text-calm-600'
                }`}
              >
                <span className="text-xl">{icon}</span>
                <span className="font-medium">{label}</span>
              </button>
            ))}
            <button
              onClick={() => setStep(1)}
              disabled={!canNext}
              className="btn-apple w-full mt-2 disabled:opacity-40"
            >
              {t('onboard.next')}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-medium text-calm-700">{t('onboard.babyStage')}</p>
            {([
              ['pre', t('onboard.stagePre'), '🌱'],
              ['preg', t('onboard.stagePreg'), '🤰'],
              ['born', t('onboard.stageBorn'), '👶'],
              ['unsure', t('onboard.stageUnsure'), '❓'],
            ] as [Stage, string, string][]).map(([key, label, icon]) => (
              <button
                key={key}
                onClick={() => setStage(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-[14px] border text-left transition-all ${
                  stage === key
                    ? 'border-apple bg-apple/5 text-calm-800'
                    : 'border-hairline bg-white text-calm-600'
                }`}
              >
                <span className="text-xl">{icon}</span>
                <span className="font-medium">{label}</span>
              </button>
            ))}

            {stage === 'born' && (
              <input
                type="date"
                value={birthday}
                max={new Date().toISOString().split('T')[0]}
                onChange={e => setBirthday(e.target.value)}
                className="input-field text-sm"
                aria-label={t('onboard.birthday')}
              />
            )}

            <div className="flex gap-3 pt-1">
              <button onClick={() => setStep(0)} className="btn-ghost flex-1 border border-hairline">
                ←
              </button>
              <button onClick={finish} disabled={!canNext} className="btn-apple flex-1 disabled:opacity-40">
                {t('onboard.start')}
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            setOnboarded()
            onDone()
          }}
          className="w-full text-center text-xs text-calm-400 mt-5"
        >
          {t('onboard.skip')}
        </button>
      </div>
    </div>
  )
}
