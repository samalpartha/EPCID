'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Video,
  Phone,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  Heart,
  Thermometer,
  Wind,
  Pill,
  Activity,
  FileText,
  Share2,
  Loader2,
  ChevronRight,
  Shield,
  Stethoscope,
  TrendingUp,
  TrendingDown,
  Minus,
  Copy,
  ExternalLink,
  AlertCircle,
  Plus,
  Eye,
  X,
  Zap,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui'
import useStore from '@/store/useStore'
import { calculateAge } from '@/lib/utils'

const priorityConfig = {
  ROUTINE: {
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    label: 'Routine',
  },
  URGENT: {
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    label: 'Urgent',
  },
  CRITICAL: {
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    label: 'Critical',
  },
}

export default function TelehealthPage() {
  const { 
    selectedChild, 
    latestAssessment, 
    generateHandoff, 
    addHandoff,
    telehealthHandoffs,
    vitalReadings,
    doseLogs,
    medications,
    riskTrend,
    symptomHistory,
    addVitalReading,
  } = useStore()
  
  const [handoff, setHandoff] = useState<ReturnType<typeof generateHandoff>>(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showVitalUpdate, setShowVitalUpdate] = useState(false)
  const [newTemp, setNewTemp] = useState('')
  const [preflightDismissed, setPreflightDismissed] = useState(false)
  
  // Get ACTUAL latest vitals from the store (not from handoff)
  const latestVitals = useMemo(() => {
    if (!selectedChild) return { temp: null, hr: null, o2: null }
    
    const tempReadings = vitalReadings
      .filter(r => r.child_id === selectedChild.id && r.type === 'temperature')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    
    const hrReadings = vitalReadings
      .filter(r => r.child_id === selectedChild.id && r.type === 'heart_rate')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      
    const o2Readings = vitalReadings
      .filter(r => r.child_id === selectedChild.id && r.type === 'oxygen')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    
    return {
      temp: tempReadings[0] || null,
      hr: hrReadings[0] || null,
      o2: o2Readings[0] || null,
    }
  }, [selectedChild, vitalReadings])
  
  // Check if vitals are stale (>4 hours old) or missing
  const vitalsStatus = useMemo(() => {
    const STALE_THRESHOLD = 4 * 60 * 60 * 1000 // 4 hours
    const now = Date.now()
    
    const tempAge = latestVitals.temp 
      ? now - new Date(latestVitals.temp.timestamp).getTime() 
      : Infinity
    
    const isTempMissing = !latestVitals.temp
    const isTempStale = tempAge > STALE_THRESHOLD
    
    return {
      isTempMissing,
      isTempStale,
      tempAge: latestVitals.temp ? Math.floor(tempAge / (1000 * 60)) : null,
      needsUpdate: isTempMissing || isTempStale,
    }
  }, [latestVitals])
  
  // Get recent symptom entries
  const recentSymptoms = useMemo(() => {
    if (!selectedChild) return []
    return symptomHistory
      .filter(s => s.child_id === selectedChild.id)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5)
  }, [selectedChild, symptomHistory])
  
  // Get recent medication doses
  const recentMeds = useMemo(() => {
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000
    return doseLogs
      .filter(d => new Date(d.timestamp).getTime() > oneDayAgo)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .map(dose => {
        const med = medications.find(m => m.id === dose.medicationId)
        return { ...dose, medication: med }
      })
      .slice(0, 5)
  }, [doseLogs, medications])
  
  // Generate temperature trend sparkline data
  const tempTrend = useMemo(() => {
    if (!selectedChild) return []
    const last24h = Date.now() - 24 * 60 * 60 * 1000
    return vitalReadings
      .filter(r => 
        r.child_id === selectedChild.id && 
        r.type === 'temperature' &&
        new Date(r.timestamp).getTime() > last24h
      )
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .map(r => ({ value: r.value as number, time: r.timestamp }))
  }, [selectedChild, vitalReadings])

  // Generate handoff on mount and when vitals change
  useEffect(() => {
    if (selectedChild) {
      const generated = generateHandoff()
      setHandoff(generated)
    }
  }, [selectedChild, generateHandoff, latestVitals])
  
  // Quick add temperature
  const handleQuickAddTemp = () => {
    if (!newTemp || !selectedChild) return
    const temp = parseFloat(newTemp)
    if (temp < 95 || temp > 108) return
    
    addVitalReading({
      id: `vital_${Date.now()}`,
      child_id: selectedChild.id,
      type: 'temperature',
      value: temp,
      unit: '°F',
      timestamp: new Date().toISOString(),
      source: 'manual',
    })
    
    setNewTemp('')
    setShowVitalUpdate(false)
    setPreflightDismissed(true)
  }

  const handleShareWithDoctor = async () => {
    if (!handoff) return
    
    // If vitals need update and user hasn't dismissed, show preview first
    if (vitalsStatus.needsUpdate && !preflightDismissed) {
      setShowPreview(true)
      return
    }
    
    setSending(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    addHandoff(handoff)
    setSending(false)
    setSent(true)
    setShowPreview(false)
  }

  const handleCopyPayload = () => {
    if (!handoff) return
    navigator.clipboard.writeText(JSON.stringify(handoff, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const priority = handoff?.priority_level || 'ROUTINE'
  const config = priorityConfig[priority]

  const velocityIcon = handoff?.triage_summary.velocity === 'worsening' 
    ? TrendingUp 
    : handoff?.triage_summary.velocity === 'improving' 
    ? TrendingDown 
    : Minus
    
  // Calculate actual risk score based on real data
  const calculatedRiskScore = useMemo(() => {
    let score = 15 // Baseline
    
    // Temperature contribution
    if (latestVitals.temp) {
      const temp = latestVitals.temp.value as number
      if (temp >= 104) score += 40
      else if (temp >= 102) score += 25
      else if (temp >= 100.4) score += 15
    }
    
    // Recent symptoms contribution
    if (recentSymptoms.length > 0) {
      score += Math.min(recentSymptoms.length * 5, 20)
    }
    
    // Medication efficacy - check notes for low response indicators
    const lowResponseMeds = recentMeds.filter(m => m.notes && m.notes.toLowerCase().includes('low response'))
    if (lowResponseMeds.length > 0) {
      score += 15
    }
    
    return Math.min(score, 100)
  }, [latestVitals, recentSymptoms, recentMeds])

  if (!selectedChild) {
    return (
      <div className="p-6 text-center">
        <Stethoscope className="w-12 h-12 text-surface-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-surface-700 dark:text-surface-300">No Child Selected</h2>
        <p className="text-surface-500 mt-2">Please select a child profile to access telehealth services.</p>
        <Link href="/dashboard/children">
          <Button className="mt-4">
            Select Child
          </Button>
        </Link>
      </div>
    )
  }
  
  const childAge = calculateAge(selectedChild.date_of_birth)

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
            Telehealth Services
          </h1>
          <p className="text-surface-500 mt-1">
            Connect with healthcare providers or share health data
          </p>
        </div>
        <div className={`px-3 py-1.5 rounded-full ${config.bg} ${config.border} border`}>
          <span className={`text-sm font-medium ${config.color}`}>
            {config.label} Priority
          </span>
        </div>
      </div>
      
      {/* PRE-FLIGHT CHECK: Missing/Stale Vitals Alert */}
      {vitalsStatus.needsUpdate && !preflightDismissed && !sent && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-amber-800 dark:text-amber-200">
                Update Vitals for Better Care
              </h4>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                {vitalsStatus.isTempMissing 
                  ? `No temperature recorded for ${selectedChild.name}. Doctors need current vitals to provide accurate advice.`
                  : `Temperature was last recorded ${Math.floor((vitalsStatus.tempAge || 0) / 60)} hours ago. Fresh data helps doctors triage faster.`
                }
              </p>
              
              {/* Quick Temperature Input */}
              {showVitalUpdate ? (
                <div className="mt-3 flex gap-2">
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 101.2"
                    value={newTemp}
                    onChange={(e) => setNewTemp(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-surface-800 border-2 border-amber-300 dark:border-amber-600 focus:border-amber-500 outline-none text-sm"
                    autoFocus
                  />
                  <Button 
                    size="sm" 
                    onClick={handleQuickAddTemp}
                    disabled={!newTemp}
                    className="bg-amber-500 hover:bg-amber-600"
                  >
                    Save
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setShowVitalUpdate(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="mt-3 flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => setShowVitalUpdate(true)}
                    className="bg-amber-500 hover:bg-amber-600"
                    icon={<Thermometer className="w-4 h-4" />}
                  >
                    Update Temperature
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setPreflightDismissed(true)}
                  >
                    Skip for Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-6 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-left"
        >
          <Video className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-semibold mb-1">Video Consultation</h3>
          <p className="text-sm text-cyan-100 opacity-90">
            Connect with a pediatric nurse via secure video
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>Avg wait: 5-10 min</span>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-6 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-left"
        >
          <Phone className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-semibold mb-1">Nurse Hotline</h3>
          <p className="text-sm text-purple-100 opacity-90">
            24/7 pediatric nurse advice line
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4" />
            <span>HIPAA Compliant</span>
          </div>
        </motion.button>
      </div>

      {/* Smart Handoff Card */}
      <Card className={`border-2 ${sent ? 'border-green-300' : config.border}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-cyan-500" />
              Smart Health Handoff
            </CardTitle>
            {!sent && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowPreview(true)}
                icon={<Eye className="w-4 h-4" />}
              >
                Preview
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                Data Sent Successfully
              </h3>
              <p className="text-surface-500 mb-4">
                Shared: Vitals History (24h), Medication Log, Risk Analysis
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-100 dark:bg-surface-800">
                <Clock className="w-4 h-4 text-surface-500" />
                <span className="text-sm text-surface-600 dark:text-surface-400">
                  Expected response: &lt; 10 minutes
                </span>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Patient Summary */}
              <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/50 mb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                      <User className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-surface-900 dark:text-white">
                        {selectedChild.name}
                      </h4>
                      <p className="text-sm text-surface-500">
                        {childAge}yo {selectedChild.gender}
                        {selectedChild.weight_lbs ? ` • ${selectedChild.weight_lbs} lbs` : ''}
                        {selectedChild.medical_conditions?.length 
                          ? ` • ${selectedChild.medical_conditions.join(', ')}`
                          : ''
                        }
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${config.color}`}>
                      {calculatedRiskScore}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-surface-500">
                      <span>Risk Score</span>
                    </div>
                  </div>
                </div>

                {/* AI Generated Complaint - now based on real data */}
                <div className="p-3 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700">
                  <p className="text-sm text-surface-700 dark:text-surface-300 italic">
                    "{childAge}yo {selectedChild.gender?.toLowerCase()} presenting with 
                    {latestVitals.temp 
                      ? ` temperature of ${latestVitals.temp.value}°F (recorded ${vitalsStatus.tempAge ? Math.round(vitalsStatus.tempAge / 60) + 'h ago' : 'recently'})` 
                      : ' temperature not recorded'
                    }
                    {recentSymptoms.length > 0 
                      ? `. Recent symptoms: ${recentSymptoms.slice(0, 2).map(s => {
                          const symptoms = Array.isArray(s?.symptoms) ? s.symptoms : [];
                          return symptoms.map(sym => typeof sym === 'string' ? sym : (sym && typeof sym === 'object' && 'name' in sym) ? String(sym.name) : 'Unknown').join(', ');
                        }).join('; ')}`
                      : ''
                    }
                    {recentMeds.length > 0 
                      ? `. ${recentMeds.length} medication dose(s) in last 24h.`
                      : ''
                    }"
                  </p>
                </div>
              </div>

              {/* Vitals Snapshot - NOW USING ACTUAL DATA */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className={`p-3 rounded-lg text-center relative ${
                  latestVitals.temp 
                    ? (latestVitals.temp.value as number) >= 100.4 
                      ? 'bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800' 
                      : 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-amber-50 dark:bg-amber-900/20 border border-dashed border-amber-300'
                }`}>
                  <Thermometer className={`w-5 h-5 mx-auto mb-1 ${
                    latestVitals.temp 
                      ? (latestVitals.temp.value as number) >= 100.4 ? 'text-red-500' : 'text-green-500'
                      : 'text-amber-500'
                  }`} />
                  <div className={`text-lg font-bold ${
                    latestVitals.temp ? 'text-surface-900 dark:text-white' : 'text-amber-600'
                  }`}>
                    {latestVitals.temp ? `${latestVitals.temp.value}°F` : 'Missing'}
                  </div>
                  <div className="text-xs text-surface-500">
                    {latestVitals.temp 
                      ? `${Math.round((vitalsStatus.tempAge || 0) / 60)}h ago` 
                      : 'Add temp ↑'
                    }
                  </div>
                  {!latestVitals.temp && (
                    <button 
                      onClick={() => setShowVitalUpdate(true)}
                      className="absolute inset-0 flex items-center justify-center bg-amber-100/50 dark:bg-amber-900/30 opacity-0 hover:opacity-100 transition-opacity rounded-lg"
                    >
                      <Plus className="w-6 h-6 text-amber-600" />
                    </button>
                  )}
                </div>
                
                <div className={`p-3 rounded-lg text-center ${
                  latestVitals.hr ? 'bg-pink-50 dark:bg-pink-900/20' : 'bg-surface-100 dark:bg-surface-800'
                }`}>
                  <Heart className={`w-5 h-5 mx-auto mb-1 ${latestVitals.hr ? 'text-pink-500' : 'text-surface-400'}`} />
                  <div className="text-lg font-bold text-surface-900 dark:text-white">
                    {latestVitals.hr ? latestVitals.hr.value : '--'}
                  </div>
                  <div className="text-xs text-surface-500">
                    {latestVitals.hr ? 'Heart Rate' : 'No data'}
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg text-center ${
                  latestVitals.o2 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-surface-100 dark:bg-surface-800'
                }`}>
                  <Wind className={`w-5 h-5 mx-auto mb-1 ${latestVitals.o2 ? 'text-blue-500' : 'text-surface-400'}`} />
                  <div className="text-lg font-bold text-surface-900 dark:text-white">
                    {latestVitals.o2 ? `${latestVitals.o2.value}%` : '--'}
                  </div>
                  <div className="text-xs text-surface-500">
                    {latestVitals.o2 ? 'O2 Sat' : 'No data'}
                  </div>
                </div>
              </div>
              
              {/* Temperature Trend Sparkline */}
              {tempTrend.length >= 2 && (
                <div className="mb-4 p-3 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                  <h4 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Temperature Trend (24h)
                  </h4>
                  <div className="h-12 flex items-end gap-1">
                    {tempTrend.map((point, i) => {
                      const minTemp = Math.min(...tempTrend.map(t => t.value))
                      const maxTemp = Math.max(...tempTrend.map(t => t.value))
                      const range = maxTemp - minTemp || 1
                      const height = ((point.value - minTemp) / range) * 100
                      const isFever = point.value >= 100.4
                      
                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-t ${isFever ? 'bg-red-400' : 'bg-cyan-400'}`}
                          style={{ height: `${Math.max(20, height)}%` }}
                          title={`${point.value}°F at ${new Date(point.time).toLocaleTimeString()}`}
                        />
                      )
                    })}
                  </div>
                  <div className="flex justify-between text-xs text-surface-400 mt-1">
                    <span>24h ago</span>
                    <span>Now</span>
                  </div>
                </div>
              )}

              {/* Recent Medications - from actual store */}
              {recentMeds.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2 flex items-center gap-2">
                    <Pill className="w-4 h-4" />
                    Recent Medications (24h)
                  </h4>
                  <div className="space-y-2">
                    {recentMeds.slice(0, 3).map((dose, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                        <div>
                          <span className="text-sm font-medium text-surface-900 dark:text-white">
                            {dose.medication?.name || 'Unknown'}
                          </span>
                          <span className="text-xs text-surface-500 ml-2">
                            {dose.dosage}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-surface-500">
                            {new Date(dose.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {dose.notes && dose.notes.includes('low response') && (
                            <Badge variant="warning" size="sm">Low Response</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Symptoms */}
              {recentSymptoms.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Recent Symptoms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recentSymptoms.slice(0, 5).flatMap((entry, i) => {
                      // Ensure entry.symptoms exists and is an array
                      const symptoms = Array.isArray(entry?.symptoms) ? entry.symptoms : [];
                      return symptoms.map((symptom, j) => {
                        // Handle both string and object symptom formats
                        const symptomName = typeof symptom === 'string' 
                          ? symptom 
                          : (symptom && typeof symptom === 'object' && 'name' in symptom) 
                            ? String(symptom.name) 
                            : 'Unknown';
                        return (
                          <Badge key={`${i}-${j}`} variant="secondary">
                            {symptomName}
                          </Badge>
                        );
                      });
                    })}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-surface-200 dark:border-surface-700">
                <Button
                  onClick={() => setShowPreview(true)}
                  variant="secondary"
                  icon={<Eye className="w-4 h-4" />}
                >
                  Preview
                </Button>
                <Button
                  onClick={handleShareWithDoctor}
                  disabled={sending}
                  className="flex-1"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Share with Doctor
                    </>
                  )}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleCopyPayload}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Previous Handoffs */}
      {telehealthHandoffs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-surface-500" />
              Previous Handoffs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {telehealthHandoffs.slice(0, 5).map((h) => {
                // Ensure all values are properly typed strings/numbers
                const priorityLevel = String(h?.priority_level || 'ROUTINE');
                const riskScore = h?.triage_summary?.risk_score ?? 'N/A';
                const generatedAt = h?.generated_at ? new Date(h.generated_at).toLocaleString() : 'Unknown';
                
                return (
                  <div 
                    key={h?.handoff_id || Math.random()}
                    className="flex items-center justify-between p-3 rounded-lg bg-surface-50 dark:bg-surface-800/50"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={priorityLevel === 'CRITICAL' ? 'danger' : priorityLevel === 'URGENT' ? 'warning' : 'default'}
                          size="sm"
                        >
                          {priorityLevel}
                        </Badge>
                        <span className="text-sm font-medium text-surface-900 dark:text-white">
                          Risk Score: {String(riskScore)}
                        </span>
                      </div>
                      <span className="text-xs text-surface-500">
                        {generatedAt}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* PROVIDER VIEW PREVIEW MODAL */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <Card className="border-2 border-cyan-300 dark:border-cyan-700">
                <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
                        <Eye className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div>
                        <CardTitle>Provider View Preview</CardTitle>
                        <p className="text-sm text-surface-500">This is what the doctor will see</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowPreview(false)} 
                      className="text-surface-400 hover:text-surface-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  {/* Data Completeness Check */}
                  <div className={`p-3 rounded-lg ${
                    vitalsStatus.needsUpdate 
                      ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700' 
                      : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      {vitalsStatus.needsUpdate ? (
                        <>
                          <AlertCircle className="w-5 h-5 text-amber-600" />
                          <span className="font-medium text-amber-800 dark:text-amber-200">
                            Incomplete Data - Temperature {vitalsStatus.isTempMissing ? 'Missing' : 'Stale'}
                          </span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800 dark:text-green-200">
                            All Required Data Present
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Simulated Provider Document */}
                  <div className="bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-lg p-4 font-mono text-sm">
                    <div className="border-b border-surface-200 dark:border-surface-700 pb-3 mb-3">
                      <div className="text-xs text-surface-400 uppercase tracking-wider mb-1">Patient Report</div>
                      <div className="text-lg font-bold text-surface-900 dark:text-white">
                        {selectedChild.name}
                      </div>
                      <div className="text-surface-500">
                        {childAge}yo {selectedChild.gender} | {selectedChild.weight_lbs ? `${selectedChild.weight_lbs} lbs` : 'Weight: Not recorded'}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-surface-400">Priority:</span>
                        <span className={`ml-2 font-bold ${config.color}`}>{priority}</span>
                        <span className="text-surface-400 ml-4">Risk Score:</span>
                        <span className="ml-2 font-bold">{calculatedRiskScore}/100</span>
                      </div>
                      
                      <div className="border-t border-surface-200 dark:border-surface-700 pt-3">
                        <div className="text-surface-400 text-xs uppercase mb-1">Current Vitals</div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <span className="text-surface-500">Temp:</span>
                            <span className={`ml-1 font-bold ${!latestVitals.temp ? 'text-amber-600' : ''}`}>
                              {latestVitals.temp ? `${latestVitals.temp.value}°F` : 'NOT RECORDED'}
                            </span>
                          </div>
                          <div>
                            <span className="text-surface-500">HR:</span>
                            <span className="ml-1">{latestVitals.hr ? latestVitals.hr.value : '--'}</span>
                          </div>
                          <div>
                            <span className="text-surface-500">SpO2:</span>
                            <span className="ml-1">{latestVitals.o2 ? `${latestVitals.o2.value}%` : '--'}</span>
                          </div>
                        </div>
                      </div>
                      
                      {selectedChild.medical_conditions && selectedChild.medical_conditions.length > 0 && (
                        <div className="border-t border-surface-200 dark:border-surface-700 pt-3">
                          <div className="text-surface-400 text-xs uppercase mb-1">Medical History</div>
                          <div>{selectedChild.medical_conditions.join(', ')}</div>
                        </div>
                      )}
                      
                      {recentMeds.length > 0 && (
                        <div className="border-t border-surface-200 dark:border-surface-700 pt-3">
                          <div className="text-surface-400 text-xs uppercase mb-1">Medications (24h)</div>
                          {recentMeds.map((dose, i) => (
                            <div key={i} className="text-surface-700 dark:text-surface-300">
                              • {dose.medication?.name || 'Unknown'} {dose.dosage} at {new Date(dose.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                              {dose.notes && dose.notes.includes('low response') && <span className="text-amber-600 ml-1">[LOW RESPONSE]</span>}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {recentSymptoms.length > 0 && (
                        <div className="border-t border-surface-200 dark:border-surface-700 pt-3">
                          <div className="text-surface-400 text-xs uppercase mb-1">Reported Symptoms</div>
                          {recentSymptoms.map((entry, i) => {
                            const symptoms = Array.isArray(entry?.symptoms) ? entry.symptoms : [];
                            const symptomNames = symptoms.map(s => 
                              typeof s === 'string' ? s : (s && typeof s === 'object' && 'name' in s) ? String(s.name) : 'Unknown'
                            ).join(', ');
                            return (
                              <div key={i} className="text-surface-700 dark:text-surface-300">
                                • {symptomNames || 'No symptoms recorded'} - {new Date(entry.timestamp).toLocaleDateString()}
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      <div className="border-t border-surface-200 dark:border-surface-700 pt-3 text-xs text-surface-400">
                        Generated: {new Date().toLocaleString()} | EPCID Smart Handoff v1.0
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    {vitalsStatus.needsUpdate && !preflightDismissed && (
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setShowPreview(false)
                          setShowVitalUpdate(true)
                        }}
                        icon={<Thermometer className="w-4 h-4" />}
                      >
                        Update Vitals First
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        setPreflightDismissed(true)
                        handleShareWithDoctor()
                      }}
                      disabled={sending}
                      className="flex-1"
                    >
                      {sending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Confirm & Send to Doctor
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
