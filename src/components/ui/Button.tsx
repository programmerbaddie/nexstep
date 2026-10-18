import React from 'react'
import { cn } from '../../utils/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'soft' | 'calm'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none'
  
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-xl gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-2xl gap-2',
    lg: 'text-base px-6 py-3.5 rounded-2xl gap-2.5 font-semibold',
  }

  const variantStyles = {
    primary: 'bg-[#7EC8A5] text-slate-900 hover:bg-[#6DBB96] shadow-sm hover:shadow-soft',
    secondary: 'bg-[#B9E4C9] text-slate-900 hover:bg-[#A3D9BE] shadow-sm',
    soft: 'bg-[#EAF7F0] text-[#2D5443] hover:bg-[#D5EFE1]',
    outline: 'border border-[#CBEBDC] text-slate-700 hover:bg-[#F2FAF6] hover:border-[#7EC8A5]',
    ghost: 'text-slate-600 hover:bg-[#EAF7F0] hover:text-slate-900',
    calm: 'bg-white/80 backdrop-blur-md text-[#2D5443] border border-[#B9E4C9] hover:bg-white shadow-soft',
  }

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  )
}
