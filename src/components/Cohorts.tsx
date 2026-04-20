import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'
// Cohort timings live in src/config/placeholders.ts if Areef wants to edit.

export default function Cohorts() {
  const { state, dispatch } = useApp()
  const selected = state.cohort

  const pick = (c: 'c1' | 'c2') => {
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
          className="font-display text-display-xl text-forest text-center mb-14"
        >
          Two cohorts. <span className="italic">Two time zones.</span>
        </motion.h2>

        <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-5">
          <CohortCard
            name="Cohort 1"
            days="Tuesday · Wednesday · Thursday"
            lines={[
              '8:00 PM ET',
              '5:30 AM India (next day)',
              'Other zones calculated at checkout',
            ]}
            selected={selected === 'c1'}
            onClick={() => pick('c1')}
          />
          <CohortCard
            name="Cohort 2"
            days="Tuesday · Wednesday · Thursday"
            lines={[
              '11:00 AM ET',
              '8:30 PM IST',
              'Other zones calculated at checkout',
            ]}
            selected={selected === 'c2'}
            onClick={() => pick('c2')}
          />
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="text-[13px] text-slate italic text-center mt-8 max-w-[520px] mx-auto"
        >
          Our program is educational, not medical advice.
        </motion.p>
      </div>
    </motion.section>
  )
}

function CohortCard({
  name,
  days,
  lines,
  selected,
  onClick,
}: {
  name: string
  days: string
  lines: string[]
  selected: boolean
  onClick: () => void
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
        <div
          className={`font-mono text-[10px] tracking-widest uppercase ${
            selected ? 'text-coral-soft' : 'text-coral'
          }`}
        >
          {name}
        </div>
        {selected && (
          <div className="font-mono text-[10px] text-coral-soft tracking-widest uppercase bg-coral/20 px-3 py-1 rounded-full">
            Selected
          </div>
        )}
      </div>

      <div className={`font-display text-[26px] mb-6 ${selected ? 'text-cream' : 'text-forest'}`}>
        {days}
      </div>

      <div className="space-y-1.5">
        {lines.map((line, i) => (
          <div
            key={line}
            className={`${
              i === 0
                ? `text-[18px] font-medium ${selected ? 'text-cream' : 'text-forest'}`
                : `text-[14px] ${selected ? 'text-cream/70' : 'text-slate'}`
            }`}
          >
            {line}
          </div>
        ))}
      </div>
    </button>
  )
}
