import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  INITIAL_USER,
  INITIAL_SERVICES,
  INITIAL_ACTION_ITEMS,
  COMPANIONS,
} from '../utils/dummyData'
import type {
  UserProfile,
  ConnectedService,
  ActionItem,
  DailyCheckinRecord,
  Companion,
} from '../utils/dummyData'

export type PageId =
  | 'landing'
  | 'login'
  | 'connect-services'
  | 'daily-checkin'
  | 'home-dashboard'
  | 'calm-mode'
  | 'my-next-step'
  | 'discover'
  | 'calendar'
  | 'profile'
  | 'todays-compass'
  | 'reset-screen'

export type CompassMode = 'standard' | 'prioritized'
export type ResetMode = 'overwhelmed' | 'exhausted'

interface NexStepContextType {
  currentPage: PageId
  setCurrentPage: (page: PageId) => void
  user: UserProfile
  updateUser: (fields: Partial<UserProfile>) => void
  services: ConnectedService[]
  toggleServiceConnection: (serviceId: string) => void
  actionItems: ActionItem[]
  toggleActionItem: (id: string) => void
  addActionItem: (item: Omit<ActionItem, 'id'>) => void
  todayCheckin: DailyCheckinRecord | null
  saveDailyCheckin: (checkin: DailyCheckinRecord) => void
  isLoggedIn: boolean
  setIsLoggedIn: (val: boolean) => void
  // Onboarding state
  isOnboardingCompleted: boolean
  completeOnboarding: (companionId?: string, customName?: string) => void
  resetOnboarding: () => void
  // Active companion
  currentCompanion: Companion
  setCompanion: (companionId: string, customName?: string) => void
  // Adaptive modes
  compassMode: CompassMode
  setCompassMode: (mode: CompassMode) => void
  resetMode: ResetMode
  setResetMode: (mode: ResetMode) => void
}

const NexStepContext = createContext<NexStepContextType | undefined>(undefined)

const ONBOARDING_STORAGE_KEY = 'nexstep_onboarding_completed'
const USER_STORAGE_KEY = 'nexstep_user_profile'

export const NexStepProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read onboarding status from local storage
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  // Start directly on home-dashboard if returning user, or landing/onboarding if new
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    try {
      const isCompleted = localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'true'
      return isCompleted ? 'home-dashboard' : 'landing'
    } catch {
      return 'landing'
    }
  })

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch {
      // ignore
    }
    return INITIAL_USER
  })

  const [services, setServices] = useState<ConnectedService[]>(INITIAL_SERVICES)
  const [actionItems, setActionItems] = useState<ActionItem[]>(INITIAL_ACTION_ITEMS)
  
  const [todayCheckin, setTodayCheckin] = useState<DailyCheckinRecord | null>({
    date: 'Today',
    feeling: 'busy',
    attention: 'Assignments',
    energy: 4,
    stress: 2,
    mood: 'calm',
    notes: 'Finish Raft lab consensus tests and prepare for algorithms recitation.',
    topGoal: 'Complete Raft Lab 2B',
  })

  const [compassMode, setCompassMode] = useState<CompassMode>('standard')
  const [resetMode, setResetMode] = useState<ResetMode>('overwhelmed')

  // Find companion info
  const currentCompanion =
    COMPANIONS.find((c) => c.id === user.chosenCompanion) || COMPANIONS[0]

  // Persist user changes
  useEffect(() => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    } catch {
      // ignore
    }
  }, [user])

  const updateUser = (fields: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...fields }))
  }

  const setCompanion = (companionId: string, customName?: string) => {
    const comp = COMPANIONS.find((c) => c.id === companionId)
    const name = customName?.trim() || comp?.name || 'Nova'
    updateUser({
      chosenCompanion: companionId,
      companionCustomName: name,
    })
  }

  const completeOnboarding = (companionId?: string, customName?: string) => {
    if (companionId) {
      setCompanion(companionId, customName)
    }
    setIsOnboardingCompleted(true)
    try {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true')
    } catch {
      // ignore
    }
    setCurrentPage('home-dashboard')
  }

  const resetOnboarding = () => {
    setIsOnboardingCompleted(false)
    try {
      localStorage.removeItem(ONBOARDING_STORAGE_KEY)
    } catch {
      // ignore
    }
    setCurrentPage('landing')
  }

  const toggleServiceConnection = (serviceId: string) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          const nextStatus = s.status === 'connected' ? 'disconnected' : 'connected'
          return {
            ...s,
            status: nextStatus,
            lastSync: nextStatus === 'connected' ? 'Just now' : undefined,
          }
        }
        return s
      })
    )
  }

  const toggleActionItem = (id: string) => {
    setActionItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const addActionItem = (item: Omit<ActionItem, 'id'>) => {
    const newItem: ActionItem = {
      ...item,
      id: `act-${Date.now()}`,
    }
    setActionItems((prev) => [newItem, ...prev])
  }

  const saveDailyCheckin = (checkin: DailyCheckinRecord) => {
    setTodayCheckin(checkin)
  }

  return (
    <NexStepContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        user,
        updateUser,
        services,
        toggleServiceConnection,
        actionItems,
        toggleActionItem,
        addActionItem,
        todayCheckin,
        saveDailyCheckin,
        isLoggedIn,
        setIsLoggedIn,
        isOnboardingCompleted,
        completeOnboarding,
        resetOnboarding,
        currentCompanion,
        setCompanion,
        compassMode,
        setCompassMode,
        resetMode,
        setResetMode,
      }}
    >
      {children}
    </NexStepContext.Provider>
  )
}

export const useNexStep = () => {
  const context = useContext(NexStepContext)
  if (!context) {
    throw new Error('useNexStep must be used within a NexStepProvider')
  }
  return context
}
