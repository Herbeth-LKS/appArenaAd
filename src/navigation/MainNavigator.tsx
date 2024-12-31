import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '@/screens/Home'
import WatchScreen from '@/screens/Watch'
import InitialScreen from '@/screens/Initial'

export type MainStackParamList = {
  initial: undefined
  Home: undefined
  Watch: { iframeSrc: string; title: string }
}

const Stack = createNativeStackNavigator<MainStackParamList>()

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="initial"
        component={InitialScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Watch"
        component={WatchScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
