import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

export default function ShilpaIntro() {
  return (
    <motion.section
      className="py-24 md:py-32 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        <motion.div variants={fadeInUp}>
          <img
            src="https://forumhealth.com/wp-content/uploads/2019/05/Shilpa-Saxena-1-scaled-e1699545138555-768x768.webp"
            alt="Dr. Shilpa Saxena"
            loading="lazy"
            className="w-full aspect-[4/5] object-cover rounded-2xl"
            style={{ objectPosition: 'center 20%' }}
          />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <p className="text-label text-secondary uppercase mb-4">Your physician</p>

          <h2 className="text-display-md text-primary mb-6">
            Dr. Shilpa Saxena
          </h2>

          <blockquote className="text-body-lg text-primary italic border-l-2 border-primary pl-5 mb-8">
            "The patient is not broken. The system is broken. My job is to give her the tools to navigate it."
          </blockquote>

          <div className="space-y-4 text-body-md text-secondary">
            <p>
              Board-Certified Family Physician with 20 years of advanced functional medicine practice. Faculty at the Institute for Functional Medicine, Andrew Weil Center for Integrative Medicine, George Washington University, and the University of Miami.
            </p>
            <p>
              Chief Medical Officer at Forum Health — the largest functional medicine network in the United States. Creator of the Group Medical Appointment model, which brings precision medicine into a shared setting without compromising individualisation.
            </p>
            <p>
              This programme is that model, applied to hormonal health. Two days. One physician. The framework your provider didn't have time to teach you.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-label text-secondary uppercase leading-relaxed">
              IFM Faculty · Andrew Weil Center · GW Metabolic Medicine · University of Miami · Forum Health CMO · Board-Certified Family Physician
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
