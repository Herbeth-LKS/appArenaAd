import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

interface BannerProps {
  onLogOut?: () => void
  hideLogOut?: boolean
}

export default function Banner({ onLogOut, hideLogOut = false }: BannerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={[styles.bannerText, { color: '#FF5733' }]}>Arena</Text>
        <Text style={[styles.bannerText, { color: '#33C1FF' }]}>-X</Text>
        {!hideLogOut && (
          <TouchableOpacity style={styles.logoutIcon} onPress={onLogOut}>
            <MaterialIcons name="logout" size={28} color="#FF5733" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  logoutIcon: {
    marginLeft: 20,
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  bannerText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
})
