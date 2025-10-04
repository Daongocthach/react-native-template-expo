import { useTheme } from '@/contexts/ThemeProvider'
import React, { ReactNode } from 'react'
import { View, ViewProps } from 'react-native'

interface Props extends ViewProps {
    children: ReactNode
    isOutline?: boolean
}

const CardComponent = (props: Props) => {
    const { colors } = useTheme()
    const { children } = props
    const isOutline = props.isOutline
    
    return (
        <View style={[
            {
                flexDirection: 'column',
                gap: 8,
                backgroundColor: isOutline ? colors.background : colors.surface,
                borderWidth: isOutline ? 1 : 0,
                borderColor: isOutline ? colors.elevation.level2 : 'transparent',
                paddingHorizontal: 20,
                paddingVertical: 30,
                borderRadius: 30,
                shadowColor: colors.shadow,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
            },
            props.style
        ]}>
            {children}
        </View>
    )
}

export default CardComponent