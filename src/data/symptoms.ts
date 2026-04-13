export interface Symptom {
  id: string
  label: string
  icon: string
  explanation: string
  stat: string
}

export const symptoms: Symptom[] = [
  {
    id: 'weight',
    label: 'Unexplained weight gain',
    icon: '\u2696\uFE0F',
    explanation:
      "Estrogen plays a direct role in insulin sensitivity and where your body stores fat. As it shifts, your metabolism recalibrates — and the calorie math that used to work simply doesn't anymore. This is biology, not willpower.",
    stat: "The most common first symptom in this age group — reported by 78% of women in Dr. Saxena's practice.",
  },
  {
    id: 'fatigue',
    label: "Fatigue that sleep doesn't fix",
    icon: '\u26A1',
    explanation:
      "Hormonal fatigue is categorically different from tired. Estrogen and progesterone regulate your mitochondria — your cells' energy production. When they shift, no amount of sleep fully restores you. This is one of the first and most reversible symptoms with the right approach.",
    stat: '74% of women describe this as the symptom that finally made them seek answers.',
  },
  {
    id: 'brainfog',
    label: 'Brain fog or memory lapses',
    icon: '\uD83E\uDDE0',
    explanation:
      "Estrogen receptors line the hippocampus — the brain's memory center. When estrogen fluctuates, so does recall, word retrieval, and focus. This is not early dementia. It is almost certainly hormonal, and in most cases, highly reversible.",
    stat: 'Reported by 62% — and almost universally dismissed by conventional providers.',
  },
  {
    id: 'sleep',
    label: 'Sleep disruption — waking at 3am',
    icon: '\uD83C\uDF19',
    explanation:
      "Progesterone is your primary sleep hormone. As it declines in perimenopause, the architecture of your sleep changes — you fall asleep but can't stay there. The 3am wake-up is a hormonal signature, not anxiety.",
    stat: '61% of women in this age group report this specific pattern.',
  },
  {
    id: 'mood',
    label: 'Mood changes or new irritability',
    icon: '\uD83D\uDCAD',
    explanation:
      "Estrogen modulates serotonin and dopamine — your brain's primary mood regulators. Fluctuating estrogen creates a neurochemical instability that looks like irritability, low frustration tolerance, or sadness. It is not a character change. It is chemistry.",
    stat: '57% report mood changes as the symptom they feel most embarrassed to mention.',
  },
  {
    id: 'hair',
    label: 'Hair thinning or texture change',
    icon: '\u2728',
    explanation:
      'Hormonal hair changes are driven by the ratio of estrogen to androgens, and by thyroid hormones that are sensitive to the same hormonal shifts. Hair follicles have estrogen receptors. When estrogen declines, follicle cycling changes. This is addressable — but requires the right diagnosis first.',
    stat: '44% — and almost always appears 6\u201312 months after the hormonal shift begins.',
  },
  {
    id: 'periods',
    label: 'Irregular or changing periods',
    icon: '\uD83D\uDCC5',
    explanation:
      "Cycle irregularity is often the body's first visible signal of perimenopause — years before periods stop. Shorter cycles, heavier flows, missed months: these are the ovary's way of communicating that the hormonal conversation has changed.",
    stat: '42% notice cycle changes 2\u20138 years before conventional menopause diagnosis.',
  },
  {
    id: 'hotflashes',
    label: 'Hot flashes or night sweats',
    icon: '\uD83C\uDF21\uFE0F',
    explanation:
      "Driven by estrogen's effect on the hypothalamus — your brain's thermostat. Vasomotor symptoms are one of the most studied and most treatable aspects of hormonal transition. If this is your primary complaint, you have excellent options.",
    stat: '41% — often the last symptom to appear, not the first, despite being the most discussed.',
  },
  {
    id: 'shoulder',
    label: 'Frozen shoulder or joint stiffness',
    icon: '\uD83E\uDDB4',
    explanation:
      "Estrogen has direct anti-inflammatory effects on joint tissue. As it declines, synovial fluid changes and tendon flexibility decreases. Frozen shoulder affects 10\u201317% of perimenopausal women and is almost never connected to hormones by a conventional provider. Dr. Saxena addresses this directly.",
    stat: "One of the most validating moments in the program — women who've had this for years finally have an answer.",
  },
  {
    id: 'libido',
    label: 'Low libido',
    icon: '\uD83D\uDC9D',
    explanation:
      "Testosterone — yes, women produce it — governs libido, motivation, and a sense of vitality. It declines across the 40s alongside estrogen. This is physiological, not psychological, and it responds well to the right clinical approach.",
    stat: '35% report this but only 8% bring it up with their doctor unprompted.',
  },
  {
    id: 'anxiety',
    label: 'New or worsening anxiety',
    icon: '\uD83C\uDF0A',
    explanation:
      "GABA, the brain's calming neurotransmitter, is directly potentiated by progesterone. As progesterone declines, so does your nervous system's baseline calm. Anxiety that appears or worsens in your 40s — especially around your cycle — is almost always hormonal in origin.",
    stat: '33% — frequently misdiagnosed as a primary anxiety disorder and treated with SSRIs alone.',
  },
  {
    id: 'off',
    label: 'Feeling like yourself — but off',
    icon: '\uD83C\uDF3F',
    explanation:
      "This is the symptom that is hardest to name but easiest to recognize. You function. You manage. But something that used to feel effortless now takes effort. You are not depressed. You are not 'just stressed.' You are hormonally transitioning — and nobody gave you a map.",
    stat: '69% of women describe this as their truest symptom — and the one they were most afraid to say out loud.',
  },
]
