# The Hormone Method (by Forum Health) — CTO Handoff

> **Owner:** Areef
> **Last revised:** on the copy-freeze pass (docx v2 + PDF build-prompt merged)
> **Live site:** https://shilpamethod.com
> **Repo:** https://github.com/abhinavkej/shilpamethod
> **Vercel project:** `joshimethod` (team `abhinavkej-3107s-projects`)

---

## 0. TL;DR

The **marketing landing page is live** — `/` at shilpamethod.com. Every piece of copy is pulled verbatim from `ShilpaMethod_SiteCopy v2.docx`. The stack today is Vite + React + Tailwind deployed on Vercel static.

The **PDF build prompt** (`hormone_method_claude_code_prompt.md.pdf`) specifies a full Next.js 14 production application — auth, Stripe checkout, Postgres/Prisma, Resend, Anthropic AI, react-pdf, cron, admin. **That backend does not exist yet.** Everything below is what you need to provision and fill in so we can build it out.

Four things are blocking backend work:
1. **Env vars / service accounts** (Neon, Stripe, Resend, Anthropic, Vercel Blob). See §2.
2. **Copy tokens** still marked TODO in `src/config/placeholders.ts`. See §3.
3. **Legal text** (consent, terms, privacy, refund policy). See §4.
4. **Video assets** (6 webinar clip YouTube IDs). See §5.

Fill those in, flip the Vite repo to Next.js (§7), and we're running.

---

## 1. Current state of the repo

```
shilpamethod/
├── src/
│   ├── config/
│   │   └── placeholders.ts   ← SINGLE SOURCE OF TRUTH for every editable value
│   ├── components/           ← marketing sections
│   ├── data/
│   │   ├── faq.ts            ← 11 FAQs per docx
│   │   └── symptoms.ts       ← 12 symptom cards per docx
│   ├── context/AppContext.tsx
│   ├── hooks/useSpotCounter.ts
│   ├── lib/motion.ts
│   └── main.tsx, App.tsx, index.css
├── tailwind.config.ts        ← design tokens (forest / cream / coral / Fraunces)
├── SITE_COPY.md              ← plain-text dump of every line on the site
├── HANDOFF.md                ← this document
└── package.json              ← Vite 8 + React 19 + Framer Motion + Tailwind 4
```

### Marketing sections (in render order, all in `src/components/`)

| # | Component | Docx section | Status |
|---|---|---|---|
| 1 | `Nav.tsx` | Navigation | ✅ live |
| 2 | `Hero.tsx` | Hero | ✅ live |
| 3 | `PatientDocument.tsx` | Patient Advocacy Document (conversion anchor) | ✅ live, title token pulled from config |
| 4 | `DIWY.tsx` | Three ways to approach your hormones | ✅ live |
| 5 | `NotACourse.tsx` | Comparison vs. async course | ✅ live |
| 6 | `Program.tsx` | How it works (3 days + mechanics) | ✅ live |
| 7 | `Cohorts.tsx` | Pick your cohort | ✅ live, cohort labels pulled from config |
| 8 | `CoachKai.tsx` | Meet Coach Kai | ✅ live |
| 9 | `Clips.tsx` | Past webinars carousel | 🟡 placeholders until YouTube IDs land |
| 10 | `ShilpaIntro.tsx` | Your physician | ✅ live |
| 11 | `SymptomSelector.tsx` | The signals | ✅ live |
| 12 | `Registration.tsx` | Reserve your spot | 🟡 form submits to stub; wire to Stripe in Phase 2 |
| 13 | `Alumni.tsx` | After the boot camp | ✅ live |
| 14 | `FAQ.tsx` + `data/faq.ts` | Questions | ✅ live |
| 15 | `Footer.tsx` | Footer + disclaimers | 🟡 consent language placeholder |
| — | `FloatingSpotCounter.tsx` | mid-page spot counter | ✅ live, capacity pulled from config |

---

## 2. Env vars & service accounts — **all required**

Create `.env.local` (do not commit) with the keys below. Also create `.env.example` with the same keys but blank values. Paste values into Vercel Project Settings → Environment Variables for each environment (Production / Preview / Development).

### 2.1 Database — Neon Postgres
| Key | What | How to get |
|---|---|---|
| `DATABASE_URL` | Postgres connection string (serverless, pooled) | Create a new project at https://neon.tech, copy the pooled connection string |

Run `npx prisma db push` after `DATABASE_URL` is set (schema is defined in PDF §4).

### 2.2 Auth — NextAuth v5 (Auth.js) magic-link
| Key | What | How to get |
|---|---|---|
| `AUTH_SECRET` | Session signing secret | `openssl rand -base64 32` |
| `AUTH_URL` | Base URL | `http://localhost:3000` in dev, `https://shilpamethod.com` in prod |

### 2.3 Payments — Stripe (TEST MODE to start)
| Key | What | How to get |
|---|---|---|
| `STRIPE_SECRET_KEY` | Secret API key | Stripe Dashboard → Developers → API keys → Secret key (test) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Publishable | same page, Publishable key (test) |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | Create webhook at `/api/webhooks/stripe` listening to `checkout.session.completed` + `charge.refunded` |
| `STRIPE_PRICE_ID_USD` | One-time $149 price | Create Product "The Hormone Method Boot Camp" → Prices → $149 USD one-time |
| `STRIPE_PRICE_ID_INR` | One-time ₹4,999 price | Same product → second price, INR |
| `STRIPE_FORUM_HEALTH_COUPON_ID` | $50 off coupon for Forum Health patients | Stripe → Coupons → fixed amount $50 USD + ₹4,000 INR equivalent |

### 2.4 Transactional email — Resend
| Key | What | How to get |
|---|---|---|
| `RESEND_API_KEY` | API key | https://resend.com → API keys |
| `EMAIL_FROM` | Sender | `"Coach Kai <coachkai@shilpamethod.com>"` |
| `EMAIL_REPLY_TO` | Reply address | `hello@shilpamethod.com` |

Verify `shilpamethod.com` domain in Resend and add DKIM + SPF records.

### 2.5 AI — Anthropic (Coach Kai)
| Key | What | How to get |
|---|---|---|
| `ANTHROPIC_API_KEY` | API key | https://console.anthropic.com → API keys |

Model: `claude-sonnet-4-7` per PDF §1.

### 2.6 File storage — Vercel Blob (for PDFs)
| Key | What | How to get |
|---|---|---|
| `BLOB_READ_WRITE_TOKEN` | Blob store token | Vercel Dashboard → Storage → Create Blob store → Tokens |

### 2.7 Cron — Vercel
| Key | What | How to get |
|---|---|---|
| `CRON_SECRET` | Shared secret for cron routes | `openssl rand -base64 32` |

`vercel.json` cron config is in PDF §8.

### 2.8 Public base URL
| Key | What |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` dev / `https://shilpamethod.com` prod |

---

## 3. Copy tokens — in `src/config/placeholders.ts`

Every placeholder has a `TODO(areef)` comment. Search for that string in the repo to find them fast.

| Token | File | Default today | Action |
|---|---|---|---|
| `PROGRAM.displayDate` | placeholders.ts | `April 28–30, 2026` | Docx says Apr 28–30; PDF says Jun 2–4. **Confirm final.** |
| `PROGRAM.cohort1Label` | placeholders.ts | `Cohort 1 · 5 PM PST / 8 PM EST / 5:30 AM IST (next day)` | Confirm |
| `PROGRAM.cohort2Label` | placeholders.ts | `Cohort 2 · 8 AM PST / 11 AM EST / 8:30 PM IST` | Confirm |
| `PROGRAM.capacityPerCohort` | placeholders.ts | `50` | Confirm |
| `PROGRAM.seededSpotsRemaining` | placeholders.ts | `37` | Temporary — replace with live DB query once Phase 2 ships |
| `PRICE.usd` | placeholders.ts | `$149` | Confirm |
| `PRICE.inr` | placeholders.ts | `₹4,999` | Confirm |
| `DOCUMENT.displayName` | placeholders.ts | `Your Hormone Story` | Final? Alt candidate: "Your Hormone Health Blueprint" |
| `CONTACT.general` | placeholders.ts | `hello@shilpamethod.com` | Create mailbox + verify in Resend |
| `CONTACT.coachKai` | placeholders.ts | `coachkai@shilpamethod.com` | Create mailbox + verify in Resend |
| `LEGAL.consentLanguage` | placeholders.ts | placeholder token | **Counsel to draft** — see §4 |
| `LEGAL.termsUrl` | placeholders.ts | empty | Point to final `/terms` once drafted |
| `LEGAL.privacyUrl` | placeholders.ts | empty | Point to final `/privacy` once drafted |
| `LEGAL.refundPolicyUrl` | placeholders.ts | empty | Docx: "Full refund if requested more than 7 days before the program." Confirm language with counsel |
| `WEBINAR_CLIPS[n].youtubeId` (×6) | placeholders.ts | empty | See §5 |

The `{{CLIP_n}}` token chip renders on screen when a clip's `youtubeId` is empty — so anyone scanning the site can see exactly which ones still need video.

---

## 4. Legal items to draft

Engage counsel for each:

1. **Consent language** — shown in footer under "CONSENT". Today it's an italic placeholder.
   Starter text on the site: _"By registering, you consent to receive program communications and educational materials."_
   Counsel needs to add: HIPAA posture (educational programme, no PHI), Anthropic/Resend third-party processors, cookie notice, marketing opt-in.

2. **Terms of Service** — live at `/terms`. Needs: refund window, data retention, prohibited use, liability cap for educational material.

3. **Privacy Policy** — live at `/privacy`. Needs: GDPR (EU cohort members), CCPA, India's DPDP Act given an India cohort.

4. **Refund policy page** — linked from checkout. Docx FAQ #7 (currently #11 after reorder): "Full refund if requested more than 7 days before the program. Within 7 days, you may transfer to the next cohort." Counsel confirms.

5. **Medical disclaimer block** — already live in footer. Counsel should sign off on exact wording before paid registrations open.

6. **HIPAA assessment** — most important. Program is billed as educational, not clinical. If Coach Kai ever routes a message to Shilpa or a nurse for review, we're touching PHI. Counsel decides: keep Coach Kai strictly educational (safer) or sign BAAs with Anthropic + Vercel + Neon + Resend.

---

## 5. Webinar video assets

Six vertical clips expected from the past-webinar set. Full playlist: `PL0P26CWBMQZp25RVUHbshhy_OMdpUbabx`.

For each clip we need the **11-char YouTube ID** (the string after `v=` in the watch URL). Paste into `WEBINAR_CLIPS[n].youtubeId`:

| # | Speaker | Title (already set) | Length |
|---|---|---|---|
| 1 | Shilpa | Why perimenopause sleep breaks first | 1:47 |
| 2 | Jocelyn | Hormone confusion in my 40s | 2:12 |
| 3 | Shilpa | HRT vs BHRT — the difference | 3:04 |
| 4 | Shilpa | The one lab your OB-GYN probably skipped | 2:38 |
| 5 | Jocelyn | What I actually did with Shilpa's framework | 1:58 |
| 6 | Shilpa | Frozen shoulder in perimenopause | 2:26 |

Once a `youtubeId` is filled, the card auto-swaps from placeholder art to an embedded YouTube iframe.

Also needed for the Phase-2 Resources page (PDF §7.10):
- **Six full-length webinars** (YouTube IDs) for the Replays grid
- **4 reading-list articles** — titles and URLs (PDF examples: "The Women's Health Initiative — what they got wrong", "Why your TSH alone is not enough")
- **Forum Health BHRT guide PDF** — Shilpa to provide, upload to Vercel Blob

---

## 6. Patient Advocacy Document — clinical content

The PDF (`@react-pdf/renderer`, 8 pages) needs two clinical content files before the generator can run:

1. **`lib/content/citations.ts`** — hard-code ~25 PubMed citations Shilpa wants referenced across the document. Each citation = `{ id, authors, title, journal, year, pmid, linkedRiskAxis }`. Mark with `// TODO: clinical review` and get Shilpa to sign off.

2. **Clinical framework mapping** — risk axes (clotting / cancer / cardiovascular / bone) × intake answers → document sections. This is the IP. Shilpa needs to provide the decision logic in a spreadsheet we can convert to TypeScript.

Without those two, Phase-4 document generation is blocked even if everything else is wired.

---

## 7. Repo migration — Vite → Next.js 14

The current Vite SPA is fine for a marketing page. The backend spec needs Next.js App Router (SSR, API routes, middleware, Vercel Cron). Two options:

### Option A — in-place rewrite (recommended)
1. Create a new branch `next-migration`.
2. `npx create-next-app@latest --typescript --tailwind --app --src-dir --import-alias "@/*" --no-eslint`.
3. Copy `src/components/`, `src/config/placeholders.ts`, `src/data/`, `src/lib/motion.ts` over. Rename `src/App.tsx` content into `src/app/(public)/page.tsx`.
4. Port `tailwind.config.ts` + `src/index.css` into `globals.css`.
5. Wire `AppContext` → still fine as a Client Component provider in `src/app/layout.tsx`.
6. Add all server routes per PDF §7 and §8.

### Option B — parallel repo
Keep Vite marketing at shilpamethod.com; build the member area at `app.shilpamethod.com` as a new Next.js app. Slightly simpler separation of concerns but doubles the deploys.

I'd recommend **Option A**. The marketing code is small (~15 components, ~2k lines) and the PDF's App Router structure already has a `(public)/page.tsx` slot for the landing.

---

## 8. Phase plan — once env vars land

| Phase | Deliverable | Blockers |
|---|---|---|
| **Phase 2** Foundation | Next.js migration, Prisma schema + `db push`, NextAuth magic link via Resend, Stripe Checkout + webhook, `/checkout`, `/welcome`, `/login`, seed data, admin gate | Neon URL, Stripe keys + prices, Resend key, Auth secret |
| **Phase 3** Intake | `/intake` (4 sub-pages), `/dashboard`, `/sessions/[day]`, email drip cron (T-13/T-10/T-7/T-3, T-1 day, T-1 hour, post-session) | Phase 2 complete |
| **Phase 4** PDF + AI | `@react-pdf/renderer` 8-page document, `/document`, share-token route, Coach Kai streaming chat, NPS collection | Citations list from Shilpa, clinical framework spreadsheet, Anthropic key, Blob token |
| **Phase 5** Admin + polish | `/admin/*` (cohort editor, user search, intake clinical-chart view), end-to-end test with a real test card | Phases 2–4 complete |

Realistic: **Phase 2** = ~2 full dev days once env vars exist. **3** + **4** = ~3 days each. **5** = ~2 days.

---

## 9. File map — where to look

| You want to change | Edit this |
|---|---|
| Any date, price, cohort label, contact email, document name, capacity, consent copy | `src/config/placeholders.ts` |
| A webinar clip YouTube ID | `src/config/placeholders.ts` → `WEBINAR_CLIPS[n].youtubeId` |
| FAQ question or answer | `src/data/faq.ts` |
| Symptom chip text | `src/data/symptoms.ts` |
| Section copy (e.g. a headline) | the matching file in `src/components/` |
| Colors / fonts | `tailwind.config.ts` |
| Global styles / fonts load | `src/index.css` |
| Meta title + description | `index.html` |
| Section order | `src/App.tsx` |

Every file that reads from `placeholders.ts` has a comment at the top pointing there. `grep -r "TODO(areef)" src` lists every pending item in one shot.

---

## 10. Questions for product

Not for Areef — but flag these to the right person before Phase 2:

1. **Dates** — docx says April 28–30; PDF says June 2–4. Which ships?
2. **Document name** — "Your Hormone Story" vs "Your Hormone Health Blueprint"?
3. **Forum Health discount mechanism** — promo code via Forum's existing patient comms? Or do we need to integrate with their member list?
4. **Session recordings** — who owns them? Zoom cloud → stored where? YouTube unlisted upload?
5. **Testimonial clips (#2 + #5)** — is "Jocelyn" a real participant with a signed release?
6. **Timezone display** — Cohort 1 shows three zones; should the India-offset ("5:30 AM IST next day") stay or does it read as a negative signal?
7. **Refund language** — 24h (PDF §7.3) vs 7-day (docx FAQ) window. Pick one.
8. **India payments** — Stripe supports INR but requires Indian business entity verification. Alternative: Razorpay. Confirm before creating the INR price.

---

## 11. Known debt in the Vite repo

Things we can clean up during the Next.js migration, not blockers:

- `SITE_COPY.md` is a snapshot — it drifts from the components over time. After migration, generate it from the components instead.
- The `FloatingSpotCounter` ticks down every 45s with no server sync — it's theater. Rip this out and replace with a live DB count once enrollments exist.
- The rotated floating quote card in `Hero.tsx` is absolute-positioned and can overlap on narrow viewports between 768px and 900px. Minor polish during migration.
- Animations are standard Framer Motion `whileInView`. Performance fine; nothing to tune.

---

## 12. Contact for anything unclear

Everything that can be filled in declaratively lives in `src/config/placeholders.ts`. Everything code-structural lives in the PDF build prompt (`hormone_method_claude_code_prompt.md.pdf`, §1–§15). If a choice isn't obvious, default to what the docx says — it's the newer of the two sources.

Ping Abhinav if a placeholder has no obvious answer. Don't fill anything in that would require Shilpa's clinical sign-off without her on the thread.
