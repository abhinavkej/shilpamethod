import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

function RiskPill({ level }: { level: 'low' | 'medium' }) {
  const colors =
    level === 'low'
      ? 'bg-risk-low-bg text-risk-low'
      : 'bg-risk-med-bg text-risk-med'
  const text = level === 'low' ? 'Low' : 'Yellow'
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-body font-medium ${colors}`}>
      {text}
    </span>
  )
}

export default function DocumentPreview() {
  return (
    <motion.section
      className="py-12 md:py-20 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-[680px] mx-auto text-center">
        <motion.h2
          variants={fadeInUp}
          className="font-display text-[32px] md:text-[40px] font-light text-deep mb-4"
        >
          What you leave with.
        </motion.h2>

        <motion.p variants={fadeInUp} className="font-body text-[16px] text-muted max-w-[520px] mx-auto mb-2">
          By the end of the 2-day program, Dr. Kai generates your personalized clinical summary — based on your
          symptom profile, your risk assessment, and Dr. Saxena's and Dr. Scott's framework. It is yours. Including
          the citations.
        </motion.p>

        <motion.p variants={fadeInUp} className="font-body text-[14px] text-sage mb-10">
          Formatted to share with your doctor. With PubMed citations they can look up themselves.
        </motion.p>

        {/* Document Card — full sample report */}
        <motion.div
          variants={fadeInUp}
          className="bg-white rounded-2xl max-w-[660px] mx-auto overflow-hidden text-left"
          style={{ boxShadow: '0 8px 48px rgba(27,59,42,0.12)' }}
        >
          {/* Header band */}
          <div className="bg-deep text-white px-6 md:px-8 py-5 flex justify-between items-start">
            <div>
              <div className="font-mono text-[10px] opacity-50 mb-1">
                The Hormone Method &middot; Program Graduate Document
              </div>
              <div className="font-display text-[22px] md:text-[26px]">
                Sarah M., Age 46 &middot; Denver, CO
              </div>
            </div>
            <div className="font-body text-[12px] opacity-60 text-right hidden md:block">
              Dr. Shilpa Saxena &middot; Dr. Tara Scott
            </div>
          </div>

          {/* Body */}
          <div className="px-6 md:px-8 py-6">
            {/* Risk Assessment */}
            <div className="font-mono text-[10px] text-gold tracking-[1.5px] mb-4">
              PERSONALIZED RISK ASSESSMENT
            </div>

            <div className="space-y-3">
              {[
                { pill: 'low' as const, label: 'Cardiovascular risk', note: 'No family history of premature events. Favorable profile.' },
                { pill: 'medium' as const, label: 'Clotting / thrombotic history', note: 'Possible maternal DVT — transdermal route recommended.' },
                { pill: 'medium' as const, label: 'Bone density', note: 'No DEXA on file. Baseline scan recommended before initiating therapy.' },
                { pill: 'low' as const, label: 'Hormone-sensitive cancer', note: 'No personal history. Maternal fibrocystic disease — not a contraindication per NAMS 2022.' },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-3">
                  <RiskPill level={row.pill} />
                  <div>
                    <div className="font-body text-[14px] text-deep font-medium">{row.label}</div>
                    <div className="font-body text-[13px] text-muted">{row.note}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Separator */}
            <div className="border-t border-border my-6" />

            {/* Monday Morning Actions */}
            <div className="font-mono text-[10px] text-gold tracking-[1.5px] mb-3">
              MONDAY MORNING ACTIONS
            </div>

            <div className="space-y-3">
              {[
                'Confirm maternal DVT history with your aunt — this determines your safest estrogen delivery method.',
                'Request specific lab panel from your GP: fasting insulin, DHEA-S, free T, TSH + free T3/T4, hsCRP.',
                'Schedule DEXA scan — covered by most insurance. Do not wait for fracture risk to initiate.',
              ].map((action, i) => (
                <div key={i} className="flex gap-3">
                  <span className="font-body text-[13px] text-sage font-medium">{i + 1}.</span>
                  <p className="font-body text-[14px] text-muted leading-[1.6]">{action}</p>
                </div>
              ))}
            </div>

            {/* Separator */}
            <div className="border-t border-border my-6" />

            {/* Recommended Protocol */}
            <div className="font-mono text-[10px] text-gold tracking-[1.5px] mb-3">
              RECOMMENDED PROTOCOL PATHWAY
            </div>

            <div className="font-body text-[14px] text-muted leading-[1.6] space-y-3">
              <p>
                Based on your symptom profile (fatigue, weight gain, brain fog, sleep disruption) and
                risk assessment, Dr. Saxena and Dr. Scott recommend beginning with the following pathway:
              </p>
              <div className="bg-cream rounded-xl px-5 py-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-deep font-medium">Estradiol (transdermal patch)</span>
                  <span className="text-warm text-[13px]">0.05 mg/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-deep font-medium">Micronized progesterone (oral)</span>
                  <span className="text-warm text-[13px]">100 mg nightly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-deep font-medium">DHEA (oral)</span>
                  <span className="text-warm text-[13px]">10 mg daily</span>
                </div>
              </div>
              <p className="text-[13px] text-warm italic">
                Transdermal estrogen route selected due to possible maternal DVT history. Oral
                progesterone supports sleep architecture. Reassess at 90 days.
              </p>
            </div>

            {/* Separator */}
            <div className="border-t border-border my-6" />

            {/* Citations */}
            <div className="font-mono text-[10px] text-gold tracking-[1.5px] mb-3">
              PUBMED CITATIONS
            </div>

            <div className="font-body text-[12px] text-warm leading-[1.7] space-y-1.5">
              <p>1. Stuenkel CA, et al. "Treatment of Symptoms of the Menopause." <span className="italic">J Clin Endocrinol Metab.</span> 2015;100(11):3975-4011. PMID: 26444994</p>
              <p>2. The NAMS 2022 Hormone Therapy Position Statement Advisory Panel. "The 2022 Hormone Therapy Position Statement." <span className="italic">Menopause.</span> 2022;29(7):767-794. PMID: 35797481</p>
              <p>3. Canonico M, et al. "Hormone therapy and venous thromboembolism among postmenopausal women." <span className="italic">Circulation.</span> 2007;115(7):840-845. PMID: 17309934</p>
            </div>
          </div>

          {/* Footer band */}
          <div className="bg-cream px-6 md:px-8 py-4 border-t border-border">
            <div className="flex justify-between items-center">
              <div className="font-mono text-[9px] text-warm tracking-[1px]">
                CONFIDENTIAL &middot; FOR PATIENT USE ONLY
              </div>
              <div className="font-mono text-[9px] text-warm tracking-[1px]">
                PAGE 1 OF 3
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p variants={fadeInUp} className="font-body text-[15px] text-sage mt-8">
          This document is generated for every participant. No two are identical.
        </motion.p>
      </div>
    </motion.section>
  )
}
