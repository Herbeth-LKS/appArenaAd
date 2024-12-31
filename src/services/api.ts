import axios from 'axios'
import asyncStorage from '@react-native-async-storage/async-storage'
import { AUTH_TOKEN_NAME } from '@/constants/auth.constants'
export type ApiResult<D = unknown> = {
  data: D
}

export type ApiPaginationMetaResult = {
  total: number
  per_page: number
  current_page: number
  last_page: number
  first_page: number
  first_page_url: string
  last_page_url: string
  next_page_url: string | null
  previous_page_url: string | null
}

export type ApiPaginationResult<D = unknown> = {
  meta: ApiPaginationMetaResult
  data: Array<D>
}

export type ApiDefaultFilters = {
  page?: number
  perPage?: number
  sortType?: string
  sortColumn?: string
}

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
})

api.interceptors.request.use(async (config) => {
  try {
    if (!config.headers?.Authorization) {
      const token = await asyncStorage.getItem(AUTH_TOKEN_NAME)
      if (config.headers !== undefined && token && token != null) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  } catch (error) {
    return config
  }
})

export default api
