export interface RiskQuestion {
  id: string
  question: string
  options: { label: string; value: string }[]
  helperText?: string
}

export type RiskLevel = 'low' | 'medium' | 'high'

export const riskQuestions: RiskQuestion[] = [
  {
    id: 'clotting',
    question:
      'Has anyone in your immediate family — parent, sibling, aunt, uncle — had a blood clot, DVT, stroke, or repeated miscarriages?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
      { label: "I'm not sure", value: 'unsure' },
    ],
    helperText:
      "Blood clots can present as a stroke, a clot in the leg (DVT), or unexplained repeat miscarriages. If unsure, 'Not sure' is a valid answer — CoachKai will help you clarify before the program.",
  },
  {
    id: 'cancer',
    question:
      'Do you have a personal or family history of breast, ovarian, or endometrial cancer?',
    options: [
      { label: 'Yes (personal)', value: 'yes-personal' },
      { label: 'Yes (family member)', value: 'yes-family' },
      { label: 'No', value: 'no' },
      { label: 'Not sure', value: 'unsure' },
    ],
  },
  {
    id: 'cardiovascular',
    question:
      'Have you had a cardiovascular event — heart attack, angina — or has a close family member had one before age 65?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
      { label: 'Not sure', value: 'unsure' },
    ],
  },
  {
    id: 'dexa',
    question: 'Have you had a bone density scan (DEXA scan) in the last 3 years?',
    options: [
      { label: 'Yes — results were normal', value: 'yes-normal' },
      { label: 'Yes — showed low density', value: 'yes-low' },
      { label: 'No', value: 'no' },
      { label: "I don't know what a DEXA scan is", value: 'unknown' },
    ],
  },
]

export const DEXA_EXPLANATION =
  "A DEXA scan measures bone density — it's a 10-minute, painless X-ray available at most imaging centers. Dr. Saxena will explain why this matters for women in your age group."

export function scoreRisk(questionId: string, answer: string): RiskLevel {
  switch (questionId) {
    case 'clotting':
      return answer === 'yes' ? 'medium' : 'low'
    case 'cancer':
      if (answer === 'yes-personal') return 'high'
      if (answer === 'yes-family') return 'medium'
      return 'low'
    case 'cardiovascular':
      return answer === 'yes' ? 'medium' : 'low'
    case 'dexa':
      if (answer === 'yes-low') return 'high'
      if (answer === 'no' || answer === 'unknown') return 'medium'
      return 'low'
    default:
      return 'low'
  }
}

export const RISK_AXIS_LABELS: Record<string, string> = {
  clotting: 'Clotting / thrombotic history',
  cancer: 'Hormone-sensitive cancer',
  cardiovascular: 'Cardiovascular risk',
  dexa: 'Bone density',
}
