'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, AlertTriangle, X, MapPin, ChevronRight } from 'lucide-react'

interface EmergencyBannerProps {
  variant?: 'fixed' | 'inline' | 'compact'
  showFindCare?: boolean
  dismissible?: boolean
  className?: string
}

export function EmergencyBanner({ 
  variant = 'fixed', 
  showFindCare = true,
  dismissible = false,
  className = '' 
}: EmergencyBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const handleCall911 = () => {
    if (typeof window !== 'undefined') {
      window.location.href = 'tel:911'
    }
  }

  const handleFindCare = () => {
    if (typeof window !== 'undefined') {
      window.open('https://www.google.com/maps/search/urgent+care+near+me', '_blank')
    }
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-3 px-4 py-2 bg-danger-50 dark:bg-danger-950/50 border-b border-danger-200 dark:border-danger-800 ${className}`}
      >
        <AlertTriangle className="w-4 h-4 text-danger-600 dark:text-danger-400 flex-shrink-0" />
        <p className="text-sm text-danger-700 dark:text-danger-300 flex-1">
          <strong>Emergency?</strong> Call 911 immediately
        </p>
        <button
          onClick={handleCall911}
          className="flex items-center gap-1.5 px-3 py-1 bg-danger-600 hover:bg-danger-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          Call 911
        </button>
      </motion.div>
    )
  }

  if (variant === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative overflow-hidden rounded-2xl border-2 border-danger-300 dark:border-danger-700 ${className}`}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-danger-50 via-white to-danger-50 dark:from-danger-950/50 dark:via-surface-900 dark:to-danger-950/50" />
        
        <div className="relative p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-danger-100 dark:bg-danger-900/50 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-danger-600 dark:text-danger-400" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-danger-900 dark:text-danger-100 mb-1">
                Is this an emergency?
              </h3>
              <p className="text-sm text-danger-700 dark:text-danger-300 mb-4">
                If your child is having trouble breathing, is unresponsive, or showing signs of severe illness, 
                call 911 immediately.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCall911}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-danger-600 hover:bg-danger-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-danger-500/25 hover:shadow-danger-500/40"
                >
                  <Phone className="w-5 h-5" />
                  Call 911 Now
                </button>
                
                {showFindCare && (
                  <button
                    onClick={handleFindCare}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-surface-800 border border-danger-200 dark:border-danger-700 text-danger-700 dark:text-danger-300 font-medium rounded-xl hover:bg-danger-50 dark:hover:bg-danger-950/50 transition-all"
                  >
                    <MapPin className="w-5 h-5" />
                    Find Urgent Care
                  </button>
                )}
              </div>
            </div>
            
            {dismissible && (
              <button
                onClick={() => setDismissed(true)}
                className="flex-shrink-0 p-1 text-danger-400 hover:text-danger-600 dark:hover:text-danger-300"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  // Fixed variant (always visible at top)
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className={`fixed top-0 left-0 right-0 z-[100] ${className}`}
      >
        <div className="emergency-banner px-4 py-2.5 shadow-lg shadow-danger-500/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div className="text-white">
                <span className="font-semibold">Emergency?</span>
                <span className="hidden sm:inline ml-2 text-white/90">
                  Having a medical emergency? Get help immediately.
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleCall911}
                className="flex items-center gap-2 px-4 py-1.5 bg-white text-danger-600 font-semibold rounded-lg hover:bg-white/90 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Call</span> 911
              </button>
              
              {showFindCare && (
                <button
                  onClick={handleFindCare}
                  className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition-colors text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  Find Care
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
              
              {dismissible && (
                <button
                  onClick={() => setDismissed(true)}
                  className="p-1.5 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default EmergencyBanner
