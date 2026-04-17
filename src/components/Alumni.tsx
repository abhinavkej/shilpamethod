import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

export default function Alumni() {
  return (
    <motion.section
      id="alumni"
      className="py-24 md:py-32 px-6 bg-bone"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <motion.p variants={fadeInUp} className="text-label text-coral uppercase mb-5">
              After the boot camp
            </motion.p>

            <motion.h2
              variants={fadeInUp}
              className="font-display text-display-lg text-forest mb-5"
            >
              Your cohort keeps going.
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-body-lg text-slate mb-6">
              Join an opt-in private alumni community of up to <span className="text-forest font-medium">50 women</span> from your cohort.
            </motion.p>

            <motion.ul variants={fadeInUp} className="space-y-3 mb-6">
              {[
                'Peer-to-peer Q&A with women walking the same stretch as you',
                'Shared wins — and shared appointments that finally went differently',
                'A continuing conversation with Shilpa and Coach Kai',
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral mt-2.5 flex-none" />
                  <span className="text-body-md text-slate">{item}</span>
                </li>
              ))}
            </motion.ul>

            <motion.p variants={fadeInUp} className="text-[13px] text-slate italic">
              Included with your registration. Opt in when you're ready, not before.
            </motion.p>
          </div>

          <motion.div variants={fadeInUp} className="relative">
            <div className="grid grid-cols-5 gap-2 max-w-[360px] mx-auto">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-full"
                  style={{
                    backgroundColor: i % 7 === 0 ? '#D97757' : i % 3 === 0 ? '#2D5445' : '#EFE7D4',
                    opacity: 0.4 + (Math.random() * 0.6),
                  }}
                />
              ))}
            </div>
            <div className="text-center mt-5 font-mono text-[10px] text-slate tracking-widest uppercase">
              Cohort of 50 · capped
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
