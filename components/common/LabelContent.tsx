import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { useTranslation } from 'react-i18next'

import RowComponent from '@/components/common/RowComponent'
import TextComponent from '@/components/common/TextComponent'

interface LabelContentProps {
    style?: StyleProp<ViewStyle>
    label?: string
    content?: string
    labelStyle?: StyleProp<TextStyle>
    contentStyle?: StyleProp<TextStyle>
    gap?: number
    numberOfLines?: number
    labelColor?: string
    contentColor?: string
    children?: React.ReactNode
}

const LabelContent = (props: LabelContentProps) => {
    const { t } = useTranslation()
    const {
        style,
        label,
        content,
        labelStyle,
        contentStyle,
        gap = 6,
        numberOfLines,
        children,
        labelColor,
        contentColor
    } = props

    return (
        <RowComponent style={style} gap={gap} alignItems="center">
            <TextComponent
                color={labelColor ?? "onSurfaceVariant"}
                style={labelStyle}
                font='semibold'
                numberOfLines={numberOfLines}
            >
                {t(label ?? '')}: {content && (
                    <TextComponent
                        text={content}
                        color={contentColor ?? "onSurface"}
                        numberOfLines={numberOfLines}
                        style={contentStyle}
                    />
                )}
            </TextComponent>
            {children}
        </RowComponent>
    )
}

export default LabelContent
