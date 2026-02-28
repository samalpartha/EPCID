'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Brain, 
  Activity, 
  Bell, 
  ChevronRight,
  Heart,
  Thermometer,
  Wind,
  Play,
  CheckCircle,
  ArrowRight,
  Lock,
  Clock,
  Users,
  Star,
  Phone,
  Stethoscope,
  BookOpen,
  Calculator,
  Mail,
  MapPin,
  Calendar,
  ChevronDown,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Award,
  HeartPulse,
  Baby,
  Sparkles,
  AlertCircle,
} from 'lucide-react'
import { ThemeToggle, Logo } from '@/components/ui'

const services = [
  {
    icon: Stethoscope,
    title: 'Symptom Checker',
    description: 'Guided symptom assessment with clinical guidelines and 4-tier triage recommendations.',
  },
  {
    icon: Brain,
    title: 'AI Risk Analysis',
    description: 'Phoenix Sepsis Score, PEWS scoring, and physical exam analysis for early detection.',
  },
  {
    icon: Calculator,
    title: 'Dosage Calculator',
    description: 'Accurate weight-based medication dosing for common pediatric OTC medications.',
  },
  {
    icon: BookOpen,
    title: 'Care Guides',
    description: 'Expert-written home care instructions for fever, coughs, rashes, and more.',
  },
  {
    icon: Bell,
    title: 'Health Monitoring',
    description: 'Track symptoms over time with alerts when patterns indicate concern.',
  },
  {
    icon: HeartPulse,
    title: 'Vital Signs',
    description: 'Age-adjusted vital sign assessment with normal ranges for all pediatric ages.',
  },
]

const stats = [
  { value: '99.2%', label: 'Clinical Accuracy' },
  { value: '75+', label: 'Symptoms Covered' },
  { value: '24/7', label: 'Always Available' },
  { value: '10K+', label: 'Families Trust Us' },
]

const testimonials = [
  {
    quote: "EPCID caught our daughter's RSV early. The AI flagged respiratory distress signs we would have missed. Can't recommend it enough!",
    author: "Sarah Mitchell",
    role: "Mother of 2",
    rating: 5,
  },
  {
    quote: "As a pediatrician, I recommend EPCID to all my patients' families. The clinical reasoning is solid and the interface is intuitive.",
    author: "Dr. James Lee",
    role: "Pediatrician, MD",
    rating: 5,
  },
  {
    quote: "The dosage calculator alone has saved us multiple late-night pharmacy trips. Simple, accurate, and peace of mind.",
    author: "Michael Roberts",
    role: "Father of 3",
    rating: 5,
  },
]

const features = [
  { icon: CheckCircle, text: 'Evidence-based clinical algorithms' },
  { icon: CheckCircle, text: 'Phoenix Sepsis Score (2024 criteria)' },
  { icon: CheckCircle, text: 'Pediatric Early Warning Score (PEWS)' },
  { icon: CheckCircle, text: 'Age-adjusted vital sign analysis' },
  { icon: CheckCircle, text: 'HIPAA compliant & secure' },
  { icon: CheckCircle, text: '24/7 availability' },
]

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-6 mb-2 sm:mb-0">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Available 24/7</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@epcid.com</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:911" className="flex items-center gap-2 font-semibold hover:text-cyan-100 transition">
                <Phone className="w-4 h-4" />
                <span>Emergency: 911</span>
              </a>
              <div className="hidden sm:flex items-center gap-3 ml-4 pl-4 border-l border-white/30">
                <a href="#" className="hover:text-cyan-100 transition"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="hover:text-cyan-100 transition"><Twitter className="w-4 h-4" /></a>
                <a href="#" className="hover:text-cyan-100 transition"><Instagram className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <Logo size="lg" showPulse={true} animate={false} />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#home" className="text-surface-600 dark:text-surface-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium transition">Home</a>
              <a href="#services" className="text-surface-600 dark:text-surface-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium transition">Services</a>
              <a href="#about" className="text-surface-600 dark:text-surface-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium transition">About</a>
              <a href="#testimonials" className="text-surface-600 dark:text-surface-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium transition">Reviews</a>
              <a href="#contact" className="text-surface-600 dark:text-surface-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium transition">Contact</a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="/login" className="hidden sm:block text-surface-600 dark:text-surface-300 hover:text-cyan-600 font-medium transition px-4 py-2 active:scale-95 transform">
                Sign In
              </Link>
              <Link 
                href="/register"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-95 transform"
              >
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Get Started</span>
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg transition-all active:scale-95"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800 py-4 px-4"
          >
            <div className="flex flex-col gap-2">
              <a href="#home" className="px-4 py-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300 font-medium">Home</a>
              <a href="#services" className="px-4 py-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300 font-medium">Services</a>
              <a href="#about" className="px-4 py-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300 font-medium">About</a>
              <a href="#testimonials" className="px-4 py-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300 font-medium">Reviews</a>
              <a href="#contact" className="px-4 py-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300 font-medium">Contact</a>
              <Link href="/login" className="px-4 py-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-cyan-600 font-medium">Sign In</Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/95 to-teal-600/90 dark:from-cyan-900/95 dark:to-teal-900/90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584515933487-779824d29309?w=1920&q=80')] bg-cover bg-center opacity-20" />
        
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-surface-950 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
                <Baby className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Trusted by 10,000+ Families</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                We Care About Your 
                <span className="block text-cyan-200">Child's Health</span>
              </h1>

              <p className="text-lg text-white/90 mb-8 max-w-lg leading-relaxed">
                AI-powered pediatric health monitoring that helps you detect critical illness early. 
                Clinical-grade symptom assessment, trusted by pediatricians.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link 
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-cyan-600 font-semibold text-lg transition-all hover:bg-cyan-50 shadow-xl hover:shadow-2xl active:scale-[0.98] transform"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-transparent border-2 border-white/50 text-white font-semibold text-lg hover:bg-white/10 transition-all active:scale-[0.98] transform"
                >
                  <Play className="w-5 h-5" />
                  Learn More
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Main Card */}
                <div className="bg-white dark:bg-surface-800 rounded-3xl shadow-2xl p-8 border border-surface-200 dark:border-surface-700">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        E
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-surface-900 dark:text-white">Emma Johnson</h3>
                        <p className="text-surface-500">4 years old • Last check: Today</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      Low Risk
                    </div>
                  </div>

                  {/* Vitals */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-surface-50 dark:bg-surface-900 text-center">
                      <Thermometer className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-surface-900 dark:text-white">99.1°F</div>
                      <div className="text-xs text-surface-500">Temperature</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface-50 dark:bg-surface-900 text-center">
                      <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-surface-900 dark:text-white">92 bpm</div>
                      <div className="text-xs text-surface-500">Heart Rate</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface-50 dark:bg-surface-900 text-center">
                      <Wind className="w-6 h-6 text-cyan-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-surface-900 dark:text-white">Good</div>
                      <div className="text-xs text-surface-500">Air Quality</div>
                    </div>
                  </div>

                  {/* AI Assessment */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/30 dark:to-teal-900/30 border border-cyan-100 dark:border-cyan-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      <span className="font-semibold text-cyan-700 dark:text-cyan-300">AI Assessment</span>
                    </div>
                    <p className="text-sm text-surface-600 dark:text-surface-400">
                      Mild symptoms consistent with common cold. Continue monitoring hydration and rest. No immediate concerns.
                    </p>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 px-4 py-3 bg-white dark:bg-surface-800 rounded-xl shadow-lg border border-surface-200 dark:border-surface-700 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-surface-900 dark:text-white">HIPAA Compliant</div>
                    <div className="text-xs text-surface-500">Your data is secure</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Architecture Section */}
      <section id="architecture" className="py-20 lg:py-28 bg-surface-900 dark:bg-surface-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80')] bg-cover bg-center opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-900/50 text-cyan-400 font-medium text-sm mb-4 border border-cyan-800"
            >
              <Brain className="w-4 h-4" />
              Agentic Architecture
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            >
              Powered by Multi-Agent AI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-surface-400 max-w-2xl mx-auto"
            >
              Unlike simple symptom checkers, EPCID uses an orchestrator pattern with specialized AI agents pulling real-time environmental data and clinical guidelines to compute Phoenix Sepsis and PEWS scores.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connection Lines (Hidden on Mobile) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-cyan-900 via-cyan-500 to-teal-900 transform -translate-y-1/2 opacity-20" />
            
            {[
              { 
                icon: Activity, 
                title: 'Symptom Intake Agent', 
                desc: 'Extracts clinically relevant signals from unstructured parent input.',
                metrics: 'LLama-3-70b • <800ms'
              },
              { 
                icon: Wind, 
                title: 'Geo-Exposure Agent', 
                desc: 'Correlates patient symptoms with real-time AQI and environmental triggers.',
                metrics: 'AirNow/OpenAQ Integration'
              },
              { 
                icon: Shield, 
                title: 'Clinical Risk Agent', 
                desc: 'Computes pediatric-specific risk scores (PEWS) & sepsis criteria.',
                metrics: 'Rule-based + AI Triage'
              },
              { 
                icon: BookOpen, 
                title: 'Guideline RAG Agent', 
                desc: 'Retrieves age-appropriate care guidelines from AAP and MedlinePlus.',
                metrics: 'Vector Search • RAG Pipeline'
              }
            ].map((agent, i) => (
              <motion.div
                key={agent.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-surface-800/80 backdrop-blur-sm rounded-2xl p-6 border border-surface-700 hover:border-cyan-500 transition-colors z-10"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-surface-700 to-surface-600 flex items-center justify-center mb-4 border border-surface-600 shadow-inner">
                  <agent.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{agent.title}</h3>
                <p className="text-surface-400 text-sm mb-4 min-h-[60px]">{agent.desc}</p>
                <div className="pt-4 border-t border-surface-700 font-mono text-xs text-cyan-500">
                  {agent.metrics}
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="font-mono text-sm text-surface-400 border border-surface-800 rounded-xl p-6 bg-surface-900/50 inline-block mx-auto backdrop-blur-md shadow-2xl">
              <div className="text-cyan-500 mb-4 font-semibold tracking-wider">ENGINEERING STACK</div>
              <div className="flex flex-wrap justify-center gap-3 text-xs">
                <span className="px-4 py-2 bg-surface-800 border border-surface-700 rounded-full hover:border-cyan-500 transition-colors cursor-default">Next.js 14</span>
                <span className="px-4 py-2 bg-surface-800 border border-surface-700 rounded-full hover:border-cyan-500 transition-colors cursor-default">FastAPI</span>
                <span className="px-4 py-2 bg-surface-800 border border-surface-700 rounded-full hover:border-cyan-500 transition-colors cursor-default">SQLAlchemy</span>
                <span className="px-4 py-2 bg-surface-800 border border-surface-700 rounded-full hover:border-cyan-500 transition-colors cursor-default">Groq Inference Engine</span>
                <span className="px-4 py-2 bg-surface-800 border border-surface-700 rounded-full hover:border-cyan-500 transition-colors cursor-default">Llama 3 70B</span>
                <span className="px-4 py-2 bg-surface-800 border border-surface-700 rounded-full hover:border-cyan-500 transition-colors cursor-default">Tailwind CSS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-28 bg-surface-50 dark:bg-surface-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 font-medium text-sm mb-4"
            >
              <Sparkles className="w-4 h-4" />
              Our Services
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white mb-4"
            >
              Comprehensive Pediatric Care
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto"
            >
              Everything you need to monitor and protect your child's health, powered by clinically-validated AI.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white dark:bg-surface-800 rounded-2xl p-8 border border-surface-200 dark:border-surface-700 hover:border-cyan-300 dark:hover:border-cyan-700 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/25">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-surface-600 dark:text-surface-400 leading-relaxed mb-4">{service.description}</p>
                <a href="#" className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold hover:gap-3 transition-all active:scale-95 transform">
                  Learn More <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 font-medium text-sm mb-4">
                <Award className="w-4 h-4" />
                Why Choose EPCID
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white mb-6">
                Clinical Excellence Meets Modern Technology
              </h2>
              <p className="text-lg text-surface-600 dark:text-surface-400 mb-8 leading-relaxed">
                EPCID was developed in collaboration with pediatricians and emergency medicine specialists. 
                Our AI uses the latest clinical guidelines including the 2024 Phoenix Sepsis Criteria to 
                provide accurate, evidence-based health assessments.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <feature.icon className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                    <span className="text-surface-700 dark:text-surface-300">{feature.text}</span>
                  </div>
                ))}
              </div>

              <Link 
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold hover:from-cyan-600 hover:to-teal-700 transition-all shadow-lg shadow-cyan-500/25 active:scale-[0.98] transform"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 border border-surface-200 dark:border-surface-700 shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div className="text-3xl font-bold text-surface-900 dark:text-white mb-1">99.2%</div>
                  <div className="text-surface-500">Clinical Sensitivity</div>
                </div>
                <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 border border-surface-200 dark:border-surface-700 shadow-lg mt-8">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold text-surface-900 dark:text-white mb-1">10K+</div>
                  <div className="text-surface-500">Families Protected</div>
                </div>
                <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 border border-surface-200 dark:border-surface-700 shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-3xl font-bold text-surface-900 dark:text-white mb-1">&lt;2s</div>
                  <div className="text-surface-500">AI Response Time</div>
                </div>
                <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 border border-surface-200 dark:border-surface-700 shadow-lg mt-8">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="text-3xl font-bold text-surface-900 dark:text-white mb-1">HIPAA</div>
                  <div className="text-surface-500">Fully Compliant</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 lg:py-28 bg-gradient-to-br from-cyan-600 to-teal-700 dark:from-cyan-900 dark:to-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-medium text-sm mb-4"
            >
              <Star className="w-4 h-4" />
              Testimonials
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              What Parents Say
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-surface-800 rounded-2xl p-8 shadow-xl"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-surface-700 dark:text-surface-300 mb-6 leading-relaxed text-lg">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-xl font-bold">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-surface-900 dark:text-white">{t.author}</div>
                    <div className="text-surface-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-surface-900 to-surface-800 dark:from-surface-800 dark:to-surface-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-2xl"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start Protecting Your Child Today
            </h2>
            <p className="text-lg text-surface-300 mb-8 max-w-xl mx-auto">
              Join thousands of families using AI-powered health monitoring. 
              Free to start, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold text-lg hover:from-cyan-600 hover:to-teal-700 transition-all shadow-lg shadow-cyan-500/30 active:scale-[0.98] transform"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="mailto:support@epcid.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-semibold text-lg hover:bg-white/20 transition-all active:scale-[0.98] transform"
              >
                <Mail className="w-5 h-5" />
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 dark:bg-surface-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="mb-6">
                <Logo size="lg" showPulse={true} animate={false} />
              </div>
              <p className="text-surface-400 mb-6 leading-relaxed">
                AI-powered pediatric health monitoring for worried parents. Clinical-grade symptom assessment, trusted by pediatricians.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-lg bg-surface-800 hover:bg-cyan-600 flex items-center justify-center transition-all active:scale-90 transform">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-surface-800 hover:bg-cyan-600 flex items-center justify-center transition-all active:scale-90 transform">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-surface-800 hover:bg-cyan-600 flex items-center justify-center transition-all active:scale-90 transform">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-surface-800 hover:bg-cyan-600 flex items-center justify-center transition-all active:scale-90 transform">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-surface-400 hover:text-cyan-400 transition">Home</a></li>
                <li><a href="#services" className="text-surface-400 hover:text-cyan-400 transition">Services</a></li>
                <li><a href="#about" className="text-surface-400 hover:text-cyan-400 transition">About Us</a></li>
                <li><a href="#testimonials" className="text-surface-400 hover:text-cyan-400 transition">Reviews</a></li>
                <li><a href="#contact" className="text-surface-400 hover:text-cyan-400 transition">Contact</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-6">Our Services</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-surface-400 hover:text-cyan-400 transition">Symptom Checker</a></li>
                <li><a href="#" className="text-surface-400 hover:text-cyan-400 transition">Risk Assessment</a></li>
                <li><a href="#" className="text-surface-400 hover:text-cyan-400 transition">Dosage Calculator</a></li>
                <li><a href="#" className="text-surface-400 hover:text-cyan-400 transition">Care Guides</a></li>
                <li><a href="#" className="text-surface-400 hover:text-cyan-400 transition">AI Assistant</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-surface-400">123 Healthcare Ave, Medical District, CA 90210</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-surface-400">Emergency: 911</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-surface-400">support@epcid.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-surface-400 text-sm">
              © 2024 EPCID. All rights reserved. Not a substitute for professional medical advice.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-surface-400 hover:text-cyan-400 transition">Privacy Policy</a>
              <a href="#" className="text-surface-400 hover:text-cyan-400 transition">Terms of Service</a>
              <a href="#" className="text-surface-400 hover:text-cyan-400 transition">HIPAA Notice</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
