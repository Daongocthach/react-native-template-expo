import Icon from '@/components/common/Icon'
import TextComponent from '@/components/common/TextComponent'
import { useTheme } from '@/contexts/ThemeProvider'
import useStore from '@/store'
import { useRouter } from 'expo-router'
import { useCallback, useEffect, useRef } from 'react'
import { TouchableOpacity, View } from 'react-native'

type ReceivedDataProps = {
  data: {
    project_id: number
    request_project_change_status: {
      id: number
      requested_by: {
        id: number
        email: string
        first_name: string
        last_name: string
        dob: string | null
        role: number
        avatar: string
        full_name: string
        status: boolean
        is_master: boolean
        is_2fa_verify: boolean
        is_locked: boolean
        is_disabled: boolean
      }
      confirmed_by: any
      old_status: number
      new_status: number
    }
  }
}


const NotificationBadge = () => {
  const router = useRouter()
  const {
    unReadNotification,
    accessToken,
    setActionName
  } = useStore()
  const { colors } = useTheme()
  const isFirstRender = useRef(true)

  const handleFetchTotalUnreadNotifications = useCallback(async () => {

  }, [setActionName])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      handleFetchTotalUnreadNotifications()
    }
  }, [handleFetchTotalUnreadNotifications])

  return (
    <TouchableOpacity
      onPress={() => router.push('/notifications')}
      style={{
        backgroundColor: colors.surface,
        padding: 13,
        borderRadius: 100,
        position: 'relative'
      }}
    >
      <Icon name="BellRing" size={24} color="onSurface" />
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          backgroundColor: colors.error,
          borderRadius: 10,
          width: 18,
          height: 18,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextComponent
          size={7}
          color="onPrimary"
          text={((unReadNotification > 99 ? '99+' : unReadNotification?.toString()) ?? '0')}
        />
      </View>
    </TouchableOpacity>
  )
}

export default NotificationBadge
