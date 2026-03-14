import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqItems } from '../data/faq'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex justify-between items-start gap-4 cursor-pointer"
      >
        <span className="font-body text-[16px] text-deep">{question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-warm text-xl shrink-0 mt-0.5"
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
            <p className="font-body text-[15px] text-muted leading-[1.75] pb-5">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <motion.section
      className="py-12 md:py-20 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-[640px] mx-auto">
        <motion.h2
          variants={fadeInUp}
          className="font-display text-[32px] md:text-[40px] font-light text-deep text-center mb-8"
        >
          Questions.
        </motion.h2>

        <motion.div variants={fadeInUp}>
          {faqItems.map((item) => (
            <AccordionItem key={item.id} question={item.question} answer={item.answer} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
