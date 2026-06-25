import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageShell, GlassCard, Icon } from '../components/ui.jsx'
import { getAssistantReply, SUGGESTED_PROMPTS } from '../data/assistantEngine.js'
import { ROLE } from '../data/roles.js'

const STUDENT = ROLE.user

let idSeq = 0
const mk = (role, text) => ({ id: ++idSeq, role, text, time: new Date() })
const clock = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

export default function AIAssistantPage() {
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    mk('bot', `Hello ${ROLE.user.name.split(' ')[0]}, I'm the ${ROLE.assistant} on Spark ERP — your ${ROLE.name} portal co-pilot. Ask me anything about your modules, data and workflows.`),
  ])
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  function send(text) {
    const q = (text ?? input).trim()
    if (!q || typing) return
    setMessages((m) => [...m, mk('user', q)])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, mk('bot', getAssistantReply(q))])
    }, 700 + Math.random() * 600)
  }

  return (
    <PageShell
      icon="Sparkles"
      title={ROLE.assistant}
      subtitle={`Your conversational AI co-pilot for the ${ROLE.name} portal.`}
    >
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Chat panel */}
        <GlassCard className="flex h-[68vh] flex-col overflow-hidden p-0 lg:col-span-3">
          {/* Header */}
          <div className="flex items-center gap-3 brand-gradient px-5 py-3.5">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/15">
              <Icon name="Bot" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{ROLE.assistant}</p>
              <p className="flex items-center gap-1 text-[11px] text-sky-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online · context-aware
              </p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-5">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-end gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'bot' && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg brand-gradient">
                    <Icon name="Bot" size={15} className="text-white" />
                  </div>
                )}
                <div className={`max-w-[78%] ${m.role === 'user' ? 'text-right' : ''}`}>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'rounded-br-sm brand-gradient text-white'
                        : 'rounded-bl-sm border border-slate-200 bg-white text-slate-700 shadow-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                  <p className="mt-1 px-1 text-[10px] text-slate-400">{clock(m.time)}</p>
                </div>
                {m.role === 'user' && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-200 text-xs font-bold text-navy">
                    {STUDENT.name.split(' ').map((p) => p[0]).join('')}
                  </div>
                )}
              </motion.div>
            ))}
            {typing && (
              <div className="flex items-end gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg brand-gradient">
                  <Icon name="Bot" size={15} className="text-white" />
                </div>
                <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-3.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-slate-200 bg-white p-3.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask me anything about your portal…"
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            <button
              onClick={() => send()}
              disabled={typing}
              className="grid h-10 w-10 place-items-center rounded-lg brand-gradient text-white disabled:opacity-50"
            >
              <Icon name="Send" size={17} />
            </button>
          </div>
        </GlassCard>

        {/* Side panel */}
        <div className="space-y-4">
          <GlassCard className="p-4">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold text-navy">
              <Icon name="Lightbulb" size={16} className="text-accent" /> Suggested questions
            </p>
            <div className="space-y-2">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs text-slate-600 transition hover:border-accent hover:bg-sky-50 hover:text-navy"
                >
                  {p}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-navy">
              <Icon name="ShieldCheck" size={16} className="text-emerald-600" /> About this assistant
            </p>
            <p className="text-xs leading-relaxed text-slate-500">
              This assistant answers using your portal data — fees, attendance, marks, exams,
              hostel and services — and guides you to the right module. All processing happens
              in your session.
            </p>
          </GlassCard>
        </div>
      </div>
    </PageShell>
  )
}
