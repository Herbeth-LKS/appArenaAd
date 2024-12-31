import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTH_TOKEN_NAME } from '@/constants/auth.constants'
import api from '@/services/api'
import { AxiosError } from 'axios'

type getApiHeadersResult = {
  Authorization?: string
  token?: any
}

export async function getApiHeaders(): Promise<getApiHeadersResult> {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_NAME)
  const expirationDate = await AsyncStorage.getItem(
    `${AUTH_TOKEN_NAME}_expires_at`,
  )

  if (token && expirationDate) {
    const now = new Date()
    const expiresAt = new Date(expirationDate)

    if (now < expiresAt) {
      return {
        Authorization: `Bearer ${token}`,
      }
    } else {
      await AsyncStorage.removeItem(AUTH_TOKEN_NAME)
      await AsyncStorage.removeItem(`${AUTH_TOKEN_NAME}_expires_at`)
      return { token }
    }
  }

  return { token }
}

export function setApiToken(token: string, expiresIn: number) {
  const expirationDate = new Date()
  expirationDate.setSeconds(expirationDate.getSeconds() + expiresIn)

  AsyncStorage.setItem(AUTH_TOKEN_NAME, token)
  AsyncStorage.setItem(
    `${AUTH_TOKEN_NAME}_expires_at`,
    expirationDate.toISOString(),
  )

  api.defaults.headers.Authorization = `Bearer ${token}`
}

export function transformSingleError(error: AxiosError) {
  const data = error.response as any
  return data.data?.message || data.messages?.message || undefined
}
