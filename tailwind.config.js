/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem', // 24px = 3 × 8px grid
      screens: { '2xl': '1280px' }, // 160 × 8px grid
    },
    extend: {
      colors: {
        // Base System Colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { 
          DEFAULT: 'hsl(var(--primary))', 
          foreground: 'hsl(var(--primary-foreground))' 
        },
        
        // Brutalist Palette
        brutalist: {
          black: '#0a0a0a',
          charcoal: '#1c1917',
          border: '#292524',
          blue: '#3b82f6',
          white: '#fafaf9',
        },
        
        // Pixel Art Palette (8-bit inspired)
        pixel: {
          red: '#ff0040',
          green: '#00ff41',
          yellow: '#ffff00',
          cyan: '#00ffff',
          magenta: '#ff00ff',
          orange: '#ff8800',
          purple: '#8800ff',
          lime: '#88ff00',
        },
        
        // Extended Stone Palette for Brutalism
        stone: {
          950: '#0a0a0a',
          900: '#1c1917',
          850: '#252220',
          800: '#292524',
          750: '#32302e',
          700: '#44403c',
          600: '#57534e',
          500: '#78716c',
          400: '#a8a29e',
          300: '#d6d3d1',
          200: '#e7e5e4',
          100: '#f5f5f4',
          50: '#fafaf9',
        },
      },
      
      fontFamily: {
        sans: [
          'JetBrains Mono',
          'Courier New',
          'monospace',
        ],
        mono: [
          'JetBrains Mono',
          'Courier New',
          'Monaco',
          'Inconsolata',
          'monospace'
        ],
        pixel: [
          'Press Start 2P',
          'Courier New',
          'monospace'
        ],
      },
      
      fontSize: {
        // 8px grid-based type scale
        'xs': ['0.625rem', { lineHeight: '1rem' }],      // 10px
        'sm': ['0.75rem', { lineHeight: '1rem' }],       // 12px
        'base': ['0.875rem', { lineHeight: '1.5rem' }],  // 14px
        'md': ['1rem', { lineHeight: '1.5rem' }],        // 16px
        'lg': ['1.25rem', { lineHeight: '2rem' }],       // 20px
        'xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px
        '2xl': ['2rem', { lineHeight: '2.5rem' }],       // 32px
        '3xl': ['3rem', { lineHeight: '3.5rem' }],       // 48px
        '4xl': ['4rem', { lineHeight: '4.5rem' }],       // 64px
        '5xl': ['5rem', { lineHeight: '5.5rem' }],       // 80px
      },
      
      spacing: {
        // 8px grid system
        '0': '0',
        '1': '0.5rem',   // 8px
        '2': '1rem',     // 16px
        '3': '1.5rem',   // 24px
        '4': '2rem',     // 32px
        '5': '2.5rem',   // 40px
        '6': '3rem',     // 48px
        '8': '4rem',     // 64px
        '10': '5rem',    // 80px
        '12': '6rem',    // 96px
        '16': '8rem',    // 128px
        '20': '10rem',   // 160px
        '24': '12rem',   // 192px
        '32': '16rem',   // 256px
      },
      
      borderWidth: {
        DEFAULT: '2px',
        '0': '0',
        '1': '1px',
        '2': '2px',
        '4': '4px',
        '8': '8px',
      },
      
      borderRadius: {
        none: '0',
        DEFAULT: '0',
      },
      
      boxShadow: {
        // Brutalist shadows (hard edges, no blur)
        'brutalist-sm': '2px 2px 0px 0px rgba(0, 0, 0, 1)',
        'brutalist': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'brutalist-md': '6px 6px 0px 0px rgba(0, 0, 0, 1)',
        'brutalist-lg': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        'brutalist-xl': '12px 12px 0px 0px rgba(0, 0, 0, 1)',
        
        // Colored brutalist shadows
        'brutalist-blue': '4px 4px 0px 0px rgba(59, 130, 246, 1)',
        'brutalist-blue-lg': '8px 8px 0px 0px rgba(59, 130, 246, 1)',
        'brutalist-border': '4px 4px 0px 0px rgba(41, 37, 36, 1)',
        
        // Pixel shadows
        'pixel': '2px 2px 0px 0px currentColor',
        'pixel-lg': '4px 4px 0px 0px currentColor',
        
        // No default shadows
        none: 'none',
      },
      
      dropShadow: {
        // No drop shadows in brutalism
        none: 'none',
      },
      
      backgroundImage: {
        // Pixel patterns
        'grid-8': 'linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)',
        'grid-16': 'linear-gradient(rgba(59, 130, 246, 0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(59, 130, 246, 0.05) 2px, transparent 2px)',
        'scanlines': 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0px, transparent 1px, transparent 2px, rgba(0, 0, 0, 0.15) 3px)',
        'dither': 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(59, 130, 246, 0.05) 2px, rgba(59, 130, 246, 0.05) 4px)',
        
        // Brutalist gradients (hard stops)
        'brutalist-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #1c1917 50%, #0a0a0a 100%)',
        'brutalist-gradient-blue': 'linear-gradient(180deg, #0a0a0a 0%, #1e3a8a 50%, #0a0a0a 100%)',
      },
      
      backgroundSize: {
        'grid-8': '8px 8px',
        'grid-16': '16px 16px',
      },
      
      keyframes: {
        // Pixel animations
        'pixel-blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'scanline-sweep': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-border': {
          '0%, 100%': { borderColor: 'rgba(41, 37, 36, 1)' },
          '50%': { borderColor: 'rgba(59, 130, 246, 1)' },
        },
      },
      
      animation: {
        'pixel-blink': 'pixel-blink 1s steps(1) infinite',
        'scanline': 'scanline-sweep 3s linear infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-in-up': 'slide-in-up 0.3s ease-out',
        'slide-in-down': 'slide-in-down 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'pulse-border': 'pulse-border 2s ease-in-out infinite',
      },
      
      transitionDuration: {
        '0': '0ms',
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
      },
      
      transitionTimingFunction: {
        'linear': 'linear',
        'steps-2': 'steps(2)',
        'steps-4': 'steps(4)',
        'steps-8': 'steps(8)',
      },
      
      letterSpacing: {
        tightest: '-0.05em',
        tighter: '-0.025em',
        tight: '-0.0125em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
        'pixel': '0.15em',
      },
      
      lineHeight: {
        none: '1',
        tight: '1.1',
        snug: '1.25',
        normal: '1.5',
        relaxed: '1.75',
        loose: '2',
        'pixel': '1.6',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // Custom plugin for brutalist utilities
    function({ addUtilities }) {
      const newUtilities = {
        '.border-brutalist': {
          borderWidth: '2px',
          borderStyle: 'solid',
          borderRadius: '0',
        },
        '.border-brutalist-thick': {
          borderWidth: '4px',
          borderStyle: 'solid',
          borderRadius: '0',
        },
        '.text-pixel': {
          fontFamily: '"Press Start 2P", "Courier New", monospace',
          lineHeight: '1.6',
          letterSpacing: '0.05em',
        },
        '.no-smooth': {
          '-webkit-font-smoothing': 'none',
          '-moz-osx-font-smoothing': 'grayscale',
        },
        '.pixel-perfect': {
          'image-rendering': 'pixelated',
          'image-rendering': '-moz-crisp-edges',
          'image-rendering': 'crisp-edges',
        },
        '.force-sharp': {
          '*': {
            borderRadius: '0 !important',
          },
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
