import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native"

import { useTheme } from "@/contexts/ThemeProvider"
import Icon from "./Icon"
import TextComponent from "./TextComponent"
import { ScrollView } from "react-native-gesture-handler"
import TitleComponent from "./TitleComponent"
import { ElevationKeys, ThemeColorKeys } from '@/lib'
import SpaceComponent from "./SpaceComponent"

type ModalProps = {
  disabled?: boolean
  modalTitle?: string
  modalDescription?: string
  isNotCloseModal?: boolean
  isYesCancelButton?: boolean
  isOnlyConfirmButton?: boolean
  visible: boolean
  children?: React.ReactNode
  buttonTitle?: string
  titleColor?: ThemeColorKeys | ElevationKeys | (string & {})
  descriptionColor?: ThemeColorKeys | ElevationKeys | (string & {})
  modalColor?: string
  buttonColor?: string
  isLoading?: boolean
  isNotScroll?: boolean
  onClose: () => void
  handle?: () => void
}

const PopupComponent = ({
  disabled = false,
  modalTitle,
  modalDescription,
  isNotCloseModal,
  isYesCancelButton,
  isOnlyConfirmButton,
  visible,
  children,
  buttonTitle,
  titleColor,
  descriptionColor,
  buttonColor = '#0EA5E8',
  modalColor,
  isLoading,
  isNotScroll,
  onClose,
  handle,
}: ModalProps) => {
  const { colors } = useTheme()
  const handleConfirm = () => {
    if (handle) {
      handle()
    }
    if (!isNotCloseModal) {
      onClose()
    }
  }


  return (
    <View style={{ flex: 1 }}>
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.backdrop}>
          <View style={[{ backgroundColor: modalColor || colors.surfaceVariant }, styles.modalContainer]}>
            <View style={styles.closeWrapper}>
              <TouchableOpacity onPress={onClose}>
                <Icon name='X' size={20} color="onSurfaceVariant" />
              </TouchableOpacity>
            </View>

            {modalTitle && (
              <TitleComponent
                style={styles.title}
                text={modalTitle}
                textAlign="center"
                color={titleColor || "primary"}
                numberOfLines={2}
              />
            )}
            <SpaceComponent height={8} />
            {modalDescription && (
              <TextComponent
                style={styles.description}
                text={modalDescription}
                color={descriptionColor || "onSurfaceVariant"}
                numberOfLines={20}
              />
            )}
            {isNotScroll
              ? <View style={{ paddingHorizontal: 12, paddingVertical: children ? 12 : 0 }}>{children}</View>
              : <ScrollView contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: children ? 12 : 0 }}>
                {children}
              </ScrollView>
            }

            {isLoading ? (
              <ActivityIndicator size="large" color={buttonColor} />
            ) : (
              <>
                {isOnlyConfirmButton && (
                  <View
                    style={{
                      paddingHorizontal: 16,
                      paddingBottom: 16,
                      paddingTop: 8
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        padding: 12,
                        borderRadius: 8,
                        backgroundColor: buttonColor,
                      }}
                      onPress={handleConfirm}
                      disabled={disabled}
                    >
                      <TextComponent
                        text={buttonTitle || "confirm"}
                        color="onPrimary"
                        textAlign="center"
                        font={'medium'}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                {isYesCancelButton && (
                  <View style={styles.footerRow}>
                    <TouchableOpacity
                      style={[styles.footerButton, styles.borderRight]}
                      onPress={onClose}
                    >
                      <TextComponent
                        style={styles.cancelText}
                        color="onSurface"
                        text="cancel"
                        font="medium"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.footerButton}
                      onPress={handleConfirm}
                      disabled={disabled}
                    >
                      <TextComponent
                        style={[
                          styles.confirmText,
                          { color: disabled ? "#888" : buttonColor },
                        ]}
                        text={buttonTitle || "yes"}
                        font="medium"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    borderRadius: 8,
    width: '90%',
    maxWidth: 500,
    maxHeight: '90%',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  closeWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: 16,
    paddingRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    marginHorizontal: 12
  },
  description: {
    textAlign: 'center',
    marginBottom: 16,
    marginHorizontal: 12
  },
  footerRow: {
    flexDirection: 'row',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  cancelText: {
    fontWeight: '500',
  },
  confirmText: {
    fontWeight: '500',
  },
})

export default PopupComponent
