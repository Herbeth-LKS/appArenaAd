import colors from '@/constants/colors.constants'
import { FontAwesome5 } from '@expo/vector-icons'
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

type SmallButtonProps = {
  icon: string
  onPress?: (event?: GestureResponderEvent) => void
  size?: number
  type?: 'primary' | 'secondary'
}

const SmallButton = ({
  icon,
  size,
  onPress,
  style,
  type = 'secondary',
}: SmallButtonProps & TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'primary' ? styles.primary : styles.secondary,
        style,
      ]}
      onPress={onPress}
    >
      <FontAwesome5
        name={icon}
        color={type === 'primary' ? 'white' : 'black'}
        size={size || 24}
      />
    </TouchableOpacity>
  )
}

export default SmallButton

const styles = StyleSheet.create({
  secondary: {
    borderColor: colors.gray200,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 'auto',
    padding: 15,
    marginRight: 10,
    borderRadius: 5,
  },
})
