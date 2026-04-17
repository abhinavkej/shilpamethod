import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqItems } from '../data/faq'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border/70">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex justify-between items-start gap-4 cursor-pointer"
      >
        <span className="text-[17px] text-forest font-medium">{question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-coral text-xl shrink-0 mt-0.5"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-body-md text-slate pb-5">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <motion.section
      className="py-24 md:py-32 px-6 bg-cream"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-[720px] mx-auto">
        <motion.p variants={fadeInUp} className="text-label text-coral uppercase text-center mb-5">
          Questions
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="font-display text-display-lg text-forest text-center mb-12"
        >
          The things people actually ask.
        </motion.h2>

        <motion.div variants={fadeInUp}>
          {faqItems.map((item, i) => (
            <AccordionItem key={i} question={item.question} answer={item.answer} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
