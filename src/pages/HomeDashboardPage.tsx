import React, { useState } from 'react'
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  Flame,
  Wind,
  Calendar as CalendarIcon,
  BookOpen,
  Plus,
  Compass,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { useNexStep } from '../hooks/useNexStepContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { ProgressBar } from '../components/ui/ProgressBar'
import { CALENDAR_EVENTS } from '../utils/dummyData'

type FeelingOption = 'great' | 'busy' | 'overwhelmed' | 'exhausted' | 'lost'
type AttentionOption = 'Exams' | 'Assignments' | 'Internship' | 'Hackathon' | 'Personal'

export const HomeDashboardPage: React.FC = () => {
  const {
    user,
    currentCompanion,
    actionItems,
    toggleActionItem,
    todayCheckin,
    saveDailyCheckin,
    setCurrentPage,
    setCompassMode,
    setResetMode,
  } = useNexStep()

  // Embedded Check-in State
  const [selectedFeeling, setSelectedFeeling] = useState<FeelingOption>(
    todayCheckin?.feeling || 'busy'
  )
  const [selectedAttention, setSelectedAttention] = useState<AttentionOption>(
    todayCheckin?.attention || 'Assignments'
  )
  const [checkinSubmitted, setCheckinSubmitted] = useState<boolean>(false)

  // Dynamic greeting based on current local hour
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'Good Morning'
    if (hour >= 12 && hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  // Today's formatted date
  const getFormattedDate = () => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date())
  }

  // Handle adaptive check-in submission
  const handleCheckinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    saveDailyCheckin({
      date: 'Today',
      feeling: selectedFeeling,
      attention: selectedAttention,
      energy: selectedFeeling === 'great' ? 5 : selectedFeeling === 'busy' ? 4 : selectedFeeling === 'exhausted' ? 1 : 2,
      stress: selectedFeeling === 'overwhelmed' ? 5 : selectedFeeling === 'busy' ? 3 : 1,
      mood: selectedFeeling === 'great' ? 'energized' : selectedFeeling === 'busy' ? 'calm' : selectedFeeling === 'overwhelmed' ? 'overwhelmed' : 'tired',
      topGoal: `Focus on ${selectedAttention}`,
    })

    setCheckinSubmitted(true)

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#7EC8A5', '#B9E4C9', '#FCE79A', '#A5D8F3'],
      })
    } catch {
      // ignore
    }

    // Adaptive navigation dispatch
    setTimeout(() => {
      switch (selectedFeeling) {
        case 'great':
          setCompassMode('standard')
          setCurrentPage('todays-compass')
          break
        case 'busy':
          setCompassMode('prioritized')
          setCurrentPage('todays-compass')
          break
        case 'overwhelmed':
          setResetMode('overwhelmed')
          setCurrentPage('reset-screen')
          break
        case 'exhausted':
          setResetMode('exhausted')
          setCurrentPage('reset-screen')
          break
        case 'lost':
          setCurrentPage('my-next-step')
          break
        default:
          setCurrentPage('todays-compass')
      }
    }, 600)
  }

  const completedCount = actionItems.filter((i) => i.completed).length
  const totalCount = actionItems.length
  const progressPercent = Math.round((completedCount / totalCount) * 100)
  const primaryStep = actionItems.find((i) => !i.completed) || actionItems[0]

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Top Header: Dynamic Greeting, Date, & Companion */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#EAF7F0]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#3F8766]">
            <span>{getFormattedDate()}</span>
            <span>•</span>
            <span>{user.university}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {getGreeting()}, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Targeting: <span className="font-semibold text-slate-700">{user.targetRole}</span>
          </p>
        </div>

        {/* Selected Companion Badge */}
        <div className="flex items-center gap-3 p-2.5 px-4 rounded-2xl bg-white border border-[#B9E4C9] shadow-card">
          <div
            className={`w-10 h-10 rounded-xl ${currentCompanion.avatarBg} border ${currentCompanion.avatarBorder} flex items-center justify-center text-2xl shadow-xs`}
          >
            {currentCompanion.emoji}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-extrabold text-slate-800">
                {user.companionCustomName || currentCompanion.name}
              </span>
              <span className="text-sm">{currentCompanion.emoji}</span>
            </div>
            <p className="text-[11px] text-[#438D6C] font-semibold">{currentCompanion.tagline}</p>
          </div>
        </div>
      </div>

      {/* EMBEDDED DAILY CHECK-IN SECTION (Directly on Home Screen) */}
      <Card
        rounded="3xl"
        className="p-6 sm:p-8 border-2 border-[#B9E4C9] bg-gradient-to-br from-white via-[#F8FCF9] to-[#EAF7F0] shadow-soft space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7EC8A5] flex items-center justify-center text-slate-900 shadow-soft shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Badge variant="primary" size="sm">
                  Daily Check-in
                </Badge>
                <span className="text-xs text-slate-500 font-medium">90-Second Adaptive Calibration</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Companion Pulse with {user.companionCustomName || currentCompanion.name} {currentCompanion.emoji}
              </h2>
            </div>
          </div>

          {todayCheckin && (
            <span className="text-xs text-[#24523C] bg-[#E4F5ED] px-3 py-1 rounded-full border border-[#B9E4C9] self-start sm:self-auto font-medium">
              Active: {todayCheckin.feeling} · {todayCheckin.attention}
            </span>
          )}
        </div>

        {/* Question 1: How are you feeling today? */}
        <div className="space-y-3">
          <label className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide block">
            1. "How are you feeling today?"
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { id: 'great', label: 'Great', emoji: '😊', desc: 'Ready to build' },
              { id: 'busy', label: 'Busy', emoji: '🙂', desc: 'Full schedule' },
              { id: 'overwhelmed', label: 'Overwhelmed', emoji: '😣', desc: 'Need pause' },
              { id: 'exhausted', label: 'Exhausted', emoji: '😴', desc: 'Low battery' },
              { id: 'lost', label: "I don't know where to start", emoji: '🤯', desc: 'Need micro-step' },
            ].map((opt) => {
              const isSelected = selectedFeeling === opt.id

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedFeeling(opt.id as FeelingOption)}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                    isSelected
                      ? 'bg-[#7EC8A5] text-slate-900 font-bold border-[#5BAE87] shadow-soft scale-[1.02]'
                      : 'bg-white border-[#E2EFE7] hover:border-[#B9E4C9] hover:bg-[#F2FAF6] text-slate-700'
                  }`}
                >
                  <span className="text-2xl mb-1">{opt.emoji}</span>
                  <span className="text-xs font-bold leading-tight">{opt.label}</span>
                  <span className="text-[10px] opacity-75 mt-0.5">{opt.desc}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Question 2: What is taking most of your attention today? */}
        <div className="space-y-3">
          <label className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide block">
            2. "What is taking most of your attention today?"
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {(['Exams', 'Assignments', 'Internship', 'Hackathon', 'Personal'] as const).map(
              (att) => {
                const isSelected = selectedAttention === att

                return (
                  <button
                    key={att}
                    type="button"
                    onClick={() => setSelectedAttention(att)}
                    className={`py-3 px-3 rounded-2xl border text-center font-semibold text-xs transition-all ${
                      isSelected
                        ? 'bg-[#E4F5ED] text-[#24523C] border-[#7EC8A5] ring-2 ring-[#7EC8A5]/40 shadow-xs'
                        : 'bg-white border-[#E2EFE7] text-slate-600 hover:bg-[#F2FAF6]'
                    }`}
                  >
                    {att}
                  </button>
                )
              }
            )}
          </div>
        </div>

        {/* Action Button & Adaptive Preview Note */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D5EAE0]">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7EC8A5] animate-ping" />
            <span>
              Adaptive Destination:{' '}
              <strong className="text-slate-800">
                {selectedFeeling === 'great'
                  ? "Today's Compass"
                  : selectedFeeling === 'busy'
                  ? "Today's Compass (Prioritized)"
                  : selectedFeeling === 'overwhelmed'
                  ? 'Reset Screen'
                  : selectedFeeling === 'exhausted'
                  ? 'Reset Screen (Lighter)'
                  : 'My Next Step'}
              </strong>
            </span>
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={handleCheckinSubmit}
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto px-6 rounded-2xl shadow-soft font-bold"
          >
            {checkinSubmitted ? 'Adapting Your Day...' : 'Submit & Adapt My View'}
          </Button>
        </div>
      </Card>

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
          className="p-4 border-[#DCF1E6]"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-600">Companion State</span>
            <span className="text-base">{currentCompanion.emoji}</span>
          </div>
          <p className="text-xl font-extrabold text-slate-800 capitalize">
            {currentCompanion.personality.split(' ')[0]}
          </p>
          <p className="text-[11px] text-[#438D6C] font-medium mt-0.5">
            Pacing: {user.companionCustomName || currentCompanion.name}
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
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
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
                <CalendarIcon className="w-4 h-4 text-indigo-600" />
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

          {/* Quick Shortcuts to Today's Compass & Reset Screen */}
          <Card
            variant="accent"
            rounded="3xl"
            className="p-5 text-center space-y-3 border-[#B9E4C9]"
          >
            <div className="flex justify-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCurrentPage('todays-compass')}
                icon={<Compass className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                Today's Compass
              </Button>
              <Button
                variant="calm"
                size="sm"
                onClick={() => setCurrentPage('reset-screen')}
                icon={<Wind className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                Reset Screen
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
