import { useState } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { WORKBOOKS } from '../../data/workbookSchemas'
import type { WorkbookQuestion } from '../../data/workbookSchemas'
import { Mono } from '../ui'

// §7 — Live session experience. Pre/Imminent/Live/JustEnded/RecordingReady states
// plus full tabbed detail (Live / Workbook / Recording / Discussion / Resources).

type State = 'pre' | 'imminent' | 'live' | 'ended' | 'recording'
type Tab = 'live' | 'workbook' | 'recording' | 'discussion' | 'resources'

const DAY_META = {
  '1': { title: "Identify Your Story", date: 'Tuesday, June 2, 2026', time: '7:00 PM ET', description: 'Foundations. The hormonal cascade in perimenopause, why standard labs miss this, what symptoms actually mean.' },
  '2': { title: 'Understand Your Numbers', date: 'Wednesday, June 3, 2026', time: '7:00 PM ET', description: 'The labs your doctor should be running. The four risk axes: clotting, cancer, cardiovascular, bone.' },
  '3': { title: 'Build Your Playbook', date: 'Thursday, June 4, 2026', time: '7:00 PM ET', description: 'Building your action plan. Sexual health and longevity. Walking out with your Patient Advocacy Document.' },
}

export default function SessionDetail() {
  const { dayNumber = '1' } = useParams()
  const [params, setParams] = useSearchParams()
  const state = (params.get('state') || 'pre') as State
  const [tab, setTab] = useState<Tab>((params.get('tab') as Tab) || 'live')

  const day = (dayNumber as keyof typeof DAY_META) in DAY_META ? dayNumber : '1'
  const meta = DAY_META[day as keyof typeof DAY_META]

  const setState = (s: State) => {
    const p = new URLSearchParams(params)
    p.set('state', s)
    setParams(p, { replace: true })
  }

  return (
    <main className="max-w-4xl mx-auto px-6 pb-24 pt-6">
      {/* State switcher */}
      <div className="bg-sand/60 border border-border rounded-full px-3 py-1.5 w-fit mb-6 flex flex-wrap gap-1 text-[12px]">
        <span className="font-mono text-[10px] uppercase tracking-widest text-coral px-2">Preview states</span>
        {(['pre', 'imminent', 'live', 'ended', 'recording'] as State[]).map((s) => (
          <button
            key={s}
            onClick={() => setState(s)}
            className={`font-mono text-[10px] px-2 py-1 rounded-full uppercase tracking-widest ${
              state === s ? 'bg-forest text-cream' : 'bg-white text-slate hover:bg-sand'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Header */}
      <Mono className="block mb-2">Day {day} · {meta.date}, {meta.time} local</Mono>
      <h1 className="font-display text-display-md text-forest mb-3">{meta.title}</h1>
      <p className="text-body-md text-slate mb-8 leading-relaxed">{meta.description}</p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-border mb-8">
        {(['live', 'workbook', 'recording', 'discussion', 'resources'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-[13px] font-medium border-b-2 -mb-px capitalize transition-colors ${
              tab === t
                ? 'text-forest border-coral'
                : 'text-slate border-transparent hover:text-forest'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'live' && <LiveTab state={state} day={day} />}
      {tab === 'workbook' && <WorkbookTab day={day} />}
      {tab === 'recording' && <RecordingTab state={state} />}
      {tab === 'discussion' && <DiscussionTab />}
      {tab === 'resources' && <ResourcesTab />}
    </main>
  )
}

// ──────────────────────────────── tabs ────────────────────────────────

function LiveTab({ state, day }: { state: State; day: string }) {
  if (state === 'pre') {
    return (
      <div className="bg-white border border-border rounded-2xl p-6 md:p-8">
        <Mono className="block mb-3 text-coral">Pre-session</Mono>
        <h2 className="font-display text-[24px] text-forest mb-3">Day 1 starts in 4h 22m.</h2>
        <ul className="space-y-2 text-body-sm text-slate mb-6">
          {['Quiet spot with no interruptions for 75 minutes', 'Notebook + pen (or digital)', 'Water', 'Last lab results if you have them handy'].map((x) => (
            <li key={x} className="flex gap-2 items-start">
              <span className="text-coral">✓</span>
              <span>{x}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-3 flex-wrap">
          <button className="border border-border text-forest px-5 py-2.5 rounded-full text-[14px] hover:border-forest">
            Add to calendar (.ics)
          </button>
          <button className="border border-border text-forest px-5 py-2.5 rounded-full text-[14px] hover:border-forest">
            Watch the 3-min preview clip →
          </button>
        </div>
      </div>
    )
  }
  if (state === 'imminent') {
    return (
      <div className="bg-forest text-cream rounded-2xl p-8">
        <Mono className="block mb-3 text-coral-soft">Starting in 42 minutes</Mono>
        <h2 className="font-display text-[30px] mb-4">Day {day} is about to begin.</h2>
        <button className="bg-coral/30 text-cream/60 px-6 py-3 rounded-full text-[15px] cursor-not-allowed border border-coral/30">
          Join in 42 minutes →
        </button>
        <p className="text-[13px] text-cream/60 mt-3">Join button opens 15 minutes before start.</p>
      </div>
    )
  }
  if (state === 'live') {
    return (
      <div className="bg-forest text-cream rounded-2xl p-8">
        <Mono className="block mb-3 text-coral-soft">🔴 Live now</Mono>
        <h2 className="font-display text-[30px] mb-4">We're live. Join the Meet.</h2>
        <div className="flex gap-3 flex-wrap">
          <a
            href="https://meet.google.com/PLACEHOLDER"
            className="bg-coral text-cream px-7 py-3.5 rounded-full text-[16px] hover:bg-rust"
          >
            JOIN GOOGLE MEET →
          </a>
          <button className="border border-cream/30 text-cream px-5 py-3 rounded-full text-[14px] hover:bg-cream/10">
            Open workbook →
          </button>
        </div>
        <div className="font-mono text-[11px] text-cream/60 mt-4">Meet link active until 8:30 PM ET</div>
      </div>
    )
  }
  if (state === 'ended') {
    return (
      <div className="bg-white border border-border rounded-2xl p-6 md:p-8">
        <Mono className="block mb-3 text-coral">Just ended</Mono>
        <h2 className="font-display text-[24px] text-forest mb-4">We just finished. Take 60 seconds.</h2>
        <label className="block mb-3">
          <div className="text-[15px] text-forest mb-2">What hit hardest tonight?</div>
          <textarea
            rows={3}
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-[15px] focus:border-forest focus:outline-none"
            placeholder="Whatever comes up. Saved to your ReflectionEntry."
          />
        </label>
        <button className="bg-coral text-cream px-5 py-2.5 rounded-full text-[14px] hover:bg-rust">
          Save reflection →
        </button>
      </div>
    )
  }
  // recording
  return (
    <div className="space-y-5">
      <div className="bg-ink rounded-2xl aspect-video flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-cream/20 flex items-center justify-center mx-auto mb-2">
            <span className="text-cream text-[20px] ml-1">▶</span>
          </div>
          <div className="font-mono text-[11px] text-cream/50 tracking-widest uppercase">
            Recording · Day {day}
          </div>
        </div>
      </div>
      <div className="bg-white border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="font-mono text-[10px] text-coral tracking-widest uppercase">Finish your workbook</div>
          <Link to={`/preview/sessions/${day}?tab=workbook`} className="text-[13px] text-forest hover:underline">
            Open workbook →
          </Link>
        </div>
        <div className="text-[13px] text-slate">2 of 5 questions complete.</div>
      </div>
      <NpsMicro />
    </div>
  )
}

function NpsMicro() {
  const [score, setScore] = useState<number | null>(null)
  const [text, setText] = useState('')
  return (
    <div className="bg-white border border-border rounded-2xl p-5">
      <Mono className="block mb-3 text-coral">Quick 2-question check-in</Mono>
      <div className="text-[15px] text-forest mb-2">How likely are you to recommend tonight to another woman?</div>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 11 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setScore(i)}
            className={`flex-1 py-2 rounded-md text-[12px] font-mono border transition-colors ${
              score === i ? 'bg-forest text-cream border-forest' : 'bg-sand/40 text-slate border-border'
            }`}
          >
            {i}
          </button>
        ))}
      </div>
      <label className="block">
        <div className="text-[14px] text-forest mb-2">What's the one thing from tonight you'll do differently?</div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          className="w-full bg-white border border-border rounded-xl px-3 py-2 text-[14px] focus:border-forest focus:outline-none"
        />
      </label>
    </div>
  )
}

function WorkbookTab({ day }: { day: string }) {
  const schema = WORKBOOKS[day as unknown as 1 | 2 | 3] ?? WORKBOOKS[1]
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')

  const onChange = (id: string, v: string) => {
    setAnswers((a) => ({ ...a, [id]: v }))
    setSaveState('saving')
    setTimeout(() => setSaveState('saved'), 600)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-[26px] text-forest">{schema.title}</h2>
          <p className="text-body-sm text-slate">{schema.intro}</p>
        </div>
        <div className="font-mono text-[10px] text-slate tracking-widest uppercase text-right">
          {saveState === 'saving' && 'Saving…'}
          {saveState === 'saved' && `Saved at ${new Date().toLocaleTimeString()}`}
          {saveState === 'idle' && 'Not yet saved'}
        </div>
      </div>

      <div className="space-y-6">
        {schema.questions.map((q) => (
          <WorkbookField key={q.id} q={q} value={answers[q.id] || ''} onChange={(v) => onChange(q.id, v)} />
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <button className="bg-coral text-cream text-[15px] px-6 py-3 rounded-full hover:bg-rust">
          Mark as complete →
        </button>
        <span className="font-mono text-[10px] text-slate tracking-widest uppercase ml-4">
          Auto-saves · POST /api/workbook/[sessionId]/save
        </span>
      </div>
    </div>
  )
}

function WorkbookField({
  q,
  value,
  onChange,
}: {
  q: WorkbookQuestion
  value: string
  onChange: (v: string) => void
}) {
  if (q.type === 'single_select') {
    return (
      <div>
        <div className="text-[15px] text-forest mb-3">{q.question}</div>
        <div className="flex flex-wrap gap-2">
          {q.options.map((opt) => (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={`text-[13px] px-4 py-2 rounded-full border transition-colors ${
                value === opt
                  ? 'bg-forest text-cream border-forest'
                  : 'bg-white text-slate border-border hover:border-forest'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    )
  }
  if (q.type === 'long_text') {
    return (
      <div>
        <div className="text-[15px] text-forest mb-2">{q.question}</div>
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={q.placeholder}
          className="w-full bg-white border border-border rounded-xl px-4 py-3 text-[15px] focus:border-forest focus:outline-none"
        />
      </div>
    )
  }
  if (q.type === 'axis_rating') {
    return (
      <div>
        <div className="text-[15px] text-forest mb-3">{q.question}</div>
        <div className="space-y-3">
          {q.axes.map((axis) => (
            <div key={axis.key} className="bg-sand/40 border border-border rounded-xl px-4 py-3">
              <div className="text-[13px] text-forest mb-2">{axis.label}</div>
              <div className="flex gap-2">
                {(['Low', 'Yellow', 'Red'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    className="flex-1 text-[12px] py-1.5 rounded border border-border bg-white text-slate hover:border-forest"
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

function RecordingTab({ state }: { state: State }) {
  if (state !== 'recording') {
    return (
      <div className="bg-white border border-border rounded-2xl p-8 text-center">
        <div className="text-[40px] mb-3">🔒</div>
        <div className="text-body-md text-slate">Recording uploads within 1 hour of session end.</div>
      </div>
    )
  }
  return (
    <div className="bg-ink rounded-2xl aspect-video flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-cream/20 flex items-center justify-center mx-auto mb-2">
          <span className="text-cream text-[22px] ml-1">▶</span>
        </div>
        <div className="font-mono text-[11px] text-cream/50 tracking-widest uppercase">
          Recording ready · admin-uploaded to Vercel Blob
        </div>
      </div>
    </div>
  )
}

function DiscussionTab() {
  return (
    <div className="bg-white border border-border rounded-2xl p-6 text-center">
      <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-2">Cohort thread</div>
      <p className="text-body-md text-slate mb-4">
        Cohort discussion happens in your WhatsApp group. This tab deep-links there in v1 — a proper in-app thread lands in v2.
      </p>
      <a
        href="https://chat.whatsapp.com/PLACEHOLDER"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-2.5 rounded-full text-[14px] hover:bg-[#1ea952]"
      >
        Open cohort group →
      </a>
    </div>
  )
}

function ResourcesTab() {
  return (
    <div className="space-y-3">
      {[
        { t: 'Day 1 slides (PDF)', d: 'Shilpa\'s deck, 42 slides' },
        { t: 'Webinar 2 — Sleep + perimenopause', d: '60 min, unlocked tonight' },
        { t: 'Article: Why your TSH alone isn\'t enough', d: '5-min read' },
      ].map((r) => (
        <div
          key={r.t}
          className="bg-white border border-border rounded-xl px-5 py-4 flex items-center justify-between hover:border-forest hover:bg-sand/30 cursor-pointer"
        >
          <div>
            <div className="text-[15px] text-forest">{r.t}</div>
            <div className="text-[12px] text-slate">{r.d}</div>
          </div>
          <span className="font-mono text-[11px] text-coral">Open →</span>
        </div>
      ))}
    </div>
  )
}
