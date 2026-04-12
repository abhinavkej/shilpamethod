import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import {
  riskQuestions,
  scoreRisk,
  RISK_AXIS_LABELS,
  DEXA_EXPLANATION,
  type RiskLevel,
} from '../data/riskQuestions'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

function RiskPill({ level, label }: { level: RiskLevel; label: string }) {
  const styles = {
    low: 'bg-risk-low-bg text-risk-low',
    medium: 'bg-risk-med-bg text-risk-med',
    high: 'bg-risk-hi-bg text-risk-hi',
  }
  const text = { low: 'Low', medium: 'Yellow', high: 'Red' }
  return (
    <div className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-white border border-border">
      <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-medium ${styles[level]}`}>
        {text[level]}
      </span>
      <span className="text-[12px] text-secondary text-center">{label}</span>
    </div>
  )
}

export default function RiskAssessment() {
  const { state, dispatch } = useApp()
  const [currentQ, setCurrentQ] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showDexaInfo, setShowDexaInfo] = useState(false)

  const allAnswered = Object.keys(state.riskAnswers).length === riskQuestions.length
  const question = riskQuestions[currentQ]

  const handleAnswer = (questionId: string, value: string) => {
    dispatch({ type: 'SET_RISK_ANSWER', payload: { questionId, answer: value } })

    if (questionId === 'dexa' && value === 'unknown') {
      setShowDexaInfo(true)
    } else {
      setShowDexaInfo(false)
    }

    setTimeout(() => {
      if (currentQ < riskQuestions.length - 1) {
        setCurrentQ((q) => q + 1)
        setShowDexaInfo(false)
      } else {
        setShowResult(true)
      }
    }, 400)
  }

  const riskScores: Record<string, RiskLevel> = {}
  for (const q of riskQuestions) {
    if (state.riskAnswers[q.id]) {
      riskScores[q.id] = scoreRisk(q.id, state.riskAnswers[q.id])
    }
  }

  const hasRed = Object.values(riskScores).includes('high')
  const yellowCount = Object.values(riskScores).filter((r) => r === 'medium').length
  const allLow = !hasRed && yellowCount === 0

  const redFlags = Object.entries(riskScores)
    .filter(([, v]) => v === 'high')
    .map(([k]) => RISK_AXIS_LABELS[k])

  let resultText = ''
  if (hasRed) {
    resultText = `Dr. Saxena will want to discuss your ${redFlags.join(' and ')} specifically. This does not exclude you from the programme — it means Saturday's session becomes even more important for you. Dr. Kai will reach out before the weekend to prepare.`
  } else if (yellowCount > 0) {
    resultText = `You have ${yellowCount} yellow flag${yellowCount > 1 ? 's' : ''}. These are areas where Dr. Saxena will offer specific guidance — not alarm, but precision. This is exactly what the programme is designed for.`
  } else if (allLow) {
    resultText =
      "Your risk profile is favourable across all four axes. Dr. Saxena's session will help you understand what this means for your long-term hormonal strategy."
  }

  const scrollToRegistration = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.section
      id="risk"
      className="py-24 md:py-32 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-[560px] mx-auto">
        <motion.p variants={fadeInUp} className="text-label text-secondary uppercase text-center mb-4">
          60-Second Assessment
        </motion.p>

        <motion.h2
          variants={fadeInUp}
          className="text-display-md text-primary text-center mb-4"
        >
          Understand your risk.
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-body-md text-secondary max-w-[500px] mx-auto text-center mb-12"
        >
          Four questions. No medical jargon. Dr. Saxena addresses your specific flags on Saturday.
        </motion.p>

        {!showResult && (
          <div className="min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-label text-secondary uppercase mb-3">
                  Question {currentQ + 1} of {riskQuestions.length}
                </div>

                <h3 className="text-display-sm text-primary mb-6">
                  {question.question}
                </h3>

                <div className="space-y-2.5">
                  {question.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(question.id, opt.value)}
                      className={`w-full text-left px-5 py-3.5 rounded-xl border font-sans text-[15px] cursor-pointer transition-all ${
                        state.riskAnswers[question.id] === opt.value
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-secondary border-border hover:border-primary/30'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {question.helperText && (
                  <p className="text-[13px] text-secondary italic mt-4 leading-relaxed">
                    {question.helperText}
                  </p>
                )}

                {showDexaInfo && question.id === 'dexa' && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-body-sm text-sage mt-3 p-3 bg-sage-light rounded-lg"
                  >
                    {DEXA_EXPLANATION}
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {showResult && allAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl border border-border p-6"
            style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.06)' }}
          >
            <h3 className="text-display-sm text-primary mb-5">Your risk snapshot</h3>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {riskQuestions.map((q) => (
                <RiskPill
                  key={q.id}
                  level={riskScores[q.id] || 'low'}
                  label={RISK_AXIS_LABELS[q.id]}
                />
              ))}
            </div>

            <p className="text-body-md text-secondary mb-4">{resultText}</p>

            <p className="text-[13px] text-secondary mb-6">
              This is an educational assessment, not medical advice. It will be used to personalise Dr. Saxena's session for your cohort.
            </p>

            <button
              onClick={scrollToRegistration}
              className="w-full bg-primary text-white text-[16px] py-4 rounded-full hover:bg-accent-hover transition-colors cursor-pointer"
            >
              Reserve your spot — $349
            </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
