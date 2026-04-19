# Slice 3 — First Dashboard + Inline Onboarding

> **Owner:** Areef
> **Reads-with:** `HANDOFF.md`, `MEMBER_HANDOFF.md`
> **Source:** `hormone_method_slice3_first_dashboard.md`
> **Preview:** https://shilpamethod.com/preview/dashboard?phase=onboarding
> **Principle:** build the shell, not the content engine. Slice 5 fills in daily runway content.

---

## 0. TL;DR

Between magic-link click and her first real dashboard view, three things happen:

1. Server computes `phase` from `user.onboardingCompletedAt` + `cohort.startDate`.
2. First-time visitor sees **inline 2-step onboarding** on `/dashboard` — greeting → TZ → prefs. No separate route. Structural preview of the dashboard is faded behind, building anticipation.
3. Once prefs are saved, `onboardingCompletedAt = now()` and the same URL re-renders the runway dashboard.

Every piece is shipped as a Vite/React prototype under `/preview/*`. When you migrate to Next.js, the components move 1-to-1 into `app/(member)/*`.

---

## 1. Preview routes — click-through checklist

| Preview URL | Produces |
|---|---|
| `/preview/dashboard?phase=onboarding` | Inline 3-card onboarding flow with structural preview fading behind |
| `/preview/dashboard?phase=runway&intake=incomplete` | Runway shell, hero = "Start your intake" |
| `/preview/dashboard?phase=runway&intake=complete` | Runway shell, hero = "Today's Focus" from `RUNWAY_SCHEDULE` (Slice 5 peek) |
| `/preview/dashboard?phase=live` | Live-dashboard state preview (stub — Slice 7 fills in) |
| `/preview/dashboard?phase=post` | Post-program dashboard (already built end-to-end from member-experience PDF) |
| `/preview/dashboard?phase=none` | No-enrollment edge case |

Top-of-page phase switcher lets you flip between them. `?days=N` on runway picks a T-day between 14 and 1.

---

## 2. Files that port 1-to-1 to Next.js

| Preview file | Next.js target |
|---|---|
| `src/preview/dashboard/Dashboard.tsx` | `app/(member)/dashboard/page.tsx` (server component + `computePhase()`) |
| `src/preview/dashboard/MemberHeader.tsx` | `components/member/MemberHeader.tsx` (mounted in `app/(member)/layout.tsx`) |
| `src/preview/dashboard/Onboarding.tsx` | `components/dashboard/OnboardingDashboard.tsx` + 3 step subcomponents |
| `src/preview/dashboard/StructuralPreview.tsx` | `components/dashboard/StructuralPreview.tsx` |
| `src/preview/dashboard/NoEnrollment.tsx` | `components/dashboard/NoEnrollmentState.tsx` |
| `src/preview/dashboard/Runway.tsx` | `components/dashboard/RunwayDashboard.tsx` (+ splits into RunwayTopBar, RunwayHeroCard, SessionsStrip, KaiCard, CohortCard, ResourcesCard per spec §3.1–§3.7) |
| `src/preview/dashboard/Live.tsx` | `components/dashboard/LiveDashboard.tsx` stub (Slice 7 fills in) |
| `src/preview/dashboard/Post.tsx` | `components/dashboard/PostProgramDashboard.tsx` (already richer than stub — Slice 10 can refine) |

---

## 3. Server wiring (what to write during migration)

### 3.1 The router — `app/(member)/dashboard/page.tsx`

Exact spec in §1.1 of the source prompt. Loads user + enrollments + intake + document + appointment tracker in one Prisma call. Dispatches to one of five components based on `computePhase(...)`.

### 3.2 Phase computation — `lib/dashboard/computePhase.ts`

```ts
export function computePhase({ user, cohort, now }): DashboardPhase {
  if (!user.onboardingCompletedAt) return "onboarding";
  const daysToStart = differenceInDays(cohort.startDate, now);
  const hoursAfterEnd = differenceInHours(now, cohort.endDate);
  if (daysToStart > 0) return "runway";
  if (hoursAfterEnd <= 24) return "live";
  return "post";
}
```

### 3.3 Member layout shell — `app/(member)/layout.tsx`

Wraps everything in `<MemberHeader />` + `<main>`. Redirects to `/login` if no session. The preview has this logic simulated via the `MemberHeader` component.

### 3.4 API routes (new this slice)

| Route | Body | Effect |
|---|---|---|
| `POST /api/onboarding/timezone` | `{ timeZone: "America/New_York" }` | Validates IANA tz, saves `User.timeZone` |
| `POST /api/onboarding/preferences` | `{ notificationPrefs: { email, whatsapp, sms } }` | Validates shape, saves `notificationPrefs`, sets `onboardingCompletedAt = now()`, syncs `whatsappOptedIn` + `whatsappOptedInAt` |

Both require `auth()` session. Return `{ ok: true }` or validation error.

---

## 4. Design decisions worth preserving

1. **Inline > separate routes.** The 3 onboarding cards live on `/dashboard` itself. URL stays stable. Do not introduce `/onboarding/tz` or `/onboarding/prefs` — those were from an earlier iteration and are now deprecated. (The old routes are still in `/preview/onboarding/*` for reference, flagged in `PreviewIndex.tsx` as deprecated. Delete them during Next.js migration.)
2. **Structural preview builds anticipation.** The faded `StructuralPreview` behind the active card is the detail that matters. Don't cut it to "ship faster" — it's the difference between "this looks half-built" and "I'm about to land somewhere."
3. **No `step` persistence.** Progress is React state only. If she refreshes between Step 1 and Step 2, she goes back to Step 1. Acceptable — flow is short. Do not persist to URL or DB.
4. **Hero card follows intake.** Before intake completes: hero is "Start your intake" with direct CTA. After intake: hero becomes "Today's Focus" from the Slice 5 content engine. Preview toggles this via `?intake=complete|incomplete`.
5. **`onboardingCompletedAt` is the flag.** That's the single source of truth for whether she sees the onboarding flow. WhatsApp opt-in (from checkout) is a separate field. The notifications step respects her checkout choice but can also flip WhatsApp on.
6. **MemberHeader is sticky.** Wordmark on left, Sessions + Resources + avatar on right. Avatar opens an account menu with Sign out. Wordmark = home link.

---

## 5. Edge cases handled (§7)

- [x] **No active enrollment** → `NoEnrollment` component (refund, cancelled, etc.)
- [x] **Refresh mid-onboarding** → back to Step 1 (acceptable)
- [x] **Multiple enrollments** → earliest active
- [x] **Live week but no onboarding** → onboarding wins, completes inline, then live dashboard
- [x] **Invalid tz** → server validates via `Intl.DateTimeFormat(undefined, { timeZone })` try/catch
- [x] **Close between Step 2 + Step 3** → TZ saved, prefs not, `onboardingCompletedAt` still null → next visit restarts Step 1
- [x] **WA flipped on during prefs** → updates `whatsappOptedIn = true` but does NOT re-fire welcome WhatsApp (that fired or didn't at checkout)

---

## 6. New env vars (beyond prior handoffs)

```
# Optional — Shilpa's 60-sec first-dashboard video (text fallback if blank)
NEXT_PUBLIC_SHILPA_DASHBOARD_VIDEO_URL=""

# Coach Kai's WhatsApp number (international, no "+" prefix, used for wa.me deep links)
NEXT_PUBLIC_KAI_WHATSAPP_NUMBER="14155551234"
```

Both are already placeholdered in `src/preview/dashboard/Onboarding.tsx` (video) and `src/preview/dashboard/Runway.tsx` (wa.me link). They also belong in `src/config/placeholders.ts` as a follow-up — for now they're inline in the prototype.

---

## 7. Acceptance criteria (§8) — already passing in preview

### Routing
- [x] `/dashboard` is auth-gated (prototype simulates via MemberHeader presence)
- [x] Phase switch renders 5 different variants via `?phase=` param
- [x] `NoEnrollment` renders on `?phase=none`

### Onboarding flow
- [x] First-time visitor lands on greeting with correct first name + cohort dates
- [x] Video placeholder renders (real video loads from env var when set)
- [x] "Let's go →" advances to Step 2
- [x] Step 2 auto-detects TZ via `Intl.DateTimeFormat().resolvedOptions().timeZone`
- [x] Day 1 renders in the user's local time
- [x] "Yes, that's right" saves + advances (simulated)
- [x] "Change time zone" reveals 11-option dropdown
- [x] Step 3 shows three toggles, all default ON except SMS
- [x] WhatsApp toggle reflects checkout opt-in state
- [x] On save: redirects to runway dashboard (simulated)

### Runway dashboard
- [x] Top bar: cohort name · days to start · intake status · 14-day progress bar
- [x] T-day chips let you scrub the timeline
- [x] Hero = "Start your intake" when intake incomplete, "Today's Focus" when complete
- [x] Sessions strip: 3 cards with Day number, date, title, time
- [x] Kai card + Cohort card side-by-side
- [x] Resources teaser with 3 placeholder rows

### Visual / structural
- [x] MemberHeader sticky below preview banner
- [x] Account dropdown opens/closes on click outside
- [x] Faded StructuralPreview behind onboarding cards

Remaining for Next.js build:
- [ ] Real auth gating via `auth()` + middleware
- [ ] Real Prisma queries
- [ ] Real `POST /api/onboarding/timezone` + `POST /api/onboarding/preferences`
- [ ] Sign out actually ends the session

---

## 8. Not in this slice (explicitly)

- Daily rotating runway content engine → **Slice 5**
- Intake form → **Slice 4** (links out to `/preview/intake/*` which is built end-to-end already from member-experience PDF)
- Coach Kai AI → **Slice 6** (wa.me deep link goes to a number that doesn't have a bot yet)
- Live session functionality → **Slice 7**
- Workbooks, PAD generation, post-program → **Slices 8–10**

If you're about to build any of the above while wiring Slice 3, stop and re-scope. The win here is that every phase has a route that loads, every route has a layout, every layout has cards in the right places.

---

## 9. What's next

Slice 4 (intake) is the next natural step — it's what the runway hero card CTA points to. Slice 5 (runway content engine) plugs daily content into the hero card's "Today's Focus" slot (already wired to read from `src/data/runwaySchedule.ts`).

Both are largely unblocked by env vars — they're UI + content work, not new services. They're the next cheap wins before the heavy integrations (WhatsApp, Google Meet, document generation) require Areef's secrets.
