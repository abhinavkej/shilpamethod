import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { AppProvider } from '../context/AppContext'

// All phases of the member experience as Vite/React client-side mocks.
// When Areef migrates to Next.js, every component here ports 1-to-1 into
// the real auth-gated routes per hormone_method_member_experience_prompt.pdf.

import PreviewIndex from './PreviewIndex'
import OnboardingWelcome from './onboarding/Welcome'
import OnboardingPhone from './onboarding/Phone'
import OnboardingWhatsApp from './onboarding/WhatsApp'
import OnboardingTimezone from './onboarding/Timezone'
import OnboardingPreferences from './onboarding/Preferences'
import Dashboard from './dashboard/Dashboard'
import IntakeOverview from './intake/Overview'
import IntakeRisk from './intake/Risk'
import IntakeSymptoms from './intake/Symptoms'
import IntakeLifestyle from './intake/Lifestyle'
import IntakeGoals from './intake/Goals'
import SessionDetail from './sessions/SessionDetail'
import DocumentViewer from './document/Viewer'
import DocumentShare from './document/Share'
import ForumReferral from './referral/Forum'
import MuktaReferral from './referral/Mukta'
import Community from './community/Community'
import Resources from './resources/Resources'
import Account from './account/Account'
import AdminHome from './admin/Home'
import AdminCohort from './admin/Cohort'
import AdminUser from './admin/User'
import AdminLiveSession from './admin/LiveSession'
import AdminPostProgram from './admin/PostProgram'
import Checkout from './checkout/Checkout'
import Welcome from './welcome/Welcome'
import WelcomeMocks from './welcome/Mocks'
import Login from './login/Login'
import LoginCheck from './login/Check'

const WA_NUMBER = 'https://wa.me/14155551234'

const QUICK_REPLIES = [
  "When does my cohort start?",
  "How do I prepare for Day 1?",
  "What labs should I order?",
  "I need help with my intake form.",
]

const KAI_RESPONSES: Record<string, string> = {
  "When does my cohort start?": "Cohort 1 begins June 2, 2026 at 7 PM ET. You'll receive a Zoom link 24 hours before. Is there anything else you'd like to know?",
  "How do I prepare for Day 1?": "Find a quiet spot, have a notebook ready, and if possible block 75 minutes uninterrupted. Sessions run 7:00–8:15 PM ET. Joining 5 minutes early helps!",
  "What labs should I order?": "Dr. Saxena recommends: Estradiol, FSH, testosterone (free & total), SHBG, fasting insulin, HbA1c, TSH, and 25-OH Vitamin D. Your Patient Advocacy Document will have the full panel with context.",
  "I need help with my intake form.": "The intake takes about 10 minutes. Go step by step — there are no wrong answers. If a question feels unclear, just describe what you've experienced in your own words.",
}

function CoachKaiWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ from: 'user' | 'kai'; text: string }[]>([
    { from: 'kai', text: "Hi! I'm Coach Kai. I'm here to help you through every step of the program. What's on your mind?" },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text: string) => {
    if (!text.trim()) return
    const userMsg = text.trim()
    setMessages((m) => [...m, { from: 'user', text: userMsg }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const reply =
        KAI_RESPONSES[userMsg] ||
        "That's a great question. For anything clinical, I'll loop in Dr. Saxena's notes from the program. For urgent help, you can always reach me on WhatsApp too."
      setMessages((m) => [...m, { from: 'kai', text: reply }])
      setTyping(false)
    }, 1000)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 bg-forest text-cream rounded-full shadow-xl flex items-center justify-center text-[22px] hover:bg-ivy transition-colors"
        aria-label="Chat with Coach Kai"
      >
        {open ? '×' : '💬'}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[200] w-[340px] max-h-[520px] bg-white border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-forest text-cream px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-coral rounded-full flex items-center justify-center text-[14px] font-medium flex-none">K</div>
            <div className="flex-1">
              <div className="font-medium text-[14px]">Coach Kai</div>
              <div className="text-[11px] text-cream/60">Always here · responds instantly</div>
            </div>
            <a
              href={WA_NUMBER}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-coral-soft hover:text-coral underline underline-offset-2"
            >
              WhatsApp →
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] text-[13px] leading-relaxed px-3 py-2 rounded-2xl ${
                    m.from === 'user'
                      ? 'bg-coral text-cream rounded-br-sm'
                      : 'bg-sand/60 text-ink rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-sand/60 text-slate text-[13px] px-3 py-2 rounded-2xl rounded-bl-sm">
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: '0ms' }}>·</span>
                    <span className="animate-bounce" style={{ animationDelay: '150ms' }}>·</span>
                    <span className="animate-bounce" style={{ animationDelay: '300ms' }}>·</span>
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-[11px] bg-sand/60 hover:bg-sand text-forest px-2.5 py-1 rounded-full border border-border/60 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 pb-3 pt-2 border-t border-border/60 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(input)}
              placeholder="Ask Kai anything…"
              className="flex-1 bg-sand/40 border border-border rounded-full px-3 py-2 text-[13px] focus:border-forest focus:outline-none"
            />
            <button
              onClick={() => send(input)}
              className="bg-coral text-cream rounded-full px-3 py-2 text-[13px] hover:bg-rust transition-colors"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function PreviewBanner() {
  const loc = useLocation()
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-coral text-cream text-[12px] px-4 py-2 flex items-center justify-between gap-4 font-mono tracking-wide">
      <div className="flex items-center gap-3">
        <span className="bg-cream/20 px-2 py-0.5 rounded uppercase tracking-widest text-[10px]">Preview</span>
        <span className="hidden md:inline opacity-90">
          Member-experience prototype. Local state only. Every page = exact PDF spec.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/preview" className="hover:underline underline-offset-4">/preview</Link>
        <span className="opacity-70 hidden sm:inline">{loc.pathname}</span>
        <Link to="/" className="hover:underline underline-offset-4">← Public site</Link>
      </div>
    </div>
  )
}

export default function PreviewRoot() {
  return (
    <AppProvider>
      <PreviewBanner />
      <CoachKaiWidget />
      <div className="pt-10 min-h-screen bg-cream text-ink">
        <Routes>
          <Route index element={<PreviewIndex />} />

          {/* Post-checkout first 10 minutes — Slice 2 */}
          <Route path="checkout" element={<Checkout />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="welcome/mocks" element={<WelcomeMocks />} />
          <Route path="login" element={<Login />} />
          <Route path="login/check" element={<LoginCheck />} />

          {/* Onboarding — §3 */}
          <Route path="onboarding/welcome" element={<OnboardingWelcome />} />
          <Route path="onboarding/phone" element={<OnboardingPhone />} />
          <Route path="onboarding/whatsapp" element={<OnboardingWhatsApp />} />
          <Route path="onboarding/timezone" element={<OnboardingTimezone />} />
          <Route path="onboarding/preferences" element={<OnboardingPreferences />} />

          {/* Dashboard — §6 time-aware (runway/live/post) */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Intake — §7.7 prior PDF */}
          <Route path="intake" element={<IntakeOverview />} />
          <Route path="intake/risk" element={<IntakeRisk />} />
          <Route path="intake/symptoms" element={<IntakeSymptoms />} />
          <Route path="intake/lifestyle" element={<IntakeLifestyle />} />
          <Route path="intake/goals" element={<IntakeGoals />} />

          {/* Sessions — §7 state machine */}
          <Route path="sessions/:dayNumber" element={<SessionDetail />} />

          {/* Document — §9 */}
          <Route path="document" element={<DocumentViewer />} />
          <Route path="document/share" element={<DocumentShare />} />

          {/* Post-program — §10 */}
          <Route path="forum-referral" element={<ForumReferral />} />
          <Route path="mukta-referral" element={<MuktaReferral />} />

          {/* Community, resources, account */}
          <Route path="community" element={<Community />} />
          <Route path="resources" element={<Resources />} />
          <Route path="account" element={<Account />} />

          {/* Admin — §14 */}
          <Route path="admin" element={<AdminHome />} />
          <Route path="admin/cohorts/:id" element={<AdminCohort />} />
          <Route path="admin/users/:id" element={<AdminUser />} />
          <Route path="admin/live-session/:sessionId" element={<AdminLiveSession />} />
          <Route path="admin/post-program" element={<AdminPostProgram />} />
        </Routes>
      </div>
    </AppProvider>
  )
}
