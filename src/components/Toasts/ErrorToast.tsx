import Toast, { ToastProps } from 'react-native-toast-message'
import View from '../View'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'

type ErrorToastProps = ToastProps & {
  text1?: string
  text2?: string
}

export const ErrorToast = ({ text1, text2 }: ErrorToastProps) => (
  <View style={styles.container}>
    <View style={styles.errorLogin}>
      <View style={styles.flexContainer}>
        <FontAwesome6 name="circle-xmark" size={30} color="#FF0000" />
        <Text style={styles.text1}>{text1}</Text>
      </View>
      <TouchableOpacity onPress={() => Toast.hide()} style={styles.button}>
        <FontAwesome5 name="times" size={24} />
      </TouchableOpacity>
    </View>
    {text2 && <Text style={styles.text2}>{text2}</Text>}
  </View>
)

const styles = StyleSheet.create({
  errorLogin: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginLeft: 5,
    marginTop: 2,
  },
  container: {
    elevation: 2,
    maxWidth: '95%',
    width: 'auto',
    padding: 10,
    justifyContent: 'center',
    minWidth: '80%',
    borderRadius: 10,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    color: 'black',
    flexWrap: 'wrap',
    fontSize: 20,
    marginLeft: 10,
    padding: 10,
    flexShrink: 1,
    fontWeight: 'bold',
  },
  text2: {
    padding: 10,
  },
})
