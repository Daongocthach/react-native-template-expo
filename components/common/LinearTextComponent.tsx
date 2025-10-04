import { FONT_SIZES } from '@/lib'
import MaskedView from '@react-native-masked-view/masked-view'
import React from 'react'
import { TextProps, TextStyle, View } from 'react-native'
import TextComponent from './TextComponent'

interface LinearTextComponentProps extends TextProps {
    text: string
    colors?: string[]
    fontSize?: number
    fontWeight?: TextStyle['fontWeight']
    lineHeight?: number
    font?: 'regular' | 'medium' | 'semibold' | 'bold'
}

const LinearTextComponent = ({
    text,
    colors = ['#324376', '#F5DD90', '#F76C5E', '#e1e1e1'],
    fontSize = FONT_SIZES.BODY,
    lineHeight,
    font,
    ...props
}: LinearTextComponentProps) => {
    return (
        <MaskedView
            style={{
                flexDirection: 'row',
                width: text.length * fontSize * 0.5,
                height: fontSize * 1.3,
            }}
            maskElement={
                <View style={{ backgroundColor: 'transparent', flex: 1 }}>
                    <TextComponent
                        text={text}
                        lineHeight={lineHeight}
                        size={fontSize}
                        font={font}
                        color={'onBackground'}
                    />
                </View>
            }
        >
            {colors.map((color, idx) => (
                <View
                    key={idx}
                    style={{
                        flex: 1,
                        height: '100%',
                        backgroundColor: color,
                    }}
                />
            ))}
        </MaskedView>
    )
}

export default LinearTextComponent
