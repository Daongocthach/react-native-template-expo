import { Pressable, View } from 'react-native'

import TextComponent from '@/components/common/TextComponent'
import { useTheme } from '@/contexts/ThemeProvider'

export default function SwitchComponent({
    value,
    onToggle,
    label,
    textTrue = 'yes',
    textFalse = 'no',
}: {
    value: boolean,
    label?: string,
    textTrue?: string,
    textFalse?: string,
    onToggle: () => void
}) {
    const { colors } = useTheme()
    const switchText = value ? textTrue : textFalse

    return (
        <Pressable onPress={onToggle} style={{ alignItems: 'flex-start' }}>
            {label &&
                <TextComponent
                    text={label}
                    font='semibold'
                    style={{ marginBottom: 2 }}
                    color="onSurface"
                />
            }
            <View
                style={{
                    backgroundColor: value ? colors.primary : colors.elevation.level2,
                    paddingHorizontal: 12,
                    minHeight: 30,
                    borderRadius: 30,
                    paddingVertical: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    position: 'relative',
                }}
            >
                <TextComponent
                    text={switchText}
                    style={{
                        color: value ? colors.onPrimary : colors.onSurface,
                        fontSize: 14,
                        marginRight: value ? 24 : 0,
                        marginLeft: value ? 0 : 24,
                    }}
                />

                <View
                    style={{
                        backgroundColor: colors.onPrimary,
                        right: value ? 4 : undefined,
                        left: value ? undefined : 4,
                        width: 22,
                        height: 22,
                        borderRadius: 11,
                        position: 'absolute',
                        top: 4,
                    }}
                />
            </View>
        </Pressable>
    )
}