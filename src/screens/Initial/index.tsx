import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import useChannelsFromApi from '@/hooks/fetch/useChannelsFromApi'

const InitialScreen = ({ navigation }: { navigation: any }) => {
  const { data, error } = useChannelsFromApi()

  const sportsChannels = data.filter(
    (channel: any) => channel.category === 'Esportes',
  )

  const handleSubscribe = () => {
    navigation.navigate('Home')
  }

  const handleLogin = () => {
    navigation.navigate('Home')
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Erro ao carregar os canais: {error}
        </Text>
      </View>
    )
  }

  return (
    <LinearGradient
      colors={['#0f2027', '#203a43', '#2c5364']}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        activeOpacity={0.8}
      >
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>
        Aproveite o melhor do esporte sem pagar nada
        <Text style={styles.highlight}></Text>.
      </Text>

      <FlatList
        data={sportsChannels}
        keyExtractor={(item: any, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.channelList}
        renderItem={({ item }) => (
          <View style={styles.channelCard}>
            <Image
              alt="image"
              source={{ uri: item.imageSrc }}
              style={styles.channelImage}
            />
            <Text style={styles.channelTitle}>{item.title}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.subscribeButton}
        onPress={handleSubscribe}
        activeOpacity={0.8}
      >
        <Text style={styles.subscribeButtonText}>Assista Gratis</Text>
      </TouchableOpacity>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#d1e0e0',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#FFD700',
    fontSize: 24,
  },
  channelList: {
    paddingBottom: 20,
  },
  channelCard: {
    backgroundColor: '#ffffff15',
    borderRadius: 10,
    margin: 10,
    flex: 1,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  channelImage: {
    width: 140,
    height: 140,
    borderRadius: 10,
    marginBottom: 10,
  },
  channelTitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  subscribeButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
    elevation: 5,
    alignSelf: 'center',
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c5364',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
})

export default InitialScreen
