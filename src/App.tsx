import React, { useState } from 'react'
import { NexStepProvider, useNexStep } from './hooks/useNexStepContext'
import { Navbar } from './components/layout/Navbar'
import { Sidebar, NAV_ITEMS } from './components/layout/Sidebar'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { ConnectServicesPage } from './pages/ConnectServicesPage'
import { DailyCheckinPage } from './pages/DailyCheckinPage'
import { HomeDashboardPage } from './pages/HomeDashboardPage'
import { CalmModePage } from './pages/CalmModePage'
import { MyNextStepPage } from './pages/MyNextStepPage'
import { DiscoverPage } from './pages/DiscoverPage'
import { CalendarPage } from './pages/CalendarPage'
import { ProfilePage } from './pages/ProfilePage'
import { Layers } from 'lucide-react'

const PageRouter: React.FC = () => {
  const { currentPage } = useNexStep()

  switch (currentPage) {
    case 'landing':
      return <LandingPage />
    case 'login':
      return <LoginPage />
    case 'connect-services':
      return <ConnectServicesPage />
    case 'daily-checkin':
      return <DailyCheckinPage />
    case 'home-dashboard':
      return <HomeDashboardPage />
    case 'calm-mode':
      return <CalmModePage />
    case 'my-next-step':
      return <MyNextStepPage />
    case 'discover':
      return <DiscoverPage />
    case 'calendar':
      return <CalendarPage />
    case 'profile':
      return <ProfilePage />
    default:
      return <HomeDashboardPage />
  }
}

const AppContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { currentPage, setCurrentPage } = useNexStep()

  const isCalm = currentPage === 'calm-mode'

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isCalm ? 'bg-[#F2F8F5]' : 'bg-[#F8FCF9]'
      }`}
    >
      {/* Top Navbar */}
      <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto flex">
        {/* Left Navigation Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <PageRouter />
        </main>
      </div>

      {/* Bottom Floating Quick Demo Switcher (Perfect for Hackathon Judges & Fast Demo) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md border border-[#B9E4C9] shadow-soft-lg px-3 py-2 rounded-full hidden sm:flex items-center gap-1.5 max-w-[95vw] overflow-x-auto">
        <div className="flex items-center gap-1 text-[11px] font-bold text-[#24523C] pr-2 border-r border-[#DCF1E6] shrink-0">
          <Layers className="w-3.5 h-3.5 text-[#58A983]" />
          <span>Demo Pages:</span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto text-[11px]">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                  isActive
                    ? 'bg-[#7EC8A5] text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-[#EAF7F0]'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function App() {
  return (
    <NexStepProvider>
      <AppContent />
    </NexStepProvider>
  )
}

export default App
