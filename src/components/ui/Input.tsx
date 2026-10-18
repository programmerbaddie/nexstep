import React from 'react'
import { cn } from '../../utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
              {icon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              'w-full bg-white border border-[#D5EAE0] rounded-2xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200 outline-none',
              'focus:border-[#7EC8A5] focus:ring-4 focus:ring-[#7EC8A5]/20',
              icon && 'pl-10',
              error && 'border-rose-300 focus:border-rose-400 focus:ring-rose-100',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
