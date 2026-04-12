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
          className="fixed bottom-6 left-6 z-50 bg-white rounded-full border border-border px-[18px] py-2.5 text-[14px] text-primary"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
        >
          <span className="font-medium">{state.spotsRemaining}</span> of 500 spots remaining
        </motion.div>
      )}
    </AnimatePresence>
  )
}
