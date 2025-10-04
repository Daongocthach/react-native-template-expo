import { icons } from 'lucide-react-native'
import React from 'react'
import { StyleProp, Switch, TextStyle, ViewStyle } from 'react-native'

import Icon from './Icon'
import RowComponent from '@/components/common/RowComponent'
import TextComponent from '@/components/common/TextComponent'
import { useTheme } from '@/contexts/ThemeProvider'

interface Props {
    gap?: number
    style?: StyleProp<ViewStyle>
    iconName?: keyof typeof icons
    label?: string
    color?: string
    size?: number
    textStyle?: StyleProp<TextStyle>
    numberOfLines?: number
    value: boolean
    disabled?: boolean
    onPress: () => void
}

const LabelSwitch = (props: Props) => {
    const { colors } = useTheme()
    const {
        style,
        gap = 10,
        iconName,
        label,
        color,
        size = 16,
        onPress,
        textStyle,
        numberOfLines,
        value,
        disabled = false,
    } = props

    return (
        <RowComponent alignItems="center" style={style} gap={gap}>
            <RowComponent gap={10} onPress={onPress}>
                {iconName && (
                    <Icon name={iconName} size={size} color={color || colors.onSurfaceVariant} />
                )}
                {label && (
                    <TextComponent
                        numberOfLines={numberOfLines}
                        size={size * 0.8125}
                        color={color || colors.onSurfaceVariant}
                        text={label}
                        style={textStyle}
                    />
                )}
            </RowComponent>
            <Switch
                disabled={disabled}
                value={value}
                onValueChange={onPress}
                thumbColor={colors.primary}
                trackColor={{
                    true: colors.primaryContainer,
                    false: colors.outlineVariant,
                }}
            />
        </RowComponent>
    )
}


export default LabelSwitch