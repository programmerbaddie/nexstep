import React, { useState, useEffect } from 'react'
import {
  Coffee,
  Bed,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  Sun,
} from 'lucide-react'
import { useNexStep } from '../hooks/useNexStepContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

export const ResetScreenPage: React.FC = () => {
  const {
    user,
    currentCompanion,
    resetMode,
    setResetMode,
    todayCheckin,
    setCurrentPage,
  } = useNexStep()

  const isExhausted = resetMode === 'exhausted'

  // Gentle 4-7-8 breathing state
  const [isActive, setIsActive] = useState<boolean>(false)
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale')
  const [secondsLeft, setSecondsLeft] = useState<number>(4)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (phase === 'Inhale') {
            setPhase('Hold')
            return 7
          } else if (phase === 'Hold') {
            setPhase('Exhale')
            return 8
          } else {
            setPhase('Inhale')
            return 4
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, phase])

  const toggleBreathing = () => {
    setIsActive(!isActive)
  }

  const resetBreathing = () => {
    setIsActive(false)
    setPhase('Inhale')
    setSecondsLeft(4)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Banner: Empathetic Companion Message */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-50/70 via-white to-[#EAF7F0] border-2 border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-soft">
        <div className="flex items-center gap-3.5">
          <div
            className={`w-12 h-12 rounded-2xl ${currentCompanion.avatarBg} border ${currentCompanion.avatarBorder} flex items-center justify-center text-3xl shadow-sm shrink-0`}
          >
            {currentCompanion.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                {isExhausted ? 'Recharge Protocol' : 'Emergency Cognitive Decompression'}
              </span>
              <Badge variant="wellbeing" size="sm">
                {user.companionCustomName || currentCompanion.name}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-snug">
              {isExhausted
                ? `"You're running on empty, ${user.name.split(' ')[0]}. Forcing code through exhaustion causes bugs and burnout. Rest is productive."`
                : `"It's completely normal to feel overwhelmed by ${todayCheckin?.attention || 'CS workloads'}. We've hit the pause button for you."`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setResetMode(isExhausted ? 'overwhelmed' : 'exhausted')}
            className="rounded-xl text-xs"
          >
            {isExhausted ? 'Switch: Overwhelmed' : 'Switch: Exhausted'}
          </Button>
        </div>
      </div>

      {/* Main Guided Reset Card */}
      <Card
        rounded="3xl"
        className="p-8 sm:p-10 border-2 border-[#B9E4C9] bg-white shadow-soft text-center space-y-8"
      >
        <div className="space-y-2 max-w-md mx-auto">
          <Badge variant="primary" size="md">
            {isExhausted ? 'Zero-Pressure Sanctuary' : '4-7-8 Nervous System Reset'}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isExhausted ? 'Permission to Log Off & Recharge' : 'Slow Down. Unclench Your Shoulders.'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {isExhausted
              ? 'Your assignments will still be here tomorrow. Protect your health first.'
              : 'Sync your breathing with the circle below. 3 mindful cycles reset cortisol spikes.'}
          </p>
        </div>

        {/* Breathing Circle */}
        <div className="relative py-4 flex items-center justify-center">
          <div
            className={`w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-[#B9E4C9] flex items-center justify-center transition-all duration-1000 ${
              isActive && phase === 'Inhale'
                ? 'scale-110 bg-[#E4F5ED]/90 shadow-soft-lg'
                : isActive && phase === 'Hold'
                ? 'scale-110 bg-[#D4F0E1]/90 shadow-soft'
                : isActive && phase === 'Exhale'
                ? 'scale-90 bg-white/70'
                : 'bg-[#F8FCF9]'
            }`}
          >
            <div className="text-center space-y-1">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#24523C]">
                {phase}
              </span>
              <div className="text-4xl font-black text-slate-800 font-mono">{secondsLeft}s</div>
              <span className="text-[11px] text-slate-500 font-medium">
                {phase === 'Inhale'
                  ? 'Inhale through nose'
                  : phase === 'Hold'
                  ? 'Hold gently'
                  : 'Exhale through mouth'}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={toggleBreathing}
            icon={isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            className="rounded-full shadow-soft font-bold px-8"
          >
            {isActive ? 'Pause' : 'Start 2-Minute Breathing'}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={resetBreathing}
            icon={<RotateCcw className="w-4 h-4" />}
            className="rounded-full"
            aria-label="Reset"
          />
        </div>

        {/* Soft Recommendations Grid */}
        <div className="pt-6 border-t border-[#EDF7F2] text-left">
          <h4 className="font-bold text-slate-900 text-sm mb-3">
            {isExhausted ? 'Gentle Next Steps for Low Energy:' : 'Immediate Stress Relievers:'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#F8FCF9] border border-[#DCF1E6] space-y-1">
              <div className="flex items-center gap-2 font-semibold text-slate-800 text-xs">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Step Away From Screen</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Look at the horizon or greenery for 5 minutes to relax eye muscles.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F8FCF9] border border-[#DCF1E6] space-y-1">
              <div className="flex items-center gap-2 font-semibold text-slate-800 text-xs">
                <Coffee className="w-4 h-4 text-emerald-600" />
                <span>Hydrate or Sip Tea</span>
              </div>
              <p className="text-[11px] text-slate-500">
                A tall glass of cool water directly cools nervous system stimulation.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F8FCF9] border border-[#DCF1E6] space-y-1">
              <div className="flex items-center gap-2 font-semibold text-slate-800 text-xs">
                <Bed className="w-4 h-4 text-purple-600" />
                <span>Guilt-Free Power Down</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Shut your laptop lid without guilt. Sleep consolidates what you learned.
              </p>
            </div>
          </div>
        </div>

        {/* Return Button */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            size="md"
            onClick={() => setCurrentPage('home-dashboard')}
            className="rounded-xl text-xs font-semibold"
          >
            I Feel Calmer, Return Home
          </Button>

          <Button
            variant="calm"
            size="md"
            onClick={() => setCurrentPage('my-next-step')}
            icon={<ArrowRight className="w-4 h-4" />}
            className="rounded-xl text-xs font-semibold"
          >
            Show Just ONE Micro Step
          </Button>
        </div>
      </Card>
    </div>
  )
}
