import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"

import ColumnComponent from "./ColumnComponent"
import TextComponent from "./TextComponent"
import { useTheme } from "@/contexts/ThemeProvider"

function TabBarComponent(props: any) {
    const { colors } = useTheme()
    const { index: activeIndex, routes } = props.navigationState

    return (
        <View style={styles.container}>
            <View style={[styles.tabContainer, { backgroundColor: colors.surfaceVariant }]}>
                {routes.map((route: any, index: number) => {
                    const isFocused = activeIndex === index
                    return (
                        <ColumnComponent
                            key={route.key}
                            justify="center"
                            style={{
                                height: 44,
                                padding: 2,
                                flex: 1,
                                borderRadius: 8,
                                backgroundColor: isFocused ? colors.primary : colors.surface
                            }}
                            onPress={() => props.jumpTo(route.key)}
                        >
                            <TextComponent
                                numberOfLines={1}
                                textAlign="center"
                                font={'medium'}
                                style={{ color: isFocused ? colors.onPrimary : colors.onSurfaceVariant, width: '100%' }}
                                text={route.title}
                            />
                            {route?.count !== undefined &&
                                <TextComponent
                                    numberOfLines={1}
                                    textAlign="center"
                                    size={12}
                                    style={{ color: isFocused ? colors.onPrimary : colors.onSurface, width: '100%' }}
                                    text={`(${route.count})`}
                                />
                            }
                        </ColumnComponent>
                    )
                })}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        paddingBottom: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        borderRadius: 8,
        padding: 4,
        width: '100%',
        justifyContent: 'center',
        gap: 4,
    },
    tab: {
        padding: 12,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeTab: {
        borderWidth: 1,
    },
    tabText: {
        color: '#888',
        fontWeight: 500
    },
    activeText: {
        color: '#00b0ff',
        fontWeight: 'bold',
    },
})

export const renderTabBar = (props: any) => {
    const { i18n } = useTranslation()
    return <TabBarComponent key={i18n.language} {...props} />
}

