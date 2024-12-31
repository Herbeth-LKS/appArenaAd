import { useEffect, useState, useContext, useCallback } from 'react'
import axios from 'axios'
import { AppContext } from '@/contexts/app.context'

type Team = {
  id: number
  name: string
  nameCode: string
  image: string
}

type Event = {
  id: number
  start_time: string
  status: {
    code: number
    type: string
    description?: string
  }
  time: {
    initial: number
    max: number
    extra: number
    currentPeriodStartTimestamp: number
  }
  statusTime: {
    prefix: string
    initial: number
    max: number
    timestamp: number
    extra: number
  }
  homeTeam: Team
  awayTeam: Team
  homeScore: {
    current: number
  }
  awayScore: {
    current: number
  }
}

export type OrganizedEvent = {
  event: Event
}

export default function useMatches() {
  const [data, setData] = useState<OrganizedEvent[]>([])
  const [error, setError] = useState<string | null>(null)
  const { setLoading } = useContext(AppContext)
  const [shouldRefetch, setShouldRefetch] = useState(false) // Estado de controle de refetch

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const fetchMatches = useCallback(async () => {
    const today = new Date().toISOString().split('T')[0]
    const url = `https://www.sofascore.com/api/v1/sport/football/scheduled-events/${today}`

    setLoading(true)

    try {
      const response = await axios.get(url)
      const events = response.data.events

      const organizedData = await Promise.all(
        events
          // .filter((event: any) => event.status.type !== 'finished')
          .filter(
            (event: any) =>
              (event.tournament.name === 'Premier League' &&
                event.tournament.category.country.name === 'England') ||
              (event.tournament.name === 'Serie A' &&
                event.tournament.category.country.name === 'Italy') ||
              (event.tournament.name === 'LaLiga' &&
                event.tournament.category.country.name === 'Spain') ||
              (event.tournament.name === 'Bundesliga' &&
                event.tournament.category.country.name === 'Germany'),
          )
          .slice(0, 25)
          .map(async (event: any): Promise<OrganizedEvent> => {
            return {
              event: {
                id: event.id,
                start_time: formatTime(event.startTimestamp),
                status: event.status,
                time: event.time,
                statusTime: event.statusTime,
                homeTeam: {
                  id: event.homeTeam.id,
                  name: event.homeTeam.name,
                  nameCode: event.homeTeam.nameCode,
                  image: `https://img.sofascore.com/api/v1/team/${event.homeTeam.id}/image/small`,
                },

                awayTeam: {
                  id: event.awayTeam.id,
                  name: event.awayTeam.name,
                  nameCode: event.awayTeam.nameCode,
                  image: `https://img.sofascore.com/api/v1/team/${event.awayTeam.id}/image/small`,
                },
                homeScore: event.homeScore,
                awayScore: event.awayScore,
              },
            }
          }),
      )

      setData(organizedData)
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar os dados.')
    } finally {
      setLoading(false)
    }
  }, [setLoading])

  useEffect(() => {
    fetchMatches()
  }, [fetchMatches, setLoading, shouldRefetch])

  const refetch = () => {
    setShouldRefetch((prev) => !prev)
  }

  return { data, error, refetch }
}
