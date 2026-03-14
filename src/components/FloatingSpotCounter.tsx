import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'

export default function FloatingSpotCounter() {
  const { state } = useApp()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const ageGate = document.getElementById('age-gate-section')
      const registration = document.getElementById('registration')

      if (!ageGate || !registration) {
        setVisible(false)
        return
      }

      const ageGateBottom = ageGate.getBoundingClientRect().bottom
      const registrationTop = registration.getBoundingClientRect().top

      setVisible(ageGateBottom < 0 && registrationTop > window.innerHeight)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!state.ageGateCompleted || state.spotsRemaining <= 0) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-6 z-50 bg-white rounded-full border border-border px-[18px] py-2.5 font-body text-[14px] text-deep"
          style={{ boxShadow: '0 4px 24px rgba(27,59,42,0.08)' }}
        >
          <span className="font-medium">{state.spotsRemaining}</span> of 50 spots remaining
          &middot; March 28–29
        </motion.div>
      )}
    </AnimatePresence>
  )
}
