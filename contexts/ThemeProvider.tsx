import useStore from '@/store'
import { darkTheme } from '@/theme/darkTheme'
import { lightTheme } from '@/theme/lightTheme'
import { AppTheme } from '@/theme/theme'
import React, { createContext, useContext } from 'react'

const ThemeContext = createContext<AppTheme>(lightTheme)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { darkMode } = useStore()
  const theme = darkMode ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
