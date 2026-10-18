import React, { useState } from 'react'
import {
  CalendarDays,
  MapPin,
  Plus,
  BookOpen,
  Coffee,
  Briefcase,
  CheckCircle2,
} from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { CALENDAR_EVENTS } from '../utils/dummyData'
import type { CalendarEvent } from '../utils/dummyData'

export const CalendarPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Wed, Oct 18')
  const events = CALENDAR_EVENTS

  const days = [
    { label: 'Mon', date: 'Oct 16', count: 4 },
    { label: 'Tue', date: 'Oct 17', count: 5 },
    { label: 'Wed', date: 'Oct 18', count: 5, active: true },
    { label: 'Thu', date: 'Oct 19', count: 3 },
    { label: 'Fri', date: 'Oct 20', count: 4 },
  ]

  const getEventBadge = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'class':
        return <Badge variant="academic">Lecture</Badge>
      case 'study':
        return <Badge variant="primary">Deep Work</Badge>
      case 'career':
        return <Badge variant="career">Career Prep</Badge>
      case 'break':
        return <Badge variant="wellbeing">Mindful Buffer</Badge>
      case 'exam':
        return <Badge variant="urgent">Exam</Badge>
      default:
        return <Badge variant="neutral">Event</Badge>
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="md">
              <CalendarDays className="w-3.5 h-3.5" /> Balanced Academic Calendar
            </Badge>
            <span className="text-xs text-slate-500 font-medium">Google Calendar + Canvas Synced</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Schedule & Cognitive Flow
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            NexStep automatically inserts recovery buffers between heavy lab and study sessions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
            New Block
          </Button>
        </div>
      </div>

      {/* Week Day Selector Strip */}
      <Card rounded="3xl" className="p-3 bg-white border-[#E2EFE7]">
        <div className="grid grid-cols-5 gap-2 text-center">
          {days.map((d) => {
            const isSelected = d.label + ', ' + d.date === selectedDay || d.active

            return (
              <button
                key={d.label}
                onClick={() => setSelectedDay(`${d.label}, ${d.date}`)}
                className={`py-3 px-2 rounded-2xl transition-all ${
                  isSelected
                    ? 'bg-[#7EC8A5] text-slate-900 shadow-soft font-bold'
                    : 'hover:bg-[#F2FAF6] text-slate-600'
                }`}
              >
                <div className="text-xs uppercase tracking-wider">{d.label}</div>
                <div className="text-sm sm:text-base font-extrabold mt-0.5">{d.date.split(' ')[1]}</div>
                <div className="text-[10px] opacity-80 mt-1">{d.count} blocks</div>
              </button>
            )
          })}
        </div>
      </Card>

      {/* Cognitive Guardrail Alert */}
      <div className="p-4 rounded-2xl bg-[#EAF7F0] border border-[#B9E4C9] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#2D5443] shadow-sm shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#58A983]" />
          </div>
          <p className="text-xs text-[#24523C] leading-relaxed">
            <strong>Optimal Pacing Guaranteed:</strong> No more than 2 consecutive hours of intense coding without a scheduled 30-minute mental break.
          </p>
        </div>
        <span className="text-xs font-semibold text-[#438D6C] hidden sm:inline">Protected Flow</span>
      </div>

      {/* Timeline Schedule List */}
      <div className="space-y-3.5">
        {events.map((ev) => (
          <Card
            key={ev.id}
            rounded="2xl"
            className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border transition-all ${
              ev.type === 'break'
                ? 'bg-amber-50/50 border-amber-200/70'
                : ev.type === 'exam'
                ? 'bg-rose-50/50 border-rose-200'
                : 'bg-white border-[#E2EFE7] hover:border-[#7EC8A5]'
            }`}
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="p-3 rounded-2xl bg-[#F8FCF9] border border-[#E2EFE7] text-slate-600 shrink-0 hidden sm:flex items-center justify-center">
                {ev.type === 'break' ? (
                  <Coffee className="w-5 h-5 text-amber-600" />
                ) : ev.type === 'class' ? (
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                ) : (
                  <Briefcase className="w-5 h-5 text-[#58A983]" />
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {getEventBadge(ev.type)}
                  <span className="text-xs font-semibold text-slate-500">{ev.duration}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">{ev.title}</h3>
                {ev.location && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ev.location}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-right shrink-0 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-[#EDF7F2]">
              <span className="text-xs font-bold text-slate-700 bg-[#F2FAF6] px-3 py-1.5 rounded-xl border border-[#DCF1E6]">
                {ev.time}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
