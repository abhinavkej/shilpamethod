import { createContext, useContext, useReducer, type ReactNode } from 'react'

export type Cohort = 'c1' | 'c2'

interface AppState {
  selectedSymptoms: string[]
  cohort: Cohort
  spotsRemaining: number
  isRegistered: boolean
  registrationName: string
}

type Action =
  | { type: 'SET_SYMPTOM'; payload: string | null }
  | { type: 'SET_COHORT'; payload: Cohort }
  | { type: 'DECREMENT_SPOTS' }
  | { type: 'SUBMIT_REGISTRATION'; payload: { name: string; email: string; clinicalInterest: boolean } }

const initialState: AppState = {
  selectedSymptoms: [],
  cohort: 'c1',
  spotsRemaining: 37,
  isRegistered: false,
  registrationName: '',
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_SYMPTOM':
      return { ...state, selectedSymptoms: action.payload ? [action.payload] : [] }
    case 'SET_COHORT':
      return { ...state, cohort: action.payload }
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
