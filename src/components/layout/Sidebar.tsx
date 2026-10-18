import React from 'react'
import {
  LayoutDashboard,
  Sparkles,
  Compass,
  CalendarDays,
  HeartHandshake,
  User,
  Radio,
  LogIn,
  Home,
  CheckCircle,
  X,
  Footprints,
} from 'lucide-react'
import { useNexStep } from '../../hooks/useNexStepContext'
import type { PageId } from '../../hooks/useNexStepContext'
import { cn } from '../../utils/cn'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface NavItem {
  id: PageId
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  section?: string
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'landing', label: 'Landing Page', icon: Home, section: 'Welcome' },
  { id: 'login', label: 'Login / Auth', icon: LogIn, section: 'Welcome' },
  { id: 'home-dashboard', label: 'Home Dashboard', icon: LayoutDashboard, section: 'Core Companion' },
  { id: 'my-next-step', label: 'My Next Step', icon: Footprints, badge: 'AI', section: 'Core Companion' },
  { id: 'daily-checkin', label: 'Daily Check-in', icon: CheckCircle, badge: 'Daily', section: 'Core Companion' },
  { id: 'calm-mode', label: 'Calm Mode', icon: HeartHandshake, badge: 'Zen', section: 'Wellbeing' },
  { id: 'discover', label: 'Discover', icon: Compass, section: 'Career & Growth' },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, section: 'Academic Planning' },
  { id: 'connect-services', label: 'Connect Services', icon: Radio, section: 'Integrations' },
  { id: 'profile', label: 'Profile', icon: User, section: 'Settings' },
]

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentPage, setCurrentPage } = useNexStep()

  const handleNav = (id: PageId) => {
    setCurrentPage(id)
    onClose()
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 lg:top-[61px] left-0 z-50 lg:z-30 h-screen lg:h-[calc(100vh-61px)] w-64 bg-white/95 lg:bg-[#F8FCF9]/80 backdrop-blur-md border-r border-[#E2EFE7] p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Mobile Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#EAF7F0] lg:hidden">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#7EC8A5] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-slate-900" />
              </div>
              <span className="font-bold text-slate-800">NexStep Navigation</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-[#EAF7F0]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Demo Switcher Title */}
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3">
            Companion Spaces
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={cn(
                    'w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all group',
                    isActive
                      ? 'bg-[#E4F5ED] text-[#24523C] font-semibold shadow-xs border border-[#B9E4C9]'
                      : 'text-slate-600 hover:bg-[#F0FAF4] hover:text-slate-900'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        'w-4 h-4 transition-transform group-hover:scale-110',
                        isActive ? 'text-[#3E8B67]' : 'text-slate-400 group-hover:text-slate-600'
                      )}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={cn(
                        'text-[10px] font-semibold px-2 py-0.5 rounded-full',
                        isActive
                          ? 'bg-[#7EC8A5] text-slate-900'
                          : 'bg-[#EBF5EF] text-[#2D5443]'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Bottom Gentle Nudge */}
        <div className="pt-4 border-t border-[#EAF7F0]">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#F2FAF6] to-[#E5F5EC] border border-[#CBEBDC]">
            <p className="text-[11px] font-semibold text-[#2D5443] flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#7EC8A5]" />
              Gentle Reminder
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Progress in tech is a marathon, not a sprint. Step away when you feel blocked.
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
