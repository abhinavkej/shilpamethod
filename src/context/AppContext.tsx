import { createContext, useContext, useReducer, type ReactNode } from 'react'

export type AgeRange = 'late-30s' | 'early-40s' | 'mid-40s' | 'early-50s'

export const AGE_LABELS: Record<AgeRange, string> = {
  'late-30s': 'Late 30s',
  'early-40s': 'Early 40s',
  'mid-40s': 'Mid 40s',
  'early-50s': 'Early 50s',
}

export const AGE_SUBLABELS: Record<AgeRange, string> = {
  'late-30s': '37–42',
  'early-40s': '43–47',
  'mid-40s': '48–52',
  'early-50s': '53–58',
}

interface AppState {
  ageRange: AgeRange | null
  ageGateCompleted: boolean
  selectedSymptoms: string[]
  riskAnswers: Record<string, string>
  spotsRemaining: number
  isRegistered: boolean
  registrationName: string
}

type Action =
  | { type: 'SET_AGE_RANGE'; payload: AgeRange }
  | { type: 'TOGGLE_SYMPTOM'; payload: string }
  | { type: 'SET_RISK_ANSWER'; payload: { questionId: string; answer: string } }
  | { type: 'DECREMENT_SPOTS' }
  | { type: 'SUBMIT_REGISTRATION'; payload: { name: string; email: string; ageRange: AgeRange | null; clinicalInterest: boolean } }

const initialState: AppState = {
  ageRange: null,
  ageGateCompleted: false,
  selectedSymptoms: [],
  riskAnswers: {},
  spotsRemaining: 23,
  isRegistered: false,
  registrationName: '',
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_AGE_RANGE':
      return { ...state, ageRange: action.payload, ageGateCompleted: true }
    case 'TOGGLE_SYMPTOM': {
      const id = action.payload
      const selected = state.selectedSymptoms.includes(id)
        ? state.selectedSymptoms.filter((s) => s !== id)
        : [...state.selectedSymptoms, id]
      return { ...state, selectedSymptoms: selected }
    }
    case 'SET_RISK_ANSWER':
      return {
        ...state,
        riskAnswers: { ...state.riskAnswers, [action.payload.questionId]: action.payload.answer },
      }
    case 'DECREMENT_SPOTS':
      return { ...state, spotsRemaining: Math.max(0, state.spotsRemaining - 1) }
    case 'SUBMIT_REGISTRATION':
      console.log('Registration submitted:', action.payload)
      return { ...state, isRegistered: true, registrationName: action.payload.name }
    default:
      return state
  }
}

interface AppContextValue {
  state: AppState
  dispatch: React.Dispatch<Action>
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
