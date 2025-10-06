import { useTheme } from "@/contexts/ThemeProvider"
import { FONT_SIZES } from "@/lib"
import { View, ViewProps } from "react-native"
import ImageComponent from "../common/ImageComponent"
import SpaceComponent from "../common/SpaceComponent"
import TextComponent from "../common/TextComponent"
import TitleComponent from "../common/TitleComponent"

interface OverviewProps extends ViewProps {
    imageSource?: any
    title?: string
    caption?: string
}

const Overview = ({ imageSource, title, caption }: OverviewProps) => {
    const { colors } = useTheme()
    return (
        <View>
            {imageSource &&
                <ImageComponent
                    source={imageSource}
                    alt="login banner"
                    style={{ width: '100%', height: 200 }}
                    resizeMode="contain"
                />
            }
            <SpaceComponent height={10} />
            {title &&
                <TitleComponent
                    text={title}
                    color={colors.primary}
                    textAlign='center'
                />
            }
            {caption &&
                <TextComponent
                    text={caption}
                    textAlign='center'
                    style={{ fontSize: FONT_SIZES.CAPTION }}
                />
            }
        </View>
    )
}

export default Overview
