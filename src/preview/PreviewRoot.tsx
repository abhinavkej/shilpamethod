import { Routes, Route, Link, useLocation } from 'react-router-dom'
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
