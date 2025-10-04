import React, { ReactNode } from 'react'
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native'

interface Props {
    children: ReactNode
    justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined
    alignItems?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined
    onPress?: () => void
    wrap?: boolean
    gap?: number
    style?: StyleProp<ViewStyle>
    ref?: React.RefObject<View>
}

const RowComponent = (props: Props) => {
    const { children, justify, alignItems, onPress, style, gap, wrap, ref } = props
    const localStyle = [
        {
            flexDirection: 'row',
            alignItems:  alignItems ?? 'center',
            justifyContent: justify ?? 'flex-start',
            gap: gap ?? 0,
            flexWrap: wrap ? 'wrap' : 'nowrap',
        },
        style,
    ] as ViewStyle[]

    return onPress ? (
        <TouchableOpacity
            ref={ref}
            style={localStyle}
            onPress={onPress ? () => onPress() : undefined}
        >
            {children}
        </TouchableOpacity>
    ) : (
        <View style={localStyle}>{children}</View>
    )
}

export default RowComponent