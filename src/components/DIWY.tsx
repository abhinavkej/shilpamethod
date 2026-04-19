import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

export default function DIWY() {
  return (
    <motion.section
      id="diwy"
      className="py-24 md:py-36 px-6 bg-cream"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p variants={fadeInUp} className="text-label text-coral uppercase text-center mb-5">
          Three ways to approach your hormones
        </motion.p>

        <motion.h2
          variants={fadeInUp}
          className="font-display text-display-xl text-forest text-center max-w-[780px] mx-auto mb-6"
        >
          You wouldn't DIY your car if you're not a mechanic.
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="font-display italic text-[24px] text-coral text-center mb-16"
        >
          Don't DIY your hormones.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="grid md:grid-cols-3 gap-4 md:gap-6 items-stretch"
        >
          {/* DIY — context */}
          <div className="bg-bone border border-border rounded-2xl p-7 flex flex-col opacity-80">
            <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-3">DIY</div>
            <h3 className="font-display text-[24px] text-forest mb-3">Do It Yourself</h3>
            <p className="text-body-sm text-slate leading-relaxed mb-5 flex-1">
              Reddit threads, podcast rabbit holes, supplement stacks ordered at 2 AM. Free, but
              you're the mechanic on your own engine — without the training.
            </p>
            <div className="pt-4 border-t border-border/60">
              <div className="text-[13px] text-slate">
                <span className="font-medium text-forest">Free</span> · but costly in time and dead ends
              </div>
            </div>
          </div>

          {/* DIWY — dominant, this is us */}
          <div
            className="bg-forest text-cream rounded-2xl p-8 flex flex-col md:scale-105 md:-my-2 relative"
            style={{ boxShadow: '0 24px 60px -12px rgba(31,58,46,0.35)' }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-coral text-cream text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full">
              This is us
            </div>
            <div className="font-mono text-[10px] text-coral-soft tracking-widest uppercase mb-3">
              DIWY
            </div>
            <h3 className="font-display text-[28px] text-cream mb-1">Do It With You</h3>
            <p className="text-body-sm text-coral-soft mb-5">The Hormone Method Boot Camp · by Forum Health</p>

            <p className="text-body-md text-cream/85 leading-relaxed mb-5 flex-1">
              Live guidance from a board-certified lipidologist + Coach Kai between sessions.
              You walk away with a personalized Patient Advocacy Document. You stay in the
              driver's seat; we ride shotgun.
            </p>

            <ul className="space-y-2 mb-6">
              {[
                'Live, two-way sessions',
                'Personalized document you keep',
                'Physician-reviewed follow-up',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px] text-cream">
                  <span className="text-coral mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-cream/20">
              <div className="text-[14px] text-cream">
                <span className="font-medium">3 sessions</span> · You stay in charge of your care
              </div>
            </div>
          </div>

          {/* DIFY — context */}
          <div className="bg-bone border border-border rounded-2xl p-7 flex flex-col opacity-80">
            <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-3">DIFY</div>
            <h3 className="font-display text-[24px] text-forest mb-3">Do It For You</h3>
            <p className="text-body-sm text-slate leading-relaxed mb-5 flex-1">
              A full concierge practice takes over your care. Monthly retainers, recurring
              visits, protocols written for you. Higher price. Lower agency.
            </p>
            <div className="pt-4 border-t border-border/60">
              <div className="text-[13px] text-slate">
                <span className="font-medium text-forest">$5K–20K+/yr</span> · but you hand over the wheel
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
