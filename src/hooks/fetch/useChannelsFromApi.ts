import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '@/contexts/app.context'

export default function useChannelsFromApi() {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const { setLoading } = useContext(AppContext)

  useEffect(() => {
    const fetchGridItems = async () => {
      try {
        setLoading(true)
        const url = 'https://embehub.com/apitvonline.json'
        const response = await axios.get(url)

        const formattedData = response.data.map((item: any) => ({
          title: item.nome,
          imageSrc: item.capa,
          iframeValue: item.embed,
          category: item.categoria,
        }))

        setData(formattedData)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGridItems()
  }, [])

  return { data, error }
}
