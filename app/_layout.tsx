import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Stack } from "expo-router"
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { I18nextProvider } from "react-i18next"
import { ActivityIndicator } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import Toast from 'react-native-toast-message'

import { FONT_FAMILIES } from "@/lib/constants/config"
import i18next from '@/locales'
import useStore from '@/store'


const queryClient = new QueryClient()

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { isLoggedIn } = useStore()

  const [loaded] = useFonts({
    [FONT_FAMILIES.REGULAR]: require('../assets/fonts/Poppins-Regular.ttf'),
    [FONT_FAMILIES.MEDIUM]: require('../assets/fonts/Poppins-Medium.ttf'),
    [FONT_FAMILIES.SEMIBOLD]: require('../assets/fonts/Poppins-SemiBold.ttf'),
    [FONT_FAMILIES.BOLD]: require('../assets/fonts/Poppins-Bold.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return <ActivityIndicator size={20} />
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18next}>
          <Toast />
          <Stack>
            <Stack.Protected guard={isLoggedIn} >
              <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            </Stack.Protected>
            <Stack.Protected guard={!isLoggedIn} >
              <Stack.Screen name="sign-in" options={{ headerShown: false }} />
              <Stack.Screen name="sign-up" options={{ headerShown: false }} />
            </Stack.Protected>
          </Stack>
        </I18nextProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
