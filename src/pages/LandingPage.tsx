import React from 'react'
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Heart,
  CheckCircle2,
  Footprints,
  Wind,
} from 'lucide-react'
import { useNexStep } from '../hooks/useNexStepContext'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

export const LandingPage: React.FC = () => {
  const { setCurrentPage } = useNexStep()

  const pillars = [
    {
      icon: GraduationCap,
      badge: 'Academic Planning',
      title: 'Pace your CS coursework without panic',
      desc: 'Seamlessly tracks Canvas, syllabus milestones, and coding lab deadlines with realistic time estimations.',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    },
    {
      icon: Briefcase,
      badge: 'Career Growth',
      title: 'Land internships on your own terms',
      desc: 'Smart LeetCode cadence, curated hackathons, and vetted student roles matched to your actual tech stack.',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      icon: Heart,
      badge: 'Student Wellbeing',
      title: 'Zero-pressure burnout prevention',
      desc: 'Daily check-ins, mindful breathing timers, and calm mode that adapts your schedule when stress spikes.',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
    },
  ]

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 md:pt-14 text-center max-w-4xl mx-auto px-4">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#B9E4C9]/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4F5ED] border border-[#B9E4C9] text-xs font-semibold text-[#24523C] mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#58A983]" />
          <span>Built for Computer Science & Tech Students</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Your academic goals, tech career, and sanity —{' '}
          <span className="bg-gradient-to-r from-[#438D6C] via-[#5BAE87] to-[#7EC8A5] bg-clip-text text-transparent">
            all in sync.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          NexStep is the adaptive companion that eliminates tech student burnout. We balance your
          coding labs, LeetCode prep, and internship hunts with calm daily check-ins and AI-guided
          clarity.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Button
            size="lg"
            variant="primary"
            onClick={() => setCurrentPage('home-dashboard')}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Launch Home Dashboard
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => setCurrentPage('daily-checkin')}
            icon={<Heart className="w-4 h-4 text-[#5BAE87]" />}
          >
            Try Daily Check-in
          </Button>
        </div>

        {/* Micro Credibility */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#5BAE87]" />
            <span>Anti-toxic productivity</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#5BAE87]" />
            <span>No backend required (Local demo)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#5BAE87]" />
            <span>Pastel calm design</span>
          </div>
        </div>
      </section>

      {/* Interactive Feature Hero Preview Card */}
      <section className="max-w-5xl mx-auto px-4">
        <Card variant="accent" rounded="3xl" className="p-6 md:p-8 border-2 border-[#B9E4C9]/70">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#D5EAE0]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="primary">Companion Preview</Badge>
                <span className="text-xs text-slate-500">Live Simulation Mode</span>
              </div>
              <h2 className="text-xl font-bold text-slate-800">What Alex’s Wednesday Looks Like</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="soft"
                onClick={() => setCurrentPage('my-next-step')}
                icon={<Footprints className="w-3.5 h-3.5" />}
              >
                View Smart Next Step
              </Button>
              <Button
                size="sm"
                variant="calm"
                onClick={() => setCurrentPage('calm-mode')}
                icon={<Wind className="w-3.5 h-3.5" />}
              >
                Zen Calm Mode
              </Button>
            </div>
          </div>

          {/* 3 Interactive Cards inside Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/90 p-4 rounded-2xl border border-[#E5F2EB] shadow-card">
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                Academic Priority
              </span>
              <p className="font-semibold text-sm text-slate-800">Raft Consensus Lab 2B</p>
              <p className="text-xs text-slate-500 mt-1">CS 452 · Estimated 90m block</p>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                <span>Canvas synced</span>
                <span className="font-medium text-[#438D6C]">Due tomorrow</span>
              </div>
            </div>

            <div className="bg-white/90 p-4 rounded-2xl border border-[#E5F2EB] shadow-card">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                Career Next Step
              </span>
              <p className="font-semibold text-sm text-slate-800">1 LeetCode Medium (DP)</p>
              <p className="text-xs text-slate-500 mt-1">Consistency without grind</p>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                <span>Stripe interview track</span>
                <span className="font-medium text-[#438D6C]">35 mins</span>
              </div>
            </div>

            <div className="bg-white/90 p-4 rounded-2xl border border-[#E5F2EB] shadow-card">
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block mb-1">
                Wellbeing Guardrail
              </span>
              <p className="font-semibold text-sm text-slate-800">15m Sunlight Reset</p>
              <p className="text-xs text-slate-500 mt-1">Stress level 4/5 detected</p>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                <span>Gentle pacing</span>
                <span className="font-medium text-amber-700">Scheduled 3 PM</span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* The 3 Pillars Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-2">Three Core Pillars</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Designed for how CS students actually study & live
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon
            return (
              <Card key={idx} variant="default" rounded="3xl" className="hover:border-[#7EC8A5] transition-all">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${p.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <Badge variant="neutral" size="sm" className="mb-2">{p.badge}</Badge>
                <h3 className="text-base font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#7EC8A5] to-[#B9E4C9] rounded-3xl p-8 sm:p-10 text-center shadow-soft">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Ready to reclaim your focus & peace of mind?
          </h2>
          <p className="mt-2 text-slate-800 text-sm sm:text-base max-w-lg mx-auto">
            Explore NexStep today with complete dummy data for a typical CS student profile.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              variant="calm"
              size="lg"
              onClick={() => setCurrentPage('login')}
              className="font-bold text-slate-900"
            >
              Sign In or Register
            </Button>
            <Button
              variant="soft"
              size="lg"
              onClick={() => setCurrentPage('connect-services')}
              className="bg-white/90 text-slate-800"
            >
              Explore Connected Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
