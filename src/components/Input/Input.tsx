/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput as NativeTextInput,
  TextInputFocusEventData,
} from 'react-native'
import React, { ForwardRefRenderFunction, useState } from 'react'
import { TextInput, TextInputProps } from 'react-native-paper'
import View from '../View'

export type InputProps = Omit<TextInputProps, 'theme'>

const Input: ForwardRefRenderFunction<NativeTextInput, InputProps> = (
  { ...props }: InputProps,
  ref?: React.Ref<NativeTextInput>,
) => {
  const [_, setIsFocused] = useState<boolean>(false)

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    props.onBlur && props.onBlur(e)
    setIsFocused(false)
  }

  return (
    <View style={[props.style, styles.inputBorder]}>
      <TextInput
        {...props}
        style={styles.input}
        underlineColor="#fff"
        blurOnSubmit={false}
        onBlur={onBlur}
        ref={ref}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
  },
  inputBorder: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
})

export default React.forwardRef(Input)
