import i18n from '@/i18n'
import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import Toast, { ToastProps } from 'react-native-toast-message'

type CustomErrorToastProps = ToastProps & {
  text1?: string
}

const CustomErrorToast = ({ text1 }: CustomErrorToastProps) => (
  <View style={styles.errorLogin}>
    <Text style={styles.text1}>{text1}</Text>
    <TouchableOpacity onPress={() => Toast.hide()}>
      <Text style={styles.textClose}>{i18n.close}</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  errorLogin: {
    backgroundColor: '#bc1217',
    borderLeftColor: '#bc1217',
    color: 'white',
    padding: 10,
    width: '80%',
    height: 60,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  textClose: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  text1: {
    color: 'white',
    flexWrap: 'wrap',
    flexShrink: 1,
    fontWeight: 'bold',
  },
})

export default CustomErrorToast
