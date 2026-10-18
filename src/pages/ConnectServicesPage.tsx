import React from 'react'
import {
  Radio,
  GraduationCap,
  Calendar,
  Code2,
  FileText,
  Music2,
  CheckCircle2,
  Shield,
  RefreshCw,
} from 'lucide-react'
import { GithubIcon } from '../components/icons/GithubIcon'
import { useNexStep } from '../hooks/useNexStepContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

export const ConnectServicesPage: React.FC = () => {
  const { services, toggleServiceConnection } = useNexStep()

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github':
        return <GithubIcon className="w-6 h-6 text-slate-800" />
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-indigo-600" />
      case 'Calendar':
        return <Calendar className="w-6 h-6 text-blue-600" />
      case 'Code2':
        return <Code2 className="w-6 h-6 text-amber-600" />
      case 'FileText':
        return <FileText className="w-6 h-6 text-slate-700" />
      case 'Music2':
        return <Music2 className="w-6 h-6 text-emerald-600" />
      default:
        return <Radio className="w-6 h-6 text-slate-600" />
    }
  }

  const connectedCount = services.filter((s) => s.status === 'connected').length

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary">Integrations Hub</Badge>
            <span className="text-xs text-slate-500 font-medium">
              {connectedCount} of {services.length} active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Connect Your Tech Ecosystem
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            NexStep unifies your coursework, coding platforms, and calendar into one coherent student pulse.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />}>
            Sync All Now
          </Button>
        </div>
      </div>

      {/* Privacy Guarantee Banner */}
      <div className="p-4 rounded-2xl bg-[#EAF7F0] border border-[#B9E4C9] flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#2D5443] shrink-0 shadow-sm">
          <Shield className="w-4 h-4" />
        </div>
        <div className="text-xs text-[#24523C] leading-relaxed">
          <strong className="font-semibold">Privacy First:</strong> We only request read-only scopes.
          Your code repositories, grades, and calendar entries remain private to your local browser environment.
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => {
          const isConnected = service.status === 'connected'

          return (
            <Card
              key={service.id}
              rounded="3xl"
              className={`transition-all duration-200 ${
                isConnected
                  ? 'border-[#B9E4C9] bg-gradient-to-br from-white to-[#F7FCF9]'
                  : 'border-[#E2EFE7] bg-white opacity-85'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#F2FAF6] border border-[#DCF1E6] flex items-center justify-center">
                    {getServiceIcon(service.icon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{service.name}</h3>
                    <span className="text-xs text-slate-400 capitalize">{service.category}</span>
                  </div>
                </div>

                <Badge variant={isConnected ? 'primary' : 'neutral'} size="sm">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </Badge>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {service.description}
              </p>

              {isConnected && service.stats && (
                <div className="mb-4 p-2.5 rounded-xl bg-[#F2FAF6] border border-[#DCF1E6] text-xs text-[#2D5443] flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#58A983] shrink-0" />
                  <span className="font-medium truncate">{service.stats}</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#EDF7F2] flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {isConnected && service.lastSync ? `Updated ${service.lastSync}` : 'Ready to link'}
                </span>

                <Button
                  size="sm"
                  variant={isConnected ? 'outline' : 'primary'}
                  onClick={() => toggleServiceConnection(service.id)}
                  className="rounded-xl"
                >
                  {isConnected ? 'Disconnect' : 'Connect Account'}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
