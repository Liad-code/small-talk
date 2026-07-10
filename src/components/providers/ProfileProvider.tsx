'use client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { pullProgress, setSyncEnabled, type ActiveChildInfo } from '@/lib/progressSync'

interface ProfileContextValue {
  child: ActiveChildInfo | null
  loading: boolean
  refresh: () => Promise<void>
}

const ProfileContext = createContext<ProfileContextValue>({ child: null, loading: true, refresh: async () => {} })

export function useActiveProfile() {
  return useContext(ProfileContext)
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const [child, setChild] = useState<ActiveChildInfo | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    if (status !== 'authenticated') {
      setChild(null)
      setSyncEnabled(false)
      setLoading(false)
      return
    }
    const active = await pullProgress()
    setChild(active)
    setSyncEnabled(!!active)
    setLoading(false)
  }, [status])

  useEffect(() => {
    if (status === 'loading') return
    refresh()
  }, [status, refresh])

  return <ProfileContext.Provider value={{ child, loading, refresh }}>{children}</ProfileContext.Provider>
}
