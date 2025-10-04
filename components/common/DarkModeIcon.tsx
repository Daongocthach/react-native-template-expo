import { useTheme } from '@/contexts/ThemeProvider'
import useStore from '@/store'
import { Pressable } from 'react-native'
import Icon from './Icon'

const DarkModeIcon = () => {
    const { darkMode, setActionName } = useStore()
    const { colors } = useTheme()


    const toggleSwitch = () => {
        setActionName('darkMode', !darkMode)
    }

    return (
        <Pressable
            onPress={toggleSwitch}
            style={{
                backgroundColor: colors.surface,
                padding: 14,
                borderRadius: 100,
                position: 'relative'
            }}
        >
            <Icon name={darkMode ? 'Sun' : 'Moon'} size={24} color={colors.onSurface} />
        </Pressable>
    )
}

export default DarkModeIcon