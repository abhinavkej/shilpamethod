// §17 — lib/content/runwaySchedule.ts
// 14 days of pre-program content. Keys = days until start (14 → 1).
// Each day surfaces as the hero "Today's Focus" card on /dashboard.

export interface RunwayDay {
  title: string
  body: string
  cta?: { label: string; href: string }
  videoEmbed?: { youtubeId: string; startSeconds?: number }
  reflectionPrompt?: string
  contentType: 'intake' | 'primer' | 'video' | 'reflection' | 'cohort' | 'logistics'
}

export const RUNWAY_SCHEDULE: Record<number, RunwayDay> = {
  14: {
    title: "Welcome — let's get you ready",
    body: "The first thing to do is your intake. This is what Dr. Saxena reads before your cohort begins. Your specific symptoms shape what she emphasizes.",
    cta: { label: 'Start your intake (10 min) →', href: '/preview/intake' },
    contentType: 'intake',
  },
  13: {
    title: "Why this isn't 'just menopause'",
    body: "Most women spend 7 years navigating perimenopause. Today's primer: a 5-min read on why standard care misses this.",
    cta: { label: 'Read it now →', href: '/preview/resources' },
    contentType: 'primer',
  },
  12: {
    title: 'The fastest gain you can make this week: better sleep',
    body: "Watch Dr. Saxena explain why progesterone — your sleep hormone — drops first in perimenopause, and what to do about it tonight.",
    cta: { label: 'Watch (8 min) →', href: '/preview/resources' },
    videoEmbed: { youtubeId: '' }, // TODO(areef): fill in once Webinar 2 clip is cut
    contentType: 'video',
  },
  11: {
    title: 'Your intake shapes the whole weekend',
    body: "Dr. Saxena reviews every intake personally before Day 1. If you haven't finished yours, the 10 minutes it takes now will change what she emphasizes in your session.",
    cta: { label: 'Finish your intake →', href: '/preview/intake' },
    contentType: 'intake',
  },
  10: {
    title: "What is BHRT, really?",
    body: "A primer on the difference between HRT and BHRT — and why the 2002 WHI study has been substantially reanalyzed since.",
    cta: { label: 'Read + watch (7 min) →', href: '/preview/resources' },
    videoEmbed: { youtubeId: '' }, // TODO(areef): Webinar 3 short clip
    contentType: 'primer',
  },
  9: {
    title: 'Quick reflection',
    body: "What's the symptom you most want Dr. Saxena to address? No wrong answer — whatever comes up.",
    reflectionPrompt: 'Open text — stored to ReflectionEntry (dayNumber: 0)',
    contentType: 'reflection',
  },
  8: {
    title: 'Community access unlocks in 24 hours',
    body: "Tomorrow your cohort WhatsApp group opens. 47 of 50 women have joined Cohort 1 — you'll be able to say hi before Day 1.",
    contentType: 'cohort',
  },
  7: {
    title: 'Your cohort group is open',
    body: "47 of 50 women in your cohort. Introduce yourself when you're ready — no pressure. And a final firm nudge: Dr. Saxena reads intakes 5 days before Day 1. If you haven't finished, now is the moment.",
    cta: { label: 'Open WhatsApp group →', href: 'https://chat.whatsapp.com/PLACEHOLDER' },
    contentType: 'cohort',
  },
  6: {
    title: 'The four risk axes (in plain English)',
    body: "Clotting, cancer, cardiovascular, bone. Today's primer explains what each one means for your body — and which matters most for you.",
    cta: { label: 'Read (6 min) →', href: '/preview/resources' },
    videoEmbed: { youtubeId: '' }, // TODO(areef): Webinar 4 clip
    contentType: 'primer',
  },
  5: {
    title: 'Anything you want Dr. Saxena to make sure to address?',
    body: "Five days out. Reply in WhatsApp with whatever comes up — Coach Kai will surface it to Dr. Saxena before your session.",
    reflectionPrompt: "What's on your mind going into the weekend?",
    videoEmbed: { youtubeId: '' }, // TODO(areef): Webinar 5 clip
    contentType: 'reflection',
  },
  4: {
    title: 'What to expect Tuesday, Wednesday, Thursday',
    body: "Day 1: Identify Your Story. Day 2: Understand Your Numbers. Day 3: Build Your Playbook. All live on Google Meet, 7:00–8:15 PM ET (may extend to 8:30 when the energy calls for it).",
    contentType: 'logistics',
  },
  3: {
    title: 'Day 1 in 3 days — your calendar invite',
    body: "Session_72h email sent. Calendar invite with Google Meet link is in your inbox. Add it to your calendar so you're not scrambling Tuesday evening.",
    cta: { label: 'See your sessions →', href: '/preview/sessions/1' },
    contentType: 'logistics',
  },
  2: {
    title: 'What to bring',
    body: "Notebook (physical or digital). Water. A quiet spot for 75 minutes. Your last lab results if you have them handy. That's it.",
    contentType: 'logistics',
  },
  1: {
    title: 'Tomorrow at 7:00 PM ET',
    body: "Day 1 is tomorrow. Join link is in your calendar and in Coach Kai's WhatsApp thread. See you there.",
    cta: { label: "Today's session →", href: '/preview/sessions/1' },
    contentType: 'logistics',
  },
}
