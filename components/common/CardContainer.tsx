import { useTheme } from '@/contexts/ThemeProvider'
import useStore from '@/store'
import { BlurView } from 'expo-blur'
import React, { ReactNode } from 'react'
import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'

interface Props extends TouchableOpacityProps {
    children?: ReactNode
    cardColor?: string
    style?: StyleProp<ViewStyle>
    isBlur?: boolean
    blurIntensity?: number
}

const CardContainer = (props: Props) => {
    const { darkMode } = useStore()
    const { children, style, cardColor, isBlur, blurIntensity = 100, ...rest } = props
    const { colors } = useTheme()

    if (isBlur) {
        return (
            <TouchableOpacity
                {...rest}
                activeOpacity={0.9}
                style={[{
                    borderRadius: 8,
                    overflow: 'hidden'
                }, style]}
            >
                <BlurView
                    intensity={blurIntensity}
                    tint={darkMode ? "dark" : "systemChromeMaterial"}
                    style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <TouchableOpacity
                        style={[{
                            borderRadius: 8,
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }]}
                    >
                        {children}
                    </TouchableOpacity>
                </BlurView>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity
            {...rest}
            activeOpacity={0.9}
            style={[{
                backgroundColor: cardColor || colors.surfaceVariant,
                borderRadius: 8,
                padding: 20,
                elevation: 1,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            }, style]}
        >
            {children}
        </TouchableOpacity>
    )
}

export default CardContainer
