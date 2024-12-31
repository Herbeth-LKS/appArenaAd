import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '@/contexts/app.context'

type BroadcastItem = {
  TVI?: number // Identificador opcional da transmissão
  BU: string // URL da transmissão
  BN: string // Nome da transmissão
  BAF?: boolean // Indica se a transmissão está ativa
  IU?: string // URL da imagem (opcional)
  BI?: number // Identificador do bookmaker (opcional)
}

type BroadcastInfo = Record<string, BroadcastItem[]>

type Match = {
  home_team: string
  home_team_full: string
  away_team: string
  away_team_full: string
  image?: string
  home_team_image?: string
  away_team_image?: string
  match_date: any
  broadcast_info: BroadcastInfo
}

type League = {
  league_name: string
  country: string
  matches: Match[]
}

export default function useMatchAndChannelsFromFlashScore() {
  const [data, setData] = useState<League[]>([])
  const [error, setError] = useState<string | null>(null)
  const { setLoading } = useContext(AppContext)

  useEffect(() => {
    const processRawData = (rawData: any): League[] => {
      const fieldMapping: Record<string, keyof Match> = {
        CX: 'home_team',
        OA: 'image',
        AE: 'home_team_full',
        AF: 'away_team',
        OB: 'image',
        FK: 'away_team_full',
        AD: 'match_date',
        AL: 'broadcast_info',
      }

      const processData = (data: any) => {
        const blocks = data.split('¬~')
        return blocks.map((block: string) => {
          const fields = block.split('¬')
          const blockData: Record<string, string> = {}
          fields.forEach((field: string) => {
            const [key, value] = field.split('÷')
            if (key && value) {
              blockData[key] = value
            }
          })
          return blockData
        })
      }

      const structuredData = processData(rawData)
      const organizedData: League[] = []
      let currentLeague: League | null = null

      structuredData.forEach((item: Record<string, string>) => {
        if (item.ZA) {
          // Criação de uma nova liga
          const leagueName = item.ZA
          if (
            leagueName === 'INGLATERRA: Premier League' ||
            leagueName === 'ITÁLIA: Serie A' ||
            leagueName === 'ALEMANHA: Bundesliga'
          ) {
            currentLeague = {
              league_name: leagueName,
              country: item.ZY,
              matches: [],
            }
            organizedData.push(currentLeague)
          } else {
            currentLeague = null
          }
        } else if (item.CX && currentLeague) {
          // Adicionando uma partida à liga atual
          const match: Match = Object.keys(item).reduce((acc, key) => {
            const mappedKey = fieldMapping[key] || (key as keyof Match)
            acc[mappedKey] =
              key === 'AL' ? JSON.parse(item[key] || '{}') : item[key]

            // Lógica extra para definir imagens específicas dos times, se necessário
            if (key === 'OA') {
              acc.home_team_image = item[key] // A imagem do time da casa
            }
            if (key === 'OB') {
              acc.away_team_image = item[key] // A imagem do time visitante
            }

            return acc
          }, {} as Match)

          currentLeague.matches.push(match)
        }
      })

      return organizedData
    }

    const fetchMatches = async () => {
      setLoading(true)

      try {
        const response = await axios.get(
          'https://global.flashscore.ninja/401/x/feed/f_1_4_-3_pt-br_1',
          {
            headers: {
              'x-fsign': 'SW9D1eZo',
            },
          },
        )

        const rawData = response.data
        const organizedData = processRawData(rawData)
        setData(organizedData)
      } catch (err: any) {
        setError(err.message || 'Erro ao buscar os dados.')
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [setLoading])

  return { data, error }
}
