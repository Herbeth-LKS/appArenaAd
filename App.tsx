import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from '@/contexts/auth.context'
import PersistedStateProvider from '@/contexts/persistedState.context'
import AppNavigator from '@/navigation'
import { AppProvider } from '@/contexts/app.context'
import Toast from 'react-native-toast-message'
import { toastConfig } from '@/utils/toast.utils'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function App() {
  const queryClient = new QueryClient()
  return (
    <NavigationContainer>
      <PersistedStateProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <AppProvider>
              <AppNavigator />
              <Toast config={toastConfig} />
              <StatusBar style="dark" />
            </AppProvider>
          </QueryClientProvider>
        </AuthProvider>
      </PersistedStateProvider>
    </NavigationContainer>
  )
}
