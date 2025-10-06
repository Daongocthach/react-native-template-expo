import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"

import {
  RoleProps,
  STORE_NAME,
  SignUpProps,
  URL_FINEPRO,
  UserDataProps,
} from "@/lib"
import { asyncStorage } from "@/store/storage"
import { Socket } from "socket.io-client"

type StoreState = {
  darkMode: boolean
  currentLanguage: "zh-TW" | "zh-CN" | "en" | "vi"
  isLoading: boolean
  isLoggedIn: boolean
  userData: UserDataProps | null
  role: RoleProps | null
  roleSelected: number | null
  accessToken: string
  refreshToken: string
  unReadNotification: number
  url: string | undefined
  socketUrl: string | undefined
  socket: Socket | undefined
  isGlobalLoading: boolean
  setSocket: (socket: Socket | undefined) => void
  signUp: (payload: SignUpProps) => void
  signIn: (payload: { username: string, password: string }) => void
  signOut: () => void
  setActionName: <key extends keyof StoreState>(key: key, value: StoreState[key]) => void
  resetCache: () => void
}

const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        darkMode: false,
        currentLanguage: "en",
        isLoading: false,
        isLoggedIn: false,
        userData: null,
        role: null,
        roleSelected: null,
        accessToken: "",
        refreshToken: "",
        device: undefined,
        equipment: undefined,
        unReadNotification: 0,
        url: URL_FINEPRO + "/api/v1/",
        socketUrl: URL_FINEPRO,
        socket: undefined,
        isGlobalLoading: false,
        setSocket: (socket) => {
          set({ socket })
        },
        signUp: async (payload) => {

        },
        signIn: async (payload) => {
          set({
            isLoggedIn: true,
          })
        },
        signOut: async () => {
          set({
            isLoggedIn: false,
            userData: null,
            accessToken: "",
            refreshToken: "",
          })
        },
        setActionName: (key, value) => {
          set({ [key]: value })
        },
        resetCache: () => {
          asyncStorage.removeItem(STORE_NAME)
          set({
            darkMode: false,
            currentLanguage: "en",
            isLoading: false,
            isLoggedIn: false,
            userData: null,
            role: null,
            roleSelected: null,
            accessToken: "",
            refreshToken: "",
            unReadNotification: 0,
            socket: undefined,
            isGlobalLoading: false,
          })
        }

      }),
      {
        name: STORE_NAME || "finetag",
        storage: createJSONStorage(() => asyncStorage),
        partialize: (state) => ({
          darkMode: state.darkMode,
          currentLanguage: state.currentLanguage,
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          role: state.role,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          unReadNotification: state.unReadNotification,
          url: state.url,
          socketUrl: state.socketUrl,
        }),
      },
    ),
  ),
)

export default useStore
