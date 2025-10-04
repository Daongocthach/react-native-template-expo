import { RadioButton } from 'react-native-paper'

import TextComponent from './TextComponent'
import RowComponent from './RowComponent'
import { useTheme } from '@/contexts/ThemeProvider'
import { StyleProp, ViewStyle } from 'react-native'

type RadioComponentProps = {
    value: string | number
    label: string
    selected: string | number | null
    style?: StyleProp<ViewStyle>
    onSelect: (value: any) => void
}

export default function RadioComponent({
    value,
    label,
    selected,
    style,
    onSelect,
}: RadioComponentProps) {
    const { colors } = useTheme()

    const checked = selected === value ? 'checked' : 'unchecked'

    return (
        <RowComponent
            alignItems="center"
            justify='flex-start'
            style={[{ marginLeft: -7 }, style]}
            onPress={() => onSelect(value)}
        >
            <RadioButton.Android
                value={value.toString()}
                status={checked}
                color={colors.primary}
                uncheckedColor={colors.primary}
                onPress={() => onSelect(value)}
            />
            <TextComponent text={label} />
        </RowComponent>
    )
}
