// global/alert.ts

export type AlertType = {
    text1: string
    text2: string
    type: "ok" | "confirm" | "error" | "warning"
    onConfirm?: () => void
    onReject?: () => void
  }
  
  let globalShowAlert: (config: AlertType) => void = () => {}
  
  export const setGlobalShowAlert = (fn: typeof globalShowAlert) => {
    globalShowAlert = fn
  }
  
  export const showCustomAlert = (config: AlertType) => {
    globalShowAlert(config)
  }
  