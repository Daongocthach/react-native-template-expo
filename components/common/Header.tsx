import { DrawerToggleButton } from '@react-navigation/drawer'
import { usePathname, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

import ChangeLanguageDropdown from '@/components/common/ChangeLanguageDropdown'
import DarkModeIcon from '@/components/common/DarkModeIcon'
import Icon from '@/components/common/Icon'
import LogoHeaderComponent from '@/components/common/LogoHeaderComponent'
import RowComponent from '@/components/common/RowComponent'
import TextComponent from '@/components/common/TextComponent'
import { useTheme } from '@/contexts/ThemeProvider'
import { formatPathToTitle } from '@/lib'
import useStore from '@/store'
import { SafeAreaView } from 'react-native-safe-area-context'
import NotificationBadge from './NotificationBadge'

const HeaderComponent = () => {
  const { darkMode } = useStore()
  const pathName = usePathname()
  const router = useRouter()
  const { colors } = useTheme()

  const isShowLanguageDropdown = ['/login', '/forgot-password'].includes(pathName)
  const isModal = ['/login-device', '/breakdown-report', '/write-tag'].includes(pathName)
  const isShowLogoHeader = ['/'].includes(pathName)
  const isExhibition = pathName === '/exhibition/instructions'
  const isDimension = pathName?.startsWith('/dimension')
  const title = formatPathToTitle(pathName)

  const handleBack = () => {
    router.back()
  }

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background}}>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <RowComponent
        justify='space-between'
        style={{
          minHeight: 70,
          paddingBottom: 10,
          paddingHorizontal: 12,
        }}>
        {(isShowLogoHeader || isShowLanguageDropdown) && !isModal ?
          <LogoHeaderComponent pathName={pathName} />
          :
          (<RowComponent onPress={handleBack} alignItems='center' justify='center' style={{ height: '100%' }} gap={10}>
            <Icon name="ChevronLeft" size={30} color="onSurfaceVariant" />
            <TextComponent
              numberOfLines={1}
              style={{ color: colors.onSurfaceVariant, width: 170 }}
              text={title}
              font={'medium'}
              size={18}
            />
          </RowComponent>)
        }
        <RowComponent gap={5}>
          {isExhibition || isDimension ? (
            <ChangeLanguageDropdown />
          ) : isShowLanguageDropdown ? (
            <ChangeLanguageDropdown />
          ) : (
            <>
              <DarkModeIcon />
              <NotificationBadge />
              <View
                style={{
                  borderRadius: 50,
                  paddingVertical: 5,
                  backgroundColor: colors.surface,
                }}
              >
                <DrawerToggleButton tintColor={colors.onSurface} />
              </View>
            </>
          )}
        </RowComponent>
      </RowComponent>
    </SafeAreaView>
  )
}

export default HeaderComponent