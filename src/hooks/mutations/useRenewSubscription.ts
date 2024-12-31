import { useState, useContext } from 'react'
import api from '@/services/api'
import { AppContext } from '@/contexts/app.context'

interface RenewSubscription {
  cpf: string
}

export function useRenewSubscription() {
  const { setLoading } = useContext(AppContext)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const renewSubscription = async (data: RenewSubscription) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await api.post('/renewsubscription', data)
      setSuccess(true)
      return response.data.data
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Erro desconhecido ao enviar a inscrição'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    renewSubscription,
    error,
    success,
  }
}
