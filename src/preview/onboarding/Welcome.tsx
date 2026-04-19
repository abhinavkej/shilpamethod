import { PageShell, ProgressBar, Mono, PrimaryButton } from '../ui'

// §3 · Step 1 — /onboarding/welcome
export default function OnboardingWelcome() {
  return (
    <PageShell maxWidth="max-w-xl">
      <ProgressBar value={1} total={5} />

      <h1 className="font-display text-[56px] md:text-[64px] text-forest leading-[1.05] mb-3">
        You're in, Sarah.
      </h1>

      <Mono className="block mb-8">The Shilpa Method · Cohort 1 · June 2–4, 2026</Mono>

      {/* 90-second welcome video placeholder — TODO(areef): swap in custom Shilpa greeting */}
      <div
        className="relative aspect-video bg-gradient-to-br from-forest to-ivy rounded-2xl overflow-hidden mb-8 flex items-center justify-center"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 80%, #D97757 0%, transparent 50%), linear-gradient(135deg, #1F3A2E, #2D5445)',
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-cream/90 flex items-center justify-center">
            <span className="text-forest text-[22px] ml-1">▶</span>
          </div>
          <span className="font-mono text-[10px] text-cream/80 tracking-widest uppercase">
            90-sec welcome from Dr. Saxena
          </span>
        </div>
      </div>

      <div className="space-y-4 text-body-md text-slate leading-relaxed mb-10">
        <p>
          Over the next two weeks, we're going to get you ready. Then we spend three nights together
          — Tuesday, Wednesday, Thursday in June — and you'll walk away knowing exactly what's
          happening in your body, what your real options are, and how to talk to your doctor about it.
        </p>
        <p>A few quick things first to set you up. This takes about 4 minutes.</p>
      </div>

      <PrimaryButton to="/preview/onboarding/phone">Let's go →</PrimaryButton>
    </PageShell>
  )
}
