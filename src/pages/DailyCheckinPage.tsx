import React, { useState } from 'react'
import {
  Heart,
  Smile,
  Zap,
  Coffee,
  BatteryCharging,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { useNexStep } from '../hooks/useNexStepContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'

export const DailyCheckinPage: React.FC = () => {
  const { todayCheckin, saveDailyCheckin, setCurrentPage } = useNexStep()

  const [energy, setEnergy] = useState<number>(todayCheckin?.energy ?? 3)
  const [stress, setStress] = useState<number>(todayCheckin?.stress ?? 2)
  const [mood, setMood] = useState<'energized' | 'calm' | 'neutral' | 'overwhelmed' | 'tired'>(
    todayCheckin?.mood ?? 'calm'
  )
  const [topGoal, setTopGoal] = useState<string>(todayCheckin?.topGoal ?? 'Complete Raft Lab 2B')
  const [notes, setNotes] = useState<string>(
    todayCheckin?.notes ?? 'Feeling good about algorithms, want to avoid late-night debugging.'
  )
  const [isSaved, setIsSaved] = useState<boolean>(false)

  const moods = [
    { id: 'energized', label: 'Energized', icon: Zap, color: 'text-amber-500 bg-amber-50 border-amber-200' },
    { id: 'calm', label: 'Calm & Steady', icon: Smile, color: 'text-[#2D5443] bg-[#EAF7F0] border-[#B9E4C9]' },
    { id: 'neutral', label: 'Neutral', icon: Coffee, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { id: 'tired', label: 'Low Energy', icon: BatteryCharging, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { id: 'overwhelmed', label: 'Overwhelmed', icon: ShieldAlert, color: 'text-rose-600 bg-rose-50 border-rose-200' },
  ] as const

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    saveDailyCheckin({
      date: 'Today',
      energy,
      stress,
      mood,
      journalPrompt: 'What one thing would make today feel like a victory?',
      topGoal,
      notes,
    })

    setIsSaved(true)

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#7EC8A5', '#B9E4C9', '#FCE79A', '#A5D8F3'],
      })
    } catch {
      // Graceful fallback
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4F5ED] text-xs font-semibold text-[#2D5443] border border-[#B9E4C9]">
          <Heart className="w-3.5 h-3.5 text-[#58A983]" />
          <span>Daily 90-Second Pulse</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          How are you feeling today?
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          NexStep recalibrates your study targets and interview prep based on your current bandwidth.
        </p>
      </div>

      {isSaved && (
        <Card variant="accent" rounded="3xl" className="p-6 text-center space-y-3 animate-fade-in border-[#7EC8A5]">
          <div className="w-12 h-12 rounded-full bg-[#7EC8A5] flex items-center justify-center mx-auto text-slate-900 shadow-soft">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Check-in Logged Successfully!</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            {stress >= 4
              ? 'We noticed elevated stress. Your schedule has been softened with automatic buffer breaks.'
              : 'Your pace looks balanced and strong. Let’s tackle your high-impact milestones.'}
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button
              size="sm"
              variant="primary"
              onClick={() => setCurrentPage('home-dashboard')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Go to Dashboard
            </Button>
            <Button
              size="sm"
              variant="calm"
              onClick={() => setCurrentPage('my-next-step')}
            >
              See Adjusted Next Step
            </Button>
          </div>
        </Card>
      )}

      {/* Main Check-in Form */}
      <form onSubmit={handleSubmit}>
        <Card rounded="3xl" className="p-6 sm:p-8 space-y-8">
          {/* Mood Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span>1. General Mindset</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {moods.map((m) => {
                const Icon = m.icon
                const isSelected = mood === m.id
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMood(m.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? `${m.color} ring-2 ring-[#7EC8A5] shadow-soft scale-[1.02] font-semibold`
                        : 'bg-white border-[#E2EFE7] hover:bg-[#F2FAF6] text-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1.5" />
                    <span className="text-xs">{m.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Energy Rating Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-slate-800">2. Current Energy Level</span>
              <Badge variant="primary" size="sm">
                {energy} / 5 ({energy <= 2 ? 'Low — gentle work only' : energy === 3 ? 'Moderate' : 'High Focus'})
              </Badge>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className="w-full accent-[#7EC8A5] bg-[#EAF7F0] h-2.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>Drained</span>
              <span>Need Coffee</span>
              <span>Steady</span>
              <span>Focused</span>
              <span>Supercharged</span>
            </div>
          </div>

          {/* Stress Rating Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-slate-800">3. Stress & Academic Pressure</span>
              <Badge variant={stress >= 4 ? 'urgent' : stress >= 3 ? 'neutral' : 'career'} size="sm">
                {stress} / 5 ({stress >= 4 ? 'High Pressure' : stress >= 2 ? 'Manageable' : 'Peaceful'})
              </Badge>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={stress}
              onChange={(e) => setStress(Number(e.target.value))}
              className="w-full accent-rose-400 bg-rose-50 h-2.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>Very Low</span>
              <span>Light</span>
              <span>Moderate</span>
              <span>High</span>
              <span>Critical</span>
            </div>
          </div>

          {/* Top Single Goal */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800">
              4. If you only accomplish ONE thing today, what should it be?
            </label>
            <Input
              value={topGoal}
              onChange={(e) => setTopGoal(e.target.value)}
              placeholder="e.g. Finish Raft Consensus Lab 2B, or study 3 DP patterns"
              className="bg-[#F8FCF9]"
            />
          </div>

          {/* Mindful Notes */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800">
              5. Quick Note or Thought (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write anything on your mind... upcoming exams, feeling anxious about interview loops, etc."
              className="w-full bg-[#F8FCF9] border border-[#D5EAE0] rounded-2xl p-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#7EC8A5] focus:ring-4 focus:ring-[#7EC8A5]/20 resize-none"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Adapts your schedule in real-time
            </span>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-soft"
              icon={<Sparkles className="w-4 h-4" />}
            >
              Save & Recalibrate Companion
            </Button>
          </div>
        </Card>
      </form>
    </div>
  )
}
