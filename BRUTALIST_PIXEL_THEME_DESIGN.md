# BenchBarrier Brutalist/Pixel Theme Design System

## Design Philosophy

### Core Principles
1. **Brutalism**: Raw, functional, honest design with no unnecessary decoration
2. **Pixel-Perfect**: Grid-based layout with 8px base unit, sharp edges, monospace typography
3. **High Contrast**: Strong black/white contrast with electric blue accents
4. **Geometric**: Square shapes, thick borders, blocky elements
5. **Retro-Digital**: 8-bit/16-bit gaming aesthetic meets Swiss design

## Color Palette

### Primary Colors
- **Background**: `#0a0a0a` (stone-950) - Deep black
- **Surface**: `#1c1917` (stone-900) - Dark charcoal
- **Border**: `#292524` (stone-800) - Medium charcoal
- **Accent**: `#3b82f6` (blue-500) - Electric blue
- **Text**: `#fafaf9` (stone-50) - Off-white

### Pixel Art Palette (8-bit inspired)
- **Pixel Red**: `#ff0040` - Danger/Error
- **Pixel Green**: `#00ff41` - Success
- **Pixel Yellow**: `#ffff00` - Warning
- **Pixel Cyan**: `#00ffff` - Info
- **Pixel Magenta**: `#ff00ff` - Highlight

## Typography

### Font Stack
- **Primary**: JetBrains Mono (monospace, pixel-perfect)
- **Display**: Press Start 2P (8-bit pixel font for headers)
- **Fallback**: Courier New, monospace

### Type Scale (8px grid)
- **XS**: 10px (0.625rem)
- **SM**: 12px (0.75rem)
- **Base**: 14px (0.875rem)
- **MD**: 16px (1rem)
- **LG**: 20px (1.25rem)
- **XL**: 24px (1.5rem)
- **2XL**: 32px (2rem)
- **3XL**: 48px (3rem)
- **4XL**: 64px (4rem)

## Layout System

### Grid System
- **Base Unit**: 8px
- **Spacing Scale**: 8, 16, 24, 32, 40, 48, 64, 80, 96, 128px
- **Container Max Width**: 1280px (160 × 8px)
- **Gutter**: 24px (3 × 8px)

### Borders
- **Thin**: 1px
- **Standard**: 2px
- **Thick**: 4px
- **Extra Thick**: 8px

## Component Patterns

### Buttons
- **Style**: Thick 2px borders, no border-radius
- **States**: Solid fill (primary), outline (secondary), inverted on hover
- **Padding**: 12px 24px (1.5 × 8px, 3 × 8px)
- **Typography**: Uppercase, bold, letter-spacing: 0.05em

### Cards
- **Border**: 2px solid border
- **Background**: stone-900
- **Padding**: 24px (3 × 8px)
- **Shadow**: None (flat design)

### Inputs
- **Border**: 2px solid border
- **Background**: stone-900
- **Padding**: 12px 16px
- **Focus**: Blue border, no glow

### Icons
- **Style**: Pixel art, 16×16 or 24×24 grid
- **Stroke**: 2px thick lines
- **Fill**: Solid colors only

## Pixel Art Elements

### Decorative Patterns
1. **Checkerboard**: Alternating 8×8px squares
2. **Scanlines**: Horizontal 1px lines every 4px
3. **Grid Overlay**: 8×8px grid pattern
4. **Dither Pattern**: 2×2px alternating pattern for gradients

### Pixel Icons
- Shopping cart (16×16)
- Menu hamburger (16×16)
- Arrow indicators (8×8)
- Product badges (24×24)
- Social media icons (16×16)

## Animation Principles

### Timing
- **Fast**: 100ms (UI feedback)
- **Standard**: 200ms (transitions)
- **Slow**: 300ms (page transitions)
- **Easing**: Linear or steps() for pixel aesthetic

### Effects
1. **Pixel Fade**: Dither pattern fade in/out
2. **Scanline Sweep**: Horizontal line animation
3. **Glitch**: Brief horizontal offset
4. **Blink**: 500ms on/off for emphasis

## Brutalist UI Patterns

### Navigation
- Fixed header with thick bottom border
- Uppercase text, bold weight
- No dropdowns, flat hierarchy
- Mobile: Full-screen overlay menu

### Hero Sections
- Full viewport height
- Centered content
- Large, bold typography
- Minimal imagery (geometric patterns)

### Product Cards
- Square aspect ratio
- Thick borders
- Flat product images
- Bold price display
- Sharp hover states (no smooth transitions)

### Forms
- Stacked labels above inputs
- Thick borders, no shadows
- Clear error states (red border + text)
- Submit buttons: full-width, bold

## Accessibility

### Contrast Ratios
- Text on background: 15:1 (AAA)
- Accent on background: 7:1 (AA)
- Border visibility: 3:1 minimum

### Focus States
- 2px solid blue outline
- No blur/glow effects
- High visibility on all interactive elements

### Typography
- Minimum 14px body text
- Maximum 80 characters per line
- 1.5 line-height for readability

## Implementation Strategy

### Phase 1: Foundation (Current Task)
1. Update globals.css with pixel-perfect utilities
2. Enhance Tailwind config with brutalist tokens
3. Create pixel icon components
4. Update homepage with new aesthetic

### Phase 2: Components
1. Build brutalist button variants
2. Create pixel-art icon library
3. Design brutalist form components
4. Implement pixel pattern backgrounds

### Phase 3: Polish
1. Add subtle pixel animations
2. Implement scanline effects
3. Create loading states
4. Add micro-interactions

## Design References

### Inspiration
- 8-bit/16-bit video game UIs
- Swiss International Style (grid, typography)
- Brutalist architecture (raw, functional)
- Early web design (GeoCities, Angelfire)
- Terminal/command-line interfaces

### Modern Examples
- Balenciaga website (brutalist e-commerce)
- Bloomberg Businessweek (bold typography)
- Craigslist (functional, minimal)
- Hacker News (text-focused, efficient)

## Success Metrics

### Visual Quality
- Zero border-radius throughout site
- Consistent 8px grid alignment
- High contrast (15:1 text ratio)
- Pixel-perfect icon rendering

### Performance
- No heavy animations
- Minimal CSS (utility-first)
- Fast page loads (<2s)
- 60fps interactions

### Brand Alignment
- Professional yet edgy
- Technical/engineering focus
- Premium quality perception
- Memorable visual identity
