/**
 * Brutalist Pattern Components
 * Reusable UI patterns for the brutalist design system
 */

import { ReactNode } from 'react'

interface PatternProps {
  children?: ReactNode
  className?: string
}

// Pixel Grid Background
export function PixelGrid({ children, className = '' }: PatternProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-grid-8 opacity-30 pointer-events-none" 
           style={{ backgroundSize: '8px 8px' }} />
      {children}
    </div>
  )
}

// Scanline Overlay
export function Scanlines({ children, className = '' }: PatternProps) {
  return (
    <div className={`relative scanlines ${className}`}>
      {children}
    </div>
  )
}

// Dither Pattern Background
export function DitherPattern({ children, className = '' }: PatternProps) {
  return (
    <div className={`relative dither-pattern ${className}`}>
      {children}
    </div>
  )
}

// Checkerboard Background
export function Checkerboard({ children, className = '' }: PatternProps) {
  return (
    <div className={`relative checkerboard ${className}`}>
      {children}
    </div>
  )
}

// Brutalist Container
export function BrutalistContainer({ children, className = '' }: PatternProps) {
  return (
    <div className={`max-w-screen-xl mx-auto px-6 ${className}`}>
      {children}
    </div>
  )
}

// Brutalist Section
export function BrutalistSection({ children, className = '' }: PatternProps) {
  return (
    <section className={`py-24 border-t-2 border-stone-800 ${className}`}>
      {children}
    </section>
  )
}

// Pixel Box (decorative element)
export function PixelBox({ 
  size = 'md', 
  color = 'blue', 
  className = '' 
}: { 
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'blue' | 'red' | 'green' | 'yellow' | 'cyan' | 'magenta'
  className?: string 
}) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  }

  const colorClasses = {
    blue: 'bg-blue-500 border-blue-500',
    red: 'bg-pixel-red border-pixel-red',
    green: 'bg-pixel-green border-pixel-green',
    yellow: 'bg-pixel-yellow border-pixel-yellow',
    cyan: 'bg-pixel-cyan border-pixel-cyan',
    magenta: 'bg-pixel-magenta border-pixel-magenta',
  }

  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} border-2 ${className}`} />
  )
}

// Brutalist Divider
export function BrutalistDivider({ 
  thickness = 'standard',
  className = '' 
}: { 
  thickness?: 'thin' | 'standard' | 'thick'
  className?: string 
}) {
  const thicknessClasses = {
    thin: 'border-t',
    standard: 'border-t-2',
    thick: 'border-t-4',
  }

  return (
    <div className={`${thicknessClasses[thickness]} border-stone-800 my-8 ${className}`} />
  )
}

// Pixel Badge
export function PixelBadge({ 
  children, 
  variant = 'default',
  className = '' 
}: { 
  children: ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  className?: string 
}) {
  const variantClasses = {
    default: 'pixel-badge',
    primary: 'pixel-badge-primary',
    success: 'pixel-badge-success',
    warning: 'pixel-badge-warning',
    danger: 'pixel-badge-danger',
  }

  return (
    <span className={`${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}

// Brutalist Card with Shadow
export function BrutalistCard({ 
  children, 
  hover = true,
  highlight = false,
  className = '' 
}: { 
  children: ReactNode
  hover?: boolean
  highlight?: boolean
  className?: string 
}) {
  const baseClass = highlight ? 'card-brutalist-highlight' : 'card-brutalist'
  const hoverClass = hover ? 'hover:border-blue-500 hover:shadow-brutalist-border' : ''

  return (
    <div className={`${baseClass} ${hoverClass} ${className}`}>
      {children}
    </div>
  )
}

// Pixel Progress Bar
export function PixelProgressBar({ 
  progress = 0, 
  color = 'blue',
  height = 'md',
  showLabel = false,
  className = '' 
}: { 
  progress: number
  color?: 'blue' | 'green' | 'yellow' | 'red'
  height?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string 
}) {
  const heightClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-8',
  }

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-pixel-green',
    yellow: 'bg-pixel-yellow',
    red: 'bg-pixel-red',
  }

  const clampedProgress = Math.min(100, Math.max(0, progress))

  return (
    <div className={`relative ${className}`}>
      <div className={`w-full ${heightClasses[height]} bg-stone-900 border-2 border-stone-800 overflow-hidden`}>
        <div 
          className={`${heightClasses[height]} ${colorClasses[color]} transition-all duration-300`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showLabel && (
        <div className="text-xs uppercase font-bold text-stone-400 mt-1">
          {clampedProgress}%
        </div>
      )}
    </div>
  )
}

// Brutalist Alert Box
export function BrutalistAlert({ 
  children, 
  type = 'info',
  className = '' 
}: { 
  children: ReactNode
  type?: 'info' | 'success' | 'warning' | 'error'
  className?: string 
}) {
  const typeStyles = {
    info: 'bg-stone-900 border-blue-500 text-blue-500',
    success: 'bg-stone-900 border-pixel-green text-pixel-green',
    warning: 'bg-stone-900 border-pixel-yellow text-pixel-yellow',
    error: 'bg-stone-900 border-pixel-red text-pixel-red',
  }

  return (
    <div className={`p-4 border-2 ${typeStyles[type]} ${className}`}>
      {children}
    </div>
  )
}

// Pixel Spinner/Loader
export function PixelSpinner({ 
  size = 'md',
  className = '' 
}: { 
  size?: 'sm' | 'md' | 'lg'
  className?: string 
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-16 h-16',
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full border-2 border-stone-800 border-t-blue-500 animate-spin" />
    </div>
  )
}

// Brutalist Tooltip
export function BrutalistTooltip({ 
  children, 
  text,
  position = 'top',
  className = '' 
}: { 
  children: ReactNode
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string 
}) {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div className={`relative group ${className}`}>
      {children}
      <div className={`absolute ${positionClasses[position]} hidden group-hover:block z-50`}>
        <div className="bg-stone-900 border-2 border-blue-500 px-3 py-2 text-xs uppercase font-bold text-stone-50 whitespace-nowrap">
          {text}
        </div>
      </div>
    </div>
  )
}

// Pixel Grid Layout
export function PixelGridLayout({ 
  children, 
  columns = 3,
  gap = 'md',
  className = '' 
}: { 
  children: ReactNode
  columns?: 1 | 2 | 3 | 4 | 6
  gap?: 'sm' | 'md' | 'lg'
  className?: string 
}) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  }

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-8',
    lg: 'gap-12',
  }

  return (
    <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  )
}

// Brutalist Button Group
export function BrutalistButtonGroup({ 
  children, 
  className = '' 
}: PatternProps) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {children}
    </div>
  )
}

// Pixel Stat Display
export function PixelStat({ 
  label, 
  value, 
  unit = '',
  color = 'blue',
  className = '' 
}: { 
  label: string
  value: string | number
  unit?: string
  color?: 'blue' | 'green' | 'yellow' | 'red'
  className?: string 
}) {
  const colorClasses = {
    blue: 'text-blue-500',
    green: 'text-pixel-green',
    yellow: 'text-pixel-yellow',
    red: 'text-pixel-red',
  }

  return (
    <div className={`text-center ${className}`}>
      <div className={`text-4xl md:text-6xl font-bold uppercase ${colorClasses[color]} tabular-nums`}>
        {value}{unit}
      </div>
      <div className="text-sm uppercase text-stone-400 mt-2">
        {label}
      </div>
    </div>
  )
}

// Brutalist Feature Card
export function BrutalistFeatureCard({ 
  icon, 
  title, 
  description,
  className = '' 
}: { 
  icon: ReactNode
  title: string
  description: string
  className?: string 
}) {
  return (
    <div className={`card-brutalist text-center ${className}`}>
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold uppercase text-stone-50 mb-2">
        {title}
      </h3>
      <p className="text-stone-400 text-sm uppercase">
        {description}
      </p>
    </div>
  )
}

// Pixel Separator
export function PixelSeparator({ 
  pattern = 'dots',
  className = '' 
}: { 
  pattern?: 'dots' | 'dashes' | 'squares'
  className?: string 
}) {
  const patterns = {
    dots: '• • • • •',
    dashes: '- - - - -',
    squares: '■ ■ ■ ■ ■',
  }

  return (
    <div className={`text-center text-stone-800 text-2xl my-8 ${className}`}>
      {patterns[pattern]}
    </div>
  )
}
