import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { symptoms } from '../data/symptoms'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

export default function SymptomSelector() {
  const { state, dispatch } = useApp()
  const activeSymptom = state.selectedSymptoms[0] ?? null

  const handleChipClick = (id: string) => {
    if (activeSymptom === id) {
      dispatch({ type: 'SET_SYMPTOM', payload: null })
    } else {
      dispatch({ type: 'SET_SYMPTOM', payload: id })
    }
  }

  const active = symptoms.find((s) => s.id === activeSymptom)

  return (
    <motion.section
      id="symptoms"
      className="py-24 md:py-32 px-6 bg-bone"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-[720px] mx-auto">
        <motion.p variants={fadeInUp} className="text-label text-coral uppercase text-center mb-5">
          The signals
        </motion.p>

        <motion.h2
          variants={fadeInUp}
          className="font-display text-display-lg text-forest text-center mb-4"
        >
          What your body sends before a diagnosis.
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-body-md text-slate text-center max-w-[500px] mx-auto mb-10"
        >
          Tap any signal you've noticed. Dr. Saxena explains what's actually happening.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2.5 mb-8">
          {symptoms.map((symptom) => {
            const selected = activeSymptom === symptom.id
            return (
              <motion.button
                key={symptom.id}
                whileTap={{ scale: 0.97 }}
                animate={
                  selected
                    ? { backgroundColor: '#1F3A2E', color: '#F8F3E8', borderColor: '#1F3A2E' }
                    : { backgroundColor: '#FBF7EE', color: '#6B6358', borderColor: '#D9CFBE' }
                }
                transition={{ type: 'spring', stiffness: 400, damping: 30, duration: 0.2 }}
                onClick={() => handleChipClick(symptom.id)}
                className="rounded-full border px-4 md:px-5 py-2.5 text-[13px] md:text-[14px] cursor-pointer text-center"
              >
                <span className="mr-1.5">{symptom.icon}</span>
                {symptom.label}
              </motion.button>
            )
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-cream border border-border rounded-2xl p-6 md:p-7 max-w-[640px] mx-auto"
              style={{ boxShadow: '0 4px 32px rgba(31,58,46,0.08)' }}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">{active.icon}</span>
                <div>
                  <div className="font-display text-[22px] text-forest leading-tight">
                    {active.label}
                  </div>
                  <div className="font-mono text-[10px] text-coral tracking-widest uppercase mt-0.5">
                    Dr. Saxena explains
                  </div>
                </div>
              </div>

              <p className="text-body-md text-slate mb-4">{active.explanation}</p>

              <hr className="border-border mb-3" />

              <p className="text-[13px] text-slate italic">{active.stat}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}
