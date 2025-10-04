
import { useTheme } from "@/contexts/ThemeProvider"

import { RefreshControl, RefreshControlProps } from 'react-native'


const RefreshControlComponent = (props: RefreshControlProps) => {
    const { colors } = useTheme()

    return (
        <RefreshControl
            {...props}
            tintColor={colors.primary}
            colors={[colors.primary]}
        />
    )
}

export default RefreshControlComponent
