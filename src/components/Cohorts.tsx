import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

export default function Cohorts() {
  const { state, dispatch } = useApp()
  const [selected, setSelected] = useState<'us' | 'in'>(state.cohort || 'us')

  const pick = (c: 'us' | 'in') => {
    setSelected(c)
    dispatch({ type: 'SET_COHORT', payload: c })
  }

  return (
    <motion.section
      id="cohorts"
      className="py-24 md:py-36 px-6 bg-bone"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-5xl mx-auto">
        <motion.p variants={fadeInUp} className="text-label text-coral uppercase text-center mb-5">
          Pick your cohort
        </motion.p>

        <motion.h2
          variants={fadeInUp}
          className="font-display text-display-xl text-forest text-center mb-4"
        >
          Two cohorts. <span className="italic">Two time zones.</span>
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-body-md text-slate text-center max-w-[540px] mx-auto mb-14"
        >
          Same boot camp, built for where you actually live.
        </motion.p>

        <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-5">
          <CohortCard
            flag="🇺🇸"
            region="US cohort"
            days="Tuesday · Wednesday · Thursday"
            primaryTime="5:00 PM Pacific"
            secondaryTime="8:00 PM Eastern"
            selected={selected === 'us'}
            onClick={() => pick('us')}
          />
          <CohortCard
            flag="🇮🇳"
            region="India cohort"
            days="Tuesday · Wednesday · Thursday"
            primaryTime="8:30 – 9:45 PM IST"
            secondaryTime="Same 3-day format"
            selected={selected === 'in'}
            onClick={() => pick('in')}
            disclaimer={
              "Participants in India receive educational guidance and, where relevant, referrals to trained practitioners in your region. Our program is educational, not medical advice."
            }
          />
        </motion.div>
      </div>
    </motion.section>
  )
}

function CohortCard({
  flag,
  region,
  days,
  primaryTime,
  secondaryTime,
  selected,
  onClick,
  disclaimer,
}: {
  flag: string
  region: string
  days: string
  primaryTime: string
  secondaryTime: string
  selected: boolean
  onClick: () => void
  disclaimer?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-2xl p-7 md:p-8 border-2 transition-all relative ${
        selected
          ? 'bg-forest text-cream border-forest'
          : 'bg-cream border-border hover:border-forest/40'
      }`}
      style={selected ? { boxShadow: '0 20px 50px -15px rgba(31,58,46,0.3)' } : undefined}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="text-[42px] leading-none">{flag}</div>
        {selected && (
          <div className="font-mono text-[10px] text-coral-soft tracking-widest uppercase bg-coral/20 px-3 py-1 rounded-full">
            Selected
          </div>
        )}
      </div>

      <div className={`font-mono text-[10px] tracking-widest uppercase mb-1 ${selected ? 'text-coral-soft' : 'text-coral'}`}>
        {region}
      </div>
      <div className={`font-display text-[26px] mb-4 ${selected ? 'text-cream' : 'text-forest'}`}>
        {days}
      </div>

      <div className={`text-[18px] font-medium ${selected ? 'text-cream' : 'text-forest'}`}>
        {primaryTime}
      </div>
      <div className={`text-[13px] mt-1 ${selected ? 'text-cream/60' : 'text-slate'}`}>
        {secondaryTime}
      </div>

      {disclaimer && (
        <div className={`mt-5 pt-4 border-t ${selected ? 'border-cream/20' : 'border-border'}`}>
          <p className={`text-[12px] leading-relaxed italic ${selected ? 'text-cream/70' : 'text-slate'}`}>
            {disclaimer}
          </p>
        </div>
      )}
    </button>
  )
}
