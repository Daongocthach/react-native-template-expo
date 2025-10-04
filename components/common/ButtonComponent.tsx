import { LinearGradient } from 'expo-linear-gradient'
import { icons } from "lucide-react-native"
import { ReactNode, useMemo } from "react"
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"

import { useResolveColor } from "@/hooks/useResolveColor"
import { ElevationKeys, ThemeColorKeys } from '@/lib/types'
import Icon from "./Icon"
import TextComponent from "./TextComponent"

interface ButtonComponentProps extends TouchableOpacityProps {
  children?: ReactNode
  buttonStyle?: TouchableOpacityProps["style"]
  textStyle?: StyleProp<TextStyle>
  text?: string
  textSize?: number
  icon?: keyof typeof icons
  iconSize?: number
  iconColor?: ThemeColorKeys | ElevationKeys | (string & {})
  backgroundColor?: ThemeColorKeys | ElevationKeys | (string & {})
  disabled?: boolean
  loading?: boolean
  outline?: boolean
  ghost?: boolean
  clear?: boolean
  isLinearGradient?: boolean
  linearGradientColors?: string[]
}

function ButtonComponent({
  children,
  buttonStyle,
  textStyle,
  text,
  textSize = 14,
  icon,
  iconSize = 18,
  iconColor,
  backgroundColor = "primary",
  disabled = false,
  loading = false,
  outline = false,
  ghost = false,
  clear = false,
  isLinearGradient = false,
  linearGradientColors = ['#31cce8', '#6ae1da'],
  ...props
}: ButtonComponentProps) {
  const { resolveColor } = useResolveColor()
  const isIconOnly = !!icon && !text && !children

  const { bgColor, borderColor, contentColor, padding, borderWidth } = useMemo(() => {
    const bg = ghost ? 'transparent' :
      (disabled || loading)
        ? resolveColor("surfaceDisabled")
        : isIconOnly || outline
          ? "transparent"
          : clear
            ? resolveColor("surface")
            : resolveColor(backgroundColor)

    const border = (disabled || ghost)
      ? "transparent"
      : resolveColor(backgroundColor)

    const color = iconColor
      ? resolveColor(iconColor)
      : (disabled
        ? resolveColor("onSurfaceDisabled")
        : (ghost || isIconOnly || outline)
          ? resolveColor(backgroundColor)
          : clear
            ? resolveColor("onSurface")
            : resolveColor("onPrimary"))

    return {
      bgColor: bg,
      borderColor: border,
      contentColor: color,
      padding: ghost ? 0 : isIconOnly ? 0 : 14,
      borderWidth: outline ? 1 : 0
    }
  }, [disabled, loading, ghost, isIconOnly, outline, clear, backgroundColor, iconColor, resolveColor])

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      {...props}
    >
      <LinearGradient
        colors={
          isLinearGradient
            ? [linearGradientColors[0], linearGradientColors[1]]
            : [bgColor!, bgColor!]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            borderColor: borderColor,
            borderWidth,
            opacity: disabled ? 0.6 : 1,
            padding,
          },
          buttonStyle,
        ]}
      >
        {loading ? (
          ghost ? (
            <ActivityIndicator color={contentColor} size={iconSize} />
          ) : (
            <ActivityIndicator color={contentColor} style={{ marginRight: 8 }} />
          )
        ) : (
          icon && (
            <Icon
              name={icon}
              size={iconSize}
              color={contentColor ?? resolveColor("onPrimary")}
              style={{ marginRight: text || children ? 8 : 0 }}
            />
          )
        )}
        {text && (
          <TextComponent
            style={[{ color: contentColor }, textStyle]}
            text={text}
            size={textSize}
            font={'medium'}
            numberOfLines={1}
          />
        )}
        {children}
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default ButtonComponent
