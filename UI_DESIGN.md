# EPCID UI Design System

<div align="center">

# 🎨 EPCID
## User Interface Design Specification

**A Medical-Grade UI for Pediatric Health**

*Version 3.0 | UI/UX Specification*

</div>

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Library](#component-library)
6. [Icons & Iconography](#icons--iconography)
7. [Motion & Animation](#motion--animation)
8. [Responsive Design](#responsive-design)
9. [Dark Mode](#dark-mode)
10. [Accessibility](#accessibility)
11. [Screen Specifications](#screen-specifications)
12. [Implementation Guide](#implementation-guide)

---

## Design Principles

### 1. 🌙 3 AM Design
Design for stressed, sleep-deprived parents checking on a sick child at night.

```
DO:
✓ High contrast text
✓ Large touch targets (min 44px)
✓ Minimal cognitive load
✓ Dark mode by default at night
✓ Single-hand operation

DON'T:
✗ Small, cramped text
✗ Complex navigation
✗ Bright white backgrounds
✗ Require precise tapping
✗ Hide critical information
```

### 2. 🚨 Safety-First Visual Hierarchy
Critical health information should be impossible to miss.

```
Priority Order:
1. EMERGENCY ALERTS (Red, top of screen, full-width)
2. Risk Status (Large, centered, color-coded)
3. Current Vitals (Prominent cards)
4. Actions (Clear buttons)
5. Secondary Info (Smaller, muted)
```

### 3. 💡 Actionable, Not Informational
Every insight should lead to an action.

```
BEFORE: "Your child has a fever of 101°F"
AFTER:  "Your child has a fever of 101°F" [Calculate Dose] [Set Reminder]
```

### 4. 🎯 Progressive Disclosure
Show essential information first, details on demand.

```
Level 1: Risk Score (71 - Moderate)
Level 2: Contributing Factors (tap to expand)
Level 3: Detailed Explanations (modal/drawer)
```

### 5. 🔒 Trust Through Transparency
Build confidence by showing how conclusions are reached.

```
✓ Show data sources (manual vs. device)
✓ Explain risk calculations
✓ Display confidence levels
✓ Timestamp all data
```

---

## Color System

### Primary Palette

```css
/* Primary Brand - Cyan */
--primary-50:  #ECFEFF;
--primary-100: #CFFAFE;
--primary-200: #A5F3FC;
--primary-300: #67E8F9;
--primary-400: #22D3EE;
--primary-500: #06B6D4;  /* Main brand color */
--primary-600: #0891B2;  /* Hover state */
--primary-700: #0E7490;
--primary-800: #155E75;
--primary-900: #164E63;
```

### Semantic Colors

```css
/* Success - Emerald */
--success-50:  #ECFDF5;
--success-100: #D1FAE5;
--success-500: #10B981;  /* Low risk, normal, good */
--success-600: #059669;
--success-700: #047857;

/* Warning - Amber */
--warning-50:  #FFFBEB;
--warning-100: #FEF3C7;
--warning-500: #F59E0B;  /* Moderate risk, caution */
--warning-600: #D97706;
--warning-700: #B45309;

/* Danger - Red */
--danger-50:  #FEF2F2;
--danger-100: #FEE2E2;
--danger-500: #EF4444;   /* Critical, emergency */
--danger-600: #DC2626;
--danger-700: #B91C1C;

/* Info - Blue */
--info-50:  #EFF6FF;
--info-100: #DBEAFE;
--info-500: #3B82F6;
--info-600: #2563EB;
```

### Surface Colors

```css
/* Light Mode */
--surface-light-bg:     #FFFFFF;
--surface-light-card:   #F8FAFC;
--surface-light-border: #E2E8F0;
--surface-light-muted:  #64748B;
--surface-light-text:   #0F172A;

/* Dark Mode */
--surface-dark-bg:     #0F172A;
--surface-dark-card:   #1E293B;
--surface-dark-border: #334155;
--surface-dark-muted:  #94A3B8;
--surface-dark-text:   #F1F5F9;
```

### Risk Level Colors

```css
/* Risk Gradients */
--risk-low:      linear-gradient(135deg, #10B981, #14B8A6);
--risk-moderate: linear-gradient(135deg, #F59E0B, #F97316);
--risk-high:     linear-gradient(135deg, #F97316, #EF4444);
--risk-critical: linear-gradient(135deg, #EF4444, #DC2626);
```

### Color Usage Guidelines

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Page Background | `#FFFFFF` | `#0F172A` |
| Card Background | `#F8FAFC` | `#1E293B` |
| Primary Text | `#0F172A` | `#F1F5F9` |
| Secondary Text | `#64748B` | `#94A3B8` |
| Borders | `#E2E8F0` | `#334155` |
| Primary Actions | `#06B6D4` | `#22D3EE` |
| Success States | `#10B981` | `#34D399` |
| Warning States | `#F59E0B` | `#FBBF24` |
| Error States | `#EF4444` | `#F87171` |

---

## Typography

### Font Family

```css
/* Primary Font */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Numeric Display (for vitals, scores) */
font-variant-numeric: tabular-nums;

/* Code/Technical */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

```css
/* Headings */
--text-h1: 1.5rem;     /* 24px - Page titles */
--text-h2: 1.25rem;    /* 20px - Section headers */
--text-h3: 1rem;       /* 16px - Card titles */
--text-h4: 0.875rem;   /* 14px - Subsection titles */

/* Body */
--text-body: 0.875rem;  /* 14px - Primary content */
--text-small: 0.75rem;  /* 12px - Secondary info */
--text-tiny: 0.625rem;  /* 10px - Labels, badges */

/* Special */
--text-display: 3rem;   /* 48px - Large numbers (risk score) */
--text-stat: 2rem;      /* 32px - Stat values */
```

### Font Weights

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights

```css
--leading-tight: 1.25;   /* Headings */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.75; /* Paragraphs */
```

### Typography Classes

```tsx
// Headings
<h1 className="text-2xl font-bold text-surface-900 dark:text-white">
<h2 className="text-xl font-semibold text-surface-900 dark:text-white">
<h3 className="text-base font-semibold text-surface-900 dark:text-white">

// Body
<p className="text-sm text-surface-600 dark:text-surface-300">
<span className="text-xs text-surface-500 dark:text-surface-400">

// Numbers
<span className="text-5xl font-bold tabular-nums">71</span>

// Labels
<span className="text-xs font-medium uppercase tracking-wide">
```

---

## Spacing & Layout

### Spacing Scale

```css
/* Base: 4px */
--space-0: 0;
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

### Layout Grid

```css
/* Container */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;

/* Dashboard Sidebar */
--sidebar-width: 256px;
--sidebar-collapsed: 72px;

/* Content Area */
--content-max-width: 1200px;
--content-padding: 1.5rem;
```

### Card Spacing

```css
/* Card Padding */
--card-padding-sm: 0.75rem;  /* 12px - Compact cards */
--card-padding-md: 1rem;     /* 16px - Default */
--card-padding-lg: 1.5rem;   /* 24px - Featured cards */

/* Card Gap (between cards) */
--card-gap: 1rem;            /* 16px */
--card-gap-lg: 1.5rem;       /* 24px */
```

### Page Layout Structure

```
┌────────────────────────────────────────────────────────────────┐
│  Header (h: 64px, sticky)                                      │
├──────────┬─────────────────────────────────────────────────────┤
│          │                                                     │
│ Sidebar  │  Main Content Area                                  │
│ (256px)  │  ┌─────────────────────────────────────────────────┐│
│          │  │ Page Header (title, actions)      py-6          ││
│          │  ├─────────────────────────────────────────────────┤│
│          │  │                                                 ││
│          │  │ Content                           gap-6         ││
│          │  │                                                 ││
│          │  │ ┌─────────────┐ ┌─────────────┐                ││
│          │  │ │ Card        │ │ Card        │                ││
│          │  │ └─────────────┘ └─────────────┘                ││
│          │  │                                                 ││
│          │  └─────────────────────────────────────────────────┘│
│          │                                                     │
└──────────┴─────────────────────────────────────────────────────┘
```

---

## Component Library

### Buttons

#### Primary Button
```tsx
<Button>
  Primary Action
</Button>

// Styles
className="
  h-10 px-4 
  bg-cyan-500 hover:bg-cyan-600 
  text-white font-medium 
  rounded-lg 
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
"
```

#### Secondary Button
```tsx
<Button variant="secondary">
  Secondary Action
</Button>

// Styles
className="
  h-10 px-4
  bg-surface-100 dark:bg-surface-800 
  hover:bg-surface-200 dark:hover:bg-surface-700
  text-surface-700 dark:text-surface-200
  border border-surface-200 dark:border-surface-700
  rounded-lg
"
```

#### Danger Button
```tsx
<Button variant="danger">
  Delete
</Button>

// Styles
className="
  bg-red-500 hover:bg-red-600
  text-white
"
```

#### Ghost Button
```tsx
<Button variant="ghost">
  Cancel
</Button>

// Styles
className="
  bg-transparent 
  hover:bg-surface-100 dark:hover:bg-surface-800
  text-surface-600 dark:text-surface-400
"
```

#### Button Sizes
```tsx
<Button size="sm">Small</Button>   // h-8, px-3, text-sm
<Button size="md">Medium</Button>  // h-10, px-4, text-sm (default)
<Button size="lg">Large</Button>   // h-12, px-6, text-base
```

#### Button with Icon
```tsx
<Button icon={<Plus className="w-4 h-4" />}>
  Add Child
</Button>

// Icon positioning
<Button icon={<ArrowRight />} iconPosition="right">
  Continue
</Button>
```

### Cards

#### Base Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>

// Base styles
className="
  bg-white dark:bg-surface-800
  border border-surface-200 dark:border-surface-700
  rounded-xl
  shadow-sm
  overflow-hidden
"
```

#### Status Cards
```tsx
// Success Card
<Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">

// Warning Card
<Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">

// Danger Card
<Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
```

#### Interactive Card
```tsx
<Card className="
  cursor-pointer
  transition-all duration-200
  hover:border-cyan-300 dark:hover:border-cyan-700
  hover:shadow-md
">
```

### Badges

```tsx
// Default
<Badge>Label</Badge>
// bg-surface-100 text-surface-700

// Variants
<Badge variant="primary">Active</Badge>
// bg-cyan-100 text-cyan-700

<Badge variant="success">Normal</Badge>
// bg-emerald-100 text-emerald-700

<Badge variant="warning">Moderate</Badge>
// bg-amber-100 text-amber-700

<Badge variant="danger">Critical</Badge>
// bg-red-100 text-red-700

// Sizes
<Badge size="sm">Small</Badge>  // text-xs px-2 py-0.5
<Badge size="md">Medium</Badge> // text-sm px-2.5 py-0.5
```

### Input Fields

```tsx
<Input 
  type="text"
  placeholder="Enter value..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// Styles
className="
  w-full h-10 px-4
  bg-surface-50 dark:bg-surface-800
  border border-surface-200 dark:border-surface-700
  rounded-lg
  text-surface-900 dark:text-white
  placeholder:text-surface-400
  focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
  transition-colors duration-200
"
```

### Select Dropdown

```tsx
<select className="
  w-full h-10 px-4
  bg-surface-50 dark:bg-surface-800
  border border-surface-200 dark:border-surface-700
  rounded-lg
  text-surface-900 dark:text-white
  focus:outline-none focus:ring-2 focus:ring-cyan-500
  cursor-pointer
">
  <option value="">Select...</option>
</select>
```

### Toggle/Switch

```tsx
<button
  onClick={() => setEnabled(!enabled)}
  className={`
    relative w-11 h-6 rounded-full transition-colors duration-200
    ${enabled 
      ? 'bg-cyan-500' 
      : 'bg-surface-300 dark:bg-surface-600'
    }
  `}
>
  <span className={`
    absolute top-0.5 left-0.5 w-5 h-5 
    bg-white rounded-full shadow
    transition-transform duration-200
    ${enabled ? 'translate-x-5' : 'translate-x-0'}
  `} />
</button>
```

### Progress Bar

```tsx
// Simple Progress
<div className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
  <div 
    className="h-full bg-cyan-500 rounded-full transition-all duration-500"
    style={{ width: `${progress}%` }}
  />
</div>

// Segmented Progress (Risk Gauge)
<div className="flex gap-1 h-2">
  <div className="flex-1 bg-emerald-500 rounded-l-full" /> {/* 0-39 */}
  <div className="flex-1 bg-amber-500" />                  {/* 40-59 */}
  <div className="flex-1 bg-orange-500" />                 {/* 60-79 */}
  <div className="flex-1 bg-red-500 rounded-r-full" />     {/* 80-100 */}
</div>
```

### Modals

```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="
          w-full max-w-md
          bg-white dark:bg-surface-900
          rounded-2xl shadow-xl
          overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-surface-200 dark:border-surface-700">
          <h2 className="text-lg font-bold">Modal Title</h2>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {children}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-surface-200 dark:border-surface-700 flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

### Toast Notifications

```tsx
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  className="
    fixed top-4 right-4 z-50
    p-4 rounded-xl shadow-lg
    bg-emerald-500 text-white  // Success
    // bg-amber-500 text-white  // Warning
    // bg-red-500 text-white    // Error
    flex items-center gap-3
  "
>
  <CheckCircle className="w-5 h-5" />
  <span className="font-medium">Action completed successfully</span>
</motion.div>
```

### Skeleton Loaders

```tsx
// Text skeleton
<div className="h-4 w-32 bg-surface-200 dark:bg-surface-700 rounded animate-pulse" />

// Card skeleton
<div className="p-4 rounded-xl border border-surface-200 dark:border-surface-700">
  <div className="h-4 w-24 bg-surface-200 dark:bg-surface-700 rounded animate-pulse mb-4" />
  <div className="h-8 w-full bg-surface-200 dark:bg-surface-700 rounded animate-pulse mb-2" />
  <div className="h-4 w-3/4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse" />
</div>
```

---

## Icons & Iconography

### Icon Library
Using **Lucide React** for consistent, clean icons.

```bash
npm install lucide-react
```

### Icon Sizes

```tsx
// Inline with text
<Icon className="w-4 h-4" />

// Default UI elements
<Icon className="w-5 h-5" />

// Prominent actions
<Icon className="w-6 h-6" />

// Feature icons
<Icon className="w-8 h-8" />

// Large display
<Icon className="w-12 h-12" />
```

### Icon Color Guidelines

```tsx
// Default (inherits text color)
<Activity className="w-5 h-5" />

// Status icons
<CheckCircle className="w-5 h-5 text-emerald-500" />
<AlertTriangle className="w-5 h-5 text-amber-500" />
<XCircle className="w-5 h-5 text-red-500" />
<Info className="w-5 h-5 text-cyan-500" />

// Muted icons
<Clock className="w-4 h-4 text-surface-400" />
```

### Common Icons by Category

```tsx
// Navigation
import { Home, Menu, ChevronLeft, ChevronRight, X } from 'lucide-react'

// Health/Medical
import { 
  Thermometer,    // Temperature
  Heart,          // Heart rate
  Wind,           // Breathing
  Activity,       // General vitals
  Stethoscope,    // Clinical
  Pill,           // Medication
  Syringe,        // Vaccination
  Scale,          // Weight
  Ruler,          // Height
} from 'lucide-react'

// Actions
import {
  Plus,           // Add
  Pencil,         // Edit
  Trash2,         // Delete
  Download,       // Export
  Upload,         // Import
  Share2,         // Share
  Bell,           // Notifications
  RefreshCw,      // Refresh
} from 'lucide-react'

// Status
import {
  CheckCircle,    // Success
  AlertTriangle,  // Warning
  AlertCircle,    // Error/Alert
  Info,           // Information
  Shield,         // Protected/Safe
} from 'lucide-react'

// Communication
import {
  MessageSquare,  // Chat
  Phone,          // Call
  Video,          // Video call
  Send,           // Send message
  Mail,           // Email
} from 'lucide-react'

// Data Visualization
import {
  TrendingUp,     // Increasing
  TrendingDown,   // Decreasing
  Minus,          // Stable/No change
  BarChart3,      // Charts
  PieChart,       // Distribution
} from 'lucide-react'
```

### Data Source Icons

```tsx
// Manual entry
<User className="w-4 h-4 text-surface-400" />

// Device synced
<Bluetooth className="w-4 h-4 text-cyan-500" />

// AI inferred
<Sparkles className="w-4 h-4 text-purple-500" />
```

---

## Motion & Animation

### Animation Library
Using **Framer Motion** for declarative animations.

```bash
npm install framer-motion
```

### Transition Presets

```tsx
// Quick (interactions)
const quickTransition = { duration: 0.15 }

// Normal (UI changes)
const normalTransition = { duration: 0.2 }

// Smooth (page transitions)
const smoothTransition = { duration: 0.3, ease: "easeOut" }

// Spring (bouncy feel)
const springTransition = { type: "spring", stiffness: 300, damping: 30 }
```

### Common Animations

#### Fade In
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
>
```

#### Slide Up
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
  transition={{ duration: 0.3 }}
>
```

#### Scale
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
>
```

#### Staggered Children
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.div variants={container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.div key={item.id} variants={item}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

#### Loading Spinner
```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
>
  <RefreshCw className="w-5 h-5" />
</motion.div>
```

#### Pulse Effect
```tsx
<motion.div
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
>
```

#### Progress Animation
```tsx
<motion.div
  initial={{ width: 0 }}
  animate={{ width: `${progress}%` }}
  transition={{ duration: 0.5 }}
  className="h-2 bg-cyan-500 rounded-full"
/>
```

### AnimatePresence for Exit Animations
```tsx
import { AnimatePresence } from 'framer-motion'

<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

---

## Responsive Design

### Breakpoints

```css
/* Tailwind default breakpoints */
sm:  640px   /* Small tablets */
md:  768px   /* Tablets */
lg:  1024px  /* Laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large screens */
```

### Mobile-First Approach

```tsx
// Base styles are mobile, add breakpoint prefixes for larger screens
<div className="
  flex flex-col        // Mobile: stack vertically
  md:flex-row          // Tablet+: side by side
  gap-4
">
```

### Responsive Patterns

#### Grid Layout
```tsx
<div className="
  grid 
  grid-cols-1          // Mobile: 1 column
  sm:grid-cols-2       // Tablet: 2 columns
  lg:grid-cols-3       // Desktop: 3 columns
  xl:grid-cols-4       // Large: 4 columns
  gap-4
">
```

#### Sidebar Behavior
```tsx
// Mobile: Hidden, slide-in drawer
// Desktop: Always visible

<aside className="
  fixed inset-y-0 left-0 z-40
  w-64
  transform
  -translate-x-full    // Mobile: hidden
  lg:translate-x-0     // Desktop: visible
  lg:static
  transition-transform duration-300
">
```

#### Text Scaling
```tsx
<h1 className="
  text-xl              // Mobile
  md:text-2xl          // Tablet
  lg:text-3xl          // Desktop
">
```

#### Spacing Adjustments
```tsx
<div className="
  p-4                  // Mobile: tighter
  md:p-6               // Tablet
  lg:p-8               // Desktop: more spacious
">
```

#### Hide/Show Elements
```tsx
// Hide on mobile
<div className="hidden md:block">
  Desktop only content
</div>

// Show only on mobile
<div className="md:hidden">
  Mobile only content
</div>
```

### Touch Targets

```css
/* Minimum touch target: 44x44px */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}
```

---

## Dark Mode

### Implementation

```tsx
// Using Tailwind dark mode (class strategy)
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
}
```

### Theme Provider

```tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
}>({
  theme: 'system',
  setTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<Theme>('system')
  
  useEffect(() => {
    const root = document.documentElement
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (theme === 'dark' || (theme === 'system' && systemDark)) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

### Dark Mode Classes

```tsx
// Background
className="bg-white dark:bg-surface-900"

// Card background
className="bg-surface-50 dark:bg-surface-800"

// Text
className="text-surface-900 dark:text-white"
className="text-surface-600 dark:text-surface-300"
className="text-surface-400 dark:text-surface-500"

// Borders
className="border-surface-200 dark:border-surface-700"

// Hover states
className="hover:bg-surface-100 dark:hover:bg-surface-800"
```

### Night Mode (3 AM Mode)

Special high-contrast mode for checking on sick children at night.

```tsx
// Night mode uses darker backgrounds and red-shifted colors
const nightModeStyles = {
  background: '#0a0a0a',
  cardBg: '#141414',
  text: '#f5f5f5',
  accent: '#ef4444', // Red for important items
}

// Night Vitals Page
<div className="
  min-h-screen 
  bg-black 
  text-white
">
  <div className="text-6xl font-bold text-center">
    101.2°F
  </div>
</div>
```

---

## Accessibility

### Color Contrast

All text must meet WCAG 2.1 AA standards:
- Normal text: 4.5:1 contrast ratio
- Large text (18pt+): 3:1 contrast ratio

```
✓ Primary text on background: 12.6:1
✓ Secondary text on background: 7.1:1
✓ White on cyan-500: 4.5:1
✓ White on red-500: 4.5:1
```

### Keyboard Navigation

```tsx
// All interactive elements must be focusable
<button className="
  focus:outline-none 
  focus:ring-2 
  focus:ring-cyan-500 
  focus:ring-offset-2
">

// Skip to main content link
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
>
  Skip to main content
</a>
```

### Screen Reader Support

```tsx
// Hidden labels
<label htmlFor="weight" className="sr-only">Child's weight in pounds</label>

// Aria labels
<button aria-label="Close modal">
  <X className="w-5 h-5" />
</button>

// Live regions for dynamic content
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Descriptive labels
<div role="alert" aria-describedby="error-message">
  <span id="error-message">{errorText}</span>
</div>
```

### Focus Management

```tsx
// Auto-focus first input in modals
useEffect(() => {
  if (isOpen) {
    inputRef.current?.focus()
  }
}, [isOpen])

// Trap focus within modals
import { FocusTrap } from 'focus-trap-react'

<FocusTrap>
  <div role="dialog" aria-modal="true">
    {/* Modal content */}
  </div>
</FocusTrap>
```

### Reduced Motion

```tsx
// Respect user preference for reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

<motion.div
  animate={{ opacity: 1 }}
  transition={{ 
    duration: prefersReducedMotion ? 0 : 0.3 
  }}
>
```

---

## Screen Specifications

### Dashboard

```
┌──────────────────────────────────────────────────────────────────┐
│  HEADER                                                h: 64px   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Logo   [Child Selector ▼]              🔔  👤  🌙           │ │
│  └─────────────────────────────────────────────────────────────┘ │
├──────────┬───────────────────────────────────────────────────────┤
│ SIDEBAR  │  MAIN CONTENT                           px: 24       │
│ w: 256px │                                                       │
│          │  ┌─────────────────────────────────────────────────┐  │
│ ┌──────┐ │  │ PAGE HEADER                          h: auto    │  │
│ │ Nav  │ │  │ "Dashboard"              [Actions]              │  │
│ │ Item │ │  └─────────────────────────────────────────────────┘  │
│ └──────┘ │                                         gap: 24       │
│          │  ┌───────────────────────┐ ┌───────────────────────┐  │
│ ┌──────┐ │  │ RISK CARD             │ │ VITALS GRID          │  │
│ │      │ │  │ 50% width             │ │ 50% width            │  │
│ │      │ │  │ min-h: 200px          │ │ Grid: 2x2            │  │
│ └──────┘ │  └───────────────────────┘ └───────────────────────┘  │
│          │                                                       │
│          │  ┌───────────────────────────────────────────────────┐│
│          │  │ ACTIVITY FEED                        100% width   ││
│          │  │ Recent symptoms, medications                      ││
│          │  └───────────────────────────────────────────────────┘│
│          │                                                       │
└──────────┴───────────────────────────────────────────────────────┘

Mobile (< 768px):
- Sidebar hidden (hamburger menu)
- Cards stack vertically
- Full-width cards
```

### Risk Gauge Component

```
      ┌─────────────────────────────────────┐
      │                                     │
      │           ╭─────────╮               │
      │        ╭──┤   71    ├──╮            │
      │      ╭─┤  ╰─────────╯  ├─╮          │
      │    ╭─┤                   ├─╮        │
      │  ══╪══╪═══════●═══════╪══╪══        │
      │  0    40      ↑       80   100      │
      │  Low  Mod    Current  High Crit     │
      │                                     │
      │  Risk Level: Moderate               │
      │  ↗ Worsening (+5 from last)         │
      │                                     │
      └─────────────────────────────────────┘
```

### Vital Card Component

```
┌─────────────────────────────────┐
│  🌡️ Temperature                 │
│                                 │
│     101.2°F                     │  ← Primary value (text-3xl)
│                                 │
│  ⬆️ +2.6° from baseline          │  ← Delta indicator
│  📱 Kinsa (2 min ago)           │  ← Source + timestamp
│                                 │
└─────────────────────────────────┘

Sizes:
- Card: min-w: 150px, p: 16px
- Value: text-3xl font-bold
- Label: text-sm text-muted
- Meta: text-xs text-muted
```

### Medication Card Component

```
┌───────────────────────────────────────────────────────────────┐
│  ┌────┐                                                       │
│  │ 💊 │  Tylenol (Acetaminophen)           [✓ SAFE TO GIVE]  │
│  └────┘                                                       │
│                                                               │
│  Recommended: 480mg (15mL Children's Liquid)                  │
│  Safe range: 440-660mg based on 98 lbs                        │
│                                                               │
│  ────────────────────────────────────────────────────────────│
│                                                               │
│  Last dose: 500mg at 10:30 AM (2h ago)                        │
│  📉 Temp since last dose: 101.2°F → 100.8°F (↓0.4°)          │
│                                                               │
│  ⏱️ Next safe dose in: 2h 15m                                 │
│                                                               │
│  [Log Dose]                                                   │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Clinical Assessment Form

```
┌───────────────────────────────────────────────────────────────┐
│  CARDIOVASCULAR ASSESSMENT                    [✓ Complete]    │
│                                                               │
│  Heart Rate (bpm)              Normal: 70-110 bpm             │
│  ┌─────────────────────────────────────────┐                  │
│  │ 98                                      │                  │
│  └─────────────────────────────────────────┘                  │
│                                                               │
│  Skin Color                                                   │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐          │
│  │ ✓ Normal    │ │   Pale       │ │   Mottled    │          │
│  │   (Pink)    │ │              │ │              │          │
│  └──────────────┘ └──────────────┘ └──────────────┘          │
│  ┌──────────────┐                                             │
│  │   Grey/Blue │                                             │
│  └──────────────┘                                             │
│                                                               │
│  Capillary Refill Time                    [?] Help           │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐          │
│  │ ✓ < 2 sec   │ │   2-3 sec    │ │   > 3 sec    │          │
│  │   (Normal)  │ │   (Delayed)  │ │   (Poor)     │          │
│  └──────────────┘ └──────────────┘ └──────────────┘          │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

## Implementation Guide

### Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   ├── login/
│   │   ├── register/
│   │   └── dashboard/
│   │       ├── layout.tsx      # Dashboard layout with sidebar
│   │       ├── page.tsx        # Dashboard home
│   │       ├── assess/
│   │       ├── medications/
│   │       ├── symptom-checker/
│   │       └── ...
│   │
│   ├── components/
│   │   ├── ui/                 # Core UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── index.ts        # Barrel export
│   │   │   └── ...
│   │   │
│   │   └── features/           # Feature-specific components
│   │       ├── RiskGauge.tsx
│   │       ├── VitalCard.tsx
│   │       ├── MedicationCard.tsx
│   │       └── ...
│   │
│   ├── lib/
│   │   ├── api.ts              # API client
│   │   ├── utils.ts            # Utility functions
│   │   └── ai.ts               # AI integration
│   │
│   ├── store/
│   │   └── useStore.ts         # Zustand store
│   │
│   └── styles/
│       └── globals.css         # Global styles + Tailwind
│
├── tailwind.config.js
├── next.config.js
└── package.json
```

### Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
        surface: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
```

### Global Styles

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    @apply bg-white dark:bg-surface-900 text-surface-900 dark:text-white;
  }
}

@layer components {
  .card {
    @apply bg-white dark:bg-surface-800 
           border border-surface-200 dark:border-surface-700 
           rounded-xl shadow-sm;
  }
  
  .btn-primary {
    @apply h-10 px-4 
           bg-primary-500 hover:bg-primary-600 
           text-white font-medium 
           rounded-lg transition-colors;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### Component Export Pattern

```tsx
// src/components/ui/index.ts
export { Button } from './Button'
export { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card'
export { Badge } from './Badge'
export { Input } from './Input'
export { Skeleton } from './Skeleton'
export { ThemeProvider, useTheme } from './ThemeProvider'

// Usage in pages
import { Button, Card, Badge } from '@/components/ui'
```

### State Management Pattern

```tsx
// src/store/useStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  // State
  children: Child[]
  selectedChild: Child | null
  vitalReadings: VitalReading[]
  
  // Actions
  setSelectedChild: (child: Child) => void
  addVitalReading: (reading: VitalReading) => void
}

const useStore = create<AppState>()(
  persist(
    (set) => ({
      children: [],
      selectedChild: null,
      vitalReadings: [],
      
      setSelectedChild: (child) => set({ selectedChild: child }),
      addVitalReading: (reading) => 
        set((state) => ({ 
          vitalReadings: [reading, ...state.vitalReadings] 
        })),
    }),
    {
      name: 'epcid-storage',
      partialize: (state) => ({
        children: state.children,
        selectedChild: state.selectedChild,
        // Don't persist everything
      }),
    }
  )
)

export default useStore
```

---

## Quick Reference

### Class Name Patterns

```tsx
// Flexbox layouts
"flex items-center justify-between gap-4"
"flex flex-col space-y-4"

// Grid layouts
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

// Card styling
"bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-4"

// Button styling
"h-10 px-4 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors"

// Input styling
"w-full h-10 px-4 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg focus:ring-2 focus:ring-cyan-500"

// Text styling
"text-surface-900 dark:text-white"          // Primary text
"text-surface-600 dark:text-surface-300"    // Secondary text
"text-surface-400 dark:text-surface-500"    // Muted text

// Status colors
"text-emerald-500"   // Success
"text-amber-500"     // Warning
"text-red-500"       // Danger
"text-cyan-500"      // Primary/Info
```

### Animation Snippets

```tsx
// Fade in on mount
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>

// Slide up on mount
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>

// Modal with exit animation
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
```

---

<div align="center">

**EPCID UI Design System v3.0**

*Crafted for clarity, built for trust*

---

[Component Library](#component-library) • [Color System](#color-system) • [Typography](#typography) • [Animation](#motion--animation)

</div>
