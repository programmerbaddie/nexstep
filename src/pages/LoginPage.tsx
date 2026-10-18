import React, { useState } from 'react'
import {
  Sparkles,
  ArrowRight,
  Mail,
  Lock,
  GraduationCap,
} from 'lucide-react'
import { GithubIcon } from '../components/icons/GithubIcon'
import { useNexStep } from '../hooks/useNexStepContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export const LoginPage: React.FC = () => {
  const { setCurrentPage, setIsLoggedIn } = useNexStep()
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('alex.rivera@cs.edu')
  const [password, setPassword] = useState('••••••••••••')

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsLoggedIn(true)
    setCurrentPage('home-dashboard')
  }

  const handleDemoLogin = () => {
    setIsLoggedIn(true)
    setCurrentPage('daily-checkin')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-3xl bg-gradient-to-tr from-[#7EC8A5] to-[#B9E4C9] items-center justify-center shadow-soft">
            <Sparkles className="w-6 h-6 text-slate-900" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isRegister ? 'Join NexStep' : 'Welcome back to NexStep'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {isRegister
              ? 'Create your personalized academic & career companion'
              : 'Sign in to access your customized academic flow & wellbeing space'}
          </p>
        </div>

        {/* Demo Fast Login Banner */}
        <Card variant="accent" rounded="2xl" className="p-4 border-[#B9E4C9] text-center">
          <div className="flex items-center justify-between gap-3 text-left">
            <div>
              <p className="text-xs font-bold text-[#24523C] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#58A983]" />
                Hackathon Instant Demo
              </p>
              <p className="text-[11px] text-slate-600">
                Continue as <strong>Alex Rivera</strong> (CS Junior, 3.84 GPA)
              </p>
            </div>
            <Button size="sm" variant="primary" onClick={handleDemoLogin} className="rounded-xl shrink-0">
              Instant Entry
            </Button>
          </div>
        </Card>

        {/* Main Auth Card */}
        <Card rounded="3xl" className="p-6 sm:p-8 space-y-5">
          {/* SSO Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="flex items-center justify-center gap-2 p-2.5 rounded-2xl border border-[#D5EAE0] hover:bg-[#F2FAF6] text-xs font-semibold text-slate-700 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </button>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="flex items-center justify-center gap-2 p-2.5 rounded-2xl border border-[#D5EAE0] hover:bg-[#F2FAF6] text-xs font-semibold text-slate-700 transition-colors"
            >
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Campus SSO</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <hr className="w-full border-[#E4F2EB]" />
            <span className="absolute bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase">
              Or with credentials
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Student Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@university.edu"
              icon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
            />

            {!isRegister && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-[#B9E4C9] text-[#7EC8A5] focus:ring-[#7EC8A5]"
                  />
                  <span>Stay signed in</span>
                </label>
                <a href="#forgot" className="font-medium text-[#438D6C] hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center shadow-soft"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {isRegister ? 'Create Free Account' : 'Sign In'}
            </Button>
          </form>

          {/* Toggle Register/Login */}
          <div className="text-center pt-2">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-slate-600 hover:text-slate-900 transition-colors"
            >
              {isRegister ? (
                <>Already have an account? <span className="font-semibold text-[#438D6C]">Sign In</span></>
              ) : (
                <>New to NexStep? <span className="font-semibold text-[#438D6C]">Create an account</span></>
              )}
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
