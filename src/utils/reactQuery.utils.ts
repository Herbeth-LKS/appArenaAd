import { AxiosRequestConfig } from 'axios'
import api from '@/services/api'

type DefaultApiQueryFnParams<R> = {
  url: string
  query?: string
  config?: AxiosRequestConfig<R>
}

export const defaultApiQueryFn = async <R>({
  url,
  query,
  config = {},
}: DefaultApiQueryFnParams<R>): Promise<R> => {
  const { responseType } = config
  const { data } = await api.get(`${url}${query ? `/${query}` : ''}`, config)
  return responseType === 'blob' ? new Blob(data) : data
}
