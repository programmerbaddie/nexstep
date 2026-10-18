import React, { useState } from 'react'
import {
  ExternalLink,
  Sparkles,
  Bookmark,
  Building,
  MapPin,
  Calendar,
  CheckCircle,
} from 'lucide-react'
import { useNexStep } from '../hooks/useNexStepContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { DISCOVER_OPPORTUNITIES } from '../utils/dummyData'
import type { CareerOpportunity } from '../utils/dummyData'

export const DiscoverPage: React.FC = () => {
  const { addActionItem } = useNexStep()
  const [filter, setFilter] = useState<string>('All')
  const [savedIds, setSavedIds] = useState<string[]>([])

  const handleSaveToNextStep = (opp: CareerOpportunity) => {
    if (savedIds.includes(opp.id)) return

    addActionItem({
      title: `Prepare Application: ${opp.title} (${opp.company})`,
      category: 'career',
      courseOrCompany: opp.company,
      dueText: opp.deadline,
      estimatedMinutes: 30,
      priority: 'high',
      completed: false,
      aiReasoning: `Matched ${opp.matchScore}% with your current tech profile.`,
    })

    setSavedIds((prev) => [...prev, opp.id])
  }

  const categories = ['All', 'Internship', 'Hackathon', 'Open Source', 'Research']

  const filteredOpportunities = DISCOVER_OPPORTUNITIES.filter((item) => {
    if (filter === 'All') return true
    return item.type === filter
  })

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="career" size="md">
              <Sparkles className="w-3 h-3 text-emerald-700" /> Career & Community Radar
            </Badge>
            <span className="text-xs text-slate-500">Curated for CS & AI Juniors</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Discover Tech Opportunities
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            No spam job boards. Handpicked internships, open-source issues, and hackathons tailored to your coursework.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
              filter === cat
                ? 'bg-[#7EC8A5] text-slate-900 shadow-soft'
                : 'bg-white border border-[#E2EFE7] text-slate-600 hover:bg-[#F2FAF6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOpportunities.map((opp) => {
          const isSaved = savedIds.includes(opp.id)

          return (
            <Card
              key={opp.id}
              rounded="3xl"
              className="flex flex-col justify-between hover:border-[#7EC8A5] transition-all p-6 bg-white border-[#E2EFE7]"
            >
              <div className="space-y-4">
                {/* Top Row: Type & Match Score */}
                <div className="flex items-center justify-between">
                  <Badge
                    variant={
                      opp.type === 'Internship'
                        ? 'career'
                        : opp.type === 'Hackathon'
                        ? 'academic'
                        : opp.type === 'Research'
                        ? 'primary'
                        : 'neutral'
                    }
                    size="sm"
                  >
                    {opp.type}
                  </Badge>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E4F5ED] text-[#24523C] text-xs font-bold border border-[#B9E4C9]">
                    <Sparkles className="w-3 h-3 text-[#58A983]" />
                    <span>{opp.matchScore}% Match</span>
                  </div>
                </div>

                {/* Title & Company */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{opp.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Building className="w-3.5 h-3.5 text-slate-400" /> {opp.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {opp.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {opp.deadline}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">{opp.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {opp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium bg-[#F2FAF6] text-[#2D5443] px-2.5 py-1 rounded-xl border border-[#DCF1E6]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-5 mt-5 border-t border-[#EDF7F2] flex items-center justify-between gap-3">
                <Button
                  size="sm"
                  variant={isSaved ? 'outline' : 'primary'}
                  onClick={() => handleSaveToNextStep(opp)}
                  icon={isSaved ? <CheckCircle className="w-3.5 h-3.5 text-[#58A983]" /> : <Bookmark className="w-3.5 h-3.5" />}
                  className="rounded-xl text-xs"
                >
                  {isSaved ? 'Added to My Next Step' : 'Add to My Next Step'}
                </Button>

                <a
                  href={opp.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  <span>Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
