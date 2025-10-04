import { View, ActivityIndicator, TouchableOpacity, Platform } from 'react-native'
import { Icon } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import TextComponent from './TextComponent'
import ModalComponent from './ModalComponent'
import { useTheme } from '@/contexts/ThemeProvider'
import { windowHeight, windowWidth } from '@/lib'

export default function LoadingModal({
    title,
    visible,
    onClose,
}: {
    title?: string
    visible: boolean
    onClose?: () => void
}) {
    const { colors } = useTheme()
    const { t } = useTranslation()
    return (
        <ModalComponent visible={visible} animationType="fade">
            <View style={{
                flex: 1,
                marginTop: Platform.OS === 'ios' ? 0 : 35,
                minWidth: windowWidth,
                minHeight: windowHeight,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.6)',
            }}>
                {onClose && (
                    <TouchableOpacity
                        onPress={onClose}
                        style={{
                            position: 'absolute',
                            top: 40,
                            right: 20,
                            backgroundColor: 'white',
                            borderRadius: 20,
                            padding: 5,
                        }}
                    >
                        <Icon source="close" size={24} color="black" />
                    </TouchableOpacity>
                )}
                <ActivityIndicator size={50} color={colors.primary} />
                <TextComponent
                    color="onPrimary"
                    font="semibold"
                    size={18}
                    text={title ?? `${t("loading")}...`}
                />
            </View>
        </ModalComponent>
    )
}
