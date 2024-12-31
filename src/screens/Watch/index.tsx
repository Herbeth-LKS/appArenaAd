import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import WebView from 'react-native-webview'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'

export default function WatchScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  const { iframeSrc, title } = route.params as {
    iframeSrc: string
    title: string
  }

  const handleShouldStartLoad = (request: any) => {
    if (request.url === iframeSrc) {
      return true
    }
    return false
  }

  const handleFavorite = () => {
    Alert.alert('Favorito', 'Vídeo adicionado aos favoritos!')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleFavorite} style={styles.iconButton}>
            <AntDesign name="heart" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.videoPlayer}>
        {iframeSrc ? (
          <WebView
            source={{ uri: iframeSrc }}
            allowsFullscreenVideo
            javaScriptEnabled
            domStorageEnabled
            allowsInlineMediaPlayback
            startInLoadingState
            onShouldStartLoadWithRequest={handleShouldStartLoad}
          />
        ) : (
          <Text style={styles.errorText}>Invalid iframe source</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1c1c1c',
  },
  backButton: {
    padding: 5,
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  videoPlayer: {
    flex: 1,
    backgroundColor: 'black',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
})
