import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { symptoms } from '../data/symptoms'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

export default function SymptomSelector() {
  const { state, dispatch } = useApp()
  const [activeSymptom, setActiveSymptom] = useState<string | null>(null)

  const handleChipClick = (id: string) => {
    dispatch({ type: 'TOGGLE_SYMPTOM', payload: id })
    if (state.selectedSymptoms.includes(id)) {
      if (activeSymptom === id) setActiveSymptom(null)
    } else {
      setActiveSymptom(id)
    }
  }

  const active = symptoms.find((s) => s.id === activeSymptom)

  return (
    <motion.section
      id="symptoms"
      className="py-12 md:py-20 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-[680px] mx-auto">
        <motion.h2
          variants={fadeInUp}
          className="font-display text-[28px] md:text-[36px] font-normal text-deep leading-[1.2] mb-3 text-center"
        >
          Which of these have you noticed in the last six months?
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="font-body text-[15px] text-muted text-center mb-8"
        >
          Select everything that resonates. You'll get an immediate explanation for each one.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2.5 mb-6 [&>button]:w-[calc(50%-5px)] md:[&>button]:w-auto">
          {symptoms.map((symptom) => {
            const selected = state.selectedSymptoms.includes(symptom.id)
            return (
              <motion.button
                key={symptom.id}
                whileTap={{ scale: 0.97 }}
                animate={
                  selected
                    ? { backgroundColor: '#1B3B2A', color: '#ffffff', borderColor: '#1B3B2A' }
                    : { backgroundColor: '#ffffff', color: '#8B7E74', borderColor: '#E2D9CC' }
                }
                transition={{ type: 'spring', stiffness: 400, damping: 30, duration: 0.2 }}
                onClick={() => handleChipClick(symptom.id)}
                className="rounded-full border-[1.5px] px-3 md:px-5 py-2.5 font-body text-[13px] md:text-[15px] cursor-pointer text-center"
              >
                <span className="mr-1 md:mr-1.5 text-[14px] md:text-[16px]">{symptom.icon}</span>
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
              style={{ boxShadow: '0 4px 32px rgba(27,59,42,0.08)' }}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">{active.icon}</span>
                <div>
                  <div className="font-display text-[22px] font-normal text-deep">
                    {active.label}
                  </div>
                  <div className="font-mono text-[10px] text-gold tracking-[1px] mt-0.5">
                    Dr. Saxena explains:
                  </div>
                </div>
              </div>

              <p className="font-body text-[17px] text-muted leading-[1.75] mb-4">
                {active.explanation}
              </p>

              <hr className="border-border border-t-[0.5px] mb-3" />

              <p className="font-body text-[13px] text-warm italic">{active.stat}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {state.selectedSymptoms.length >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-body text-[15px] text-sage text-center mt-6"
          >
            You've identified {state.selectedSymptoms.length} symptoms. This pattern is recognized.
            Dr. Saxena will address each of these directly.
          </motion.p>
        )}
      </div>
    </motion.section>
  )
}
