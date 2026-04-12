import { useEffect } from 'react'
import { useApp } from '../context/AppContext'

export function useSpotCounter() {
  const { state, dispatch } = useApp()

  useEffect(() => {
    if (state.spotsRemaining <= 0) return

    const interval = setInterval(() => {
      dispatch({ type: 'DECREMENT_SPOTS' })
    }, 45_000)

    return () => clearInterval(interval)
  }, [state.spotsRemaining, dispatch])

  return state.spotsRemaining
}
