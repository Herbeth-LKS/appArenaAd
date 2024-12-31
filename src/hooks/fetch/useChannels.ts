import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '@/contexts/app.context'
import cheerio from 'react-native-cheerio'

export default function useChannels() {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const { setLoading } = useContext(AppContext)

  useEffect(() => {
    const fetchGridItems = async () => {
      try {
        setLoading(true)
        const url = 'https://embedcanaistv.com/wp-json/wp/v2/pages/115'
        const response = await axios.get(url)
        const htmlContent = response.data.content.rendered

        const $ = cheerio.load(htmlContent)

        const gridItems: any = []
        $('.grid-item').each((index: any, element: any) => {
          const title = $(element).find('h3').text()
          const iframeValue = $(element).find('input').val()
          const imageSrc = $(element).find('img').attr('src')

          gridItems.push({ title, iframeValue, imageSrc })
        })

        setData(gridItems)
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
