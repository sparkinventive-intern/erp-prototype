import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '../components/ui.jsx'
import ParticlesBackground from '../components/ParticlesBackground.jsx'
import DashboardMockup from '../components/DashboardMockup.jsx'
import MetricsMarquee from '../components/MetricsMarquee.jsx'

const STUDENT_PORTAL = '/dashboard?role=student'
const STAFF_PORTAL   = '/dashboard?role=staff'

const MODULES = [
  { name: 'Admissions',  icon: 'UserPlus',      accent: '#2563eb', desc: 'Applications, offers & enrollment',  to: '/admissions', metricVal: '2,847', metricLabel: 'Applications', metric2: '324 Pending Review' },
  { name: 'Students',    icon: 'GraduationCap', accent: '#0891b2', desc: 'Student information portal',         to: STUDENT_PORTAL, metricVal: '5,420', metricLabel: 'Active Students', metric2: '92% Avg. Attendance' },
  { name: 'Fees',        icon: 'Receipt',       accent: '#10b981', desc: 'Collection, receipts & dues',        to: '/fees',       metricVal: '₹2.84 Cr', metricLabel: 'Collected', metric2: '₹42 L Pending' },
  { name: 'Faculty',     icon: 'Presentation',  accent: '#0f766e', desc: 'Staff portal — teaching & workload', to: STAFF_PORTAL,  metricVal: '312', metricLabel: 'Faculty Members', metric2: '14 On Leave' },
  { name: 'Attendance',  icon: 'CalendarCheck', accent: '#0284c7', desc: 'Daily marking & analytics',          to: '/attendance', metricVal: '42', metricLabel: 'Classes Today', metric2: '98% Marked' },
  { name: 'Exams',       icon: 'ClipboardList', accent: '#8b5cf6', desc: 'Scheduling, hall tickets & results', to: '/exams',      metricVal: '4,200', metricLabel: 'Hall Tickets', metric2: 'Mid-Terms Upcoming' },
  { name: 'Results',     icon: 'FileCheck2',    accent: '#16a34a', desc: 'GPA, transcripts & ranks',           to: '/results',    metricVal: '84%', metricLabel: 'Pass Rate', metric2: 'Fall 2025 Declared' },
  { name: 'Payroll',     icon: 'Wallet',        accent: '#4f46e5', desc: 'Salaries, slips & taxation',         to: '/payroll',    metricVal: '₹1.2 Cr', metricLabel: 'Processed', metric2: 'March Slips Gen.' },
  { name: 'Library',     icon: 'Library',       accent: '#7c3aed', desc: 'Catalog, issues & returns',          to: '/library',    metricVal: '14,200', metricLabel: 'Books', metric2: '324 Due Today' },
  { name: 'Hostel',      icon: 'BedDouble',     accent: '#dc2626', desc: 'Rooms, mess & allocation',           to: '/hostel',     metricVal: '840', metricLabel: 'Rooms Filled', metric2: '12 Available' },
  { name: 'Transport',   icon: 'Bus',           accent: '#0ea5e9', desc: 'Routes, passes & tracking',          to: '/transport',  metricVal: '24', metricLabel: 'Active Routes', metric2: '1,200 Passes Issued' },
  { name: 'Placement',   icon: 'Briefcase',     accent: '#6366f1', desc: 'Drives, offers & training',          to: '/placement',  metricVal: '450', metricLabel: 'Offers Made', metric2: '14 Active Drives' },
  { name: 'Assets',      icon: 'Package',       accent: '#0d9488', desc: 'Inventory & procurement',            to: '/assets',     metricVal: '4,200', metricLabel: 'Tracked Items', metric2: '14 Audits Pending' },
  { name: 'Documents',   icon: 'FolderOpen',    accent: '#2563eb', desc: 'Certificates & records',             to: '/documents',  metricVal: '14,200', metricLabel: 'Verified', metric2: '420 Requests' },
  { name: 'Tickets',     icon: 'LifeBuoy',      accent: '#ea580c', desc: 'Helpdesk & grievances',              to: '/tickets',    metricVal: '1.2h', metricLabel: 'Avg Resolution', metric2: '24 Open Tickets' },
  { name: 'Analytics',   icon: 'BarChart3',     accent: '#4338ca', desc: 'Institution-wide insights',          to: '/analytics',  metricVal: '12', metricLabel: 'Dashboards', metric2: 'Live Updates' },
]

function ModuleCard({ mod, i }) {
  return (
    <motion.a
      href={mod.to}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col w-full rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_60px_rgba(110,168,255,0.18)] transition-all duration-[400ms] focus:outline-none"
      style={{ background: 'linear-gradient(180deg,#F8FBFF 0%,#FFFFFF 45%)', minHeight: 380 }}
    >
      {/* Top decorative wave — top 25% */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{
          height: 130,
          background: 'linear-gradient(135deg,#6EA8FF 0%,#BFD7FF 100%)',
          opacity: 0.13,
          clipPath: 'ellipse(100% 100% at 50% 0%)',
        }}
      />

      {/* LIVE badge */}
      <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 border border-slate-100 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Live</span>
      </div>

      {/* Main column */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-8 pb-6 flex-1">

        {/* Glassmorphism icon circle */}
        <div
          className="mb-5 transition-transform duration-[400ms] group-hover:scale-[1.07]"
          style={{
            width: 80, height: 80, borderRadius: '50%',
            flexShrink: 0,
            background: 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 12px 40px rgba(110,168,255,0.22),0 2px 8px rgba(0,0,0,0.07),inset 0 1px 0 rgba(255,255,255,1),0 0 0 1.5px rgba(110,168,255,0.10)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: `radial-gradient(circle at 40% 35%,${mod.accent}20,transparent 65%)` }}
          />
          <Icon name={mod.icon} size={30} strokeWidth={2.0} style={{ color: mod.accent }} className="relative z-10" />
        </div>

        {/* Module name — dominant visual element */}
        <h3
          className="mb-2"
          style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#0F172A' }}
        >
          {mod.name}
        </h3>

        {/* Primary metric — accent value + muted label */}
        <div className="flex items-baseline gap-1.5 mb-1">
          <span style={{ fontSize: 18, fontWeight: 700, color: mod.accent }}>{mod.metricVal}</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: '#94A3B8' }}>{mod.metricLabel}</span>
        </div>

        {/* Secondary metric */}
        <p className="mb-4" style={{ fontSize: 12, color: '#CBD5E1', fontWeight: 500 }}>
          {mod.metric2}
        </p>

        {/* Thin divider */}
        <div
          className="w-full mb-4"
          style={{ height: 1, background: 'linear-gradient(90deg,transparent,#E2E8F0 25%,#E2E8F0 75%,transparent)' }}
        />

        {/* Description */}
        <p
          className="flex-1 mb-5"
          style={{ fontSize: 15, lineHeight: 1.6, color: '#475569', opacity: 0.7 }}
        >
          {mod.desc}
        </p>

        {/* Floating circular arrow */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:bg-[#1A2E8F] group-hover:border-[#1A2E8F] group-hover:shadow-[0_4px_16px_rgba(26,46,143,0.28)]">
          <Icon
            name="ArrowRight"
            size={15}
            strokeWidth={2.5}
            className="text-slate-400 group-hover:text-white transition-colors duration-300"
          />
        </div>
      </div>
    </motion.a>
  )
}

export default function Landing() {
  const [query, setQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [placeholder, setPlaceholder] = useState('')
  
  useEffect(() => {
    const texts = ["Search Admissions...", "Search Fees...", "Search Results...", "Search anything..."]
    let currentTextIdx = 0
    let currentCharIdx = 0
    let isDeleting = false
    let timeoutId

    const type = () => {
      const currentFullText = texts[currentTextIdx]
      
      if (isDeleting) {
        setPlaceholder(currentFullText.substring(0, currentCharIdx - 1))
        currentCharIdx--
      } else {
        setPlaceholder(currentFullText.substring(0, currentCharIdx + 1))
        currentCharIdx++
      }

      let typeSpeed = isDeleting ? 30 : 60

      if (!isDeleting && currentCharIdx === currentFullText.length) {
        typeSpeed = 2000
        isDeleting = true
      } else if (isDeleting && currentCharIdx === 0) {
        isDeleting = false
        currentTextIdx = (currentTextIdx + 1) % texts.length
        typeSpeed = 500
      }

      timeoutId = setTimeout(type, typeSpeed)
    }

    timeoutId = setTimeout(type, 1000)
    return () => clearTimeout(timeoutId)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return MODULES
    return MODULES.filter((m) => m.name.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q))
  }, [query])

  const scrollToModules = () => {
    document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="min-h-screen bg-[#FAFAFA] relative selection:bg-[#3b82f6]/20 selection:text-[#3b82f6]"
    >
      {/* ── Top bar ───────────────────────────────────────────── */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0C1540]/50 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-12">
          <a href="/" className="flex items-center gap-2.5 focus:outline-none">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 shadow-inner">
              <Icon name="GraduationCap" size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[15px] font-bold tracking-tight text-white">
              SCET<span className="text-white/60 font-medium ml-1">ERP</span>
            </span>
          </a>

          <div className="flex items-center gap-4">
            <a href="/console" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Admin Console</a>
            <a href={STUDENT_PORTAL} className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[#0C1540] hover:bg-slate-100 transition-colors shadow-sm">Sign In</a>
          </div>
        </div>
      </motion.header>

      {/* ── Hero (Two-Column) ──────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden mesh-bg pt-20">
        <ParticlesBackground />
        
        {/* Dot grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.1]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '40px 40px' }} 
        />

        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3 py-1.5 mb-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
            >
              <div className="w-2 h-2 rounded-full bg-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">SCET ERP 2.0 is live</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[48px] sm:text-[64px] lg:text-[76px] font-extrabold leading-[1.05] tracking-tight drop-shadow-sm"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">One platform for</span> <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">every campus operation.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg sm:text-[22px] leading-relaxed text-white/60 font-medium"
            >
              Manage admissions, academics, finance, examinations, hostel operations and analytics from a single intelligent platform.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <a 
                href={STUDENT_PORTAL}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#0C1540] transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
              >
                Launch Platform
                <Icon name="ArrowRight" size={16} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button 
                onClick={scrollToModules}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-bold text-white transition-colors hover:bg-white/10"
              >
                Explore Modules
                <Icon name="ChevronDown" size={16} />
              </button>
            </motion.div>
          </div>

          {/* Right Dashboard Mockup */}
          <div className="flex-1 w-full relative h-[400px] lg:h-[600px] hidden md:flex items-center justify-center">
            <DashboardMockup />
          </div>
          
        </div>
      </section>

      {/* Metrics Ribbon */}
      <MetricsMarquee />

      {/* ── Modules grid ──────────────────────────────────────── */}
      <section id="modules" className="relative z-10 mx-auto max-w-[1400px] px-6 py-32 lg:px-12 bg-[#FAFAFA]">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[32px] sm:text-[40px] font-bold tracking-tight text-slate-900"
          >
            A module for everything.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-lg text-slate-500"
          >
            Purpose-built tools designed to streamline your daily workflow and enhance institutional productivity.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 max-w-md mx-auto relative"
          >
            <Icon name="Search" size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10 ${isSearchFocused ? 'text-[#3b82f6]' : 'text-slate-400'}`} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder={placeholder}
              className={`w-full rounded-full bg-white py-4 pl-12 pr-4 text-[15px] text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:outline-none border border-slate-200 shadow-sm focus:border-[#3b82f6] focus:ring-4 focus:ring-[#3b82f6]/10`}
            />
          </motion.div>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-200 bg-white py-32 text-center"
            >
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-slate-50 text-slate-400 mb-6">
                <Icon name="SearchX" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">No modules found</h3>
              <p className="mt-2 text-slate-500">We couldn't find anything matching "{query}"</p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((mod, i) => <ModuleCard key={mod.name} mod={mod} i={i} />)}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 py-12 sm:flex-row lg:px-12">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900">
              <Icon name="GraduationCap" size={16} className="text-white" />
            </div>
            <span className="text-[15px] font-semibold text-slate-900">SCET</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
          </div>
          <p className="text-sm text-slate-400 font-medium">© 2026 Salem College.</p>
        </div>
      </footer>
    </motion.div>
  )
}
