import React from 'react'
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  Flame,
  Wind,
  Calendar,
  BookOpen,
  Heart,
  ChevronRight,
  Plus,
} from 'lucide-react'
import { useNexStep } from '../hooks/useNexStepContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { ProgressBar } from '../components/ui/ProgressBar'
import { CALENDAR_EVENTS } from '../utils/dummyData'

export const HomeDashboardPage: React.FC = () => {
  const { user, actionItems, toggleActionItem, todayCheckin, setCurrentPage } = useNexStep()

  const completedCount = actionItems.filter((i) => i.completed).length
  const totalCount = actionItems.length
  const progressPercent = Math.round((completedCount / totalCount) * 100)

  // Primary next step is the first incomplete high-priority item
  const primaryStep = actionItems.find((i) => !i.completed) || actionItems[0]

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Greeting & Quick Vitals Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#3F8766] uppercase tracking-wider">
              Student Dashboard
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">{user.university}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Targeting: <span className="font-semibold text-slate-800">{user.targetRole}</span>
          </p>
        </div>

        {/* Action quick buttons */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="calm"
            size="sm"
            onClick={() => setCurrentPage('calm-mode')}
            icon={<Wind className="w-4 h-4 text-[#3F8766]" />}
          >
            Calm Mode
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setCurrentPage('my-next-step')}
            icon={<Sparkles className="w-4 h-4" />}
          >
            AI Next Step
          </Button>
        </div>
      </div>

      {/* 3 Pillar Quick Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="flat" rounded="2xl" className="p-4 border-[#DCF1E6]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600">Daily Balance</span>
            <Badge variant="primary" size="sm">Optimal</Badge>
          </div>
          <ProgressBar
            value={progressPercent}
            label={`${completedCount} of ${totalCount} Done`}
            sublabel={`${progressPercent}%`}
          />
        </Card>

        <Card variant="flat" rounded="2xl" className="p-4 border-[#DCF1E6]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-600">Consistency Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <p className="text-xl font-extrabold text-slate-800">{user.streakDays} Days</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Top 5% among CS peers</p>
        </Card>

        <Card variant="flat" rounded="2xl" className="p-4 border-[#DCF1E6]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-600">Academic Pacing</span>
            <BookOpen className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-xl font-extrabold text-slate-800">4 Active Courses</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Lab 2B due tomorrow</p>
        </Card>

        <Card
          variant="flat"
          rounded="2xl"
          className="p-4 border-[#DCF1E6] cursor-pointer hover:border-[#7EC8A5] transition-colors"
          onClick={() => setCurrentPage('daily-checkin')}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-600">Wellbeing State</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          </div>
          <p className="text-xl font-extrabold text-slate-800 capitalize">
            {todayCheckin ? todayCheckin.mood : 'Not Logged'}
          </p>
          <p className="text-[11px] text-[#438D6C] font-medium mt-0.5 flex items-center gap-1">
            <span>Tap to adjust check-in</span>
            <ChevronRight className="w-3 h-3" />
          </p>
        </Card>
      </div>

      {/* Hero "My Next Step" AI Recommendation Card */}
      {primaryStep && (
        <Card
          variant="accent"
          rounded="3xl"
          className="p-6 md:p-8 border-2 border-[#B9E4C9] shadow-soft relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary" size="md">
                  <Sparkles className="w-3 h-3" /> Recommended Right Now
                </Badge>
                <Badge
                  variant={
                    primaryStep.category === 'academic'
                      ? 'academic'
                      : primaryStep.category === 'career'
                      ? 'career'
                      : 'wellbeing'
                  }
                  size="sm"
                >
                  {primaryStep.category}
                </Badge>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> ~{primaryStep.estimatedMinutes} mins
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {primaryStep.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 bg-white/70 p-3 rounded-2xl border border-[#D5EAE0]">
                <strong className="text-slate-800 font-semibold">Why this step:</strong> {primaryStep.aiReasoning}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
              <Button
                variant="primary"
                size="md"
                onClick={() => toggleActionItem(primaryStep.id)}
                icon={primaryStep.completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                className="shadow-soft"
              >
                {primaryStep.completed ? 'Mark Incomplete' : 'Complete Step'}
              </Button>
              <Button
                variant="soft"
                size="md"
                onClick={() => setCurrentPage('my-next-step')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Full Next Step Plan
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Main Grid: Action Plan + Schedule Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Balanced Action Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Today's Balanced Actions</h3>
              <p className="text-xs text-slate-500">
                Sorted by mental energy required & deadlines
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage('my-next-step')}
              icon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Item
            </Button>
          </div>

          <div className="space-y-2.5">
            {actionItems.map((item) => {
              const isChecked = item.completed
              return (
                <div
                  key={item.id}
                  onClick={() => toggleActionItem(item.id)}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-[#F2FAF6]/70 border-[#DCF1E6] opacity-70'
                      : 'bg-white border-[#E4F2EB] hover:border-[#7EC8A5] shadow-card hover:shadow-soft'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 text-slate-400 hover:text-[#5BAE87] transition-colors"
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-[#58A983] fill-[#E4F5ED]" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`text-sm font-semibold truncate ${
                          isChecked ? 'line-through text-slate-400' : 'text-slate-800'
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
                      <span>{item.estimatedMinutes}m</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Col: Today's Schedule & Calm Quick Launcher */}
        <div className="space-y-6">
          {/* Today's Schedule Snapshot */}
          <Card rounded="3xl" className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                Schedule Snapshot
              </h4>
              <button
                onClick={() => setCurrentPage('calendar')}
                className="text-xs font-semibold text-[#438D6C] hover:underline"
              >
                View Full
              </button>
            </div>

            <div className="space-y-3">
              {CALENDAR_EVENTS.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-2xl bg-[#F8FCF9] border border-[#E4F2EB] text-xs space-y-1"
                >
                  <div className="flex justify-between font-semibold text-slate-800">
                    <span className="truncate">{event.title}</span>
                    <span className="text-slate-500 font-normal shrink-0">{event.duration}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex justify-between">
                    <span>{event.time}</span>
                    <span className="text-slate-400">{event.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Calm Mode Quick Promo Card */}
          <Card
            variant="accent"
            rounded="3xl"
            className="p-5 text-center space-y-3 border-[#B9E4C9]"
          >
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#B9E4C9] flex items-center justify-center mx-auto text-[#2D5443] shadow-card">
              <Wind className="w-5 h-5 text-[#58A983]" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Need a 3-Minute Breathing Break?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Step back from compiler errors and recalibrate your nervous system.
            </p>
            <Button
              variant="calm"
              size="sm"
              className="w-full justify-center"
              onClick={() => setCurrentPage('calm-mode')}
            >
              Open Calm Space
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
