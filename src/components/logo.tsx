import React from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'icon' | 'full' | 'text'
}

export function Logo({ className, size = 'md', variant = 'full' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  // Icon component (stylized CF)
  const IconComponent = () => (
    <div
      className={cn(
        'flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold',
        sizeClasses[size],
        className
      )}
    >
      <span className={cn('font-mono', size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base')}>
        CF
      </span>
    </div>
  )

  if (variant === 'icon') {
    return <IconComponent />
  }

  if (variant === 'text') {
    return (
      <span className={cn('font-bold text-blue-700 dark:text-blue-400', textSizeClasses[size], className)}>
        CodigoFacil
      </span>
    )
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <IconComponent />
      <div className="flex flex-col">
        <span className={cn('font-bold text-blue-700 dark:text-blue-400', textSizeClasses[size])}>
          CodigoFacil
        </span>
        <span className="text-xs text-muted-foreground leading-none">CRM</span>
      </div>
    </div>
  )
}

// Alternative SVG logo for more sophisticated look
export function LogoSVG({ className, size = 'md' }: LogoProps) {
  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 48,
  }

  const svgSize = sizeMap[size]

  return (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <rect width="40" height="40" rx="8" fill="url(#gradient)" />
      <path
        d="M12 15.5C12 12.4624 14.4624 10 17.5 10H22.5C25.5376 10 28 12.4624 28 15.5C28 16.8807 27.4404 18.1307 26.5 19.0625"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M16 24.5C16 21.4624 18.4624 19 21.5 19H22.5C25.5376 19 28 21.4624 28 24.5C28 27.5376 25.5376 30 22.5 30H17.5C14.4624 30 12 27.5376 12 24.5C12 23.1193 12.5596 21.8693 13.5 20.9375"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
    </svg>
  )
}