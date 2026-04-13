import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

function RiskPill({ level, text }: { level: 'low' | 'medium' | 'high'; text: string }) {
  const colors = {
    low: 'bg-risk-low-bg text-risk-low',
    medium: 'bg-risk-med-bg text-risk-med',
    high: 'bg-risk-hi-bg text-risk-hi',
  }
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${colors[level]}`}>
      {text}
    </span>
  )
}

export default function DocumentPreview() {
  return (
    <motion.section
      className="py-24 md:py-32 px-6 bg-surface-alt"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-[680px] mx-auto text-center">
        <motion.p variants={fadeInUp} className="text-label text-secondary uppercase mb-4">
          What you leave with
        </motion.p>

        <motion.h2
          variants={fadeInUp}
          className="text-display-md text-primary mb-3"
        >
          Your Patient Advocacy Document.
        </motion.h2>

        <motion.p variants={fadeInUp} className="text-body-sm text-sage mb-6">
          Formatted to share with your provider. Designed to change the conversation.
        </motion.p>

        <motion.p variants={fadeInUp} className="text-body-md text-secondary max-w-[520px] mx-auto mb-12">
          By Sunday evening, CoachKai generates your personalized summary — based on your symptom profile, your risk assessment, and Dr. Saxena's framework. With PubMed citations your doctor can verify.
        </motion.p>

        {/* Document Card */}
        <motion.div
          variants={fadeInUp}
          className="relative max-w-[660px] mx-auto"
        >
          <div
            className="bg-white rounded-2xl overflow-hidden text-left"
            style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.08)' }}
          >
            {/* Header */}
            <div className="bg-primary text-white px-6 md:px-8 py-5 flex justify-between items-start">
              <div>
                <div className="text-[10px] font-mono opacity-50 mb-1">
                  The Shilpa Method &middot; Program Graduate Document
                </div>
                <div className="text-[22px] md:text-[26px] font-light tracking-tight">
                  Sarah M., Age 46 &middot; Denver, CO
                </div>
              </div>
              <div className="text-[12px] opacity-60 text-right hidden md:block">
                Dr. Shilpa Saxena, MD
              </div>
            </div>

            {/* Body */}
            <div className="px-6 md:px-8 py-6">
              <div className="text-label text-sage uppercase mb-4">
                Personalized Risk Assessment
              </div>

              <div className="space-y-3.5">
                {[
                  { pill: 'low' as const, text: 'Low', label: 'Cardiovascular risk', note: 'No family history of premature events. Favorable profile.' },
                  { pill: 'medium' as const, text: 'Yellow', label: 'Clotting / thrombotic history', note: 'Possible maternal DVT — transdermal route recommended.' },
                  { pill: 'medium' as const, text: 'Yellow', label: 'Bone density', note: 'No DEXA on file. Baseline scan recommended before initiating therapy.' },
                  { pill: 'low' as const, text: 'Low', label: 'Hormone-sensitive cancer', note: 'No personal history. Maternal fibrocystic disease — not a contraindication per NAMS 2022.' },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <RiskPill level={row.pill} text={row.text} />
                    <div>
                      <div className="text-body-sm text-primary font-medium">{row.label}</div>
                      <div className="text-[13px] text-secondary">{row.note}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border my-6" />

              <div className="text-label text-sage uppercase mb-3">
                Monday Morning Actions
              </div>

              <div className="space-y-3">
                {[
                  'Confirm maternal DVT history with your aunt — this determines your safest estrogen delivery method.',
                  'Request specific lab panel from your GP: fasting insulin, DHEA-S, free T, TSH + free T3/T4, hsCRP.',
                  'Schedule DEXA scan — covered by most insurance. Do not wait for fracture risk to initiate.',
                ].map((action, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-[13px] text-sage font-medium">{i + 1}.</span>
                    <p className="text-body-sm text-secondary leading-relaxed">{action}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border my-6" />

              <div className="text-label text-sage uppercase mb-3">
                Recommended Protocol Pathway
              </div>

              <div className="text-body-sm text-secondary space-y-3">
                <p>
                  Based on your symptom profile and risk assessment, Dr. Saxena recommends you bring up the following with your OB-GYN:
                </p>
                <div className="bg-surface-alt rounded-xl px-5 py-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary font-medium">Estradiol (transdermal patch)</span>
                    <span className="text-secondary text-[13px]">0.05 mg/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary font-medium">Micronized progesterone (oral)</span>
                    <span className="text-secondary text-[13px]">100 mg nightly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary font-medium">DHEA (oral)</span>
                    <span className="text-secondary text-[13px]">10 mg daily</span>
                  </div>
                </div>
                <p className="text-[13px] text-secondary italic">
                  Transdermal route selected due to possible maternal DVT history. Oral progesterone supports sleep architecture. Reassess at 90 days.
                </p>
              </div>

              <div className="border-t border-border my-6" />

              <div className="text-label text-sage uppercase mb-3">
                PubMed Citations
              </div>

              <div className="text-[12px] text-secondary leading-relaxed space-y-1.5">
                <p>1. Stuenkel CA, et al. "Treatment of Symptoms of the Menopause." <span className="italic">J Clin Endocrinol Metab.</span> 2015;100(11):3975-4011. PMID: 26444994</p>
                <p>2. The NAMS 2022 Hormone Therapy Position Statement Advisory Panel. "The 2022 Hormone Therapy Position Statement." <span className="italic">Menopause.</span> 2022;29(7):767-794. PMID: 35797481</p>
                <p>3. Canonico M, et al. "Hormone therapy and venous thromboembolism." <span className="italic">Circulation.</span> 2007;115(7):840-845. PMID: 17309934</p>
              </div>
            </div>

            {/* Footer band */}
            <div className="bg-surface-alt px-6 md:px-8 py-3 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] text-secondary tracking-wider">
                  CONFIDENTIAL · FOR PATIENT USE ONLY
                </span>
                <span className="font-mono text-[9px] text-secondary tracking-wider">
                  PAGE 1 OF 3
                </span>
              </div>
            </div>
          </div>

          {/* Fade overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 rounded-b-2xl pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 0%, #f5f5f7 100%)' }}
          />
        </motion.div>

        <motion.p variants={fadeInUp} className="text-body-sm text-sage mt-8">
          Generated for every participant. No two are identical.
        </motion.p>
      </div>
    </motion.section>
  )
}
