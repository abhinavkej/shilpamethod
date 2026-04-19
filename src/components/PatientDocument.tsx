import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

// {{DOCUMENT_NAME}} — final name TBD between "Your Hormone Health Blueprint" and "Your Hormone Story"
const DOCUMENT_NAME = '{{DOCUMENT_NAME}}'
const DOCUMENT_NAME_DISPLAY = 'Your Hormone Story'

function RiskPill({ level, text }: { level: 'low' | 'medium' | 'high'; text: string }) {
  const colors = {
    low: 'bg-risk-low-bg text-risk-low',
    medium: 'bg-risk-med-bg text-risk-med',
    high: 'bg-risk-hi-bg text-risk-hi',
  }
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide ${colors[level]}`}>
      {text}
    </span>
  )
}

export default function PatientDocument() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2])

  return (
    <motion.section
      id="document"
      ref={ref}
      className="py-24 md:py-36 px-6 bg-forest text-cream relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p variants={fadeInUp} className="text-label text-coral-soft uppercase mb-5">
            What you walk away with
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="font-display text-display-xl mb-6"
          >
            This is what you walk away with.<br />
            <span className="italic text-coral-soft">Personalized. Understandable. Actionable.</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="font-sans text-body-md text-cream/75 max-w-[640px] mx-auto">
            During the boot camp you co-create a plan with Dr. Saxena that works for you. That 2-page Patient Advocacy Document will help you have a more constructive conversation with your doctor. It's time to prioritize your health and happiness.
          </motion.p>
        </div>

        {/* Document Card — styled as a product shot */}
        <motion.div
          variants={fadeInUp}
          style={{ y, rotate }}
          className="relative max-w-[720px] mx-auto"
        >
          {/* Soft glow behind the doc */}
          <div
            aria-hidden
            className="absolute inset-0 blur-3xl opacity-40 rounded-[40px]"
            style={{ background: 'radial-gradient(ellipse at center, #D97757 0%, transparent 70%)' }}
          />

          <div
            className="relative bg-bone text-ink rounded-[20px] overflow-hidden"
            style={{ boxShadow: '0 40px 100px -20px rgba(0,0,0,0.5)' }}
          >
            {/* Header */}
            <div className="bg-forest text-cream px-7 md:px-10 py-6 flex justify-between items-start">
              <div>
                <div className="font-mono text-[9px] text-coral-soft/70 tracking-[0.2em] uppercase mb-2">
                  Shilpa Method · Patient Advocacy Document
                </div>
                <div className="font-display text-[24px] md:text-[30px] leading-tight">
                  {DOCUMENT_NAME_DISPLAY}
                </div>
                <div className="font-sans text-[13px] text-cream/60 mt-1">
                  Sarah M. · Age 46 · Denver, CO
                </div>
              </div>
              <div className="font-mono text-[10px] text-cream/50 text-right hidden md:block">
                <div>PREPARED BY</div>
                <div className="text-cream/80 mt-0.5">Dr. Shilpa Saxena, MD</div>
              </div>
            </div>

            {/* Body */}
            <div className="px-7 md:px-10 py-8 space-y-7">
              {/* Your Hormone Story */}
              <Section label="Your Hormone Story">
                <p className="text-[14px] text-slate leading-relaxed">
                  Perimenopausal transition, 18 months in. Primary complaints: 3 AM wake-ups,
                  frozen right shoulder, unexplained 8 lb weight gain. Last menstrual period
                  6 weeks ago. Family history: mother with osteoporosis, maternal aunt with DVT.
                </p>
              </Section>

              {/* Symptoms Profile */}
              <Section label="Your Symptoms Profile">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Sleep disruption', pill: 'high' as const, text: 'Primary' },
                    { label: 'Frozen shoulder', pill: 'high' as const, text: 'Primary' },
                    { label: 'Weight gain (midsection)', pill: 'medium' as const, text: 'Moderate' },
                    { label: 'Brain fog', pill: 'medium' as const, text: 'Moderate' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 bg-sand rounded-lg px-3 py-2">
                      <span className="text-[13px] text-ink">{row.label}</span>
                      <RiskPill level={row.pill} text={row.text} />
                    </div>
                  ))}
                </div>
              </Section>

              {/* Your Timeline */}
              <Section label="Your Timeline">
                <div className="relative pl-4 border-l-2 border-coral/40 space-y-2">
                  <TimelineRow year="2022" text="Cycle regularity begins shifting. First 3 AM wake-ups." />
                  <TimelineRow year="2023" text="Weight gain plateau despite consistent diet + exercise." />
                  <TimelineRow year="2024" text="Frozen shoulder onset (right). OB-GYN says 'watch and wait.'" />
                  <TimelineRow year="Today" text="Ready for a framework, not a dismissal." highlight />
                </div>
              </Section>

              {/* Labs Recommended — NEW per Apr 15 decisions */}
              <Section label="Labs Recommended">
                <p className="text-[13px] text-slate mb-3 leading-relaxed">
                  Based on your intake, ask your provider to order:
                </p>
                <div className="space-y-1.5">
                  {[
                    { name: 'Fasting insulin + glucose (HOMA-IR)', why: 'Metabolic + insulin resistance baseline' },
                    { name: 'FSH, LH, estradiol, progesterone', why: 'Confirm perimenopausal staging' },
                    { name: 'DHEA-S, free + total testosterone', why: 'Vitality / libido workup' },
                    { name: 'TSH, free T3, free T4, reverse T3', why: 'Thyroid (overlap with perimenopause)' },
                    { name: 'hsCRP, ApoB, Lp(a)', why: 'Cardiovascular risk — your top long-term axis' },
                    { name: 'DEXA (bone density)', why: 'Baseline before any HRT conversation' },
                  ].map((lab, i) => (
                    <div key={i} className="flex items-start justify-between gap-3 py-1.5 border-b border-border/60 last:border-0">
                      <span className="text-[13px] text-ink font-medium">{lab.name}</span>
                      <span className="text-[12px] text-slate text-right italic">{lab.why}</span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Your Questions for Your Doctor */}
              <Section label="Your Questions for Your Doctor">
                <ol className="space-y-2 list-decimal list-inside">
                  {[
                    'Given my maternal DVT history, which estrogen delivery route is safest for me?',
                    'What is my cardiovascular risk profile — not the Framingham score, but an ApoB-based one?',
                    'If I initiate HRT, what baseline DEXA and labs do I need first?',
                    'Can you document my symptom timeline so my chart reflects perimenopause, not anxiety?',
                  ].map((q, i) => (
                    <li key={i} className="text-[13px] text-ink leading-relaxed">{q}</li>
                  ))}
                </ol>
              </Section>

              {/* Next Steps */}
              <Section label="Your Next Steps">
                <div className="space-y-2">
                  {[
                    { n: 1, text: 'Schedule OB-GYN appointment with this document in hand.' },
                    { n: 2, text: 'Request the 6 labs above. Follow up in 2 weeks.' },
                    { n: 3, text: 'Begin 10-min post-meal walks — start before labs return.' },
                    { n: 4, text: 'Revisit this document with Coach Kai once labs are back.' },
                  ].map((step) => (
                    <div key={step.n} className="flex gap-3">
                      <span className="flex-none w-6 h-6 rounded-full bg-forest text-cream text-[11px] font-medium flex items-center justify-center">
                        {step.n}
                      </span>
                      <span className="text-[13px] text-ink leading-relaxed">{step.text}</span>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* Footer band */}
            <div className="bg-sand px-7 md:px-10 py-3 border-t border-border flex justify-between items-center">
              <span className="font-mono text-[9px] text-slate tracking-widest uppercase">
                {DOCUMENT_NAME} · Page 1 of 2
              </span>
              <span className="font-mono text-[9px] text-slate tracking-widest uppercase">
                Confidential · Educational only
              </span>
            </div>
          </div>
        </motion.div>

        <motion.p variants={fadeInUp} className="text-center text-body-sm text-cream/60 mt-12 max-w-[560px] mx-auto italic">
          Every participant co-creates their own advocacy document with Dr. Saxena during the boot camp. No two are alike.
        </motion.p>
      </div>
    </motion.section>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[9px] text-coral tracking-[0.2em] uppercase mb-2">
        {label}
      </div>
      {children}
    </div>
  )
}

function TimelineRow({ year, text, highlight }: { year: string; text: string; highlight?: boolean }) {
  return (
    <div className="relative">
      <span className={`absolute -left-[21px] top-1.5 w-2 h-2 rounded-full ${highlight ? 'bg-coral' : 'bg-forest/40'}`} />
      <div className="flex flex-col">
        <span className={`font-mono text-[10px] tracking-widest uppercase ${highlight ? 'text-coral' : 'text-slate'}`}>
          {year}
        </span>
        <span className="text-[13px] text-ink">{text}</span>
      </div>
    </div>
  )
}
