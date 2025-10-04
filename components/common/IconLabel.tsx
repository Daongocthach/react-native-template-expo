import { icons } from 'lucide-react-native'
import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

import Icon from '@/components/common/Icon'
import RowComponent from '@/components/common/RowComponent'
import TextComponent from '@/components/common/TextComponent'
import { ElevationKeys, ThemeColorKeys } from '@/lib'

interface Props {
    gap?: number
    style?: StyleProp<ViewStyle>
    iconName?: keyof typeof icons
    label?: string
    color?: ThemeColorKeys | ElevationKeys| (string & {})
    size?: number
    font?: 'regular' | 'medium' | 'semibold' | 'bold'
    textStyle?: StyleProp<TextStyle>
    numberOfLines?: number
    onPress?: () => void
}

const IconLabel = (props: Props) => {
    const { style, gap = 10, iconName, label, color, size = 16, onPress, textStyle, numberOfLines, font } = props

    return (
        <RowComponent
            gap={gap}
            style={style}
            onPress={onPress}
        >
            {iconName && (
                <Icon name={iconName} size={size} color={color || "onSurfaceVariant"} />
            )}
            {label && (
                <TextComponent
                    numberOfLines={numberOfLines}
                    size={size * 0.8125}
                    color={color || "onSurfaceVariant"}
                    text={label}
                    style={textStyle}
                    font={font}
                />
            )}
        </RowComponent>
    )
}

export default IconLabel