import React, { useState, useEffect } from 'react'
import {
  Wind,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowLeft,
  Headphones,
} from 'lucide-react'
import { useNexStep } from '../hooks/useNexStepContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { CALM_QUOTES } from '../utils/dummyData'

export const CalmModePage: React.FC = () => {
  const { setCurrentPage } = useNexStep()

  // Breathing state
  const [isActive, setIsActive] = useState<boolean>(false)
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale')
  const [secondsLeft, setSecondsLeft] = useState<number>(4)
  const [selectedAmbient, setSelectedAmbient] = useState<string>('Rain on Campus Glass')
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [quoteIndex, setQuoteIndex] = useState<number>(0)

  // 4-7-8 Breathing Cycle
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

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setPhase('Inhale')
    setSecondsLeft(4)
  }

  const ambients = [
    'Rain on Campus Glass',
    'Library Soft Echoes',
    'Lo-fi Study Chords',
    'Gentle Forest Stream',
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Bar with Exit */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage('home-dashboard')}
          icon={<ArrowLeft className="w-4 h-4" />}
          className="text-slate-600"
        >
          Exit Calm Mode
        </Button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7F0] text-xs font-semibold text-[#2D5443] border border-[#B9E4C9]">
          <Wind className="w-3.5 h-3.5 text-[#58A983]" />
          <span>Rest & Reset Sanctuary</span>
        </div>
      </div>

      {/* Main Serene Card */}
      <Card
        variant="calm"
        rounded="3xl"
        className="p-8 sm:p-12 text-center border-2 border-[#B9E4C9]/70 bg-gradient-to-b from-white/90 via-[#F3FAF6]/80 to-[#EAF7F0]/90 shadow-soft-lg space-y-8"
      >
        <div className="max-w-md mx-auto space-y-2">
          <Badge variant="primary" size="md">4-7-8 Mindful Breathing</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Release the Screen Strain
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Allow your shoulders to drop, loosen your jaw, and sync your breath with the circle.
          </p>
        </div>

        {/* Breathing Orb Visualization */}
        <div className="relative py-8 flex items-center justify-center">
          {/* Animated Background Ring */}
          <div
            className={`w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-[#B9E4C9] flex items-center justify-center transition-all duration-1000 ${
              isActive && phase === 'Inhale'
                ? 'scale-110 bg-[#E4F5ED]/80 shadow-soft-lg'
                : isActive && phase === 'Hold'
                ? 'scale-110 bg-[#D4F0E1]/90 shadow-soft'
                : isActive && phase === 'Exhale'
                ? 'scale-90 bg-white/70'
                : 'bg-white/60'
            }`}
          >
            <div className="text-center space-y-1">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#24523C]">
                {phase}
              </span>
              <div className="text-4xl sm:text-5xl font-black text-slate-800 font-mono">
                {secondsLeft}s
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {phase === 'Inhale'
                  ? 'Breathe in through nose'
                  : phase === 'Hold'
                  ? 'Hold gently and soften'
                  : 'Exhale slowly through mouth'}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={toggleTimer}
            icon={isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            className="rounded-full shadow-soft font-semibold px-8"
          >
            {isActive ? 'Pause' : 'Begin Breathing'}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={resetTimer}
            icon={<RotateCcw className="w-4 h-4" />}
            className="rounded-full"
            aria-label="Reset timer"
          />
        </div>

        {/* Ambient Soundscapes Selector */}
        <div className="pt-6 border-t border-[#D5EAE0]/70 max-w-xl mx-auto space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-[#58A983]" />
              Ambient Soundscape
            </span>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isMuted ? 'Muted' : 'Sound On'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ambients.map((sound) => (
              <button
                key={sound}
                onClick={() => setSelectedAmbient(sound)}
                className={`px-3 py-2 rounded-xl text-[11px] font-medium border text-center transition-all ${
                  selectedAmbient === sound && !isMuted
                    ? 'bg-[#E4F5ED] border-[#7EC8A5] text-[#24523C] font-semibold'
                    : 'bg-white/80 border-[#DCF1E6] text-slate-600 hover:bg-white'
                }`}
              >
                {sound}
              </button>
            ))}
          </div>
        </div>

        {/* Inspiring Tech Student Affirmation */}
        <div className="pt-4 max-w-lg mx-auto">
          <div
            onClick={() => setQuoteIndex((prev) => (prev + 1) % CALM_QUOTES.length)}
            className="p-4 rounded-2xl bg-white/70 border border-[#DCF1E6] cursor-pointer hover:bg-white transition-colors"
          >
            <p className="text-xs italic text-slate-700 leading-relaxed">
              "{CALM_QUOTES[quoteIndex].quote}"
            </p>
            <p className="text-[11px] font-bold text-[#438D6C] mt-2">
              — {CALM_QUOTES[quoteIndex].author} (Click for another reminder)
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
