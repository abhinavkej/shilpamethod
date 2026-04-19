import { PageShell, H1, Mono } from '../ui'

// §11 Cohort group + §11.2 member directory

const MEMBERS = [
  { initials: 'AS', firstName: 'Aparna', age: '45-49', country: 'India', symptom: 'Sleep' },
  { initials: 'BM', firstName: 'Beth', age: '50-54', country: 'US', symptom: 'Brain fog' },
  { initials: 'CK', firstName: 'Chloe', age: '38-44', country: 'US', symptom: 'Anxiety' },
  { initials: 'DK', firstName: 'Devi', age: '45-49', country: 'India', symptom: 'Weight gain' },
  { initials: 'EM', firstName: 'Emma', age: '50-54', country: 'UK', symptom: 'Joint pain' },
  { initials: 'FP', firstName: 'Farah', age: '45-49', country: 'US', symptom: 'Mood' },
  { initials: 'GR', firstName: 'Gaby', age: '38-44', country: 'US', symptom: 'Cycle' },
  { initials: 'HL', firstName: 'Hina', age: '50-54', country: 'India', symptom: 'Hot flashes' },
]

export default function Community() {
  return (
    <PageShell maxWidth="max-w-5xl">
      <Mono className="block mb-2 text-coral">Cohort 1 · June 2026</Mono>
      <H1>Your cohort.</H1>
      <p className="text-body-md text-slate mb-6 leading-relaxed max-w-[620px]">
        First name and one symptom only — no PII beyond what members have opted in to share. Cohort WhatsApp group opens
        7 days before Day 1.
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        <a
          href="https://chat.whatsapp.com/PLACEHOLDER"
          target="_blank"
          rel="noreferrer"
          className="bg-[#25D366] text-white text-[14px] px-5 py-2.5 rounded-full hover:bg-[#1ea952]"
        >
          💬 Open cohort WhatsApp group →
        </a>
        <div className="font-mono text-[11px] text-slate tracking-widest uppercase self-center">
          47 of 50 joined
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {MEMBERS.map((m) => (
          <div key={m.initials} className="bg-white border border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-medium text-cream"
                style={{ backgroundColor: '#2D5445' }}
              >
                {m.initials}
              </div>
              <div>
                <div className="text-[15px] text-forest font-medium">{m.firstName}</div>
                <div className="text-[11px] text-slate">
                  {m.age} · {m.country}
                </div>
              </div>
            </div>
            <div className="font-mono text-[10px] text-coral tracking-widest uppercase">{m.symptom}</div>
          </div>
        ))}
      </div>

      <p className="text-[12px] text-slate italic mt-8 max-w-[560px]">
        Privacy: opt-in required during onboarding. "Let other members of your cohort see your first name and one
        symptom?" defaults to false.
      </p>
    </PageShell>
  )
}
