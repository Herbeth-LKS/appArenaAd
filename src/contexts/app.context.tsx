/* eslint-disable jsx-a11y/alt-text */
// AppContext.tsx
import Popup, { PopupFeedbackMessage } from '@/components/Popup/Popup'

import React, { createContext, useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Keyboard,
  Platform,
  NativeEventEmitter,
} from 'react-native'
import { notificationsService } from '@/services/notificationsService'
import messaging, { firebase } from '@react-native-firebase/messaging'
import { useDeviceTokenMutation } from '@/hooks/mutations/useDeviceTokenMutation'
import UnityAdsModule from 'react-native-unity-ads-moon'

type AsyncBooleanFunction = () => Promise<boolean>

type AppContextType = {
  loading: boolean
  setLoading: (loading: boolean) => void
  menuVisible: boolean
  setMenuVisible: (visible: boolean) => void
  onMenuBottomNavigation: AsyncBooleanFunction
  setOnMenuBottomNavigation: (
    onMenuBottomNavigation: AsyncBooleanFunction | undefined,
  ) => void
  popup: PopupFeedbackMessage | null
  showPopup: (popup: PopupFeedbackMessage) => void
  hidePopup: () => void
  isKeyboardVisible: boolean
}

type AppProviderProps = {
  children: React.ReactNode
}

export const AppContext = createContext({} as AppContextType)

export function AppProvider({ children }: AppProviderProps) {
  const mutation = useDeviceTokenMutation()
  const [loading, setLoading] = useState<boolean>(false)
  const [menuVisible, setMenuVisible] = useState<boolean>(true)
  const [popup, setPopup] = useState<PopupFeedbackMessage | null>(null)

  const [onMenuBottomNavigation, setOnMenuBottomNavigation] = useState<any>()
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false)

  const RNfirebaseConfig = {
    apiKey: 'AIzaSyCWzveiPToCfK9TR6_r8CynKacV_u-ce-E',
    authDomain: 'arenax-85e16.firebaseapp.com',
    projectId: 'arenax-85e16',
    storageBucket: 'arenax-85e16.firebasestorage.app',
    messagingSenderId: '1069792140349',
    appId: '1:1069792140349:android:6dd22f87465d81c3a79e54',
    databaseURL: 'localhost',
  }

  useEffect(() => {
    const initialize = async () => {
      const unityRewardedAd = await UnityAdsModule.initializeAd(
        '5767247',
        false,
      )
      console.log('INITIALIZE UNITY ADS -> ' + unityRewardedAd)
    }

    initialize()
    UnityAdsModule.loadAd('Interstitial_Android')
  }, [])

  useEffect(() => {
    const loadEventEmitter = new NativeEventEmitter()
    const showEventEmitter = new NativeEventEmitter()

    const setupEventListeners = async () => {
      const loadEventListener = loadEventEmitter.addListener(
        'AD_LOADED',
        (event) => {
          console.log('Unity Ad loading complete')
          console.log(event.adStatus) // "someValue"
          UnityAdsModule.showAd('Interstitial_Android') // show unity ad
        },
      )

      const showEventListener = showEventEmitter.addListener(
        'AD_COMPLETED',
        (event) => {
          console.log('Unity Ad showing complete')
          console.log(event.adStatus) // "someValue"

          if (event.adStatus === 'fullComplete') {
            console.log('ad complete')
          }
        },
      )

      /* Unsubscribe from events on unmount */
      return () => {
        loadEventListener.remove()
        showEventListener.remove()
      }
    }

    // Chame a função assíncrona
    setupEventListeners()

    // Cleanup ao desmontar
    return () => {
      loadEventEmitter.removeAllListeners('AD_LOADED')
      showEventEmitter.removeAllListeners('AD_COMPLETED')
    }
  }, [])

  if (firebase.apps.length === 0) {
    firebase.initializeApp(RNfirebaseConfig)
  } else {
    firebase.app()
  }

  const { requestUserPermission } = notificationsService()

  const showPopup = (popup: PopupFeedbackMessage) => setPopup(popup)
  const hidePopup = () => setPopup(null)

  useEffect(() => {
    const fetchDeviceToken = async () => {
      await requestUserPermission()

      try {
        const token = await messaging().getToken()
        console.log('Firebase Device Token:', token)

        if (token) {
          mutation.mutate({
            token,
            device_type: Platform.OS, // Ou 'ios' dependendo da Platforma
          })
        }
      } catch (error) {
        console.error('Erro ao obter o device token:', error)
      }
    }

    fetchDeviceToken()

    // Listener para atualizações de token
    const unsubscribe = messaging().onTokenRefresh((token) => {
      console.log('Token atualizado:', token)

      mutation.mutate({
        token,
        device_type: Platform.OS,
      })
    })

    console.log('Firebase initialized', Platform.OS)

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true)
      },
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false)
      },
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        isKeyboardVisible,
        popup,
        loading,
        setLoading,
        menuVisible,
        setMenuVisible,
        showPopup,
        hidePopup,

        onMenuBottomNavigation,
        setOnMenuBottomNavigation,
      }}
    >
      {loading && <Loading />}
      {popup && (
        <Popup
          visible={true}
          title={popup.title}
          message={popup.message}
          onClose={hidePopup}
          buttons={popup.buttons}
        />
      )}
      {children}
    </AppContext.Provider>
  )
}

function Loading() {
  return (
    <View style={styles.container}>
      <Image
        height={10}
        width={10}
        style={styles.icon}
        source={require('../assets/images/loading-spinner.gif')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
