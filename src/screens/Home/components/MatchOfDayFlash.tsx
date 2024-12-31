/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import useMatchAndChannelsFromFlashScore from '@/hooks/fetchChannelsFromFlashScore/useMatchAndChannelsFromFlashScore'

const MatchesOfDayFlash: React.FC = () => {
  const { data, error } = useMatchAndChannelsFromFlashScore()

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro: {error}</Text>
      </View>
    )
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando partidas...</Text>
      </View>
    )
  }

  return (
    <View style={styles.matchesContainer}>
      <Text style={styles.matchesTitle}>Partidas do Dia</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.flatMap((league) =>
          league.matches.map((match, index) => (
            <TouchableOpacity
              key={index}
              style={styles.matchCard}
              onPress={() => {}}
            >
              <Text style={styles.matchTime}>
                {new Date(match.match_date * 1000).toLocaleString()}
              </Text>
              <View style={styles.teams}>
                <View style={styles.team}>
                  <Text>{match.home_team}</Text>
                  {match.home_team_image && (
                    <Image
                      alt="home team"
                      source={{
                        uri: `https://static.flashscore.com/res/image/data/${match.home_team_image}`,
                      }}
                      style={styles.teamImage}
                    />
                  )}
                </View>
                <Text style={styles.vsText}>vs</Text>
                <View style={styles.team}>
                  <Text>{match.away_team}</Text>
                  {match.away_team_image && (
                    <Image
                      alt="away team"
                      source={{
                        uri: `https://static.flashscore.com/res/image/data/${match.away_team_image}`,
                      }}
                      style={styles.teamImage}
                    />
                  )}
                </View>
              </View>

              {Object.values(match.broadcast_info).map((broadcast, idx) =>
                broadcast.map((channel, index) => (
                  <View key={index} style={styles.broadcastContainer}>
                    <Text style={styles.broadcastTitle}>
                      Canal: {channel.BN}
                    </Text>
                    <Text style={styles.broadcastURL}>Link: {channel.BU}</Text>
                  </View>
                )),
              )}
            </TouchableOpacity>
          )),
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
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
  },
  matchTime: {
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  broadcastContainer: {
    marginTop: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  broadcastTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  broadcastURL: {
    fontSize: 12,
    color: '#888',
  },
  broadcastImage: {
    width: 40,
    height: 40,
    marginTop: 5,
    borderRadius: 8,
  },
})

export default MatchesOfDayFlash
