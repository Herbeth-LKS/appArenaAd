import { Text, StyleSheet } from 'react-native'
import Input, { InputProps } from './Input'
import View from '../View'
import colors from '@/constants/colors.constants'

export type InputFieldProps = {
  labelTop?: string
  required?: boolean
  error?: boolean
} & InputProps

export default function InputField({
  required = false,
  ...props
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{props.labelTop}</Text>
        {required && <Text style={styles.required}>{' *'}</Text>}
      </View>
      <Input
        {...props}
        placeholderTextColor={props.error ? colors.error : ''}
        style={[props.style, props.error ? styles.error : undefined]}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    borderColor: colors.error,
    borderWidth: 1,
    color: colors.error,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontWeight: 700,
    fontSize: 16,
  },
  required: {
    color: '#FF0000',
  },
})
