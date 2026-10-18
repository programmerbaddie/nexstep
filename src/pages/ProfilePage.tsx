import React, { useState } from 'react'
import {
  GraduationCap,
  Flame,
  Award,
  Save,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react'
import { useNexStep } from '../hooks/useNexStepContext'
import { COMPANIONS } from '../utils/dummyData'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'

export const ProfilePage: React.FC = () => {
  const { user, updateUser, currentCompanion, setCompanion, resetOnboarding } = useNexStep()

  const [name, setName] = useState(user.name)
  const [targetRole, setTargetRole] = useState(user.targetRole)
  const [major, setMajor] = useState(user.major)
  const [bio, setBio] = useState(user.bio)
  const [academicLoad, setAcademicLoad] = useState(user.academicLoad)
  const [companionName, setCompanionName] = useState(user.companionCustomName || currentCompanion.name)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateUser({
      name,
      targetRole,
      major,
      bio,
      academicLoad,
      companionCustomName: companionName,
    })
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Profile Header Card */}
      <Card
        rounded="3xl"
        className="p-6 sm:p-8 bg-gradient-to-br from-white via-[#F8FCF9] to-[#EAF7F0] border-2 border-[#B9E4C9] shadow-soft"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-[#7EC8A5] shadow-soft"
          />

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">{user.name}</h1>
              <Badge variant="primary" size="sm">
                <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                {user.streakDays} Day Streak
              </Badge>
              <Badge variant="career" size="sm">
                <span>Companion: {companionName} {currentCompanion.emoji}</span>
              </Badge>
            </div>

            <p className="text-xs font-semibold text-[#438D6C]">{user.handle} • {user.email}</p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-xs text-slate-600 pt-1">
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                {user.major} ({user.year})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                GPA: {user.gpa}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-xl pt-1">{user.bio}</p>
          </div>
        </div>
      </Card>

      {/* Profile Edit Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Companion Customization Section */}
        <Card rounded="3xl" className="p-6 sm:p-8 space-y-6 bg-white border-[#E2EFE7]">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">My AI Companion</h3>
            <p className="text-xs text-slate-500">
              Change your active companion archetype and custom name
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {COMPANIONS.map((c) => {
              const isSelected = user.chosenCompanion === c.id

              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setCompanion(c.id, companionName)
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                    isSelected
                      ? 'border-[#7EC8A5] bg-[#E4F5ED] text-[#24523C] ring-2 ring-[#7EC8A5]/40 shadow-xs'
                      : 'border-[#E2EFE7] bg-white text-slate-700 hover:bg-[#F2FAF6]'
                  }`}
                >
                  <span className="text-3xl mb-1.5">{c.emoji}</span>
                  <span className="text-xs font-bold">{c.name}</span>
                  <span className="text-[10px] opacity-75">{c.tagline}</span>
                </div>
              )
            })}
          </div>

          <div className="max-w-xs">
            <Input
              label="Companion Nickname"
              value={companionName}
              onChange={(e) => setCompanionName(e.target.value)}
              placeholder="e.g. Nova"
            />
          </div>
        </Card>

        {/* Academic Preferences */}
        <Card rounded="3xl" className="p-6 sm:p-8 space-y-6 bg-white border-[#E2EFE7]">
          <div className="flex items-center justify-between border-b border-[#EDF7F2] pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Student Preferences</h3>
              <p className="text-xs text-slate-500">
                Customize how NexStep balances your academic intensity and career pacing
              </p>
            </div>

            {isSaved && (
              <div className="flex items-center gap-1.5 text-xs text-[#24523C] bg-[#E4F5ED] px-3 py-1 rounded-full border border-[#B9E4C9]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#58A983]" />
                <span>Saved successfully!</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />

            <Input
              label="Target Role"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Distributed Systems SWE"
            />

            <Input
              label="Academic Program"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="e.g. Computer Science"
            />

            {/* Academic Load Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase">
                Semester Workload Intensity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['light', 'moderate', 'heavy'] as const).map((load) => (
                  <button
                    key={load}
                    type="button"
                    onClick={() => setAcademicLoad(load)}
                    className={`py-2.5 text-xs font-semibold rounded-2xl border capitalize transition-all ${
                      academicLoad === load
                        ? 'bg-[#E4F5ED] border-[#7EC8A5] text-[#24523C] shadow-soft'
                        : 'bg-white border-[#E2EFE7] text-slate-600 hover:bg-[#F2FAF6]'
                    }`}
                  >
                    {load}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bio / Motivation */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase">
              Student Bio & Vision
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-white border border-[#D5EAE0] rounded-2xl p-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#7EC8A5] focus:ring-4 focus:ring-[#7EC8A5]/20 resize-none"
            />
          </div>

          {/* Technical Skills Badges */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 uppercase">
              Primary Tech Stack & Topics
            </label>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-xl bg-[#F2FAF6] text-[#24523C] text-xs font-semibold border border-[#DCF1E6]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EDF7F2]">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetOnboarding}
              icon={<RotateCcw className="w-3.5 h-3.5 text-[#58A983]" />}
              className="rounded-2xl text-xs"
            >
              Reset & Replay Onboarding
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Save className="w-4 h-4" />}
              className="rounded-2xl shadow-soft"
            >
              Save Profile Changes
            </Button>
          </div>
        </Card>
      </form>
    </div>
  )
}
