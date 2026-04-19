import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { PageShell, Mono, PrimaryButton } from '../ui'

// §8 — /login page for returning users / new devices. Simple email form.
// On submit in prod: NextAuth signIn("email", { email, callbackUrl: "/dashboard" }).
// 10-minute magic link expiry for self-serve login.

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    nav(`/preview/login/check?email=${encodeURIComponent(email)}`)
  }

  return (
    <PageShell maxWidth="max-w-md">
      <Mono className="block mb-3 text-coral">The Hormone Method</Mono>
      <h1 className="font-display text-[40px] text-forest leading-[1.05] mb-4">
        Welcome back.
      </h1>
      <p className="text-body-md text-slate mb-8">
        Enter your email and we'll send you a link to sign in. No password needed.
      </p>

      <form onSubmit={submit} className="space-y-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoFocus
          className="w-full bg-white border border-border rounded-xl px-5 py-4 text-[16px] text-ink focus:border-forest focus:outline-none transition-colors"
        />
        <PrimaryButton type="submit">Send me a link →</PrimaryButton>
      </form>

      <div className="mt-8 text-center">
        <Link
          to="/preview/checkout"
          className="font-mono text-[11px] text-slate tracking-widest uppercase hover:text-forest"
        >
          New here? Reserve a spot →
        </Link>
      </div>
    </PageShell>
  )
}
