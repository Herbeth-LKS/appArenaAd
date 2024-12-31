import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type PersistedStateProviderProps = {
  children: ReactNode
}

type PersistedStateContextType = {
  storage: Record<string, unknown>
  setState: (key: string, state: unknown) => void
  clearState: (key: string) => void
}

const RANDOM_KEY = '@react-native-use-persisted-state'

export const PersistedStateContext = createContext<PersistedStateContextType>(
  {} as PersistedStateContextType,
)

export default function PersistedStateProvider({
  children,
}: PersistedStateProviderProps) {
  const [loading, setLoading] = useState(true)
  const [storage, setStorage] = useState<Record<string, unknown>>({})

  useEffect(() => {
    // First init
    const init = async () => {
      const state = await AsyncStorage.getItem(RANDOM_KEY)
      if (state) {
        setStorage(JSON.parse(state))
      }
      setLoading(false)
    }
    init()
  }, [])

  const setState = useCallback(
    (key: string, state: unknown) =>
      setStorage((prev) => {
        const newState = {
          ...prev,
          [key]: state,
        }
        // Storage state migrate to local storage
        setImmediate(() =>
          AsyncStorage.setItem(RANDOM_KEY, JSON.stringify(newState)),
        )
        return newState
      }),
    [],
  )

  const clearState = useCallback(
    (key: string) =>
      setStorage((prev) => {
        const newState = { ...prev }
        delete newState[key]
        // Storage state migrate to local storage
        setImmediate(() =>
          AsyncStorage.setItem(RANDOM_KEY, JSON.stringify(newState)),
        )

        return newState
      }),
    [],
  )

  const state = useMemo<PersistedStateContextType>(
    () => ({
      storage,
      setState,
      clearState,
    }),
    [storage, setState, clearState],
  )

  return (
    <PersistedStateContext.Provider value={state}>
      {loading ? null : children}
    </PersistedStateContext.Provider>
  )
}
