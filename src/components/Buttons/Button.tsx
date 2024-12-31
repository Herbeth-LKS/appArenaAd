import React from 'react'
import {
  Button as PaperButton,
  ButtonProps as PaperButtonProps,
} from 'react-native-paper'
import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import colors from '@/constants/colors.constants'

export type ButtonType = 'primary' | 'secondary' | 'bordered'

export type TextType = 'primary' | 'secondary'

export type ButtomProps = {
  type?: ButtonType
  fontSize?: number
  icon?: string | React.ReactNode
  visible?: boolean
  color?: string // Nova prop para definir a cor
} & PaperButtonProps

export default function Button({
  type = 'primary',
  fontSize = 18,
  onPress,
  icon,
  visible = true,
  color, // Nova prop
  ...props
}: ButtomProps) {
  function onClick(e: GestureResponderEvent) {
    onPress?.(e)
  }

  if (!visible) {
    return null
  }

  return (
    <PaperButton
      {...props}
      onPress={onClick}
      style={[
        styles.button,
        styles[type],
        color && { backgroundColor: color },
        props.style,
        props.disabled && styles.disabled,
      ]}
    >
      {icon &&
        (typeof icon === 'string' ? (
          <FontAwesome5
            style={[styles[type], props.disabled && styles.disabled]}
            name={icon}
            size={24}
          />
        ) : (
          icon
        ))}
      {icon && <View style={{ width: 8 }} />}
      <Text
        style={[
          styles.textButton,
          styles[type],
          { fontSize },
          props.disabled && styles.disabled,
          styles.textButton,
        ]}
      >
        {props.children}
      </Text>
    </PaperButton>
  )
}

const styles = StyleSheet.create({
  textButton: {
    flex: 1,
    height: '100%',
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 50,
  },
  bordered: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: 'white',
  },
  primary: {
    color: colors.white,
    borderWidth: 1,
    backgroundColor: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondary: {
    backgroundColor: '#03a9f4',
    color: 'white',
  },
  disabled: {
    backgroundColor: '#D6D6D6',
    color: '#898989',
  },
})
