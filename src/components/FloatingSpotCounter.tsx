import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'

export default function FloatingSpotCounter() {
  const { state } = useApp()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero')
      const registration = document.getElementById('registration')

      if (!hero || !registration) {
        setVisible(false)
        return
      }

      const heroBottom = hero.getBoundingClientRect().bottom
      const registrationTop = registration.getBoundingClientRect().top

      setVisible(heroBottom < 0 && registrationTop > window.innerHeight)
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
          className="fixed bottom-6 left-6 z-50 bg-forest text-cream rounded-full px-5 py-2.5 text-[13px]"
          style={{ boxShadow: '0 12px 32px rgba(31,58,46,0.25)' }}
        >
          <span className="text-coral-soft font-medium">{state.spotsRemaining}</span> of 50 spots remaining
        </motion.div>
      )}
    </AnimatePresence>
  )
}
