import { Text, StyleSheet } from 'react-native'
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text'
import View from '../View'
import colors from '@/constants/colors.constants'

export type MaskedInputFieldProps = {
  labelTop?: string
  required?: boolean
  error?: boolean
} & TextInputMaskProps

export default function MaskedInputField({
  labelTop,
  required = false,
  error = false,
  ...props
}: MaskedInputFieldProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{labelTop}</Text>
        {required && <Text style={styles.required}>{' *'}</Text>}
      </View>
      <TextInputMask
        {...props}
        placeholderTextColor={error ? colors.error : ''}
        style={[props.style, error ? styles.error : undefined]}
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
    fontWeight: '700',
    fontSize: 16,
  },
  required: {
    color: '#FF0000',
  },
})
