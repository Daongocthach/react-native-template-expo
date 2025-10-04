import { createContext, useContext, useEffect, useState } from "react"
import { View } from "react-native"

import PopupComponent from "@/components/common/PopupComponent"
import { setGlobalShowAlert } from "@/notification/alert"
import { useTheme } from "./ThemeProvider"

type AlertConfig = {
  text1: string
  text2: string
  type: 'ok' | 'confirm' | 'error' | 'warning'
  onReject?: () => void
  onConfirm?: () => void
  rejectText?: string
  confirmText?: string
  buttonColor?: string
}

const AlertContext = createContext<(config: AlertConfig) => void>(() => { })

export const useGlobalAlert = () => useContext(AlertContext)

export function GlobalAlertProvider({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme()
  const [visible, setVisible] = useState(false)
  const [config, setConfig] = useState<AlertConfig | null>(null)

  const show = (newConfig: AlertConfig) => {
    setConfig(newConfig)
    setVisible(true)
  }

  useEffect(() => {
    setGlobalShowAlert(show)
  }, [])

  const hide = () => setVisible(false)

  const handleConfirm = () => {
    if (config?.onConfirm) config.onConfirm()
    hide()
  }

  const isConfirm = config?.type === 'confirm'

  return (
    <AlertContext.Provider value={show}>
      {children}
      <View>
        <PopupComponent
          visible={visible}
          onClose={hide}
          modalTitle={config?.text1 || 'alert'}
          modalDescription={config?.text2}
          isYesCancelButton={isConfirm}
          handle={handleConfirm}
          isOnlyConfirmButton={!isConfirm}
          buttonColor={config?.type === 'error' ? colors.error : config?.buttonColor || colors.primary}
        />
      </View>
    </AlertContext.Provider>
  )
}
