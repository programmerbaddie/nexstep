import React from 'react'
import { cn } from '../../utils/cn'

export interface ProgressBarProps {
  value: number // 0-100
  label?: string
  sublabel?: string
  className?: string
  color?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  sublabel,
  className,
  color = 'bg-[#7EC8A5]',
}) => {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {(label || sublabel) && (
        <div className="flex justify-between items-center text-xs">
          {label && <span className="font-medium text-slate-700">{label}</span>}
          {sublabel && <span className="text-slate-500 font-normal">{sublabel}</span>}
        </div>
      )}
      <div className="w-full bg-[#EAF7F0] h-2.5 rounded-full overflow-hidden p-0.5 border border-[#DCF1E6]">
        <div
          className={cn('h-full rounded-full transition-all duration-500', color)}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}
