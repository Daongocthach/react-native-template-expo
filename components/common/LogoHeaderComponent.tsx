import { useTranslation } from 'react-i18next'
import { Alert, Image, ImageProps, StyleProp, View } from 'react-native'

import IMAGES from '@/assets/images'
import ColumnComponent from '@/components/common/ColumnComponent'
import MenuComponent from '@/components/common/MenuComponent'
import RowComponent from '@/components/common/RowComponent'
import TextComponent from '@/components/common/TextComponent'
import { useTheme } from '@/contexts/ThemeProvider'
import { URL_FINEPRO, URL_X7 } from '@/lib'
import useStore from '@/store'

interface Props {
    styles?: StyleProp<ImageProps>
    size?: number
    pathName?: string
}

const companies = [
    { id: '1', name: 'FINEPRO AUTOMATION', image: IMAGES.LOGO, url: URL_FINEPRO },
    { id: '2', name: 'X7', image: IMAGES.LOGO, url: URL_X7 },
]

const LogoHeaderComponent = (props: Props) => {
    const { t } = useTranslation()
    const { socketUrl, setActionName } = useStore()
    const { colors } = useTheme()
    const { styles, size = 45, pathName } = props

    const changeDomain = (domain: string, companyName: string) => {
        if (!domain) return
        Alert.alert(
            t('change domain'),
            t('are you sure you want to change the domain to') + " " + companyName + "?",
            [
                { text: t('cancel'), style: 'cancel' },
                {
                    text: t('confirm'),
                    onPress: () => {
                        setActionName("url", domain + "/api/v1/")
                        setActionName("socketUrl", domain)
                    }
                },
            ]
        )
    }

    return (
        <MenuComponent
            disabled={pathName !== "/login"}
            children={
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                    }}
                >
                    <Image
                        source={IMAGES.LOGO}
                        style={{ width: 50, height: 50 }}
                        resizeMode="contain"
                    />
                    <ColumnComponent gap={4}>
                        <TextComponent
                            size={18}
                            font={'bold'}
                            style={{ letterSpacing: 4 }}
                            text='finepro'
                        />
                        <TextComponent
                            size={11}
                            font={'medium'}
                            style={{ textTransform: "uppercase", letterSpacing: 1.75 }}
                            text='Automation'
                        />
                    </ColumnComponent>
                </View>

            }
            menuChildren={() => (
                <ColumnComponent gap={15}>
                    {companies.map((company) => (
                        <RowComponent
                            gap={10}
                            alignItems='center'
                            key={company.id}
                            onPress={() => changeDomain(company?.url ?? '', company?.name)}
                        >
                            <Image
                                key={company.id}
                                source={company.image}
                                alt={company.name}
                                style={{ width: 25, height: 25 }}
                                resizeMode="contain"
                            />
                            <TextComponent
                                text={company.name}
                                font={
                                    socketUrl === company.url
                                        ? 'semibold'
                                        : 'medium'
                                }
                                color={
                                    socketUrl === company.url
                                        ? "primary"
                                        : "onSurfaceVariant"
                                }
                                size={12}
                            />
                        </RowComponent>
                    ))}
                </ColumnComponent>
            )}
            fullWidth={true}
        />

    )
}

export default LogoHeaderComponent