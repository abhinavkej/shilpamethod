import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

export default function CoachKai() {
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
            Between sessions
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
            An AI assistant trained on Shilpa's reasoning. Available on
            <span className="text-forest font-medium"> WhatsApp</span> and in your
            <span className="text-forest font-medium"> browser</span> — whichever you're most comfortable with.
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
            </Bullet>
            <Bullet>
              <strong className="text-forest">Clinical questions open one week before your boot camp:</strong>{' '}
              that's when Coach Kai graduates from intake to full Q&A.
            </Bullet>
            <Bullet>
              <strong className="text-forest">After the boot camp:</strong> keeps working with you —
              labs, questions, and alumni-only check-ins.
            </Bullet>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-[13px] text-slate italic leading-relaxed">
            No instant clinical answers. No chatbot shortcuts. The framing is physician-reviewed
            quality, not chatbot speed.
          </motion.p>
        </div>

        {/* Right — chat mockup */}
        <motion.div variants={fadeInUp} className="relative">
          <div
            className="bg-bone rounded-[24px] border border-border p-6 max-w-[420px] mx-auto"
            style={{ boxShadow: '0 24px 60px -15px rgba(31,58,46,0.20)' }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
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

            {/* Chat bubbles */}
            <div className="space-y-3">
              <ChatBubble from="user">
                Got my labs back. TSH is 3.8. Is that bad?
              </ChatBubble>
              <ChatBubble from="kai">
                Not "bad" — but worth a closer look. In perimenopause, TSH above ~2.5 often
                correlates with the symptoms you described Tuesday (fatigue, brain fog).
                Pulling Shilpa's framework for you now.
              </ChatBubble>
              <ChatBubble from="kai">
                Drafting two follow-up questions for your OB-GYN. A clinician reviewed this
                reply before sending — tag: <span className="font-mono text-[10px] text-coral">Dr. N · 12m ago</span>.
              </ChatBubble>
            </div>

            <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
              <div className="text-[11px] text-slate italic">
                Reply typically within the same day
              </div>
              <div className="text-[11px] font-mono tracking-wider uppercase text-coral">
                Always reviewed
              </div>
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

function ChatBubble({ from, children }: { from: 'user' | 'kai'; children: React.ReactNode }) {
  if (from === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-coral/90 text-cream rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[75%] text-[14px]">
          {children}
        </div>
      </div>
    )
  }
  return (
    <div className="flex justify-start">
      <div className="bg-sand text-ink rounded-2xl rounded-tl-md px-4 py-2.5 max-w-[80%] text-[14px] leading-relaxed">
        {children}
      </div>
    </div>
  )
}
