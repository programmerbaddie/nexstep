import React from 'react'
import {
  Sparkles,
  Flame,
  Wind,
  Bell,
  CheckCircle2,
  Menu,
  ChevronDown,
  RotateCcw,
} from 'lucide-react'
import { useNexStep } from '../../hooks/useNexStepContext'
import { Button } from '../ui/Button'

interface NavbarProps {
  onToggleSidebar?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { currentPage, setCurrentPage, user, currentCompanion, todayCheckin, resetOnboarding } = useNexStep()

  const isCalm = currentPage === 'calm-mode' || currentPage === 'reset-screen'

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8FCF9]/90 backdrop-blur-md border-b border-[#E2EFE7] px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-600 hover:text-slate-900 lg:hidden rounded-xl hover:bg-[#EAF7F0]"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={() => setCurrentPage('home-dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#7EC8A5] to-[#B9E4C9] flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-800">
                Nex<span className="text-[#5BAE87]">Step</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#EAF7F0] text-[#2D5443] border border-[#CBEBDC]">
                CS Companion
              </span>
            </div>
          </div>
        </div>

        {/* Center: Companion & Student Status Pill */}
        <div className="hidden md:flex items-center gap-2 bg-white/80 border border-[#D8ECE0] rounded-full px-3.5 py-1.5 shadow-card text-xs">
          {/* Active Companion Pill */}
          <div className="flex items-center gap-1.5 font-bold text-slate-800 pr-1">
            <span className="text-sm">{currentCompanion.emoji}</span>
            <span>{user.companionCustomName || currentCompanion.name}</span>
          </div>

          <span className="text-slate-300">|</span>

          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{user.streakDays}d Streak</span>
          </div>

          {todayCheckin && (
            <>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold capitalize">
                <CheckCircle2 className="w-3.5 h-3.5" /> {todayCheckin.feeling}
              </span>
            </>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Reset Onboarding / Replay Onboarding Button (Great for Judges & Testing) */}
          <button
            onClick={resetOnboarding}
            title="Replay First-Time Onboarding Experience"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-900 px-2.5 py-1.5 rounded-full hover:bg-[#EAF7F0] border border-transparent hover:border-[#D5EAE0] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Onboarding Demo</span>
          </button>

          {/* Calm Mode Direct Button */}
          <Button
            variant={isCalm ? 'primary' : 'calm'}
            size="sm"
            onClick={() => setCurrentPage(isCalm ? 'home-dashboard' : 'calm-mode')}
            icon={<Wind className="w-4 h-4 text-[#2D5443]" />}
            className="rounded-full shadow-sm text-xs"
          >
            <span className="hidden sm:inline">{isCalm ? 'Exit Calm' : 'Calm Mode'}</span>
          </Button>

          {/* Notification Indicator */}
          <div className="relative">
            <button
              onClick={() => setCurrentPage('my-next-step')}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-[#EAF7F0] border border-transparent hover:border-[#D5EAE0] transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7EC8A5] rounded-full ring-2 ring-white" />
          </div>

          {/* User Profile Pill */}
          <button
            onClick={() => setCurrentPage('profile')}
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-white border border-[#D5EAE0] hover:border-[#7EC8A5] shadow-card transition-all"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-[#7EC8A5]"
            />
            <span className="hidden md:inline text-xs font-medium text-slate-700 truncate max-w-[90px]">
              {user.name.split(' ')[0]}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 hidden md:block" />
          </button>
        </div>
      </div>
    </header>
  )
}
