import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface ChannelCardProps {
  title: string
  imageSrc?: string
  onPress: () => void
}

const ChannelCard: React.FC<ChannelCardProps> = ({
  title,
  imageSrc,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradient}
      >
        {imageSrc ? (
          <Image
            alt="image"
            style={styles.cardImage}
            source={{ uri: imageSrc }}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.errorText}>No preview available</Text>
          </View>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 200,
    marginBottom: 15,
    marginHorizontal: 8,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 8,
  },
  gradient: {
    flex: 1,
  },
  cardImage: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  noImageContainer: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  titleContainer: {
    height: '20%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#555',
  },
})

export default ChannelCard
