import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from './ui.jsx'
import { getAssistantReply, SUGGESTED_PROMPTS } from '../data/assistantEngine.js'

let idSeq = 0
const mk = (role, text) => ({ id: ++idSeq, role, text })

export default function AIAssistant() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    mk('bot', "Hello! I'm your personal AI assistant. Ask me about your fees, attendance, marks, exams, hostel or any portal service."),
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
    }, 650 + Math.random() * 550)
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full brand-gradient shadow-lg shadow-navy/30"
      >
        <Icon name={open ? 'X' : 'Sparkles'} size={24} className="text-white" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            className="surface fixed bottom-24 right-5 z-50 flex h-[28rem] w-[22rem] flex-col overflow-hidden rounded-2xl sm:w-[24rem]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 brand-gradient px-4 py-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/15">
                <Icon name="Bot" size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">AI Assistant</p>
                <p className="flex items-center gap-1 text-[10px] text-sky-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online
                </p>
              </div>
              <button
                onClick={() => { setOpen(false); navigate('/ai-assistant') }}
                title="Open full-page assistant"
                className="ml-auto grid h-8 w-8 place-items-center rounded-lg text-white/80 hover:bg-white/15"
              >
                <Icon name="Maximize2" size={15} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'rounded-br-sm brand-gradient text-white'
                        : 'rounded-bl-sm border border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-3 py-3">
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

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 bg-slate-50 px-3 pb-2">
                {SUGGESTED_PROMPTS.slice(0, 4).map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-600 hover:border-accent hover:text-navy"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-slate-200 bg-white p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask your AI assistant…"
                className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-navy placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              <button
                onClick={() => send()}
                className="grid h-9 w-9 place-items-center rounded-lg brand-gradient text-white disabled:opacity-50"
                disabled={typing}
              >
                <Icon name="Send" size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
