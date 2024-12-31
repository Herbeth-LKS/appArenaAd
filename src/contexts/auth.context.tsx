import { createContext, useEffect } from 'react'
import { signInRequest, checkIfTokenIsExpired } from '../services/auth'
import { setApiToken } from '@/utils/api.utils'
import usePersistedState from '@/hooks/usePersistedState'
import { AxiosError } from 'axios'

export type User = {
  id: number
  name: string
  email: string
  phone: string
  cpf: string
}

export type Subscription = {
  status: string
  start_date: string
  end_date: string
  payment_status: string
}

export type SignInData = {
  email: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean | undefined
  user?: User
  subscription?: Subscription
  signIn: (data: SignInData) => Promise<void>
  singOut: () => void
}

type AuthProviderProps = {
  children: React.ReactNode
}

export type Quote = {
  id: number
  code: string
  group: string
  version: number
}

export const QuotePlaceholder: Quote = {
  id: 0,
  code: '',
  group: '',
  version: 0,
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = usePersistedState<User | undefined>('user', undefined)
  const [subscription, setSubscription] = usePersistedState<
    Subscription | undefined
  >('Subscription', undefined)
  const [isAuthenticated, setIsAuthenticated] = usePersistedState(
    'isAuthenticated',
    false,
  )

  async function signIn(signInData: SignInData) {
    const data = await signInRequest(signInData)
    const {
      data: { token, user, subscription },
    } = data

    setApiToken(token, 60 * 60 * 24 * 5)
    setUser(user)
    setSubscription(subscription)
    setIsAuthenticated(true)
  }

  async function singOut() {
    setUser(undefined)
    setIsAuthenticated(false)
  }

  async function checkRemoteToken() {
    try {
      if (!isAuthenticated) return
      await checkIfTokenIsExpired()
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError
        if (axiosError.response?.status === 400) {
          singOut()
        }
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      checkRemoteToken()
    }, 1000)
  }, [isAuthenticated])

  return (
    <AuthContext.Provider
      value={{ user, subscription, isAuthenticated, signIn, singOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
