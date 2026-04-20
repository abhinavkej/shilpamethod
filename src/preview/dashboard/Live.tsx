import { useState } from 'react'
import { Link } from 'react-router-dom'

// §7.1 Day-of-session dashboard — collapses into focused single-purpose view.

type SessionDay = 1 | 2 | 3

const SESSION_CONTENT: Record<SessionDay, {
  title: string
  subtitle: string
  keyPoints: string[]
  workbookPrompts: { id: string; q: string; placeholder: string }[]
}> = {
  1: {
    title: 'Identify Your Story',
    subtitle: 'Understanding what your body is telling you — and why most doctors miss it.',
    keyPoints: [
      "Perimenopause can start in your early 40s — sometimes late 30s. Most doctors wait for a missed period. That's too late.",
      'The "normal range" on a lab report was set on 20-year-olds. Your normal is individual.',
      "Symptoms aren't random. Hot flashes, sleep disruption, mood changes, and brain fog cluster together because they share one root: estrogen variability.",
      'The first step is naming your pattern. Once you can say "I have the 3am wakeup + heat + mood crash triad," you can advocate for yourself.',
    ],
    workbookPrompts: [
      { id: 'w1q1', q: 'What symptom do you wish your doctor took more seriously?', placeholder: 'e.g. the brain fog — I can\'t finish sentences the way I used to' },
      { id: 'w1q2', q: 'When did you first notice something was "off"? How long ago?', placeholder: 'e.g. about 18 months ago, after the holidays — sleep never quite recovered' },
      { id: 'w1q3', q: 'What does a bad day look like, specifically?', placeholder: 'Walk us through it — wakeup, energy, mood, what you avoid doing' },
    ],
  },
  2: {
    title: 'Read Your Labs',
    subtitle: 'The 12 numbers that actually matter — and how to interpret them for you, not a statistical average.',
    keyPoints: [
      'FSH >10 in your 40s is a signal. FSH >25 means perimenopause is well underway. Your doctor may not flag it unless it\'s >40.',
      'Estradiol fluctuates wildly day to day. A single "normal" reading means almost nothing. Trend matters.',
      'Free testosterone is often low in perimenopause — this drives libido drop, fatigue, and muscle loss. Most GPs don\'t test it.',
      'Fasting insulin + HbA1c tell you about metabolic health, which is deeply tied to how you process estrogen.',
      'Low 25-OH Vitamin D (<50) amplifies every hormonal symptom. It\'s almost always fixable.',
    ],
    workbookPrompts: [
      { id: 'w2q1', q: 'Do you have any recent labs? What was your estradiol or FSH?', placeholder: 'Even a rough number helps — e.g. "my doctor said it was normal" counts as a data point' },
      { id: 'w2q2', q: 'Which lab result has confused or concerned you most?', placeholder: 'e.g. My TSH was 3.2 but I feel like I have hypothyroid symptoms' },
      { id: 'w2q3', q: 'What labs has your doctor refused to order or dismissed?', placeholder: 'e.g. Free testosterone — she said "women don\'t need that"' },
    ],
  },
  3: {
    title: 'Write Your Story',
    subtitle: 'Building the document that walks your doctor through your case — in language they understand.',
    keyPoints: [
      'Most doctors spend 7 minutes per appointment. Your Patient Advocacy Document gives them everything upfront so those 7 minutes are spent on decisions, not history-taking.',
      'Every recommendation in your document links to a PubMed citation. Your doctor can verify anything they question.',
      'The goal isn\'t to tell your doctor what to do — it\'s to make the right conversation possible. Bring it, read it together, ask the questions at the back.',
      'HRT is not one thing. Bioidentical, synthetic, topical, oral — each has different risk/benefit profiles. Your document helps your doctor match the right option to your specific history.',
    ],
    workbookPrompts: [
      { id: 'w3q1', q: 'What\'s the single most important thing you want your doctor to understand after reading your document?', placeholder: 'e.g. That I\'ve been dismissed three times and the symptoms are real and affecting my work' },
      { id: 'w3q2', q: 'What outcome are you hoping for from your appointment?', placeholder: 'e.g. Labs ordered + a follow-up in 6 weeks to review them together' },
      { id: 'w3q3', q: 'What\'s one thing you\'re worried your doctor will say — and what would you want to say back?', placeholder: 'e.g. "You\'re too young for menopause" → I want to be able to cite the data on perimenopause age of onset' },
    ],
  },
}

export default function LiveDashboard() {
  const [activeDay, setActiveDay] = useState<SessionDay>(1)
  const [workbookAnswers, setWorkbookAnswers] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState(false)
  const content = SESSION_CONTENT[activeDay]

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <main className="max-w-5xl mx-auto px-6 pb-20">
      <div className="font-mono text-[10px] text-coral tracking-widest uppercase mt-6 mb-4">
        Live · Day {activeDay} · {content.title}
      </div>

      {/* Hero card — Imminent state */}
      <div className="bg-forest text-cream rounded-2xl p-8 mb-6">
        <div className="font-mono text-[10px] text-coral-soft tracking-widest uppercase mb-3">Tonight · 7:00 PM ET</div>
        <h1 className="font-display text-[40px] leading-tight mb-2">Day {activeDay} starts in 42 minutes.</h1>
        <p className="text-[14px] text-cream/75 mb-5 max-w-[520px]">
          Quiet spot · notebook · water. Shilpa joins at 7:00 PM ET sharp.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="bg-coral/30 text-cream/50 text-[14px] px-5 py-2.5 rounded-full cursor-not-allowed border border-coral/30">
            Join Zoom in 42 mins →
          </button>
          <div className="flex gap-2">
            {([1, 2, 3] as SessionDay[]).map((d) => (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className={`text-[12px] px-3 py-1.5 rounded-full font-mono tracking-widest transition-colors ${
                  activeDay === d ? 'bg-cream text-forest' : 'bg-cream/15 text-cream/70 hover:bg-cream/25'
                }`}
              >
                Day {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Side-by-side: Key points + Workbook */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Left: Session key points */}
        <div className="bg-white border border-border rounded-2xl p-6">
          <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-2">Day {activeDay} · Key points</div>
          <h2 className="font-display text-[22px] text-forest mb-1">{content.title}</h2>
          <p className="text-[13px] text-slate mb-5">{content.subtitle}</p>
          <ul className="space-y-3">
            {content.keyPoints.map((point, i) => (
              <li key={i} className="flex gap-3 items-start text-[13px] text-slate leading-relaxed">
                <span className="text-coral mt-0.5 flex-none font-medium">{i + 1}.</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Workbook */}
        <div className="bg-sand/40 border border-border rounded-2xl p-6">
          <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-2">Your workbook · Day {activeDay}</div>
          <h2 className="font-display text-[22px] text-forest mb-1">Capture while it's fresh</h2>
          <p className="text-[13px] text-slate mb-5">These go straight into your Patient Advocacy Document.</p>
          <div className="space-y-5">
            {content.workbookPrompts.map((p) => (
              <div key={p.id}>
                <label className="block text-[13px] text-forest font-medium mb-2">{p.q}</label>
                <textarea
                  rows={3}
                  value={workbookAnswers[p.id] || ''}
                  onChange={(e) => setWorkbookAnswers({ ...workbookAnswers, [p.id]: e.target.value })}
                  placeholder={p.placeholder}
                  className="w-full bg-white border border-border rounded-xl px-3 py-2.5 text-[13px] text-ink focus:border-forest focus:outline-none transition-colors placeholder:text-slate/40 resize-none"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSave}
            className="mt-4 w-full bg-forest text-cream text-[14px] py-3 rounded-full hover:bg-ivy transition-colors"
          >
            {saved ? 'Saved ✓' : 'Save to my document →'}
          </button>
          <p className="text-[11px] text-slate/60 text-center mt-2">
            Auto-saves into your Patient Advocacy Document after Day 3
          </p>
        </div>
      </div>

      {/* Session nav links */}
      <div className="flex flex-wrap gap-3 text-[13px]">
        <Link to="/preview/sessions/1" className="text-forest hover:underline underline-offset-4">
          Session detail page →
        </Link>
        <Link to="/preview/document" className="text-forest hover:underline underline-offset-4">
          Your document →
        </Link>
      </div>
    </main>
  )
}
