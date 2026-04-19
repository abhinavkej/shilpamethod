import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'
import { SHILPA_HEADSHOT_URL } from '../config/placeholders'

export default function ShilpaIntro() {
  return (
    <motion.section
      id="shilpa"
      className="py-24 md:py-36 px-6 bg-cream"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-center">
        <motion.div variants={fadeInUp} className="relative">
          <div className="aspect-[4/5] rounded-[28px] overflow-hidden">
            <img
              src={SHILPA_HEADSHOT_URL}
              alt="Dr. Shilpa Saxena"
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 20%' }}
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-forest text-cream rounded-2xl px-5 py-4 max-w-[200px]">
            <div className="font-mono text-[9px] tracking-widest uppercase text-coral-soft mb-1">
              20 years
            </div>
            <div className="text-[14px] leading-tight">
              running group programs for women's health.
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <p className="text-label text-coral uppercase mb-4">Your physician</p>

          <h2 className="font-display text-display-xl text-forest mb-6">
            Dr. Shilpa Saxena, MD
          </h2>

          <blockquote className="font-display italic text-[26px] text-forest border-l-2 border-coral pl-5 mb-8 leading-snug">
            "The patient is not broken. The system is broken. My job is to give her the tools to navigate it."
          </blockquote>

          <div className="space-y-4 text-body-md text-slate">
            <p>
              Board-Certified Family Physician with 20 years of advanced functional medicine
              practice. Faculty at the Institute for Functional Medicine, Andrew Weil Center for
              Integrative Medicine, George Washington University, and the University of Miami.
            </p>
            <p>
              Chief Medical Officer at Forum Health — the largest functional medicine network in the
              United States. Creator of the Group Medical Appointment model, which brings precision
              medicine into a shared setting without compromising individualization.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-slate tracking-widest uppercase">
            <span>IFM Faculty</span>
            <span>·</span>
            <span>Andrew Weil Center</span>
            <span>·</span>
            <span>GW Metabolic Medicine</span>
            <span>·</span>
            <span>U. of Miami</span>
            <span>·</span>
            <span>Forum Health CMO</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
