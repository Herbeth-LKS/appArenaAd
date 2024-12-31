import Toast, { ToastProps } from 'react-native-toast-message'
import View from '../View'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'

type CustomSuccessToastProps = ToastProps & {
  text1?: string
  text2?: string
}

export const CustomSuccessToast = ({
  text1,
  text2,
}: CustomSuccessToastProps) => (
  <View style={styles.container}>
    <View style={styles.errorLogin}>
      <View style={styles.flexContainer}>
        <FontAwesome6 name="circle-check" size={30} color="#00FF19" />
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
    margin: 10,
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
    marginLeft: 10,
    marginTop: 2,
  },
  container: {
    elevation: 2,
    margin: 10,
    maxWidth: '95%',
    width: 'auto',
    padding: 10,
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
    padding: 10,
    marginLeft: 10,
    flexShrink: 1,
    fontWeight: 'bold',
  },
  text2: {
    padding: 10,
  },
})
