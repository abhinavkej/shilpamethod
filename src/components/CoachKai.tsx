import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

// Seed conversation shown on load — looks like a real exchange
const SEED_MESSAGES: Message[] = [
  { from: 'user', text: 'Got my labs back. TSH is 3.8. Is that bad?' },
  {
    from: 'kai',
    text: 'Not "bad" — but worth a closer look. In perimenopause, TSH above ~2.5 often correlates with the symptoms you described: fatigue, brain fog, low mood. Pulling Dr. Saxena\'s framework for you now.',
    tag: 'Dr. S · reviewed',
  },
  {
    from: 'kai',
    text: 'Drafted two follow-up questions for your OB-GYN. Want me to walk you through them?',
  },
]

const QUICK_CHIPS = [
  'What labs should I ask for?',
  'Is HRT safe?',
  'Why am I waking at 3 AM?',
  'What will I get from the boot camp?',
]

const KAI_REPLIES: Record<string, string> = {
  'What labs should I ask for?':
    "Dr. Saxena's core panel: Estradiol (E2), FSH, Free & Total Testosterone, SHBG, Progesterone, TSH + Free T3/T4, Fasting Insulin + HbA1c, and 25-OH Vitamin D. Day 2 of the boot camp walks through every number in detail.",
  'Is HRT safe?':
    "For most perimenopausal women — yes, especially transdermal estradiol + micronized progesterone. The fear comes from a 2002 study on synthetic hormones in older women. The picture has changed significantly since. Dr. Saxena covers the four risk axes on Day 2.",
  'Why am I waking at 3 AM?':
    "That's a hormonal signature, not anxiety. Progesterone metabolizes into a compound that calms the nervous system. As it drops in perimenopause, you lose that natural sedative — and a cortisol spike around 3 AM kicks you out of deep sleep. Melatonin won't fix this. Dr. Saxena covers it on Day 1.",
  'What will I get from the boot camp?':
    "Three live group sessions with Dr. Saxena, a workbook you fill in as you go, and a Patient Advocacy Document — a clinical summary you bring to your doctor. It includes your symptom history, a recommended lab panel, risk profile, and exact questions to ask. It's the thing most women say they wish they'd had years ago.",
}

const FALLBACK =
  "That's a great question — it's exactly what Dr. Saxena addresses in the boot camp. Reserve your spot and you'll have access to her directly during three live sessions."

interface Message {
  from: 'user' | 'kai'
  text: string
  tag?: string
}

export default function CoachKai() {
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [chipsUsed, setChipsUsed] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text: string) => {
    if (!text.trim()) return
    const userMsg = text.trim()
    setMessages((m) => [...m, { from: 'user', text: userMsg }])
    setInput('')
    setChipsUsed(true)
    setTyping(true)
    setTimeout(() => {
      const reply = KAI_REPLIES[userMsg] || FALLBACK
      setMessages((m) => [...m, { from: 'kai', text: reply, tag: 'Dr. S · reviewed' }])
      setTyping(false)
    }, 1100)
  }

  return (
    <motion.section
      id="coach-kai"
      className="py-24 md:py-36 px-6 bg-cream"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-center">
        {/* Left — copy */}
        <div>
          <motion.p variants={fadeInUp} className="text-label text-coral uppercase mb-5">
            Want to chat with Dr. Saxena and her team between sessions?
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="font-display text-display-xl text-forest mb-6"
          >
            Meet Coach Kai.
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-body-lg text-slate mb-6"
          >
            An interface to interact with Dr. Shilpa Saxena. Available on
            <span className="text-forest font-medium"> WhatsApp</span> and in your
            <span className="text-forest font-medium"> mobile or desktop browser</span> — whichever you're most comfortable with.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="bg-forest text-cream rounded-2xl px-6 py-5 mb-6"
          >
            <div className="flex gap-3">
              <div className="text-coral-soft text-2xl leading-none">"</div>
              <p className="text-body-md text-cream/90 leading-relaxed">
                Every clinical response is reviewed by a physician or nurse before it reaches you.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-3 mb-6">
            <Bullet>
              <strong className="text-forest">Intake-only, starting now:</strong> use Coach Kai to enter
              your family history, current medications, and background before the boot camp begins.
              This information is assembled by Dr. Saxena's team.
            </Bullet>
            <Bullet>
              <strong className="text-forest">Clinical questions open one week before your boot camp through the 3 day program:</strong>{' '}
              that's when Coach Kai becomes your go-to place to ask questions and get answers from
              Dr. Saxena and her team.
            </Bullet>
            <Bullet>
              <strong className="text-forest">After the boot camp:</strong> Coach Kai becomes the
              interface for you to keep asking questions through the opt-in community, be it on your
              latest labs, feedback on conversations with your doctor, or some funky new supplement
              you heard about on social media.
            </Bullet>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-[13px] text-slate italic leading-relaxed">
            No instant clinical answers. No chatbot shortcuts. The framing is physician-reviewed
            quality, not chatbot speed.
          </motion.p>
        </div>

        {/* Right — interactive chat */}
        <motion.div variants={fadeInUp} className="relative">
          <div
            className="bg-bone rounded-[24px] border border-border max-w-[420px] mx-auto overflow-hidden"
            style={{ boxShadow: '0 24px 60px -15px rgba(31,58,46,0.20)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center text-cream font-display text-[18px]">
                  K
                </div>
                <div>
                  <div className="text-[14px] text-forest font-medium">Coach Kai</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate">
                    <span className="w-1.5 h-1.5 rounded-full bg-risk-low" />
                    Physician-reviewed · Active
                  </div>
                </div>
              </div>
              <div className="font-mono text-[10px] text-slate tracking-wider uppercase">
                WhatsApp
              </div>
            </div>

            {/* Messages */}
            <div className="h-[280px] overflow-y-auto px-4 py-4 space-y-3 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.from === 'kai' ? (
                    <div className="max-w-[82%]">
                      <div className="bg-sand text-ink rounded-2xl rounded-tl-md px-4 py-2.5 text-[13px] leading-relaxed">
                        {m.text}
                      </div>
                      {m.tag && (
                        <div className="font-mono text-[9px] text-coral tracking-wide mt-1 ml-1">{m.tag}</div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-coral/90 text-cream rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[75%] text-[13px] leading-relaxed">
                      {m.text}
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-sand text-slate text-[13px] px-4 py-2.5 rounded-2xl rounded-tl-md">
                    <span className="inline-flex gap-1">
                      <span className="animate-bounce" style={{ animationDelay: '0ms' }}>·</span>
                      <span className="animate-bounce" style={{ animationDelay: '150ms' }}>·</span>
                      <span className="animate-bounce" style={{ animationDelay: '300ms' }}>·</span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick chips */}
            {!chipsUsed && (
              <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                {QUICK_CHIPS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-[11px] bg-sand hover:bg-sand/80 text-forest px-2.5 py-1 rounded-full border border-border/60 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-border flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send(input)}
                placeholder="Ask Kai anything…"
                className="flex-1 bg-white border border-border rounded-full px-3 py-2 text-[13px] focus:border-forest focus:outline-none transition-colors"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || typing}
                className="bg-coral text-cream rounded-full px-3.5 py-2 text-[13px] hover:bg-rust transition-colors disabled:opacity-40"
              >
                →
              </button>
            </div>

            {/* Footer */}
            <div className="px-4 pb-4 flex items-center justify-between">
              <div className="text-[10px] text-slate italic">Reply typically within the same day</div>
              <div className="text-[10px] font-mono tracking-wider uppercase text-coral">Always reviewed</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="w-1.5 h-1.5 rounded-full bg-coral mt-2.5 flex-none" />
      <p className="text-body-sm text-slate leading-relaxed">{children}</p>
    </div>
  )
}
