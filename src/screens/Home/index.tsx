import React, { useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'

import { MainStackParamList } from '@/navigation/MainNavigator'

import useChannelsFromApi from '@/hooks/fetch/useChannelsFromApi'
import useMatches from '@/hooks/fetch/useMatches'
import ChannelCard from './components/ChannelCard'
import Banner from '@/components/Banner'
import MatchesOfDay from './components/MatchesOfDay'

export default function HomeScreen() {
  const { data: channelData, error: channelError } = useChannelsFromApi()
  const { data: matchData, error: matchError, refetch } = useMatches()
  const navigation = useNavigation<NavigationProp<MainStackParamList>>()

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch() // Refetch the data
    }, 120000) // 3 minutes in milliseconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId)
  }, [refetch])

  type Channel = {
    category: string
    title: string
    imageSrc: string
    iframeValue: string
  }
  type GroupedChannels = Record<string, Channel[]>

  const groupedChannels: GroupedChannels = channelData.reduce(
    (acc: any, item: any) => {
      acc[item.category] = acc[item.category] || []
      acc[item.category].push(item)
      return acc
    },
    {},
  )

  const categoryOrder = [
    'Esportes',
    'Filmes e Series',
    'Adulto',
    'Noticias',
    'Infantil',
    'PLUTO TV',
    'Canais Abertos',
  ]

  const orderedCategories = categoryOrder.filter(
    (category) => groupedChannels[category],
  )

  if (channelError || matchError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Error: {channelError || matchError}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Banner hideLogOut />

      <ScrollView style={styles.scrollContainer}>
        <MatchesOfDay matches={matchData} />

        {orderedCategories.map((categoryName) => (
          <View key={categoryName} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{categoryName}</Text>
            <View style={styles.divider} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {groupedChannels[categoryName].map((item: any, index: any) => (
                <ChannelCard
                  key={index}
                  title={item.title}
                  imageSrc={item.imageSrc}
                  onPress={() =>
                    navigation.navigate('Watch', {
                      iframeSrc: item.iframeValue,
                      title: item.title,
                    })
                  }
                />
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
  },
  categoryContainer: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#444',
  },
  divider: {
    height: 2,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
})
