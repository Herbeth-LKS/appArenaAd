import { useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

type ChannelInfo = {
  name: string
  id: number
}

type UseMatchChannelsResult = {
  channels: ChannelInfo[]
  loading: boolean
  error: string | null
}

const CACHE_EXPIRATION_TIME = 20 * 60 * 1000

export const useMatchChannels = (eventId: number): UseMatchChannelsResult => {
  const [channels, setChannels] = useState<ChannelInfo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setLoading(true)
        setError(null)

        const cachedData = await AsyncStorage.getItem(`channels-${eventId}`)
        const cachedTimestamp = await AsyncStorage.getItem(
          `channels-${eventId}-timestamp`,
        )

        if (cachedData && cachedTimestamp) {
          const currentTime = new Date().getTime()
          const cacheAge = currentTime - parseInt(cachedTimestamp)

          if (cacheAge < CACHE_EXPIRATION_TIME) {
            setChannels(JSON.parse(cachedData))
            setLoading(false)
            return
          }
        }

        const countryChannelsUrl = `https://www.sofascore.com/api/v1/tv/event/${eventId}/country-channels`
        const { data } = await axios.get(countryChannelsUrl)

        const brChannelIds = data.countryChannels?.BR || []

        if (!brChannelIds.length) {
          setChannels([])
          setLoading(false)
          return
        }

        const channelsData: ChannelInfo[] = await Promise.all(
          brChannelIds.map(async (channelId: number) => {
            const votesUrl = `https://www.sofascore.com/api/v1/tv/channel/${channelId}/event/${eventId}/votes`

            const { data } = await axios.get(votesUrl)
            const { name, id } = data.tvChannelVotes.tvChannel
            return { name, id }
          }),
        )

        await AsyncStorage.setItem(
          `channels-${eventId}`,
          JSON.stringify(channelsData),
        )
        await AsyncStorage.setItem(
          `channels-${eventId}-timestamp`,
          new Date().getTime().toString(),
        )

        setChannels(channelsData)
      } catch (err: any) {
        setError(err.message || 'Erro ao buscar canais.')
      } finally {
        setLoading(false)
      }
    }

    fetchChannels()
  }, [eventId])

  return { channels, loading, error }
}
