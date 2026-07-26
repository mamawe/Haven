import { createContext, useContext, useState, type ReactNode } from 'react'
import {
  getCurrentProfile, setCurrentProfile, getProfileName,
  type Profile,
} from '../utils/storage'

interface ProfileCtx {
  profile: Profile
  profileName: string
  setProfile: (p: Profile) => void
}

const Ctx = createContext<ProfileCtx | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<Profile>(() => getCurrentProfile())

  const setProfile = (p: Profile) => {
    setCurrentProfile(p)
    setProfileState(p)
  }

  const profileName = getProfileName(profile)

  return (
    <Ctx.Provider value={{ profile, profileName, setProfile }}>
      {children}
    </Ctx.Provider>
  )
}

export function useProfile(): ProfileCtx {
  const c = useContext(Ctx)
  if (!c) throw new Error('useProfile 必须在 ProfileProvider 内使用')
  return c
}
