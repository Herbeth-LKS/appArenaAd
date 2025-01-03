/* eslint-disable react-hooks/rules-of-hooks */
import messaging from '@react-native-firebase/messaging'

export const notificationsService = () => {
  async function requestUserPermission() {
    await messaging().requestPermission()
    getInitialNotification()

    messaging().onNotificationOpenedApp(async (remoteMessage: any) => {
      console.log('Notification opened:', remoteMessage.notification)
    })

    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.log('Background message:', remoteMessage)
    })
  }

  const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
    console.log('Foreground message:', JSON.stringify(remoteMessage))
  })

  async function getInitialNotification() {
    const initialNotification = await messaging().getInitialNotification()
    if (initialNotification) {
      console.log('Initial notification:', initialNotification.notification)
    } else {
      console.log('No initial notification')
    }
  }

  return { unsubscribe, requestUserPermission }
}
