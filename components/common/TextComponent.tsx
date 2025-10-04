import { useTranslation } from 'react-i18next'

import { useTheme } from '@/contexts/ThemeProvider'
import { FONT_FAMILIES, FONT_SIZES } from '@/lib'
import { StyleProp, Text, TextProps, TextStyle } from 'react-native'
import { useResolveColor } from "@/hooks/useResolveColor"
import { ElevationKeys, ThemeColorKeys } from '@/lib/types'
import { Dimensions, PixelRatio } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const scale = SCREEN_WIDTH / 375

function normalize(size: number) {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale))
}


interface TextComponentProps extends TextProps {
  children?: React.ReactNode
  style?: StyleProp<TextStyle>
  text?: string
  size?: number
  weight?: TextStyle['fontWeight']
  font?: 'regular' | 'medium' | 'semibold' | 'bold'
  color?: ThemeColorKeys | ElevationKeys | (string & {})
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
  lineHeight?: number
}

const TextComponent = ({
  children,
  style,
  text,
  size,
  weight,
  font = 'regular',
  textAlign,
  color,
  lineHeight,
  ...props
}: TextComponentProps) => {
  if (!text && !children) return null
  const { resolveColor } = useResolveColor()
  const { colors } = useTheme()
  const { t } = useTranslation()

  const getFontFamily = (fontFamily: typeof font) => {
    switch (fontFamily) {
      case 'medium':
        return FONT_FAMILIES.MEDIUM
      case 'semibold':
        return FONT_FAMILIES.SEMIBOLD
      case 'bold':
        return FONT_FAMILIES.BOLD
      default:
        return FONT_FAMILIES.REGULAR
    }
  }

  return (
    <Text
      {...props}
      style={[
        {
          color: color ? resolveColor(color) : colors.onBackground,
          fontSize: normalize(size ?? FONT_SIZES.BODY),
          fontFamily: getFontFamily(font),
          fontWeight: weight ?? 'normal',
          textAlign: textAlign ?? 'left',
          lineHeight: lineHeight ?? 1.3 * (size ?? FONT_SIZES.BODY),
        },
        style,
      ]}
    >
      {text ? t(text) : children}
    </Text>
  )
}

export default TextComponent
