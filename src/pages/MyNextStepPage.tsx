import React, { useState } from 'react'
import {
  Sparkles,
  Footprints,
  CheckCircle2,
  Circle,
  Clock,
  Plus,
  Brain,
} from 'lucide-react'
import { useNexStep } from '../hooks/useNexStepContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'

export const MyNextStepPage: React.FC = () => {
  const { actionItems, toggleActionItem, addActionItem, todayCheckin } = useNexStep()

  const [activeFilter, setActiveFilter] = useState<'all' | 'academic' | 'career' | 'wellbeing'>('all')
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState<'academic' | 'career' | 'wellbeing'>('academic')
  const [newCourse, setNewCourse] = useState('')
  const [newEst, setNewEst] = useState(30)

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    addActionItem({
      title: newTitle.trim(),
      category: newCategory,
      courseOrCompany: newCourse.trim() || undefined,
      dueText: 'Today',
      estimatedMinutes: Number(newEst) || 30,
      priority: 'high',
      completed: false,
      aiReasoning: 'Custom task prioritized according to your daily goals.',
    })

    setNewTitle('')
    setNewCourse('')
    setShowAddModal(false)
  }

  const filteredItems = actionItems.filter((item) => {
    if (activeFilter === 'all') return true
    return item.category === activeFilter
  })

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="md">
              <Sparkles className="w-3 h-3" /> Adaptive Sequence Engine
            </Badge>
            <span className="text-xs text-slate-500">
              Synced with your {todayCheckin?.mood || 'calm'} state
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Next Step
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Instead of an overwhelming 30-item to-do list, NexStep surfaces the exact single step that delivers maximum momentum right now.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowAddModal(true)}
          icon={<Plus className="w-4 h-4" />}
          className="rounded-2xl shadow-soft"
        >
          Add Next Step
        </Button>
      </div>

      {/* AI Decision Architecture Explainer */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-[#F2FAF6] via-white to-[#EAF7F0] border border-[#B9E4C9] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#7EC8A5] flex items-center justify-center text-slate-900 shadow-soft shrink-0">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#24523C] uppercase tracking-wider">
              How Your Sequence is Generated
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Weighting: 40% Canvas Lab Urgency + 30% Check-in Energy + 20% Internship Windows + 10% Spaced Repetition.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#7EC8A5] animate-ping" />
          <span>Real-time calibration</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E2EFE7] pb-3">
        {(['all', 'academic', 'career', 'wellbeing'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
              activeFilter === filter
                ? 'bg-[#7EC8A5] text-slate-900 shadow-xs'
                : 'text-slate-600 hover:bg-[#EAF7F0] hover:text-slate-900'
            }`}
          >
            {filter === 'all' ? 'All Steps' : filter}
          </button>
        ))}
      </div>

      {/* Sequential Task List */}
      <div className="space-y-4">
        {filteredItems.map((item, index) => {
          const isDone = item.completed
          const isCurrentFocus = !isDone && index === 0

          return (
            <Card
              key={item.id}
              rounded="3xl"
              className={`transition-all duration-200 ${
                isCurrentFocus
                  ? 'border-2 border-[#7EC8A5] bg-gradient-to-br from-white via-[#F7FCF9] to-[#EBF6F0] shadow-soft p-6 sm:p-7'
                  : isDone
                  ? 'bg-[#F8FCF9] border-[#E2EFE7] opacity-60 p-5'
                  : 'bg-white border-[#E2EFE7] p-5 hover:border-[#B9E4C9]'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5 flex-1">
                  <button
                    onClick={() => toggleActionItem(item.id)}
                    className="mt-1 text-slate-400 hover:text-[#5BAE87] transition-colors"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6 text-[#58A983] fill-[#E4F5ED]" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {isCurrentFocus && (
                        <Badge variant="primary" size="sm">
                          <Footprints className="w-3 h-3" /> Step #1 Focus
                        </Badge>
                      )}
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
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5" /> {item.estimatedMinutes} mins
                      </span>
                    </div>

                    <h3
                      className={`text-base sm:text-lg font-bold ${
                        isDone ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </h3>

                    {item.aiReasoning && (
                      <p className="text-xs text-slate-600 leading-relaxed bg-white/60 p-2.5 rounded-xl border border-[#E2EFE7] inline-block">
                        <strong>AI Context:</strong> {item.aiReasoning}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EBF5EF]">
                  <span className="text-xs font-semibold text-slate-500">{item.dueText}</span>
                  <Button
                    size="sm"
                    variant={isDone ? 'outline' : 'primary'}
                    onClick={() => toggleActionItem(item.id)}
                    className="rounded-xl"
                  >
                    {isDone ? 'Completed' : 'Do This Now'}
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
          <Card rounded="3xl" className="w-full max-w-md p-6 bg-white space-y-4 shadow-soft-lg">
            <h3 className="text-lg font-bold text-slate-900">Add Next Step Action</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <Input
                label="Task Description"
                placeholder="e.g. Implement Binary Search Tree deletion"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
              />

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase">Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['academic', 'career', 'wellbeing'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewCategory(cat)}
                      className={`py-2 text-xs font-semibold rounded-xl border capitalize transition-all ${
                        newCategory === cat
                          ? 'bg-[#E4F5ED] border-[#7EC8A5] text-[#2D5443]'
                          : 'bg-white border-[#E2EFE7] text-slate-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Course / Platform (Optional)"
                placeholder="CS 452 or LeetCode"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
              />

              <Input
                label="Estimated Minutes"
                type="number"
                min="5"
                max="180"
                value={newEst}
                onChange={(e) => setNewEst(Number(e.target.value))}
              />

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" size="sm" type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Next Step
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
