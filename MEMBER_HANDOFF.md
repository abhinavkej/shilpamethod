# The Hormone Method (by Forum Health) — Member Experience Handoff

> **Owner:** Areef
> **Reads-with:** `HANDOFF.md` (marketing + foundation) · this document extends it.
> **Source spec:** `hormone_method_member_experience_prompt.md.pdf` (54 pages)
> **Live preview:** https://shilpamethod.com/preview — click-through prototype with exact spec copy
> **Goal:** take the prototype in `/src/preview/*` and lift it into a production Next.js 14 member app.

---

## 0. TL;DR

Every screen in the 54-page spec now lives as a navigable prototype at `/preview/*`. It's client-side, local-state, Vite — no backend. That prototype is the **source of truth for UX, copy, and flow**. Your job is to migrate it to Next.js, wire the backend, and replace every `TODO(areef)` with real integrations.

### Four blocking dependencies (in order of lead-time)

1. **Twilio WhatsApp Business API + 9 Meta-approved templates** — submission-to-approval takes 1–2 weeks. **Start today.** (§4 of the PDF, §4 of this doc.)
2. **Google Cloud service account with domain-wide delegation on shilpamethod.com Workspace** — Shilpa's calendar needs to be the host so Meet events + invitations come from her. (§5.)
3. **Neon Postgres + Stripe + Resend + Anthropic + Vercel Blob** — all the Phase-1 secrets from `HANDOFF.md` that still aren't provisioned.
4. **PH.ai CoachKai router decision** — V1 can ship with our own `/api/webhooks/whatsapp` handler (Anthropic-powered). V2 hands off to PH.ai's central router. Pick your path before building §4.4.

---

## 1. Gap between current state and spec

| What the spec assumes | What actually exists |
|---|---|
| Next.js 14 App Router | Vite + React SPA |
| NextAuth v5 magic-link | None |
| Stripe test-mode checkout + webhook | None (stubbed form) |
| Prisma + Postgres (all tables) | None |
| Basic auth-gated dashboard | Mocked in `/preview/dashboard` |
| `User.onboardingCompletedAt` middleware | Simulated with React Router |

**Recommendation:** before this spec, complete Phase 2 from `HANDOFF.md` (Next.js scaffold + Prisma + NextAuth + Stripe + seed). Only then layer this prompt on top.

---

## 2. New env vars — everything this PDF adds

All names match the spec verbatim. Create values in Vercel env + local `.env.local`. Update `.env.example` too.

### 2.1 Google Calendar API (Meet links)
```
GOOGLE_SERVICE_ACCOUNT_EMAIL="hormone-method@xxx.iam.gserviceaccount.com"
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
GOOGLE_CALENDAR_ID="primary"                  # or a dedicated calendar
GOOGLE_CALENDAR_DELEGATE_EMAIL="shilpa@shilpamethod.com"
```

**How to get:**
1. Create a GCP project.
2. Enable Google Calendar API.
3. Create a service account, download JSON key, extract email + private key.
4. In Google Workspace admin (shilpamethod.com), enable **domain-wide delegation** for that service account with scope `https://www.googleapis.com/auth/calendar`.
5. The service account impersonates Shilpa (`subject: ...DELEGATE_EMAIL`) so calendar events appear on her calendar with her as host.

### 2.2 WhatsApp Business API (Twilio assumed)
```
WHATSAPP_API_BASE_URL="https://api.twilio.com/2010-04-01"
WHATSAPP_ACCOUNT_SID="AC..."
WHATSAPP_AUTH_TOKEN="..."
WHATSAPP_FROM_NUMBER="+14155551234"            # Coach Kai's number
WHATSAPP_WEBHOOK_SECRET="..."

# Template IDs — assigned by Meta/Twilio after approval
WHATSAPP_TEMPLATE_WELCOME="hormone_welcome_v1"
WHATSAPP_TEMPLATE_INTAKE_REMINDER="hormone_intake_reminder_v1"
WHATSAPP_TEMPLATE_SESSION_REMINDER_24H="hormone_session_24h_v1"
WHATSAPP_TEMPLATE_SESSION_REMINDER_1H="hormone_session_1h_v1"
WHATSAPP_TEMPLATE_SESSION_LIVE="hormone_session_live_v1"
WHATSAPP_TEMPLATE_RECORDING_READY="hormone_recording_ready_v1"
WHATSAPP_TEMPLATE_REFLECTION_PROMPT="hormone_reflection_v1"
WHATSAPP_TEMPLATE_DOCUMENT_READY="hormone_document_ready_v1"
WHATSAPP_TEMPLATE_DOCTOR_FOLLOWUP="hormone_doctor_followup_v1"
```

### 2.3 Anthropic (Coach Kai) — already in HANDOFF.md but required here
```
ANTHROPIC_API_KEY="sk-ant-..."
# Model per spec: claude-sonnet-4-7
```

### 2.4 Cron — existing from HANDOFF.md
```
CRON_SECRET="openssl rand -base64 32"
```

---

## 3. Service accounts to provision (ordered by lead time)

| # | Service | Why | Lead time |
|---|---|---|---|
| 1 | **Meta template approval** (via Twilio or 360dialog) | All 9 WhatsApp templates must be approved before first send | 1–2 weeks |
| 2 | **Google Cloud service account + domain delegation** | Meet events need to be on Shilpa's calendar | 2–5 days (requires Workspace admin) |
| 3 | **Twilio WhatsApp Business account + sandbox** | Wraps Meta; test in sandbox while templates are reviewed | Same-day for sandbox, 3–5 days for prod number |
| 4 | **Neon Postgres** | DB for everything below | Minutes |
| 5 | **Stripe test mode + live** | Already in HANDOFF.md | Hours |
| 6 | **Resend + domain verification** | Magic link + email templates | Hours |
| 7 | **Anthropic API** | Coach Kai | Minutes |
| 8 | **Vercel Blob** | Session recordings + PDFs | Minutes |

**Critical path = Meta template approval.** Submit today, in parallel with everything else.

---

## 4. WhatsApp templates (exact text — submit to Meta)

Every template is ≤ 1024 chars, no marketing lingo, transactional only. Variables use `{{1}}`, `{{2}}`, etc. Meta will reject marketing tone — keep it transactional.

### 4.1 `hormone_welcome_v1` (Onboarding)
> Hi {{1}} 👋 I'm Coach Kai. I'll be your guide through The Hormone Method. Reply YES to confirm you got this and we'll get started.

### 4.2 `hormone_intake_reminder_v1` (Pre-program)
> Hi {{1}} — quick nudge from Coach Kai. Your intake is {{2}}% done. Five more minutes and you're set: {{3}}

### 4.3 `hormone_session_24h_v1` (T-1 day per session)
> Hi {{1}} — Day {{2}} of The Hormone Method is tomorrow at {{3}}. Topic: {{4}}. Your Meet link: {{5}}

### 4.4 `hormone_session_1h_v1` (T-1 hour per session)
> {{1}}, Day {{2}} starts in 1 hour. Be in a quiet spot with a notebook. Meet link: {{3}}

### 4.5 `hormone_session_live_v1` (At session start)
> We're live! Join now: {{1}}. Workbook open in your dashboard: {{2}}

### 4.6 `hormone_recording_ready_v1` (T+1h post-session)
> {{1}}, the Day {{2}} recording is up: {{3}}. Take 60 seconds to share what hit hardest tonight: {{4}}

### 4.7 `hormone_reflection_v1` (Evening post-session)
> Reflection from Coach Kai: {{1}}. Reply with whatever comes up — there's no wrong answer.

### 4.8 `hormone_document_ready_v1` (T+1h post-Day 3)
> {{1}}, your Patient Advocacy Document is ready 📄 Download here: {{2}}. Tomorrow we'll talk about how to use it with your doctor.

### 4.9 `hormone_doctor_followup_v1` (T+3 days)
> {{1}}, have you booked the appointment yet? Reply YES, NO, or HELP and I'll send what you need.

**All 9 live in `src/config/placeholders.ts` (WHATSAPP.*). Replace the env-var names with Meta-approved template IDs once they land.**

---

## 5. Database — new tables (on top of HANDOFF.md schema)

Per PDF §2. Extend the existing schema — **do not delete anything.**

### Additions to `User`
```
timeZone               String?          // e.g. "America/New_York"
whatsappOptedIn        Boolean  @default(false)
whatsappOptedInAt      DateTime?
notificationPrefs      Json?            // { email: true, whatsapp: true, sms: false }
onboardingCompletedAt  DateTime?
```

### Additions to `ProgramSession`
```
meetEventId       String?     // Google Calendar event ID
meetJoinUrl       String?     // Meet URL (replaces zoomJoinUrl conceptually)
workbookSchema    Json?
homeworkPrompt    String?     @db.Text
reflectionPrompt  String?     @db.Text
```

### New tables
- `WorkbookEntry` — per user per session JSON responses, status: `in_progress | completed`
- `ReflectionEntry` — short reflection text; `dayNumber: 1 | 2 | 3 | 99` (99 = post-program)
- `NotificationEvent` — scheduled notifications with idempotent status `scheduled | sent | failed | skipped`
- `WhatsAppMessage` — inbound + outbound log; indexed by phone + time
- `AppointmentTracker` — doctor booking state + outcome per user
- `CohortGroup` — cohort's WhatsApp group invite URL

Relations: add `workbookEntries`, `reflectionEntries`, `notificationEvents`, `whatsappMessages`, `appointmentTracker` inverses to `User`. Add `group` inverse to `Cohort`. Full schema text in PDF §2.

**Run `npx prisma db push` after the edits; Prisma doesn't need a migration in dev mode.**

---

## 6. Architecture constants (from PDF §0)

1. **Coach Kai lives on WhatsApp.** The web app does NOT host an in-app chat UI for Kai. It shows the **last message** + a deep-link button. All conversational AI happens in WhatsApp.
2. **Sessions are on Google Meet.** Every `ProgramSession` has a calendar event with a Meet link auto-created on cohort creation and auto-invited on enrollment.

Do not violate these two.

---

## 7. Routes — every page this spec adds

Each corresponds to a file in `/src/preview/*` that ports 1-to-1 into `/src/app/*` during migration.

| Preview route (Vite) | Production route (Next.js) | Spec § | Notes |
|---|---|---|---|
| `/preview/onboarding/welcome` | `/onboarding/welcome` | §3.1 | 90-sec Shilpa video placeholder |
| `/preview/onboarding/phone` | `/onboarding/phone` | §3.2 | E.164 validation via `libphonenumber-js` |
| `/preview/onboarding/whatsapp` | `/onboarding/whatsapp` | §3.3 | Deep-link + dashboard poll for `whatsappOptedIn` |
| `/preview/onboarding/timezone` | `/onboarding/timezone` | §3.4 | `Intl.DateTimeFormat().resolvedOptions().timeZone` |
| `/preview/onboarding/preferences` | `/onboarding/preferences` | §3.5 | On submit: `onboardingCompletedAt = now()` |
| `/preview/dashboard?phase=runway` | `/dashboard` (phase=runway) | §6 | Today's Focus + intake + cohort + Kai card |
| `/preview/dashboard?phase=live` | `/dashboard` (phase=live) | §7.1 | Collapsed focused view with 5-state hero |
| `/preview/dashboard?phase=post` | `/dashboard` (phase=post) | §10.1 | Document hero + appointment tracker + Stay Connected |
| `/preview/intake/*` | `/intake/*` | §7.7 (prior PDF) | 4 sub-pages + overview |
| `/preview/sessions/[d]` | `/sessions/[dayNumber]` | §7.2 | 5-tab detail + 5-state hero |
| `/preview/document` | `/document` | §9 | Locked + ready states |
| `/preview/document/share` | `/document/share` | §9.3 | Tokenized 30-day share URL |
| `/preview/forum-referral` | `/forum-referral` | §10.3 | US outcome-dismissive handoff |
| `/preview/mukta-referral` | `/mukta-referral` | §10.4 | India handoff |
| `/preview/community` | `/community` | §11.2 | Opt-in member directory |
| `/preview/resources` | `/resources` | §7.10 | Webinars + reading list + guide PDF |
| `/preview/account` | `/account` | §7.11 | Profile + notifs + refund |
| `/preview/admin` | `/admin` | §7.12 + §14 | Stat cards + links |
| `/preview/admin/cohorts/[id]` | `/admin/cohorts/[id]` | §14 | Edit sessions + group invite |
| `/preview/admin/users/[id]` | `/admin/users/[id]` | §14 | Intake as clinical chart |
| `/preview/admin/live-session/[id]` | `/admin/live-session/[sessionId]` | §7.3 + §14 | Live poll + Q&A themes |
| `/preview/admin/post-program` | `/admin/post-program` | §14 | Outcome tracking table |

---

## 8. API routes — all 17

### Onboarding
- `POST /api/onboarding/phone` — save E.164, trigger `hormone_welcome_v1`
- `POST /api/onboarding/timezone` — save tz
- `POST /api/onboarding/preferences` — save prefs + `onboardingCompletedAt = now()`

### Communications
- `POST /api/webhooks/whatsapp` — Twilio inbound, verify signature, route to Coach Kai handler
- `POST /api/webhooks/stripe` — already in HANDOFF.md

### Intake + workbook + reflections
- `POST /api/intake` — mark `IntakeSubmission.completedAt`, send completion email
- `POST /api/workbook/[sessionId]/save` — auto-save on every change
- `POST /api/workbook/[sessionId]/complete` — flip status, trigger celebration
- `POST /api/reflections` — save reflection per day

### Appointment + document + referrals
- `POST /api/appointment-tracker` — update `bookedAt`, `outcome`
- `POST /api/document/generate` — run `buildDocumentContent` → react-pdf → Blob → DB
- `POST /api/document/regenerate` — force new version
- `GET /api/document/[id]/share` — tokenized doctor link (30-day)
- `POST /api/forum-referral` — US handoff
- `POST /api/mukta-referral` — India handoff

### Admin
- `POST /api/admin/cohort/[id]/recording` — upload to Blob, set `recordingUrl`
- `POST /api/admin/cohort/[id]/group` — set WhatsApp group URL
- `POST /api/admin/users/[id]/nudge` — manual WhatsApp nudge

### Cron (Vercel Cron)
- `GET /api/cron/notifications` — every 5 min, pull scheduled + send via Resend/Twilio
- `GET /api/cron/document-generation` — nightly 2 AM, generate overdue docs
- `GET /api/cron/cohort-status` — daily 9 AM, roll statuses OPEN → WAITLIST → IN_PROGRESS → COMPLETED

`vercel.json`:
```json
{ "crons": [
  { "path": "/api/cron/notifications",         "schedule": "*/5 * * * *" },
  { "path": "/api/cron/document-generation",   "schedule": "0 2 * * *" },
  { "path": "/api/cron/cohort-status",         "schedule": "0 9 * * *" }
]}
```

---

## 9. Notification engine — full cadence

### 9.1 Runway (14 days pre-program) — §6.3

| T-day | Channel | Template | Content |
|---|---|---|---|
| T-14 | Email | `runway_welcome` | Long welcome, 4 paragraphs, intake CTA |
| T-13 | WhatsApp | `runway_d13_kai` | "Did you start your intake yet?" |
| T-12 | Email | `runway_primer_1` | "Why your TSH alone isn't enough" |
| T-11 | WhatsApp | `runway_d11_video` | Webinar 1 highlight clip |
| T-10 | Email | `runway_intake_reminder` | "70% of your cohort has finished intake" |
| T-9 | WhatsApp | `runway_d9_reflection` | "Which symptom most?" |
| T-8 | Email | `runway_primer_2` | "Why your OBGYN said you're 'too young'" |
| T-7 | Email | `runway_intake_firm` | "Dr. Saxena reviews intakes 5 days out" |
| T-7 | WhatsApp | `runway_d7_cohort` | Cohort group opens |
| T-6 | Email | `runway_primer_3` | "The four risk axes" |
| T-5 | WhatsApp | `runway_d5_kai` | "Anything you want Shilpa to address?" |
| T-3 | Email | `session_72h` | "Day 1 in 3 days. Calendar invite included." |
| T-1 | Email | `session_24h` | "Tomorrow night. Here's how to prepare." |
| T-1 | WhatsApp | `hormone_session_24h_v1` | Templated reminder |

### 9.2 Per-session (×3 days)
- T-24h email + `hormone_session_24h_v1`
- T-1h `hormone_session_1h_v1`
- T+0 `hormone_session_live_v1` (optional, on-start)
- T+1h email `session_recording_ready` + `hormone_recording_ready_v1`
- T+2h `hormone_reflection_v1`

### 9.3 Post-program (T+0 → T+90) — §10.2

| T | Channel | Template | Content |
|---|---|---|---|
| T+0h | Email | `post_program_thank_you` | "Tonight you finished." |
| T+1h | WhatsApp | `hormone_document_ready_v1` | Document ready with shortlink |
| T+24h | Email | `post_using_document` | "How to use your document" |
| T+3d | WhatsApp | `hormone_doctor_followup_v1` | Booking check |
| T+7d | Email | `post_if_doctor_no` | "Your next move" — Forum / Mukta |
| T+14d | WhatsApp | `post_appointment_check` | Reply SUPPORTIVE / MIXED / DISMISSIVE / NOT_YET |
| T+30d | Email | `post_30d_nps` | NPS + "Tell us what worked" |
| T+45d | WhatsApp | `post_45d_testimonial` | Testimonial request |
| T+60d | Email | `post_60d_continuation` | Forum Health / Longevity Circle / Cohort 2 referrals |
| T+90d | Email | `post_90d_checkin` | Long-form check-in + refer-a-friend 25% off |

All scheduled on `Enrollment.create()` via `lib/notifications/scheduleRunway.ts`. Cron picks them up every 5 min. Idempotency via `NotificationEvent.status`.

### 9.4 All emails — new templates (14 total)

From §16:
- `runway_welcome`, `runway_primer_1`, `runway_primer_2`, `runway_primer_3`
- `runway_intake_reminder`, `runway_intake_firm`
- `session_72h`, `session_24h`, `session_recording_ready`
- `post_program_thank_you`, `post_using_document`, `post_if_doctor_no`
- `post_30d_nps`, `post_60d_continuation`, `post_90d_checkin`
- `forum_referral_confirmation`, `mukta_referral_confirmation`

Style: Cormorant Garamond H1, DM Sans body, cream background, terra CTAs. No HTML tables. No images beyond a 30px monogram.

---

## 10. Coach Kai handler (§4.4)

File: `lib/kai/handler.ts`

Key logic:
1. On inbound WhatsApp, look up user by `phoneE164`, log to `WhatsAppMessage`.
2. Handle reserved keywords first: `YES` (onboarding) sets `whatsappOptedIn = true`; `STOP` / `UNSUBSCRIBE` unsubscribes; `HELP` sends help template.
3. Otherwise build context block with:
   - User first name, cohort, daysToStart
   - Intake data: top symptoms, top goal, risk flags
   - Last 10 WhatsApp messages for conversation history
4. Call Anthropic `claude-sonnet-4-7` with `KAI_SYSTEM_PROMPT` + context block + history + current message.
5. Send reply via `sendWhatsAppFreeform` (must be within 24h of user's last message — otherwise use a template).
6. Log outbound to `WhatsAppMessage`.

System prompt template already exists at `lib/content/kaiSystemPrompt.ts` from Phase 2.

**V1 — self-contained.** V2 — route to PH.ai's central CoachKai router.

---

## 11. Workbook → Document pipeline (§8.3 + §9.1)

Trigger: all 3 workbooks marked complete OR cron at `endDate + 1h`.

`lib/document/builder.ts::buildDocumentContent(userId)`:
1. Load user + intake + 3 workbooks + reflections.
2. Run each builder function on a deterministic mapping:
   - `buildSymptomProfile(intake, day1)`
   - `buildRiskAxes(intake, day2)` — e.g. `personalHistoryDvt ? "red" : familyHistoryDvtStroke ? "yellow" : "green"`
   - `selectLabs(intake)` — standard panel + conditional based on risk flags
   - `buildDoctorQuestions(intake, day3, reflections)` — 5–7 questions pulled from user's own answers
   - `buildLifestylePlan(intake, day3)`
   - `getCitations(intake)` — fetch from `lib/content/citations.ts` (25 hard-coded PubMed IDs; clinical review TODO)
3. Return structured JSON.
4. `pdf(<Doc data={content} />).toBuffer()` via `@react-pdf/renderer`.
5. Upload to Vercel Blob, save URL to `PatientAdvocacyDocument.pdfBlobUrl`.
6. Trigger `hormone_document_ready_v1` + email with attachment.

If all workbooks aren't done by T+2h post-Day 3: generate with what we have, send softer copy: "Your document is ready — you can update it anytime by completing your workbooks."

---

## 12. Runway schedule content — 14 days

Already stubbed in `src/data/runwaySchedule.ts`. Each day has:
- `title`, `body`, optional `cta`, optional `videoEmbed { youtubeId }`, optional `reflectionPrompt`, `contentType`.

Current status: structure complete, titles + body written, 4 `videoEmbed.youtubeId` fields empty (T-12, T-10, T-6, T-5). Fill once webinar short clips are cut.

---

## 13. Seed data (§18)

Extend `prisma/seed.ts` to cover full member journey:
1. Create `CohortGroup` for Cohort 1 with a placeholder invite URL.
2. Update each `ProgramSession` with `meetJoinUrl: "https://meet.google.com/PLACEHOLDER-DAY{n}"`, `workbookSchema` from `src/data/workbookSchemas.ts`, `homeworkPrompt`, `reflectionPrompt`.
3. Test user `test+member@shilpamethod.com` (Sarah Chen):
   - `timeZone: "America/New_York"`, `whatsappOptedIn: true`, `onboardingCompletedAt: now()`
   - 3 `workbookEntries` (status completed, sample responses from PDF §18)
   - 3 `reflectionEntries` (Day 1/2/3 sample text)
   - `appointmentTracker { bookedAt: null }`
4. Pre-schedule runway + per-session + post-program notifications for Sarah via `scheduleRunwayNotifications`.

---

## 14. Acceptance criteria (§19) — 40+ checkpoints

Copy this checklist into whatever issue tracker you use and tick off one by one.

### Onboarding
- [ ] New paid user clicks magic link → forced into `/onboarding/welcome`
- [ ] Cannot bypass onboarding (middleware enforces)
- [ ] Phone capture validates E.164
- [ ] WhatsApp template sends successfully (check Twilio logs)
- [ ] Replying YES on WhatsApp marks `whatsappOptedIn = true` in DB
- [ ] Time zone autodetects, can be overridden
- [ ] Preferences save, onboarding marked complete, redirect to dashboard

### Pre-program (runway)
- [ ] Dashboard shows correct phase for `daysToStart` (test by changing `cohort.startDate`)
- [ ] Today's Focus card pulls correct content from `RUNWAY_SCHEDULE`
- [ ] Intake progress reflects actual completion state
- [ ] Cron job runs every 5 min, picks up scheduled notifications
- [ ] Email arrives in inbox (test with real address)
- [ ] WhatsApp message arrives on opted-in test number
- [ ] Notifications respect `notificationPrefs` (turning off email skips email but still sends WA)

### Live program
- [ ] On Day 1 (test by setting `cohort.startDate` to today), dashboard switches to live layout
- [ ] Pre-session shows countdown
- [ ] 1 hour before, "Join in [N] minutes" button appears
- [ ] Within session window, "JOIN GOOGLE MEET" button works (links to real Meet)
- [ ] Workbook tab loads schema correctly
- [ ] Workbook auto-saves on every change (verify via Network tab)
- [ ] Mark complete flips status, triggers celebration toast
- [ ] Post-session NPS card appears 0-60 min after end time
- [ ] Recording can be uploaded via admin panel
- [ ] Recording-ready WhatsApp triggers correctly

### Patient Advocacy Document
- [ ] After Day 3 + all workbooks complete, doc generates within 1 hour
- [ ] `hormone_document_ready_v1` sends via WhatsApp
- [ ] Email with PDF attachment sends via Resend
- [ ] `/document` page shows PDF inline + download
- [ ] Doctor email template generator works
- [ ] Tokenized share link generates and resolves without auth (read-only)
- [ ] PDF actually contains user-specific intake data (not generic placeholder)

### Post-program
- [ ] Phase transitions to `post` after `endDate + 24h`
- [ ] Booking tracker accepts updates
- [ ] Outcome routing logic works (dismissive → Forum referral CTA appears for US users)
- [ ] All scheduled post-program notifications fire on cadence
- [ ] Forum referral form submits to internal endpoint (placeholder API call OK)

### Coach Kai
- [ ] Inbound WhatsApp message routes to Kai handler
- [ ] Kai response includes intake context (test by sending "What's my biggest risk?" — should reference family history)
- [ ] Conversation history is included in subsequent messages
- [ ] STOP keyword unsubscribes user

### Admin
- [ ] Admin can upload session recording → triggers downstream notification
- [ ] Admin can view aggregated workbook responses
- [ ] Admin can manually nudge a specific user via WhatsApp
- [ ] Admin can regenerate a document
- [ ] Live session control panel shows real-time poll results (manual test with 2–3 inbound WA messages)

### Reliability
- [ ] Stripe webhook is idempotent (replay creates only one enrollment)
- [ ] Notification cron is idempotent (replay does not double-send)
- [ ] Document generation is idempotent (running twice in 1 minute does not produce two docs)
- [ ] Phone number normalization is consistent (same number entered with/without country code = same User match)

---

## 15. Things you may leave as placeholders (§20)

- Real WhatsApp template approval IDs → placeholder strings until Meta approves
- Real CoachKai phone number → Twilio sandbox, swap to PH.ai's production number on launch
- Real Forum Health CRM endpoint → `/api/forum-referral` emails Lisa for V1
- Real Mukta clinic intake → same pattern, emails Mukta
- Real PubMed citations → marked `// TODO: Clinical review required` in `lib/content/citations.ts`
- Real Shilpa welcome video → use Webinar #1 cued to a timestamp; replace with custom 90-sec greeting
- Real cohort group URL → admin manually creates group, pastes URL into `/admin/cohorts/[id]/group`

## 16. Things you must NOT do (§21)

- **Do not** build an in-app chat UI for Coach Kai. Kai lives on WhatsApp.
- **Do not** auto-add anyone to the WhatsApp group without explicit opt-in.
- **Do not** send WhatsApp freeform messages outside the 24-hour window. Use templates.
- **Do not** store WhatsApp message bodies containing sensitive PHI without encryption-at-rest verification (use PH.ai's existing HIPAA-grade approach).
- **Do not** generate documents on every page load. Cache aggressively.
- **Do not** let the cron job run a notification more than once. Idempotency is sacred.
- **Do not** skip the tokenized verification on the doctor share URL — it's a public link but token-gated, not session-gated.
- **Do not** show real cohort members' personal data in the directory without explicit opt-in.

---

## 17. Recommended build order (§22)

1. **DB schema additions + migrations**
2. **Onboarding flow** (5 steps) — verify a fresh user gets routed correctly
3. **WhatsApp outbound + templates** — verify a test message arrives
4. **WhatsApp inbound webhook** — verify YES reply marks opt-in
5. **Coach Kai handler** — verify a real conversation works on a test number
6. **Google Meet event creation** — verify a Meet event is created with the right attendees
7. **Notification scheduling on enrollment** — verify events appear in DB
8. **Notification cron** — verify scheduled events fire
9. **Time-aware dashboard variants** — verify each phase renders correctly
10. **Workbook system** — verify auto-save and completion
11. **Document content builder + generation cron** — verify a personalized PDF is produced
12. **Post-program flows** — verify appointment tracker and Forum/Mukta routing
13. **Admin panel additions**
14. **Run full acceptance test**

---

## 18. File map — where the prototype lives

| Area | Preview file(s) | Data source | Ports to (Next.js) |
|---|---|---|---|
| Onboarding | `src/preview/onboarding/*` | local state | `src/app/(member)/onboarding/*/page.tsx` |
| Dashboard | `src/preview/dashboard/{Dashboard,Runway,Live,Post}.tsx` | `src/data/runwaySchedule.ts` | `src/app/(member)/dashboard/page.tsx` + variants |
| Intake | `src/preview/intake/*` | local state | `src/app/(member)/intake/*/page.tsx` |
| Sessions | `src/preview/sessions/SessionDetail.tsx` | `src/data/workbookSchemas.ts` | `src/app/(member)/sessions/[dayNumber]/page.tsx` |
| Document | `src/preview/document/{Viewer,Share}.tsx` | stub data | `src/app/(member)/document/page.tsx` + `/share/page.tsx` |
| Referrals | `src/preview/referral/{Forum,Mukta}.tsx` | local state | `src/app/(member)/{forum,mukta}-referral/page.tsx` |
| Community | `src/preview/community/Community.tsx` | stub array | `src/app/(member)/community/page.tsx` |
| Resources | `src/preview/resources/Resources.tsx` | `src/config/placeholders.ts` (WEBINAR_CLIPS) | `src/app/(member)/resources/page.tsx` |
| Account | `src/preview/account/Account.tsx` | local state | `src/app/(member)/account/page.tsx` |
| Admin | `src/preview/admin/*` | stub data | `src/app/(admin)/admin/*` |
| Shared | `src/preview/ui.tsx` | — | `src/components/member/*` |
| Config | `src/config/placeholders.ts` | — | keep, extend with env references |

Every file is ~50–250 lines. Zero external dependencies beyond `react-router-dom`, `framer-motion`, and your existing stack. Migration is mostly renaming + swapping local state for server data.

---

## 19. Final note (§23)

You're building the experience that determines whether 50 women feel like they paid $149 for a webinar series — or like they paid $149 for the most useful 14 days of healthcare they've had in a decade.

Every WhatsApp message Coach Kai sends is the difference between "this feels canned" and "this feels like someone is actually paying attention to me." Every workbook auto-save is the difference between "I lost my work" and "this just works." Every reminder email is the difference between "I forgot Day 2" and "I'm ready."

Sweat the seams. The big stuff is rarely where things break.

Now build it.
