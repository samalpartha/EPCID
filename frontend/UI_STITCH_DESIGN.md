# EPCID Stitch-Inspired UI Design

<div align="center">

# 🎨 EPCID
## Stitch-Inspired Design System

**A Modern Medical Interface with Deep Navy Dark Mode**

*Version 4.0 | Based on Google Stitch Mockups*

</div>

---

## Design Philosophy

This design system is inspired by the Google Stitch mockups, featuring:

1. **Deep Navy Dark Mode** - Professional, calming dark backgrounds
2. **Cyan/Teal Primary Accents** - Trust and technology
3. **Amber/Orange Secondary Accents** - Warmth and alerts
4. **Glass-morphism Cards** - Modern depth and layering
5. **Prominent Data Visualization** - Large gauges and counters

---

## Color Palette

### Dark Mode (Primary)

```css
/* Deep Navy Backgrounds */
--navy-975: #0a1628;    /* Main background */
--navy-950: #0d1b2a;    /* Secondary background */
--navy-925: #0f2847;    /* Elevated cards */
--navy-900: #162032;    /* Card backgrounds */
--navy-800: #1e3a5f;    /* Borders */

/* Primary - Cyan */
--primary-400: #22d3ee;  /* Primary accent */
--primary-500: #06b6d4;  /* Buttons */
--primary-600: #0891b2;  /* Hover states */

/* Accent - Amber/Orange */
--accent-400: #fbbf24;   /* Secondary accent */
--accent-500: #f59e0b;   /* Warnings */
--accent-600: #d97706;   /* Hover states */

/* Status Colors */
--success-400: #34d399;  /* Low risk / Good */
--danger-400: #f87171;   /* Critical / Alerts */
--purple-400: #a78bfa;   /* AI / Insights */
```

### Light Mode

```css
/* Clean White Backgrounds */
--surface-50: #ffffff;   /* Main background */
--surface-100: #f8fafc;  /* Card backgrounds */
--surface-200: #f1f5f9;  /* Secondary surfaces */
--surface-300: #e2e8f0;  /* Borders */

/* Primary - Cyan (Darker for light mode) */
--primary-500: #06b6d4;
--primary-600: #0891b2;
--primary-700: #0e7490;
```

---

## Key Components

### 1. Risk Gauge (Circular)

The centerpiece of the dashboard - a large circular progress indicator showing risk score.

```tsx
const RiskGauge = ({ score, riskLevel }) => {
  // SVG circle with animated stroke-dasharray
  // Center shows: score number, /100, risk label
  // Colored based on risk level (green/amber/orange/red)
  // Glow effect on the stroke in dark mode
}
```

**Specifications:**
- Size: 144px (w-36 h-36)
- Stroke width: 8px
- Background stroke: `navy-800` (dark) / `surface-200` (light)
- Progress stroke: Risk color with drop-shadow glow
- Animation: 1.5s ease-out on mount

### 2. Vital Cards

Compact cards displaying individual vital signs.

```
┌─────────────────────────────┐
│ 🌡️                   Kinsa │
│                             │
│   101.2°F                   │
│                             │
│ Temperature      ↑ +2.6°   │
└─────────────────────────────┘
```

**Structure:**
- Icon with colored background (top-left)
- Data source badge (top-right)
- Large value with unit
- Label and trend indicator

### 3. Medication Timer Cards

Shows countdown to next safe dose.

```
┌───────────────────────────────────────┐
│ 💊 Tylenol            [WAITING]       │
│    480mg (15mL)                       │
│                                       │
│   02:15:00          [▶ Log Dose]     │
└───────────────────────────────────────┘
```

**States:**
- **READY**: Green border, green timer, green button
- **WAITING**: Amber border, amber timer, amber button

**Timer Display:**
- Font: Monospace (JetBrains Mono)
- Size: 3rem
- Glow effect matching status color

### 4. Smart Insights Panel

Contextual AI insights in collapsible cards.

```
┌─────────────────────────────────────┐
│ ✨ Smart Insights                   │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 📈 Trend Analysis               │ │
│ │ Temperature trending down...    │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 💊 Medication Reminder          │ │
│ │ Next Advil dose ready in 2h... │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### 5. Symptom History Visualization

Bar chart showing symptom severity over time.

```
┌─────────────────────────────────────┐
│ Symptom History                     │
│ ██ ██ █  ██ ███ ██ █  ███ ██ ██ █ █│
│ 7 days ago              Today       │
└─────────────────────────────────────┘
```

**Colors:**
- Fever: `accent-500` (amber)
- Cough: `primary-500` (cyan)
- Fatigue: `purple-500`

---

## Layout Structure

### Dashboard Grid

```
┌────────────────────────────────────────────────────────────────┐
│  SAFETY BAR                                                    │
│  [● EPCID Safety Net] [24/7 Active]         [911] [Find Care] │
├──────────┬─────────────────────────────────────────────────────┤
│ SIDEBAR  │  HEADER                                             │
│          │  [☰] [🏠] Page Title              [⚡] [?] [🔔] [👤]│
│ Logo     ├─────────────────────────────────────────────────────┤
│          │                                                     │
│ Child    │  ┌─────────────────────────────┐ ┌───────────────┐ │
│ Selector │  │ RISK GAUGE & VITALS (8 col) │ │ INSIGHTS      │ │
│          │  │                             │ │ (4 col)       │ │
│ Nav      │  │ [Gauge]  [Vital] [Vital]   │ │               │ │
│ Items    │  │          [Vital]           │ │ Quick Actions │ │
│          │  └─────────────────────────────┘ │               │ │
│          │                                   │ Child Profile │ │
│          │  ┌──────────────┐ ┌────────────┐ └───────────────┘ │
│ Settings │  │ MEDICATION 1 │ │ MEDICATION │                   │
│ Logout   │  │ Timer Card   │ │ Timer Card │                   │
│          │  └──────────────┘ └────────────┘                   │
└──────────┴─────────────────────────────────────────────────────┘
```

### Card Elevation System

```css
/* Base Card */
.card {
  background: var(--card);           /* white / navy-900 */
  border: 1px solid var(--border);   /* surface-200 / navy-800 */
  border-radius: 1.25rem;            /* 20px */
}

/* Elevated Card (featured content) */
.card-elevated {
  background: linear-gradient(180deg, 
    rgba(22, 45, 80, 0.9) 0%, 
    rgba(13, 27, 42, 0.98) 100%
  );
  border: 1px solid rgba(34, 211, 238, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

---

## Animation System

### Entry Animations

```tsx
// Staggered fade-in for cards
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}
```

### Risk Gauge Animation

```tsx
<motion.circle
  initial={{ strokeDasharray: `0 ${circumference}` }}
  animate={{ strokeDasharray: `${progress} ${circumference}` }}
  transition={{ duration: 1.5, ease: 'easeOut' }}
/>
```

### Button Shine Effect

```css
.btn-shine::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.btn-shine:hover::after {
  transform: translateX(100%);
}
```

---

## Typography

### Font Stack

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace for numbers/timers */
font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
```

### Type Scale (Dark Mode)

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Page Title | 24px | Bold | `white` |
| Section Title | 18px | Semibold | `white` |
| Card Title | 16px | Semibold | `white` |
| Body | 14px | Regular | `surface-300` |
| Small/Label | 12px | Medium | `surface-400` |
| Risk Score | 48px | Bold | Risk color |
| Vital Value | 32px | Bold | `white` |
| Timer | 36px | Bold | Status color |

---

## Glow Effects

### Primary Glow (Cyan)

```css
.glow-primary {
  box-shadow: 0 0 30px rgba(34, 211, 238, 0.25);
}

/* For SVG strokes */
filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.4));
```

### Accent Glow (Amber)

```css
.glow-accent {
  box-shadow: 0 0 30px rgba(251, 191, 36, 0.25);
}
```

### Success Glow (Green)

```css
.glow-success {
  box-shadow: 0 0 30px rgba(52, 211, 153, 0.25);
}
```

### Danger Glow (Red)

```css
.glow-danger {
  box-shadow: 0 0 30px rgba(248, 113, 113, 0.3);
}
```

---

## Component Classes

### Cards

```tsx
// Base card
className="bg-white dark:bg-navy-900 border border-surface-200 dark:border-navy-800 rounded-xl"

// Elevated card (featured)
className="card-elevated"

// Vital card
className="vital-card"

// Medication card
className="medication-card ready|waiting"
```

### Buttons

```tsx
// Primary action
className="btn-primary"

// Accent/Warning action
className="btn-accent"

// With shine effect
className="btn-primary btn-shine"
```

### Status Badges

```tsx
// Risk levels
className="px-3 py-1 rounded-full bg-success-500/10 text-success-400 border border-success-500/20"
className="px-3 py-1 rounded-full bg-accent-500/10 text-accent-400 border border-accent-500/20"
className="px-3 py-1 rounded-full bg-danger-500/10 text-danger-400 border border-danger-500/20"
```

---

## Responsive Breakpoints

```css
/* Mobile First */
sm: 640px    /* Phones landscape */
md: 768px    /* Tablets */
lg: 1024px   /* Laptops - Sidebar always visible */
xl: 1280px   /* Desktops */
```

### Mobile Adaptations

- Sidebar becomes slide-out drawer (< lg)
- Grid collapses to single column
- Touch targets minimum 44px
- Vital cards stack vertically
- Bottom navigation bar (future)

---

## Implementation Checklist

- [x] Deep navy color palette defined
- [x] CSS custom properties for theming
- [x] Circular risk gauge component
- [x] Vital card component
- [x] Medication timer card
- [x] Glass-morphism card styles
- [x] Glow effects for dark mode
- [x] Animation system (Framer Motion)
- [x] Responsive sidebar
- [x] Dashboard layout grid
- [ ] Bottom navigation for mobile
- [ ] Pull-to-refresh gesture
- [ ] Haptic feedback integration

---

<div align="center">

**EPCID Design System v4.0**

*Inspired by Google Stitch*

---

[Color Palette](#color-palette) • [Components](#key-components) • [Layout](#layout-structure) • [Animation](#animation-system)

</div>
