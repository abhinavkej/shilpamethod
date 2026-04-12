import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../lib/motion'

export default function Hero() {
  return (
    <motion.section
      className="min-h-[85vh] flex items-center justify-center px-6 pt-14"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="max-w-[680px] text-center">
        <motion.p
          variants={fadeInUp}
          className="text-label text-secondary uppercase mb-8"
        >
          A 2-DAY PROGRAMME WITH DR. SHILPA SAXENA
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="text-display-lg md:text-display-xl text-primary mb-6"
        >
          Your body has been trying to tell you something.
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-body-lg text-secondary max-w-[520px] mx-auto"
        >
          The education your doctor never had time to give you — so you can make informed decisions about your hormonal health.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-4 mt-10"
        >
          <img
            src="https://forumhealth.com/wp-content/uploads/2019/05/Shilpa-Saxena-1-scaled-e1699545138555-768x768.webp"
            alt="Dr. Shilpa Saxena"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="text-left">
            <div className="text-[15px] font-medium text-primary">Dr. Shilpa Saxena, MD</div>
            <div className="text-label text-secondary uppercase">Board-Certified · Functional Medicine · IFM Faculty</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
