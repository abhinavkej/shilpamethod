import { useSearchParams, Link } from 'react-router-dom'
import { PageShell, Mono } from '../ui'

// §8.3 — /login/check confirmation after magic-link request.
export default function LoginCheck() {
  const [params] = useSearchParams()
  const email = params.get('email') || 'you@example.com'

  return (
    <PageShell maxWidth="max-w-md">
      <Mono className="block mb-3 text-coral">The Hormone Method</Mono>
      <h1 className="font-display text-[32px] text-forest leading-tight mb-4">
        Check your email.
      </h1>
      <p className="text-body-md text-slate mb-2">
        We just sent a link to <span className="text-forest font-medium">{maskEmail(email)}</span>.
      </p>
      <p className="text-body-md text-slate mb-8">It's good for the next 10 minutes.</p>

      <div className="bg-white border border-border rounded-2xl p-5 mb-8 text-[13px] text-slate leading-relaxed">
        <p>
          Didn't get it? Check spam, or wait 60 seconds and try again.
          <br />
          <Link
            to="/preview/login"
            className="text-coral hover:text-rust underline underline-offset-4"
          >
            Wrong email? Try a different one →
          </Link>
        </p>
      </div>

      <p className="font-mono text-[10px] text-slate tracking-widest uppercase italic">
        In prod: NextAuth sends <span className="text-forest">magic_link_v1</span> via Resend. 10-min
        expiry. Different (shorter) template than the welcome email.
      </p>
    </PageShell>
  )
}

function maskEmail(e: string) {
  const [local, domain] = e.split('@')
  if (!domain) return e
  return `${local[0]}${'*'.repeat(Math.max(1, local.length - 1))}@${domain}`
}
