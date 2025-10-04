import { useTheme } from '@/contexts/ThemeProvider'
import { icons } from 'lucide-react-native'
import React, { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Icon from './Icon'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { ElevationKeys, ThemeColorKeys } from '@/lib'

interface Props {
    children?: ReactNode
    style?: StyleProp<ViewStyle>
    justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined
    color?: string
    icon?: keyof typeof icons
    text?: string
    textColor?: ThemeColorKeys | ElevationKeys| (string & {})
}

export default function ChipComponent(props: Props) {
    const { children, style, justify, icon, text, color, textColor } = props
    const { colors } = useTheme()

    return (
        <RowComponent
            justify={justify}
            gap={5}
            style={[{
                backgroundColor: color ?? colors.tertiary,
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingVertical: 2
            }, style]}
        >
            {children}
            {icon &&
                <Icon
                    name={icon}
                    size={16}
                    color={textColor || "onPrimary"}
                />
            }
            <TextComponent
                size={12}
                text={text ?? 'available'}
                color={textColor || "onPrimary"}
                numberOfLines={1}
            />
        </RowComponent>
    )
}