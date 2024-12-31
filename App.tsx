import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from '@/contexts/auth.context'
import PersistedStateProvider from '@/contexts/persistedState.context'
import AppNavigator from '@/navigation'
import { AppProvider } from '@/contexts/app.context'
import Toast from 'react-native-toast-message'
import { toastConfig } from '@/utils/toast.utils'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <NavigationContainer>
      <PersistedStateProvider>
        <AuthProvider>
          <AppProvider>
            <AppNavigator />
            <Toast config={toastConfig} />
            <StatusBar style="dark" />
          </AppProvider>
        </AuthProvider>
      </PersistedStateProvider>
    </NavigationContainer>
  )
}
