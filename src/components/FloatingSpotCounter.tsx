import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'

export default function FloatingSpotCounter() {
  const { state } = useApp()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const symptoms = document.getElementById('symptoms')
      const registration = document.getElementById('registration')

      if (!symptoms || !registration) {
        setVisible(false)
        return
      }

      const symptomsTop = symptoms.getBoundingClientRect().top
      const registrationTop = registration.getBoundingClientRect().top

      setVisible(symptomsTop < 0 && registrationTop > window.innerHeight)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (state.spotsRemaining <= 0) return null

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
          <span className="font-medium">{state.spotsRemaining}</span> of 500 spots remaining
          &middot; $349 &middot; March 28–29
        </motion.div>
      )}
    </AnimatePresence>
  )
}
