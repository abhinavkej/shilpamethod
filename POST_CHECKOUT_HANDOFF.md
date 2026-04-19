# Slice 2 — Post-Checkout First 10 Minutes

> **Owner:** Areef
> **Reads-with:** `HANDOFF.md`, `MEMBER_HANDOFF.md`, `SLICE3_HANDOFF.md`
> **Source:** `hormone_method_post_checkout_prompt.md.pdf` (35 pages)
> **Preview:** https://shilpamethod.com/preview/welcome
> **Scope:** the ~10-minute window between Stripe success and her looking at `/dashboard` for the first time. Four screens, two channels (email + WhatsApp), one auth flow.

---

## 0. The flow

```
T+0        Stripe → /welcome?session_id=xxx
T+0–5s     Webhook: verify, upsert User (phone + WA opt-in), Enrollment.upsert,
           send welcome email + WA template in parallel, schedule T+24h WA + T+72h
           email nudges as NotificationEvent rows
T+0–30s    She watches/reads, sees two status checkmarks fade in 800ms apart,
           optionally fixes a fat-fingered phone
T+30s–2m   She picks email or WhatsApp on her phone, taps
T+2m       Magic link → /api/auth/callback/email → /dashboard. She's in.

If she does not tap anything:
  T+24h    welcome_nudge_24h_v1 WA (skipped if she's logged in)
  T+72h    welcome_nudge_72h email (same skip logic)
```

---

## 1. Preview routes — stakeholder demo

| Route | Shows |
|---|---|
| `/preview/checkout` | Updated checkout form with phone input, country flag dial, WA opt-in (default checked), Forum Health checkbox (default unchecked), E.164 validation error state |
| `/preview/welcome` | Ready state. Cream bg, no nav/footer, no CTA. Headline → subhead → Shilpa text fallback → status indicator with 800ms staggered checkmarks → edit-phone link → "you can close this tab" |
| `/preview/welcome?state=processing` | Spinner while webhook catches up. Auto-advances at 3s; "something's taking longer" after 10s. |
| `/preview/welcome?state=edit` | Phone correction modal overlay |
| `/preview/welcome?media=video` | Swap text fallback for the Shilpa video placeholder |
| `/preview/welcome?wa=off` | Status indicator when `whatsappOptedIn === false` — shows the "opt in later" CTA |
| `/preview/welcome/mocks` | Side-by-side visual mocks of the welcome email, welcome WA template, T+24h WA nudge, T+72h email nudge |
| `/preview/login` | Returning-user magic-link form |
| `/preview/login/check` | Confirmation with masked email |

---

## 2. Files that port 1-to-1 to Next.js

| Preview file | Next.js target | Spec § |
|---|---|---|
| `src/preview/checkout/Checkout.tsx` | `app/(public)/checkout/page.tsx` | §1 |
| `src/preview/welcome/Welcome.tsx` | `app/(public)/welcome/page.tsx` + `components/welcome/WelcomeView.tsx` | §4 |
| `src/preview/welcome/Mocks.tsx` | **not a prod route** — reference only for email + WA template bodies | §5, §6, §9 |
| `src/preview/login/Login.tsx` | `app/(public)/login/page.tsx` | §8 |
| `src/preview/login/Check.tsx` | `app/(public)/login/check/page.tsx` | §8.3 |

Everything else (webhook, auth helpers, magic-link generator, email templates, WA sender) is new server code with no preview counterpart — build it fresh per the spec.

---

## 3. New / updated server code — what to write during migration

### 3.1 `/api/checkout/route.ts` (UPDATE)
Pre-Stripe: upsert `User` with `firstName`, `phoneE164`, `country`, `whatsappOptedIn`. Pass through into `stripe.checkout.sessions.create({ metadata: { userId, cohortId, firstName, phoneE164, whatsappOptedIn } })` so the webhook can fire WhatsApp without a DB read. See §1.3 + §1.4.

### 3.2 `/api/webhooks/stripe/route.ts` (UPDATE)
On `checkout.session.completed`:
1. `prisma.enrollment.upsert({ where: { stripeSessionId: session.id }, ... })` — idempotent
2. `generateMagicLink({ email, expiresIn: 60*60*24, callbackUrl: '/dashboard' })`
3. `await Promise.allSettled([ sendWelcomeEmail(...), whatsappOptedIn ? sendWhatsAppWelcome(...) : Promise.resolve() ])`
4. `prisma.notificationEvent.createMany` with two rows: `welcome_nudge_24h` (WhatsApp, T+24h) + `welcome_nudge_72h` (email, T+72h)
5. `scheduleRunwayNotifications(userId, cohortId)` — the full 14-day cadence already specced in MEMBER_HANDOFF

Full code in §2.

### 3.3 `lib/auth.ts` (UPDATE)
Two magic-link policies:
- **Self-serve `/login`:** default NextAuth email provider with `maxAge: 60 * 10` (10 minutes)
- **Welcome magic link:** new helper `generateMagicLink({ email, expiresIn, callbackUrl })` — writes to the same `VerificationToken` table, so `/api/auth/callback/email` handles both. Welcome uses 24h.

Session cookie lifetime: 90 days with 24h `updateAge` — the "Substack model" (§7.3).

Full code in §3.

### 3.4 `/api/welcome/status/route.ts` (NEW)
Polling endpoint for the `/welcome` processing state. Returns `{ ready: !!enrollment }` given a `session_id`. Client polls every 1s for max 30s. §11.

### 3.5 `/api/welcome/update-phone/route.ts` (NEW)
Phone-correction endpoint. Auths via the Stripe `session_id` as a single-use ephemeral token. Rejects after the 1-hour window. Validates with `libphonenumber-js`. Updates `User.phoneE164`, refires `sendWhatsAppWelcome` with a fresh magic link. §10.

### 3.6 `/api/cron/notifications/route.ts` (UPDATE)
Add **skip-if-authenticated** logic for the welcome nudges — before sending `welcome_nudge_24h` or `welcome_nudge_72h`, check `user.sessions.length > 0`. If so, set the event to `status: "skipped"`. §9.1.

### 3.7 `lib/email/sendWelcomeEmail.ts` + `lib/email-templates/welcomeEmail.tsx` (NEW)
React Email template (§5.2). Cream background, Cormorant H1, single terra CTA button. From: `Coach Kai <coachkai@shilpamethod.com>`. Subject: `You're in, ${firstName}.` Preheader mirrors the moment. §5.

### 3.8 `lib/whatsapp/sendWelcome.ts` (NEW)
Twilio WA Business API call with `contentSid: WHATSAPP_TEMPLATE_WELCOME` and three content variables. Logs to `WhatsAppMessage` (outbound + twilioSid). Wraps in try/catch so email still fires if WA fails. §6.2.

### 3.9 Standard magic-link email (short version for `/login`)
Different from the welcome email. Three lines. Subject: `Your link to The Hormone Method`. §8.4.

### 3.10 Nudge WA template `welcome_nudge_24h_v1` (NEW submission to Meta)
Body in §9.2 — re-quoted below. Submit today in parallel with `hormone_welcome_v1`.

---

## 4. WhatsApp templates to submit to Meta

### `hormone_welcome_v1` (T+0)
> Hi {{1}}, it's Kai 👋
>
> You're officially in for {{2}}.
>
> Over the next two weeks I'll be your guide before we go live with Dr. Saxena. Short messages, never spam.
>
> Tap below to open your dashboard whenever you're ready.

Footer: `Reply STOP anytime to unsubscribe.`
CTA URL button: label `Open my dashboard`, URL `{{3}}`
Variables: `{{1}}` first name · `{{2}}` cohort name · `{{3}}` magic link URL

### `welcome_nudge_24h_v1` (T+24h, skipped if she's signed in)
> Hey {{1}} — it's Kai again.
>
> Your dashboard is still waiting whenever you're ready. Quick tap and you're in: {{2}}
>
> (No rush — just don't want it to slip past you.)

Variables: `{{1}}` first name · `{{2}}` fresh 24h-valid magic link (regenerated at send time)

---

## 5. New env vars this slice

```
# Optional Shilpa 60-sec welcome video. If blank, text fallback renders.
SHILPA_WELCOME_VIDEO_URL=""

# Twilio template SIDs (replace with real IDs post-Meta-approval)
WHATSAPP_TEMPLATE_WELCOME="HXxxxxxxxxxxxxxxxxxxx"
WHATSAPP_TEMPLATE_NUDGE_24H="HXxxxxxxxxxxxxxxxxxxx"
```

These are also referenced from `src/config/placeholders.ts` under `WELCOME.*` and `WHATSAPP.template*Env`.

---

## 6. Acceptance criteria (§12) — preview status

### Checkout updates
- [x] Phone field with country flag dial-code prefix
- [x] WA opt-in checkbox default **checked**
- [x] Inline error if phone too short: "That doesn't look like a valid mobile number…"
- [ ] `User` upsert on checkout with `phoneE164` + `whatsappOptedIn` (server — migration)

### Webhook
- [ ] Idempotent enrollment on `stripeSessionId` (server — migration)
- [ ] Welcome email fires within 5s of webhook (Resend)
- [ ] Welcome WA fires within 5s (Twilio)
- [ ] WA opt-in false → no WA sent, email still goes
- [ ] T+24h + T+72h `NotificationEvent` rows created

### `/welcome` page
- [x] Preview renders the headline with the correct first name ("Sarah" in the mock)
- [x] `?media=video` shows the video block; default shows the 4-paragraph text fallback
- [x] Status indicator: two checkmarks fade in 800ms apart (framer-motion `animate` with `delay`)
- [x] Email masked as `s****@gmail.com`, phone masked as `+1 415 ••• ••23`
- [x] Phone-correction link visible (1-hour window simulated — no time-gate in preview)
- [x] Phone-correction modal updates UI and shows "Coach Kai is resending…"
- [x] **No CTA button** — only the implicit exit via the phone
- [x] `?state=processing` — spinner + polls; auto-advance at 3s, taking-longer at 10s

### Email / WhatsApp
- [x] Email visual mock matches spec (cream bg, Cormorant H1, terra button, Coach Kai voice)
- [x] WA visual mock matches template body + footer + button
- [ ] Real delivery (server — migration)

### Magic-link auth
- [ ] Welcome magic link valid 24h
- [ ] `/login` self-serve magic link valid 10 min
- [ ] Session cookie 90 days
- [ ] Already-logged-in user clicking old magic link just lands on `/dashboard`

### Nudges
- [ ] `welcome_nudge_24h_v1` fires at T+24h if not authenticated
- [ ] Skipped if authenticated (status = "skipped")
- [ ] T+72h email nudge same logic
- [ ] Each nudge carries a fresh 24h magic link

Everything UI-side is green. Everything server-side is an explicit "do this during Next.js migration" item.

---

## 7. Edge cases (§12) — all handled in the preview

| Case | Preview | Prod behavior |
|---|---|---|
| Fat-fingered phone | `?state=edit` opens modal | POST `/api/welcome/update-phone` validates + refires WA |
| User closes browser immediately after payment | N/A (server webhook does the work) | Webhook creates everything regardless |
| User taps an expired magic link | Handled by NextAuth's own error page | Friendly "this link expired, request a new one" |
| User already logged in, taps new magic link | Should bypass to dashboard | NextAuth idempotent — just redirects |

---

## 8. Copy principles (§15) — do not dilute

1. **Restraint.** `/welcome` has NO CTA button. The email has ONE button. The WhatsApp has ONE button. Every additional tap, choice, or distraction in this moment dilutes it.
2. **Continuity of voice.** Coach Kai writes the email. Coach Kai writes the WhatsApp. Coach Kai writes the nudges. She's meeting one character — not getting form letters from a system. Every line sounds like the same person.

If anyone suggests adding a "start intake now" CTA to the welcome page or a second button to the email, redirect them to this section. It's load-bearing.

---

## 9. Naming note: Coach Kai vs Dr. Kai

The PDF uses `Dr. Kai` and `drkai@shilpamethod.com` in §5.1. **The rest of the site uses `Coach Kai` and `coachkai@shilpamethod.com`** — established by the v2 site-copy doc and consistent across `MEMBER_HANDOFF.md`, marketing site, dashboard, admin. I've kept `CoachKai` throughout the preview to maintain continuity.

If Shilpa / product decide to flip the name globally, do one pass across the codebase + templates — but don't half-do it. `Dr. Kai` in the welcome email while the landing page says `Coach Kai` would be jarring.

---

## 10. What's NOT in this iteration (§14)

- Onboarding flow (phone capture moved to checkout; time zone + prefs live in Slice 3)
- Dashboard itself (Slice 3)
- WhatsApp inbound webhook handler beyond STOP keyword
- Coach Kai conversational AI
- Workbooks, sessions, document generation
- Admin tools

---

## 11. Final note

She just gave $149 and her phone number. The next two minutes determine whether she feels like she joined a serious clinical program or signed up for another wellness funnel.

Ship §1–§11 of the spec. Don't pull yourself into §14. Every line on the `/welcome` page, in the email, in the WhatsApp — it's all written. Just wire the servers.
