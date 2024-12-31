import { StyleProp, Image, ImageStyle, StyleSheet } from 'react-native'
import View from './View'

type LoadingType = {
  width?: number
  height?: number
  style?: StyleProp<ImageStyle>
}

export default function Loading({
  width = 200,
  height = 200,
  style,
}: LoadingType) {
  return (
    <View style={styles.loadingContainer}>
      <Image
        resizeMode="contain"
        resizeMethod="resize"
        style={[{ width, height }, style]}
        source={require('~/assets/images/loading-spinner.gif')}
        alt="gif-loading"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
