import { ReactNode } from 'react'
import { ImageBackground, Platform, ScrollView, View, ViewStyle } from 'react-native'
import { Edge, SafeAreaView, SafeAreaViewProps, useSafeAreaInsets } from 'react-native-safe-area-context'

import IMAGES from '@/assets/images'
import { useTheme } from '@/contexts/ThemeProvider'
import Header from './Header'

interface Props extends SafeAreaViewProps {
  children: ReactNode
  isScroll?: boolean
  isImageBackground?: boolean
  style?: ViewStyle
  contentContainerStyle?: ViewStyle
  blurRadius?: number
  isBottomTab?: boolean
  noHeader?: boolean
}

const Container = ({
  children,
  isScroll,
  isImageBackground,
  style,
  contentContainerStyle,
  blurRadius = 0,
  isBottomTab = false,
  noHeader = false,
  ...props
}: Props) => {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  const ContentWrapper = isScroll ? ScrollView : View
  const contentProps = isScroll
    ? {
      contentContainerStyle: [{
        paddingHorizontal: 12,
        paddingBottom: isBottomTab ? 40 : 20,
      }, contentContainerStyle],
    }
    : {
      style: [{
        flex: 1,
        paddingHorizontal: 12,
      }, contentContainerStyle],
    }

  const renderContent = () => (
    <ContentWrapper {...(contentProps as any)}>
      {children}
    </ContentWrapper>
  )

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
          height: '100%',
          width: '100%',
          paddingTop: insets.top + (Platform.OS === 'ios' ? 5 : 15),
          paddingBottom: 5,
        },
        style,
      ]}
      edges={['left', 'right', ...(isBottomTab ? [] : ['bottom']) as Edge[]]}
      {...props}
    >
      {!noHeader && <Header />}

      {isImageBackground ? (
        <ImageBackground
          source={IMAGES.HOME_FINEPRO}
          resizeMode="contain"
          style={{ flex: 1 }}
          blurRadius={blurRadius}
        >
          {renderContent()}
        </ImageBackground>
      ) : (
        renderContent()
      )}
    </SafeAreaView>
  )
}

export default Container
