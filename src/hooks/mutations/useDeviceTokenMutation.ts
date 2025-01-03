import { useMutation } from 'react-query'
import api from '@/services/api'

type DeviceTokenPayload = {
  token: string
  device_type: string
}

const postDeviceToken = async (payload: DeviceTokenPayload): Promise<void> => {
  console.log('Token enviado')
  const response = await api.post('/devicetoken', payload)
  return response.data
}

export const useDeviceTokenMutation = () => {
  return useMutation((payload: DeviceTokenPayload) => postDeviceToken(payload))
}
