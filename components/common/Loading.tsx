import { View } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { useTheme } from "@/contexts/ThemeProvider"

function Loading({ iconSize }: { iconSize?: number }) {
    const { colors } = useTheme()
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator animating={true} color={colors.primary} size={iconSize || 20} />
        </View>
    )
}

export default Loading
