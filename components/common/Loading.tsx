import { useTheme } from "@/contexts/ThemeProvider"
import { ActivityIndicator, View } from "react-native"

function Loading({ iconSize }: { iconSize?: number }) {
    const { colors } = useTheme()
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={colors.primary} size={iconSize || 20} />
        </View>
    )
}

export default Loading
