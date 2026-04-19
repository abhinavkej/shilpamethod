// §8 · Workbook schema per session. Stored on ProgramSession.workbookSchema (Json).

export type WorkbookQuestion =
  | { id: string; type: 'single_select'; question: string; options: string[] }
  | { id: string; type: 'long_text'; question: string; placeholder?: string }
  | { id: string; type: 'slider'; question: string; min: number; max: number; step?: number; labels?: [string, string] }
  | {
      id: string
      type: 'axis_rating'
      question: string
      axes: Array<{ key: string; label: string }>
    }

export interface WorkbookSchema {
  title: string
  intro: string
  questions: WorkbookQuestion[]
}

export const WORKBOOK_DAY_1: WorkbookSchema = {
  title: 'Day 1 Workbook — Define Your Need',
  intro: 'These questions sharpen what you bring to Day 2 and Day 3. Take your time — no one else sees this.',
  questions: [
    {
      id: 'd1_top_symptom',
      type: 'single_select',
      question: "Tonight, of everything Dr. Saxena covered, which symptom feels most urgent to address?",
      options: ['Sleep', 'Brain fog', 'Joint pain', 'Mood', 'Weight', 'Cycle', 'Energy', 'Sex/intimacy', 'Other'],
    },
    {
      id: 'd1_when_started',
      type: 'single_select',
      question: 'When did this start being a problem?',
      options: ['Less than 6 months', '6 months to 1 year', '1-2 years', '2-5 years', 'More than 5 years'],
    },
    {
      id: 'd1_doctor_response',
      type: 'single_select',
      question: 'Have you talked to a doctor about this specifically?',
      options: ['Yes, helpful', 'Yes, dismissed', "Yes, but I didn't push", 'No, planning to', 'No, not yet'],
    },
    {
      id: 'd1_what_you_now_suspect',
      type: 'long_text',
      question:
        "Based on tonight's session, what do you now suspect is going on hormonally? (No wrong answer — just what you'd say in your own words.)",
      placeholder: '…',
    },
    {
      id: 'd1_one_thing',
      type: 'long_text',
      question: "What's the one thing from tonight you'll do differently this week?",
      placeholder: 'Just one — small and specific.',
    },
  ],
}

export const WORKBOOK_DAY_2: WorkbookSchema = {
  title: 'Day 2 Workbook — Know Your Risk',
  intro: 'Rate yourself across the four risk axes Dr. Saxena walked through. Be honest — this shapes your document.',
  questions: [
    {
      id: 'd2_risk_self_rating',
      type: 'axis_rating',
      question: 'Where do you land on each of the four risk axes?',
      axes: [
        { key: 'clotting', label: 'Clotting / thrombotic history' },
        { key: 'cancer', label: 'Hormone-sensitive cancer' },
        { key: 'cardiovascular', label: 'Cardiovascular' },
        { key: 'bone', label: 'Bone health' },
      ],
    },
    {
      id: 'd2_most_interested_axis',
      type: 'single_select',
      question: 'Which axis do you most want to dig into with your doctor?',
      options: ['Clotting', 'Cancer', 'Cardiovascular', 'Bone', 'All of them'],
    },
    {
      id: 'd2_reflection',
      type: 'long_text',
      question: "What's one thing about your risk profile that surprised you tonight?",
      placeholder: '…',
    },
    {
      id: 'd2_labs_planned',
      type: 'long_text',
      question: "Based on tonight, which labs are you going to request first?",
      placeholder: 'Examples: fasting insulin, ApoB, DEXA…',
    },
  ],
}

export const WORKBOOK_DAY_3: WorkbookSchema = {
  title: 'Day 3 Workbook — Build Your Playbook',
  intro: "Translate the weekend into a specific plan for the appointment you're going to book this month.",
  questions: [
    {
      id: 'd3_doctor_question_1',
      type: 'long_text',
      question: "First question you'll ask your doctor:",
      placeholder: 'One sentence. Specific.',
    },
    {
      id: 'd3_doctor_question_2',
      type: 'long_text',
      question: "Second question:",
    },
    {
      id: 'd3_doctor_question_3',
      type: 'long_text',
      question: "Third question:",
    },
    {
      id: 'd3_lifestyle_priority',
      type: 'single_select',
      question: 'Of the five lifestyle pillars, which is your #1 starting point?',
      options: ['Sleep', 'Movement', 'Nutrition', 'Stress', 'Connection'],
    },
    {
      id: 'd3_medication_stance',
      type: 'single_select',
      question: 'Where do you land on hormonal medication after three days?',
      options: ['Ready to try BHRT', 'Want to discuss with doctor', 'Lifestyle first, then re-evaluate', 'Not for me'],
    },
    {
      id: 'd3_one_thing',
      type: 'long_text',
      question: "What's the first thing you're going to ask your doctor?",
      placeholder: 'The one sentence that starts the whole conversation.',
    },
  ],
}

export const WORKBOOKS: Record<1 | 2 | 3, WorkbookSchema> = {
  1: WORKBOOK_DAY_1,
  2: WORKBOOK_DAY_2,
  3: WORKBOOK_DAY_3,
}
