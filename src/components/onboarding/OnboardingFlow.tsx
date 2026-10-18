import React, { useState } from 'react'
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Mail,
  FileText,
  Shield,
  Layers,
} from 'lucide-react'
import { useNexStep } from '../../hooks/useNexStepContext'
import { COMPANIONS } from '../../utils/dummyData'
import type { Companion } from '../../utils/dummyData'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { Input } from '../ui/Input'
import { GoogleIcon, LinkedInIcon, UnstopIcon } from '../icons/BrandIcons'
import { GithubIcon } from '../icons/GithubIcon'

export type OnboardingStep =
  | 'splash'
  | 'google-auth'
  | 'connect-services'
  | 'choose-companion'
  | 'name-companion'
  | 'welcome'

const STEPS: OnboardingStep[] = [
  'splash',
  'google-auth',
  'connect-services',
  'choose-companion',
  'name-companion',
  'welcome',
]

export const OnboardingFlow: React.FC = () => {
  const { user, completeOnboarding, services, toggleServiceConnection } = useNexStep()
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)
  const currentStep = STEPS[currentStepIndex]

  // Local state for companion selection in onboarding
  const [selectedCompanionId, setSelectedCompanionId] = useState<string>(user.chosenCompanion || 'nova')
  const [customName, setCustomName] = useState<string>(user.companionCustomName || 'Nova')

  const activeCompanion: Companion =
    COMPANIONS.find((c) => c.id === selectedCompanionId) || COMPANIONS[0]

  const nextStep = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    } else {
      handleFinish()
    }
  }

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const handleFinish = () => {
    completeOnboarding(selectedCompanionId, customName)
  }

  // Get service icon helper
  const renderServiceIcon = (id: string) => {
    switch (id) {
      case 'gmail':
        return <Mail className="w-5 h-5 text-rose-500" />
      case 'google_calendar':
        return <Calendar className="w-5 h-5 text-blue-500" />
      case 'github':
        return <GithubIcon className="w-5 h-5 text-slate-800" />
      case 'linkedin':
        return <LinkedInIcon className="w-5 h-5 text-sky-600" />
      case 'unstop':
        return <UnstopIcon className="w-5 h-5 text-amber-500" />
      case 'notion':
        return <FileText className="w-5 h-5 text-slate-700" />
      default:
        return <Layers className="w-5 h-5 text-emerald-600" />
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FCF9] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <header className="max-w-2xl w-full mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7EC8A5] to-[#B9E4C9] flex items-center justify-center shadow-soft">
            <Sparkles className="w-4 h-4 text-slate-900" />
          </div>
          <span className="font-extrabold text-slate-800 tracking-tight text-base">
            Nex<span className="text-[#5BAE87]">Step</span>
          </span>
        </div>

        {/* Step Progress Pills */}
        <div className="flex items-center gap-1.5">
          {STEPS.map((step, idx) => (
            <div
              key={step}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentStepIndex
                  ? 'w-6 bg-[#7EC8A5]'
                  : idx < currentStepIndex
                  ? 'w-2 bg-[#B9E4C9]'
                  : 'w-2 bg-[#DCF1E6]'
              }`}
            />
          ))}
        </div>

        {/* Skip to Dashboard */}
        <button
          onClick={handleFinish}
          className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors"
        >
          Skip
        </button>
      </header>

      {/* Main Card Viewport */}
      <main className="max-w-2xl w-full mx-auto my-auto py-6">
        {/* STEP 1: SPLASH SCREEN */}
        {currentStep === 'splash' && (
          <Card
            rounded="3xl"
            className="p-8 sm:p-12 text-center border-2 border-[#B9E4C9] bg-gradient-to-b from-white via-[#F8FCF9] to-[#EAF7F0] shadow-soft-lg space-y-8"
          >
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#7EC8A5] to-[#B9E4C9] flex items-center justify-center mx-auto shadow-soft animate-breathe">
                <Sparkles className="w-10 h-10 text-slate-900" />
              </div>
              <span className="absolute -top-1 -right-1 text-2xl">🌱</span>
            </div>

            <div className="space-y-3 max-w-lg mx-auto">
              <Badge variant="primary" size="md">Welcome to your new semester</Badge>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                NexStep
              </h1>
              <p className="text-base text-slate-700 font-medium">
                The Adaptive Companion for Computer Science & Tech Students
              </p>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Combining coursework planning, technical career momentum, and mindful burnout prevention into one calm, personalized space.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#D5EAE0] text-slate-700 font-medium">
                📚 Academic Planning
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#D5EAE0] text-slate-700 font-medium">
                💼 Tech Career Growth
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#D5EAE0] text-slate-700 font-medium">
                🧘 Zero-Guilt Wellbeing
              </span>
            </div>

            <div className="pt-4">
              <Button
                size="lg"
                variant="primary"
                onClick={nextStep}
                icon={<ArrowRight className="w-5 h-5" />}
                className="w-full sm:w-auto px-8 rounded-full shadow-soft font-bold"
              >
                Begin Personalized Setup
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 2: GOOGLE SIGN IN */}
        {currentStep === 'google-auth' && (
          <Card
            rounded="3xl"
            className="p-8 sm:p-10 border border-[#B9E4C9] bg-white shadow-soft space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#F2FAF6] border border-[#DCF1E6] flex items-center justify-center mx-auto shadow-sm">
                <GoogleIcon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Sign in with Google</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Connect your student or personal Google account to synchronize your course timeline
              </p>
            </div>

            {/* Simulated Active Account Pill */}
            <div className="p-4 rounded-2xl bg-[#F8FCF9] border-2 border-[#7EC8A5] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-[#7EC8A5]"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{user.name}</h4>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#2D5443] bg-[#E4F5ED] px-2.5 py-1 rounded-full border border-[#B9E4C9]">
                Ready to link
              </span>
            </div>

            {/* Scope Explanation */}
            <div className="space-y-2.5 text-xs text-slate-600 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <Shield className="w-4 h-4 text-[#58A983]" />
                <span>What NexStep accesses:</span>
              </div>
              <ul className="space-y-1.5 pl-6 list-disc text-slate-500">
                <li>Read-only Google Calendar (class lectures & exam time slots)</li>
                <li>Read-only Gmail metadata (recruiter interview invitations)</li>
                <li>Zero password storage · Student privacy strictly maintained</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="outline"
                size="md"
                onClick={prevStep}
                icon={<ArrowLeft className="w-4 h-4" />}
                className="rounded-2xl"
              >
                Back
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={nextStep}
                icon={<GoogleIcon className="w-4 h-4" />}
                className="flex-1 rounded-2xl shadow-soft font-bold"
              >
                Continue as Alex Rivera
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 3: CONNECT SERVICES */}
        {currentStep === 'connect-services' && (
          <Card
            rounded="3xl"
            className="p-8 sm:p-10 border border-[#B9E4C9] bg-white shadow-soft space-y-6"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="sm">Step 2 of 4</Badge>
                <span className="text-xs text-slate-400 font-medium">Tech Integrations</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Connect Your Services</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Select the tools you use every day. NexStep brings them together without notification noise.
              </p>
            </div>

            {/* Required / Primary Services */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Essential for CS Students
              </span>

              {['gmail', 'google_calendar', 'github', 'linkedin'].map((id) => {
                const service = services.find((s) => s.id === id)
                if (!service) return null
                const isConnected = service.status === 'connected'

                return (
                  <div
                    key={id}
                    onClick={() => toggleServiceConnection(id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isConnected
                        ? 'bg-[#F2FAF6] border-[#B9E4C9] shadow-xs'
                        : 'bg-white border-[#E2EFE7] opacity-80 hover:bg-[#F9FCFA]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white border border-[#D5EAE0] flex items-center justify-center shrink-0">
                        {renderServiceIcon(id)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-800 text-sm">{service.name}</h4>
                          {isConnected && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#58A983]" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">{service.description}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                        isConnected
                          ? 'bg-[#7EC8A5] text-slate-900 shadow-xs'
                          : 'bg-[#EAF7F0] text-[#2D5443] hover:bg-[#D5EFE1]'
                      }`}
                    >
                      {isConnected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Optional Services */}
            <div className="space-y-2.5 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Optional Enhancements
              </span>

              {['unstop', 'notion'].map((id) => {
                const service = services.find((s) => s.id === id)
                if (!service) return null
                const isConnected = service.status === 'connected'

                return (
                  <div
                    key={id}
                    onClick={() => toggleServiceConnection(id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isConnected
                        ? 'bg-[#F2FAF6] border-[#B9E4C9]'
                        : 'bg-white border-[#E2EFE7] hover:bg-[#F9FCFA]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white border border-[#D5EAE0] flex items-center justify-center shrink-0">
                        {renderServiceIcon(id)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{service.name}</h4>
                        <p className="text-xs text-slate-500 line-clamp-1">{service.description}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                        isConnected
                          ? 'bg-[#7EC8A5] text-slate-900'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isConnected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-3 pt-3">
              <Button
                variant="outline"
                size="md"
                onClick={prevStep}
                icon={<ArrowLeft className="w-4 h-4" />}
                className="rounded-2xl"
              >
                Back
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={nextStep}
                icon={<ArrowRight className="w-4 h-4" />}
                className="flex-1 rounded-2xl shadow-soft font-bold"
              >
                Continue to Companion
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 4: CHOOSE COMPANION */}
        {currentStep === 'choose-companion' && (
          <Card
            rounded="3xl"
            className="p-8 sm:p-10 border border-[#B9E4C9] bg-white shadow-soft space-y-6"
          >
            <div className="space-y-1.5 text-center max-w-md mx-auto">
              <Badge variant="primary" size="sm">Step 3 of 4</Badge>
              <h2 className="text-2xl font-extrabold text-slate-900">Choose Your Companion</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Your companion adapts to your energy and supports you through stressful weeks.
              </p>
            </div>

            {/* Companion Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {COMPANIONS.map((companion) => {
                const isSelected = selectedCompanionId === companion.id

                return (
                  <div
                    key={companion.id}
                    onClick={() => {
                      setSelectedCompanionId(companion.id)
                      setCustomName(companion.name)
                    }}
                    className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#7EC8A5] bg-gradient-to-br from-[#F2FAF6] to-white shadow-soft ring-2 ring-[#7EC8A5]/30'
                        : 'border-[#E2EFE7] bg-white hover:border-[#B9E4C9] hover:bg-[#F9FCFA]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-12 h-12 rounded-2xl ${companion.avatarBg} border ${companion.avatarBorder} flex items-center justify-center text-2xl shadow-xs`}
                        >
                          {companion.emoji}
                        </div>
                        {isSelected ? (
                          <span className="text-[11px] font-bold text-slate-900 bg-[#7EC8A5] px-2.5 py-0.5 rounded-full shadow-xs">
                            Selected
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-slate-400">
                            Tap to choose
                          </span>
                        )}
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-1.5">
                        {companion.name} {companion.emoji}
                      </h3>
                      <p className="text-xs font-semibold text-[#438D6C] mb-2">{companion.tagline}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{companion.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#EAF7F0]">
                      <span className="text-[11px] text-slate-400 italic">
                        "{companion.greeting.slice(0, 55)}..."
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                size="md"
                onClick={prevStep}
                icon={<ArrowLeft className="w-4 h-4" />}
                className="rounded-2xl"
              >
                Back
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={nextStep}
                icon={<ArrowRight className="w-4 h-4" />}
                className="flex-1 rounded-2xl shadow-soft font-bold"
              >
                Adopt {activeCompanion.name}
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 5: NAME COMPANION */}
        {currentStep === 'name-companion' && (
          <Card
            rounded="3xl"
            className="p-8 sm:p-10 border border-[#B9E4C9] bg-white shadow-soft space-y-6 text-center"
          >
            <div className="space-y-1.5 max-w-md mx-auto">
              <Badge variant="primary" size="sm">Step 4 of 4</Badge>
              <h2 className="text-2xl font-extrabold text-slate-900">Name Your Companion</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Give your companion a custom name or keep its original identity.
              </p>
            </div>

            {/* Companion Visual with Dialogue */}
            <div className="py-4 space-y-4">
              <div
                className={`w-24 h-24 rounded-3xl ${activeCompanion.avatarBg} border-2 ${activeCompanion.avatarBorder} flex items-center justify-center text-4xl mx-auto shadow-soft animate-breathe`}
              >
                {activeCompanion.emoji}
              </div>

              {/* Speech Bubble */}
              <div className="inline-block relative bg-[#EAF7F0] border border-[#B9E4C9] rounded-2xl px-5 py-3 text-xs sm:text-sm text-[#24523C] font-semibold max-w-md shadow-xs">
                <span>"Hi {user.name.split(' ')[0]}! What would you like to call me?"</span>
              </div>
            </div>

            {/* Input field */}
            <div className="max-w-xs mx-auto space-y-2">
              <Input
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Nova, Pixel, Sage"
                className="text-center font-bold text-lg bg-[#F8FCF9] border-[#B9E4C9]"
                autoFocus
              />
              <p className="text-[11px] text-slate-400">
                You can change this anytime from your Profile settings.
              </p>
            </div>

            <div className="flex gap-3 pt-4 max-w-sm mx-auto">
              <Button
                variant="outline"
                size="md"
                onClick={prevStep}
                icon={<ArrowLeft className="w-4 h-4" />}
                className="rounded-2xl"
              >
                Back
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={nextStep}
                icon={<ArrowRight className="w-4 h-4" />}
                className="flex-1 rounded-2xl shadow-soft font-bold"
              >
                Confirm Name
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 6: WELCOME SCREEN */}
        {currentStep === 'welcome' && (
          <Card
            rounded="3xl"
            className="p-8 sm:p-12 text-center border-2 border-[#B9E4C9] bg-gradient-to-b from-white via-[#F8FCF9] to-[#EAF7F0] shadow-soft-lg space-y-8"
          >
            <div className="relative inline-block">
              <div
                className={`w-24 h-24 rounded-3xl ${activeCompanion.avatarBg} border-2 ${activeCompanion.avatarBorder} flex items-center justify-center text-5xl mx-auto shadow-soft`}
              >
                {activeCompanion.emoji}
              </div>
              <span className="absolute -top-1 -right-1 text-2xl animate-bounce">🎉</span>
            </div>

            <div className="space-y-3 max-w-lg mx-auto">
              <Badge variant="primary" size="md">Onboarding Complete</Badge>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                You're All Set, {user.name.split(' ')[0]}!
              </h2>

              {/* Personalized Companion Greeting Box */}
              <div className="p-4 rounded-2xl bg-white/90 border border-[#B9E4C9] text-xs sm:text-sm text-slate-700 leading-relaxed shadow-card text-left flex items-start gap-3">
                <span className="text-2xl shrink-0">{activeCompanion.emoji}</span>
                <div>
                  <strong className="text-slate-900 font-bold block mb-1">
                    {customName || activeCompanion.name} says:
                  </strong>
                  <span>"{activeCompanion.greeting}"</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 pt-1">
                Your daily check-in is ready on your Home Dashboard. Let's see how your day is looking.
              </div>
            </div>

            <div className="pt-2">
              <Button
                size="lg"
                variant="primary"
                onClick={handleFinish}
                icon={<ArrowRight className="w-5 h-5" />}
                className="w-full sm:w-auto px-10 py-4 rounded-full shadow-soft-lg font-extrabold text-base text-slate-900"
              >
                Enter NexStep Dashboard
              </Button>
            </div>
          </Card>
        )}
      </main>

      {/* Bottom Footer Note */}
      <footer className="max-w-2xl w-full mx-auto text-center text-[11px] text-slate-400 py-2">
        <span>NexStep · Adaptive Student Companion · Private & Local State</span>
      </footer>
    </div>
  )
}
