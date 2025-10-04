import { TextProps, TextStyle } from 'react-native'
import TextComponent from './TextComponent'
import { ElevationKeys, ThemeColorKeys } from '@/lib'

interface Props extends TextProps {
    text: string
    font?: 'regular' | 'medium' | 'semibold' | 'bold'
    size?: number
    color?: ThemeColorKeys | ElevationKeys| (string & {})
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
    style?: TextStyle
}

const TitleComponent = ({ text, font, size, color, textAlign, style, ...props }: Props) => {

    return (
        <TextComponent
            size={size ?? 20}
            font={font ?? 'semibold'}
            textAlign={textAlign ?? 'left'}
            text={text}
            color={color ?? "onBackground"}
            {...props}
        />
    )
}

export default TitleComponent