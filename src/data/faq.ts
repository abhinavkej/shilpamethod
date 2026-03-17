export interface FAQItem {
  id: string
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    id: 'bhrt',
    question: 'Will this program push BHRT on me?',
    answer:
      "No. The framework — Define Need, Assess Risk, Create Solution — exists precisely to ensure you don't end up with a solution before you understand your situation. Dr. Saxena covers the functional medicine perspective; Dr. Scott covers the clinical and insurance-navigable pathways. Many women leave the weekend choosing lifestyle interventions first. Some choose BHRT. Some choose a combination. The program gives you the information to make that call yourself.",
  },
  {
    id: 'obgyn',
    question: "My OB-GYN already told me I don't need hormones. What's the point of this?",
    answer:
      "The Program is educational, not clinical. You won't receive a prescription this weekend. What you will receive is the evidence and the framework to have a far more informed conversation with any provider — including yours. Dr. Saxena provides a documented risk assessment, and Dr. Scott helps you understand the clinical pathways and lab work that support the conversation. Many women find this changes the dynamic entirely.",
  },
  {
    id: 'labs',
    question: 'Will you tell me what labs to get?',
    answer:
      "Yes. Dr. Scott walks through the recommended lab panel on Day 2, including what each marker tells you and how to interpret results. You'll leave with a specific list you can bring to your provider. Lab recommendations are educational — ordering, interpretation, and clinical decisions require a licensed provider in your state.",
  },
  {
    id: 'cancer',
    question: "I've heard BHRT causes cancer. Should I be worried?",
    answer:
      "This fear comes largely from a 2002 study called the Women's Health Initiative — which was conducted using synthetic hormones, not bioidentical ones, and which has been substantially reanalyzed and contextualized in the 20+ years since. This is addressed directly on Day 1, with citations you can look up yourself. You deserve the full picture, not the 2002 summary.",
  },
  {
    id: 'young',
    question: "I'm in my late 30s. Is this program for me?",
    answer:
      "Perimenopause can begin as early as 35, and the hormonal shifts that precede it even earlier. If you're experiencing unexplained symptoms, the question isn't your age — it's your symptom profile and your hormone levels. Many of the women who've benefited most were in their late 30s and had been told they were 'too young' to be experiencing what they were experiencing.",
  },
  {
    id: 'location',
    question: "I live in a state where Forum Health doesn't operate. Can I still attend?",
    answer:
      "Yes. The program is fully virtual and open to women anywhere. The Forum Health clinical pathway at the end is available in states where Forum Health operates. For women outside those states, the framework and your Patient Advocacy Document are designed to help you have a better conversation with any provider, anywhere.",
  },
  {
    id: 'time',
    question: 'How much time does this require outside the two live sessions?',
    answer:
      "The two live sessions are 90 minutes each. The pre-program intake with Dr. Kai takes about 15 minutes spread across the week before. The risk assessment (above) takes under 60 seconds. The program is designed for busy women — Dr. Saxena has run group programs for 20 years and knows that overwhelm is the enemy of action.",
  },
  {
    id: 'ai',
    question: 'What is Dr. Kai? Is an AI giving me medical advice?',
    answer:
      "Dr. Kai is an AI assistant trained on Dr. Saxena's and Dr. Scott's clinical protocols. It helps you complete your intake, filters questions during live sessions so both physicians can address the room efficiently, and generates your Patient Advocacy Document at the end. Dr. Kai does not diagnose, prescribe, or give medical advice. It extends both physicians' time — so they can show up to your 90-minute session knowing your cohort's profile deeply.",
  },
  {
    id: 'refund',
    question: 'What is the refund policy?',
    answer:
      'Full refund if requested more than 7 days before the program start date. No refund within 7 days, but you may transfer your spot to the next cohort. If the program is cancelled for any reason, full refund.',
  },
]
