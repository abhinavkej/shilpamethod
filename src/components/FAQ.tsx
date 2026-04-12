import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqItems } from '../data/faq'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border/60">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex justify-between items-start gap-4 cursor-pointer"
      >
        <span className="text-[16px] text-primary">{question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-secondary text-xl shrink-0 mt-0.5"
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
            <p className="text-body-md text-secondary pb-5">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <motion.section
      className="py-24 md:py-32 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-[640px] mx-auto">
        <motion.h2
          variants={fadeInUp}
          className="text-display-md text-primary text-center mb-10"
        >
          Questions.
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
