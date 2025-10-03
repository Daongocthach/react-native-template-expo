
export const alertList = {
    logout: {
        type: "confirm",
        text1: "logout",
        text2: "are you sure you want to logout",
    },
    network_error: {
        type: "warning",
        text1: "error",
        text2: "network error",
    },
    login_again: {
        type: "error",
        text1: "invalid user code",
        text2: "please login again",
    },
} as const

export type AlertType = keyof typeof alertList