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
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <div className="font-mono text-[11px] text-gold tracking-[2px] mb-3">THE EDUCATORS</div>
          <h2 className="font-display text-[32px] md:text-[40px] font-light text-deep">
            Two physicians. Two lenses. One weekend.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Shilpa Card */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-border p-7">
            <img
              src="https://forumhealth.com/wp-content/uploads/2019/05/Shilpa-Saxena-1-scaled-e1699545138555-768x768.webp"
              alt="Dr. Shilpa Saxena"
              loading="lazy"
              className="w-full aspect-[4/3] object-cover rounded-xl mb-5"
              style={{ objectPosition: 'center 25%' }}
            />
            <div className="font-mono text-[10px] text-warm tracking-[1.5px] mb-1">
              THE FUNCTIONAL MEDICINE LENS
            </div>
            <div className="font-display text-[24px] text-deep mb-3">Dr. Shilpa Saxena</div>

            <blockquote className="font-display italic text-[20px] font-normal text-deep leading-[1.35] mb-4 border-l-2 border-sage pl-4">
              &ldquo;The patient is not broken. The system is broken. My job is to give her the tools to
              navigate it.&rdquo;
            </blockquote>

            <div className="font-body text-[15px] text-muted leading-[1.75] space-y-3">
              <p>
                Board-Certified Family Physician with 20 years of advanced functional medicine
                practice. Faculty at the Institute for Functional Medicine, Andrew Weil Center,
                George Washington University, and the University of Miami. Chief Medical Officer at
                Forum Health — the largest functional medicine network in the US.
              </p>
              <p>
                Creator of the Group Medical Appointment model — precision medicine in a shared
                setting. This weekend is that model, applied to hormonal health.
              </p>
            </div>

            <div className="font-body text-[12px] text-warm leading-[1.8] mt-5 pt-4 border-t border-border">
              IFM Faculty &middot; Andrew Weil Center &middot; GW Metabolic Medicine &middot; U of
              Miami &middot; Forum Health CMO &middot; Board-Certified Family Physician
            </div>
          </motion.div>

          {/* Tara Card */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-border p-7">
            <img
              src="/tara-scott.png"
              alt="Dr. Tara Scott"
              loading="lazy"
              className="w-full aspect-[4/3] object-cover rounded-xl mb-5"
              style={{ objectPosition: 'center 15%' }}
            />
            <div className="font-mono text-[10px] text-warm tracking-[1.5px] mb-1">
              THE CLINICAL AUTHORITY
            </div>
            <div className="font-display text-[24px] text-deep mb-3">Dr. Tara Scott</div>

            <blockquote className="font-display italic text-[20px] font-normal text-deep leading-[1.35] mb-4 border-l-2 border-terra pl-4">
              &ldquo;Giving women options isn&rsquo;t optional. My job is to make sure you understand
              every pathway — so you can choose, not default.&rdquo;
            </blockquote>

            <div className="font-body text-[15px] text-muted leading-[1.75] space-y-3">
              <p>
                OB-GYN and hormone specialist with deep expertise in bioidentical hormone therapy,
                lab interpretation, and insurance-navigable care. Forum Health Faculty and recognized
                authority in translating clinical evidence into patient-actionable pathways.
              </p>
              <p>
                Academic, evidence-based, insurance-literate. Dr. Scott ensures you leave with not
                just knowledge — but a practical roadmap your provider can act on.
              </p>
            </div>

            <div className="font-body text-[12px] text-warm leading-[1.8] mt-5 pt-4 border-t border-border">
              OB-GYN &middot; Hormone Specialist &middot; Forum Health Faculty
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
