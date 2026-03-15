import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

export default function ShilpaIntro() {
  return (
    <motion.section
      className="py-12 md:py-20 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Photo */}
        <motion.div variants={fadeInUp} className="lg:w-1/2">
          <img
            src="https://forumhealth.com/wp-content/uploads/2019/05/Shilpa-Saxena-1-scaled-e1699545138555-768x768.webp"
            alt="Dr. Shilpa Saxena"
            loading="lazy"
            className="w-full aspect-square object-cover rounded-2xl"
          />
          <div className="font-mono text-[11px] text-warm tracking-[1.5px] mt-3 text-center lg:text-left">
            SHILPA P. SAXENA, MD &middot; IFMCP &middot; FORUM HEALTH CMO
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div variants={fadeInUp} className="lg:w-1/2">
          <div className="font-mono text-[11px] text-gold tracking-[2px] mb-3">THE EDUCATOR</div>

          <blockquote className="font-display italic text-[28px] md:text-[32px] font-normal text-deep leading-[1.3] mb-6">
            "The patient is not broken. The system is broken. My job is to give her the tools to
            navigate it."
          </blockquote>

          <div className="font-body text-[16px] text-muted leading-[1.75] space-y-4">
            <p>
              Dr. Shilpa Saxena has spent 20 years practicing what most physicians only read about.
              As a Board-Certified Family Physician with advanced functional medicine training, she
              sees not just what's wrong — but why, and what to do about it.
            </p>
            <p>
              She is Faculty at the Institute for Functional Medicine, the Andrew Weil Center, George
              Washington University's Metabolic Medicine Institute, and the University of Miami. She
              is Chief Medical Officer at Forum Health, the largest functional medicine network in the
              US.
            </p>
            <p>
              She is internationally recognized for the Group Medical Appointment model — precision
              medicine, delivered in a shared setting, for maximal learning and cross-pollination
              between patients. This weekend is that model, applied to hormonal health.
            </p>
            <p>
              Dr. Saxena is not accepting new private patients. The Shilpa Method is one of the very
              few ways to learn directly from her.
            </p>
          </div>

          <div className="font-body text-[13px] text-warm leading-[1.8] mt-6">
            IFM Faculty &middot; Andrew Weil Center Faculty &middot; GW University Metabolic
            Medicine Institute &middot; University of Miami Faculty &middot; Forum Health CMO
            &middot; Board-Certified Family Physician
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
