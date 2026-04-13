import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { symptoms } from '../data/symptoms'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

export default function SymptomSelector() {
  const { state, dispatch } = useApp()
  const [activeSymptom, setActiveSymptom] = useState<string | null>(null)

  const handleChipClick = (id: string) => {
    if (activeSymptom === id) {
      setActiveSymptom(null)
      dispatch({ type: 'SET_SYMPTOM', payload: null })
    } else {
      setActiveSymptom(id)
      dispatch({ type: 'SET_SYMPTOM', payload: id })
    }
  }

  const active = symptoms.find((s) => s.id === activeSymptom)

  return (
    <motion.section
      id="symptoms"
      className="py-24 md:py-32 px-6 bg-surface-alt"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-[680px] mx-auto">
        <motion.p variants={fadeInUp} className="text-label text-secondary uppercase text-center mb-4">
          Symptom Explorer
        </motion.p>

        <motion.h2
          variants={fadeInUp}
          className="text-display-md text-primary text-center mb-4"
        >
          The signals your body sends before a diagnosis.
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-body-md text-secondary text-center max-w-[500px] mx-auto mb-10"
        >
          Select any signal you've noticed. Dr. Saxena explains what's actually happening.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2.5 mb-8">
          {symptoms.map((symptom) => {
            const selected = state.selectedSymptoms.includes(symptom.id)
            return (
              <motion.button
                key={symptom.id}
                whileTap={{ scale: 0.97 }}
                animate={
                  selected
                    ? { backgroundColor: '#1d1d1f', color: '#ffffff', borderColor: '#1d1d1f' }
                    : { backgroundColor: '#ffffff', color: '#86868b', borderColor: '#d2d2d7' }
                }
                transition={{ type: 'spring', stiffness: 400, damping: 30, duration: 0.2 }}
                onClick={() => handleChipClick(symptom.id)}
                className="rounded-full border px-4 md:px-5 py-2.5 text-[13px] md:text-[15px] cursor-pointer text-center"
              >
                <span className="mr-1.5 text-[14px] md:text-[16px]">{symptom.icon}</span>
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
              className="bg-white border border-border rounded-2xl p-6 md:p-7 max-w-[640px] mx-auto"
              style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">{active.icon}</span>
                <div>
                  <div className="text-display-sm text-primary text-[22px]">
                    {active.label}
                  </div>
                  <div className="text-label text-sage uppercase mt-0.5">
                    Dr. Saxena explains:
                  </div>
                </div>
              </div>

              <p className="text-body-md text-secondary mb-4">
                {active.explanation}
              </p>

              <hr className="border-border mb-3" />

              <p className="text-[13px] text-secondary italic">{active.stat}</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.section>
  )
}
