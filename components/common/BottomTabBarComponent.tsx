import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Platform, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import IconComponent from '@/components/common/Icon'
import TextComponent from '@/components/common/TextComponent'
import { useTheme } from '@/contexts/ThemeProvider'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

export default function BottomTabBarComponent({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) {
    const router = useRouter()
    const { colors } = useTheme()
    const [visible, setVisible] = useState(false)
    const insets = useSafeAreaInsets()

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: colors.background,
                borderTopWidth: 1,
                borderTopColor: colors.elevation.level1,
                paddingBottom: insets.bottom,
            }}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const isFocused = state.index === index

                if (index === 2) {
                    return (
                        <TouchableOpacity
                            onPress={() => setVisible(true)}
                            key={route.key}
                            style={{
                                marginTop: Platform.OS === 'android' ? -50 : -24,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: colors.primary,
                                    borderRadius: 40,
                                    padding: 14,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 6,
                                }}
                            >
                                <IconComponent name='Plus' size={28} color="#fff" />
                            </View>
                        </TouchableOpacity>
                    )
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={() => navigation.navigate(route.name)}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingRight: index === 1 ? 20 : 0,
                            paddingLeft: index === 3 ? 20 : 0,
                            flex: 1,
                        }}
                    >
                        {options.tabBarIcon?.({
                            focused: isFocused,
                            color: isFocused ? colors.primary : colors.onSurface,
                            size: 26
                        })}
                        <TextComponent
                            text={options.title || route.name}
                            color={isFocused ? colors.primary : colors.onSurface}
                            size={11}
                            font={isFocused ? "semibold" : "regular"}
                            numberOfLines={1}
                        />
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}
