import { View as DefaultView } from 'react-native'
import { useTheme } from 'react-native-paper'

export type ViewProps = DefaultView['props']

export default function View({ style, ...props }: ViewProps) {
  const {
    colors: { background },
  } = useTheme()
  return (
    <DefaultView style={[{ backgroundColor: background }, style]} {...props} />
  )
}
