import React, { ReactNode } from 'react'
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native'

interface Props {
    children: ReactNode
    alignItems?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline'
    | undefined
    justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined
    onPress?: () => void
    gap?: number
    style?: StyleProp<ViewStyle>
}

const ColumnComponent = (props: Props) => {
    const { children, alignItems, justify, onPress, style, gap } = props
    const localStyle = [
        {
            flexDirection: 'column',
            alignItems:  alignItems ?? 'stretch',
            justifyContent: justify ?? 'flex-start',
            gap: gap ?? 0,
        },
        style,
    ] as ViewStyle[]

    return onPress ? (
        <TouchableOpacity style={localStyle} onPress={onPress ? () => onPress() : undefined}>
            {children}
        </TouchableOpacity>
    ) : (
        <View style={localStyle}>{children}</View>
    )
}

export default ColumnComponent