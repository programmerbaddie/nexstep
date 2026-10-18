import React, { useState } from 'react'
import {
  Zap,
  Target,
  Clock,
  CheckCircle2,
  Circle,
  ChevronRight,
  Filter,
} from 'lucide-react'
import { useNexStep } from '../hooks/useNexStepContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { ProgressBar } from '../components/ui/ProgressBar'

export const TodaysCompassPage: React.FC = () => {
  const {
    user,
    currentCompanion,
    compassMode,
    setCompassMode,
    actionItems,
    toggleActionItem,
    todayCheckin,
    setCurrentPage,
  } = useNexStep()

  const [activeSprintTimer, setActiveSprintTimer] = useState<boolean>(false)
  const isPrioritized = compassMode === 'prioritized'

  // If in prioritized mode, strictly filter down to top 3 critical tasks
  const displayedItems = isPrioritized
    ? actionItems.filter((i) => i.priority === 'high' || !i.completed).slice(0, 3)
    : actionItems

  const completedCount = displayedItems.filter((i) => i.completed).length
  const progressPercent = Math.round((completedCount / displayedItems.length) * 100) || 0

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Top Banner: Dynamic Adaptive Explanation */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-[#F2FAF6] via-white to-[#EAF7F0] border-2 border-[#B9E4C9] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-soft">
        <div className="flex items-center gap-3.5">
          <div
            className={`w-12 h-12 rounded-2xl ${currentCompanion.avatarBg} border ${currentCompanion.avatarBorder} flex items-center justify-center text-3xl shadow-sm shrink-0`}
          >
            {currentCompanion.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-bold text-[#24523C] uppercase tracking-wider">
                Today's Compass · {isPrioritized ? 'Decluttered Focus Mode' : 'High Momentum Mode'}
              </span>
              <Badge variant="primary" size="sm">
                {user.companionCustomName || currentCompanion.name}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-snug">
              {isPrioritized
                ? `"You reported feeling busy with ${todayCheckin?.attention || 'Assignments'}. I trimmed your plan to the Top 3 critical levers so you don't get sidetracked."`
                : `"You're feeling great today! High energy is the best time for uninterrupted deep work on ${todayCheckin?.attention || 'coursework'}."`}
            </p>
          </div>
        </div>

        {/* Mode Toggle Button */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant={isPrioritized ? 'primary' : 'outline'}
            onClick={() => setCompassMode(isPrioritized ? 'standard' : 'prioritized')}
            icon={<Filter className="w-3.5 h-3.5" />}
            className="rounded-xl text-xs font-semibold"
          >
            {isPrioritized ? 'Showing Top 3' : 'Filter Top 3'}
          </Button>
        </div>
      </div>

      {/* Hero Compass Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Sprint Mission */}
        <div className="md:col-span-2 space-y-4">
          <Card rounded="3xl" className="p-6 bg-white border-[#E2EFE7] space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#58A983]" />
                  {isPrioritized ? 'Essential Priority Queue' : "Today's Achievement Radar"}
                </h2>
                <p className="text-xs text-slate-500">
                  Focus attention: <strong className="text-slate-800">{todayCheckin?.attention || 'Assignments'}</strong>
                </p>
              </div>

              <Badge variant={isPrioritized ? 'urgent' : 'career'}>
                {isPrioritized ? 'Strict 3-Task Limit' : 'Full Bandwidth'}
              </Badge>
            </div>

            <ProgressBar
              value={progressPercent}
              label={`${completedCount} of ${displayedItems.length} Milestones Achieved`}
              sublabel={`${progressPercent}% Finished`}
            />

            {/* Task Item Cards */}
            <div className="space-y-2.5 pt-2">
              {displayedItems.map((item, idx) => {
                const isDone = item.completed

                return (
                  <div
                    key={item.id}
                    onClick={() => toggleActionItem(item.id)}
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                      isDone
                        ? 'bg-[#F2FAF6]/70 border-[#DCF1E6] opacity-70'
                        : 'bg-white border-[#E4F2EB] hover:border-[#7EC8A5] shadow-card hover:shadow-soft'
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 text-slate-400 hover:text-[#5BAE87] transition-colors"
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-[#58A983] fill-[#E4F5ED]" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold text-slate-400">#{idx + 1}</span>
                        <span
                          className={`text-sm font-semibold truncate ${
                            isDone ? 'line-through text-slate-400' : 'text-slate-800'
                          }`}
                        >
                          {item.title}
                        </span>
                        <Badge
                          variant={
                            item.category === 'academic'
                              ? 'academic'
                              : item.category === 'career'
                              ? 'career'
                              : 'wellbeing'
                          }
                          size="sm"
                        >
                          {item.category}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        {item.courseOrCompany && <span>{item.courseOrCompany}</span>}
                        <span>•</span>
                        <span>{item.dueText}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" /> {item.estimatedMinutes}m
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Right Col: Deep Work Sprint Launcher & Momentum */}
        <div className="space-y-6">
          {/* Deep Work Sprint Card */}
          <Card
            variant="accent"
            rounded="3xl"
            className="p-6 border-2 border-[#B9E4C9] space-y-4 text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#B9E4C9] flex items-center justify-center mx-auto text-[#2D5443] shadow-card">
              <Zap className="w-6 h-6 text-[#58A983]" />
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-slate-900 text-base">25m Focus Sprint</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero distractions. Complete the next milestone with focused momentum.
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => setActiveSprintTimer(!activeSprintTimer)}
              className="w-full justify-center rounded-2xl shadow-soft font-bold"
            >
              {activeSprintTimer ? 'Sprint In Progress (24:18)' : 'Begin 25m Sprint'}
            </Button>
          </Card>

          {/* Quick Return to Dashboard */}
          <Card rounded="3xl" className="p-5 bg-white border-[#E2EFE7] space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Need other spaces?</h4>
            <div className="space-y-2">
              <button
                onClick={() => setCurrentPage('home-dashboard')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F2FAF6] text-xs font-semibold text-slate-700 transition-colors"
              >
                <span>Return to Home Dashboard</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => setCurrentPage('my-next-step')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F2FAF6] text-xs font-semibold text-slate-700 transition-colors"
              >
                <span>Break Down In My Next Step</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
