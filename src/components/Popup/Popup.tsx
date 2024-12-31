// Popup.tsx
import React from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import colors from '@/constants/colors.constants'

export type PopupButtonProps = {
  title: string
  onPress: (event: GestureResponderEvent) => void
  type?: 'primary' | 'error' | 'white' | 'outline' | 'error-foreground'
  children?: React.ReactNode
}

export type PopupProps = {
  visible: boolean
  title: string
  message: string
  onClose: () => void
  buttons?: PopupButtonProps[]
  children?: React.ReactNode
}

export type PopupFeedbackMessage = {
  title: string
  message: string
  buttons: PopupButtonProps[]
}

const Popup = ({
  visible,
  title,
  message,
  onClose,
  buttons,
  children,
}: PopupProps) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonsContainer}>
            {children}
            {buttons?.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button.type === 'primary' && styles.primaryButton,
                  button.type === 'error' && styles.errorButton,
                  button.type === 'white' && styles.whiteButton,
                  button.type === 'outline' && styles.outlineButton,
                  button.type === 'error-foreground' &&
                    styles.errorForegroundButton,
                ]}
                onPress={button.onPress}
              >
                {button.children}
                <Text
                  style={[
                    styles.buttonText,
                    button.type === 'white' && styles.whiteButtonText,
                    button.type === 'outline' && styles.primaryButtonText,
                    button.type === 'error-foreground' &&
                      styles.errorForegroundButtonText,
                  ]}
                >
                  {button.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  popupContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 40,
    padding: 30,
    marginTop: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: '100%',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    marginVertical: 20,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 40,
  },
  button: {
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#007bff',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
    color: colors.primary,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  primaryButtonText: {
    color: colors.primary,
  },
  errorButton: {
    backgroundColor: '#ff4d4d',
  },
  errorForegroundButton: {
    backgroundColor: 'transparent',
    color: '#ff4d4d',
  },
  errorForegroundButtonText: {
    color: '#ff4d4d',
  },
  whiteButton: {
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  whiteButtonText: {
    color: 'black',
  },
})

export default Popup
