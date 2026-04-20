import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell, ProgressBar, H1, PrimaryButton, Mono } from '../ui'

export default function IntakeGoals() {
  const nav = useNavigate()
  const [answers, setAnswers] = useState({ topGoal: '', fear: '', tried: '' })

  const QUESTIONS = [
    {
      key: 'topGoal' as const,
      q: "What's the one thing you'd most love to feel different in 90 days?",
    },
    {
      key: 'fear' as const,
      q: "What's your biggest fear or concern about this stage of life?",
    },
    {
      key: 'tried' as const,
      q: 'What have you tried already that hasn\'t worked?',
    },
  ]

  return (
    <PageShell maxWidth="max-w-2xl">
      <ProgressBar value={4} total={4} />
      <Mono className="block mb-2">Step 4 · Goals & Concerns</Mono>
      <H1>Three open questions. Short answers are fine.</H1>

      <div className="space-y-8 mb-10">
        {QUESTIONS.map((q) => (
          <div key={q.key}>
            <label className="block text-[15px] text-forest mb-3">{q.q}</label>
            <textarea
              rows={3}
              value={answers[q.key]}
              onChange={(e) => setAnswers({ ...answers, [q.key]: e.target.value })}
              className="w-full bg-white border border-border rounded-xl px-4 py-3 text-[15px] text-ink focus:border-forest focus:outline-none transition-colors"
            />
            <a
              href="https://wa.me/14155551234"
              target="_blank"
              rel="noreferrer"
              className="text-[12px] text-coral hover:underline underline-offset-4 mt-2 inline-block"
            >
              Coach Kai can help on WhatsApp →
            </a>
          </div>
        ))}
      </div>

      <PrimaryButton onClick={() => nav('/preview/dashboard?phase=runway&days=7')}>
        Submit intake →
      </PrimaryButton>
      <p className="text-[12px] text-slate italic mt-4">
        In production this fires <span className="font-mono">POST /api/intake</span>, marks{' '}
        <span className="font-mono">IntakeSubmission.completedAt</span>, and redirects to dashboard with a toast: "Your
        intake is complete. Dr. Saxena will see this before your cohort begins."
      </p>
    </PageShell>
  )
}
