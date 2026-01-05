/**
 * Pixel Art Icon Components
 * 16x16 and 24x24 grid-based icons for brutalist design
 */

interface IconProps {
  className?: string
  size?: 16 | 24 | 32
}

// Shopping Cart Icon (16x16)
export function CartIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="2" y="4" width="12" height="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="5" y="13" width="2" height="2" fill="currentColor" />
      <rect x="10" y="13" width="2" height="2" fill="currentColor" />
      <path d="M4 4L3 1H1" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  )
}

// Menu Icon (16x16)
export function MenuIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="2" y="3" width="12" height="2" fill="currentColor" />
      <rect x="2" y="7" width="12" height="2" fill="currentColor" />
      <rect x="2" y="11" width="12" height="2" fill="currentColor" />
    </svg>
  )
}

// Close Icon (16x16)
export function CloseIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="3" y="3" width="2" height="2" fill="currentColor" />
      <rect x="5" y="5" width="2" height="2" fill="currentColor" />
      <rect x="7" y="7" width="2" height="2" fill="currentColor" />
      <rect x="9" y="5" width="2" height="2" fill="currentColor" />
      <rect x="11" y="3" width="2" height="2" fill="currentColor" />
      <rect x="3" y="11" width="2" height="2" fill="currentColor" />
      <rect x="5" y="9" width="2" height="2" fill="currentColor" />
      <rect x="9" y="9" width="2" height="2" fill="currentColor" />
      <rect x="11" y="11" width="2" height="2" fill="currentColor" />
    </svg>
  )
}

// Arrow Right Icon (16x16)
export function ArrowRightIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="2" y="7" width="10" height="2" fill="currentColor" />
      <rect x="10" y="5" width="2" height="2" fill="currentColor" />
      <rect x="12" y="7" width="2" height="2" fill="currentColor" />
      <rect x="10" y="9" width="2" height="2" fill="currentColor" />
    </svg>
  )
}

// Arrow Left Icon (16x16)
export function ArrowLeftIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="4" y="7" width="10" height="2" fill="currentColor" />
      <rect x="4" y="5" width="2" height="2" fill="currentColor" />
      <rect x="2" y="7" width="2" height="2" fill="currentColor" />
      <rect x="4" y="9" width="2" height="2" fill="currentColor" />
    </svg>
  )
}

// Check Icon (16x16)
export function CheckIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="2" y="8" width="2" height="2" fill="currentColor" />
      <rect x="4" y="10" width="2" height="2" fill="currentColor" />
      <rect x="6" y="12" width="2" height="2" fill="currentColor" />
      <rect x="8" y="10" width="2" height="2" fill="currentColor" />
      <rect x="10" y="8" width="2" height="2" fill="currentColor" />
      <rect x="12" y="6" width="2" height="2" fill="currentColor" />
    </svg>
  )
}

// Plus Icon (16x16)
export function PlusIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="7" y="2" width="2" height="12" fill="currentColor" />
      <rect x="2" y="7" width="12" height="2" fill="currentColor" />
    </svg>
  )
}

// Minus Icon (16x16)
export function MinusIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="2" y="7" width="12" height="2" fill="currentColor" />
    </svg>
  )
}

// Star Icon (16x16)
export function StarIcon({ className = '', size = 16, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="7" y="2" width="2" height="2" fill="currentColor" />
      <rect x="5" y="6" width="6" height="2" fill="currentColor" />
      <rect x="3" y="8" width="10" height="2" fill="currentColor" />
      <rect x="5" y="10" width="2" height="2" fill="currentColor" />
      <rect x="9" y="10" width="2" height="2" fill="currentColor" />
      <rect x="6" y="12" width="4" height="2" fill="currentColor" />
      {filled && (
        <>
          <rect x="7" y="4" width="2" height="2" fill="currentColor" />
          <rect x="5" y="8" width="6" height="2" fill="currentColor" />
        </>
      )}
    </svg>
  )
}

// Heart Icon (16x16)
export function HeartIcon({ className = '', size = 16, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="3" y="4" width="4" height="2" fill="currentColor" />
      <rect x="9" y="4" width="4" height="2" fill="currentColor" />
      <rect x="2" y="6" width="2" height="2" fill="currentColor" />
      <rect x="12" y="6" width="2" height="2" fill="currentColor" />
      <rect x="2" y="8" width="12" height="2" fill="currentColor" />
      <rect x="3" y="10" width="10" height="2" fill="currentColor" />
      <rect x="5" y="12" width="6" height="2" fill="currentColor" />
      <rect x="7" y="14" width="2" height="2" fill="currentColor" />
      {filled && (
        <>
          <rect x="4" y="6" width="8" height="2" fill="currentColor" />
          <rect x="3" y="8" width="10" height="2" fill="currentColor" />
          <rect x="5" y="10" width="6" height="2" fill="currentColor" />
        </>
      )}
    </svg>
  )
}

// Search Icon (16x16)
export function SearchIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="4" y="2" width="6" height="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="2" y="4" width="2" height="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="10" y="4" width="2" height="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="4" y="10" width="6" height="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="11" y="11" width="2" height="2" fill="currentColor" />
      <rect x="13" y="13" width="2" height="2" fill="currentColor" />
    </svg>
  )
}

// User Icon (16x16)
export function UserIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="6" y="2" width="4" height="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="4" y="8" width="8" height="6" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  )
}

// Info Icon (16x16)
export function InfoIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="2" y="2" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="7" y="4" width="2" height="2" fill="currentColor" />
      <rect x="7" y="7" width="2" height="6" fill="currentColor" />
    </svg>
  )
}

// Warning Icon (16x16)
export function WarningIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <path d="M8 2L2 14H14L8 2Z" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="7" y="6" width="2" height="4" fill="currentColor" />
      <rect x="7" y="11" width="2" height="2" fill="currentColor" />
    </svg>
  )
}

// Lock Icon (16x16)
export function LockIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="5" y="2" width="6" height="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="3" y="6" width="10" height="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="7" y="9" width="2" height="3" fill="currentColor" />
    </svg>
  )
}

// External Link Icon (16x16)
export function ExternalLinkIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="2" y="4" width="10" height="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="9" y="2" width="5" height="2" fill="currentColor" />
      <rect x="12" y="2" width="2" height="5" fill="currentColor" />
      <rect x="10" y="4" width="2" height="2" fill="currentColor" />
      <rect x="8" y="6" width="2" height="2" fill="currentColor" />
    </svg>
  )
}

// Download Icon (16x16)
export function DownloadIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="7" y="2" width="2" height="8" fill="currentColor" />
      <rect x="5" y="8" width="2" height="2" fill="currentColor" />
      <rect x="9" y="8" width="2" height="2" fill="currentColor" />
      <rect x="4" y="10" width="2" height="2" fill="currentColor" />
      <rect x="10" y="10" width="2" height="2" fill="currentColor" />
      <rect x="2" y="13" width="12" height="2" fill="currentColor" />
    </svg>
  )
}

// Pixel Logo Component (24x24)
export function PixelLogo({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* B shape */}
      <rect x="4" y="4" width="2" height="16" fill="currentColor" />
      <rect x="6" y="4" width="8" height="2" fill="currentColor" />
      <rect x="14" y="6" width="2" height="4" fill="currentColor" />
      <rect x="6" y="10" width="8" height="2" fill="currentColor" />
      <rect x="14" y="12" width="2" height="6" fill="currentColor" />
      <rect x="6" y="18" width="8" height="2" fill="currentColor" />
    </svg>
  )
}
