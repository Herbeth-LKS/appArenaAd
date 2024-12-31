/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native'
import { OrganizedEvent } from '@/hooks/fetch/useMatches'
import { useMatchChannels } from '@/hooks/fetch/useMatchChannels'

type MatchesOfDayProps = {
  matches: OrganizedEvent[]
}

const MatchesOfDay: React.FC<MatchesOfDayProps> = ({ matches }) => {
  const BlinkingDot = () => {
    const opacity = new Animated.Value(1)

    useEffect(() => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      )
      animation.start()

      return () => animation.stop()
    }, [])

    return <Animated.View style={[styles.blinkingDot, { opacity }]} />
  }

  if (!matches || matches.length === 0) {
    return (
      <View style={styles.matchesContainer}>
        <Text style={styles.matchesTitle}>Partidas do Dia</Text>
        <Text style={styles.noMatches}>Sem Partidas Hoje</Text>
      </View>
    )
  }

  return (
    <View style={styles.matchesContainer}>
      <Text style={styles.matchesTitle}>Partidas do Dia</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {matches.map((match, index) => {
          const { channels, loading, error } = useMatchChannels(match.event.id)
          const [timeElapsed, setTimeElapsed] = useState(0)
          const isMatchInProgress = match.event.status.type === 'inprogress'

          useEffect(() => {
            if (isMatchInProgress) {
              const interval = setInterval(() => {
                const currentTime =
                  Math.floor(Date.now() / 1000) -
                  match.event.time.currentPeriodStartTimestamp

                const adjustedTime =
                  match.event.status.description === '2nd half'
                    ? currentTime + 2700
                    : currentTime

                setTimeElapsed(adjustedTime)
              }, 1000)

              return () => clearInterval(interval)
            }
          }, [
            isMatchInProgress,
            match.event.time.currentPeriodStartTimestamp,
            match.event.status.description,
          ])

          const formattedTime = `${Math.floor(timeElapsed / 60)
            .toString()
            .padStart(2, '0')}:${(timeElapsed % 60)
            .toString()
            .padStart(2, '0')}`

          let displayTime
          if (match.event.status.description === 'Halftime') {
            displayTime = 'INT'
          } else if (
            match.event.status.description === '2nd half' &&
            isMatchInProgress
          ) {
            displayTime = formattedTime
          } else if (match.event.status.type === 'finished') {
            displayTime = 'FINALIZADO'
          } else if (match.event.status.description === '1st half') {
            displayTime = formattedTime
          } else {
            displayTime = match.event.start_time
          }

          return (
            <TouchableOpacity key={index} style={styles.matchCard}>
              {isMatchInProgress ? (
                <View style={styles.liveIndicator}>
                  <BlinkingDot />
                  <Text style={styles.liveText}>AO VIVO</Text>
                  <Text style={styles.liveTime}>{displayTime}</Text>
                </View>
              ) : (
                <Text style={styles.matchTime}>{displayTime}</Text>
              )}

              <View style={styles.teams}>
                <View style={styles.team}>
                  <Text>{match.event.homeTeam.nameCode}</Text>
                  <Image
                    alt="home team"
                    source={{ uri: match.event.homeTeam.image }}
                    style={styles.teamImage}
                  />
                  <Text style={styles.teamScore}>
                    {isMatchInProgress || match.event.status.type === 'finished'
                      ? match.event.homeScore.current
                      : ''}
                  </Text>
                </View>
                <Text style={styles.vsText}>vs</Text>
                <View style={styles.team}>
                  <Text>{match.event.awayTeam.nameCode}</Text>
                  <Image
                    alt="away team"
                    source={{ uri: match.event.awayTeam.image }}
                    style={styles.teamImage}
                  />
                  <Text style={styles.teamScore}>
                    {isMatchInProgress || match.event.status.type === 'finished'
                      ? match.event.awayScore.current
                      : ''}
                  </Text>
                </View>
              </View>

              <View style={styles.channelInfo}>
                {loading ? (
                  <Text>Carregando canais...</Text>
                ) : error ? (
                  <Text>Erro ao carregar canais</Text>
                ) : (
                  <View>
                    <Text style={styles.channelsTitle}>Assista Em:</Text>
                    {channels.length > 0 ? (
                      channels.map((channel) => (
                        <Text style={styles.channelsText} key={channel.id}>
                          {channel.name}
                        </Text>
                      ))
                    ) : (
                      <Text>Nenhum canal encontrado para esta partida.</Text>
                    )}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  teamScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 5,
  },
  matchesContainer: {
    marginBottom: 30,
  },
  matchesTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  matchCard: {
    marginRight: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    width: 200,
  },
  matchTime: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  teams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  team: {
    alignItems: 'center',
  },
  teamImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 5,
  },
  vsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#777',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  blinkingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 5,
  },
  liveText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 5,
  },
  liveTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
  },
  channelInfo: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  channelsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  channelsText: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noMatches: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})

export default MatchesOfDay
