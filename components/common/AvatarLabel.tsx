import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

import RowComponent from '@/components/common/RowComponent'
import TextComponent from '@/components/common/TextComponent'
import UserAvatar from '@/components/common/UserAvatar'
import { ElevationKeys, ThemeColorKeys } from '@/lib'

interface Props {
    gap?: number
    style?: StyleProp<ViewStyle>
    label: string
    color?: ThemeColorKeys | ElevationKeys | (string & {})
    size?: number
    textStyle?: StyleProp<TextStyle>
    numberOfLines?: number
    avatarUrl?: string
    onPress?: () => void
}

const AvatarLabel = (props: Props) => {
    const { style, gap = 10, label, color, size = 16, onPress, textStyle, numberOfLines, avatarUrl } = props

    return (
        <RowComponent gap={gap} style={style} onPress={onPress} alignItems='center'>
            <UserAvatar avatarUrl={avatarUrl} avatarSize={size} userName={label} />
            <TextComponent
                numberOfLines={numberOfLines}
                size={size * 0.5}
                text={label}
                style={textStyle}
                font={'medium'}
                color={color}
            />
        </RowComponent>
    )
}

export default AvatarLabel