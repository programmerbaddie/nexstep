import React from 'react'
import { cn } from '../../utils/cn'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'outline' | 'interactive' | 'accent' | 'calm'
  rounded?: 'xl' | '2xl' | '3xl'
  padded?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  rounded = '3xl',
  padded = true,
  ...props
}) => {
  const roundedStyles = {
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  }

  const variantStyles = {
    default: 'bg-white border border-[#E4F2EB] shadow-card',
    flat: 'bg-[#F2FAF6] border border-[#DCF1E6]',
    outline: 'bg-transparent border border-[#CBEBDC]',
    interactive: 'bg-white border border-[#E4F2EB] shadow-card hover:shadow-soft hover:border-[#7EC8A5]/60 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer',
    accent: 'bg-gradient-to-br from-[#F2FAF6] via-white to-[#EAF7F0] border border-[#B9E4C9] shadow-soft',
    calm: 'bg-white/70 backdrop-blur-md border border-[#B9E4C9]/60 shadow-soft',
  }

  return (
    <div
      className={cn(
        roundedStyles[rounded],
        variantStyles[variant],
        padded && 'p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn('flex items-center justify-between gap-4 mb-4', className)} {...props}>
    {children}
  </div>
)

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h3 className={cn('text-lg font-semibold text-slate-800 tracking-tight', className)} {...props}>
    {children}
  </h3>
)

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => (
  <p className={cn('text-sm text-slate-500 font-normal', className)} {...props}>
    {children}
  </p>
)
