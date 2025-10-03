import { STORE_NAME } from '@/lib/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const getAppStateValue = async <T = any>(key: string): Promise<T | null> => {
  try {
    const rawState = await AsyncStorage.getItem(STORE_NAME)
    if (!rawState) return null

    const parsedState = JSON.parse(rawState)
    return parsedState?.state?.[key] ?? null
  } catch (error) {
    console.error(`Error getting state.${key} from storage:`, error)
    return null
  }
}

export const getCurrentLanguage = async (): Promise<string | null> => {
  try {
    const rawState = await AsyncStorage.getItem(STORE_NAME || 'finetag')
    if (!rawState) return null

    const parsedState = JSON.parse(rawState)
    return parsedState?.state?.currentLanguage ?? null
  } catch (error) {
    console.error('Error getting currentLanguage from storage:', error)
    return null
  }
}