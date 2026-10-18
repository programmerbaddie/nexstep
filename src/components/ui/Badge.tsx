import React from 'react'
import { cn } from '../../utils/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'academic' | 'career' | 'wellbeing' | 'neutral' | 'urgent'
  size?: 'sm' | 'md'
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-[#E4F5ED] text-[#2D5443] border border-[#B9E4C9]',
    secondary: 'bg-[#F2FAF6] text-[#438D6C] border border-[#DCF1E6]',
    academic: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
    career: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    wellbeing: 'bg-amber-50 text-amber-800 border border-amber-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    urgent: 'bg-rose-50 text-rose-700 border border-rose-200',
  }

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-lg font-medium',
    md: 'text-xs px-2.5 py-1 rounded-xl font-medium',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
