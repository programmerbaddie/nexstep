import React, { createContext, useContext, useState } from 'react'
import {
  INITIAL_USER,
  INITIAL_SERVICES,
  INITIAL_ACTION_ITEMS,
} from '../utils/dummyData'
import type {
  UserProfile,
  ConnectedService,
  ActionItem,
  DailyCheckinRecord,
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
}

const NexStepContext = createContext<NexStepContextType | undefined>(undefined)

export const NexStepProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('landing')
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)
  const [user, setUser] = useState<UserProfile>(INITIAL_USER)
  const [services, setServices] = useState<ConnectedService[]>(INITIAL_SERVICES)
  const [actionItems, setActionItems] = useState<ActionItem[]>(INITIAL_ACTION_ITEMS)
  const [todayCheckin, setTodayCheckin] = useState<DailyCheckinRecord | null>({
    date: 'Today',
    energy: 4,
    stress: 2,
    mood: 'calm',
    journalPrompt: 'What one thing would make today feel like a victory?',
    notes: 'Finish Raft lab consensus tests and stretch for 10 minutes.',
    topGoal: 'Complete Raft Lab 2B',
  })

  const updateUser = (fields: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...fields }))
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
