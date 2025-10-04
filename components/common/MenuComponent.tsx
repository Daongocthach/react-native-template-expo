import React, { ReactElement, ReactNode, useState } from "react"
import { Pressable, View, ViewStyle, ScrollView, StyleSheet } from "react-native"
import Popover from "react-native-popover-view"
import { useTheme } from "@/contexts/ThemeProvider"

type MenuRenderCtx = { close: () => void }

interface MenuComponentProps {
  children: ReactNode
  menuChildren: ReactNode | ((ctx: MenuRenderCtx) => ReactNode)
  viewStyle?: ViewStyle
  triggerStyle?: ViewStyle
  fullWidth?: boolean
  disabled?: boolean
}

const MenuComponent = ({
  children,
  menuChildren,
  viewStyle,
  triggerStyle,
  fullWidth = true,
  disabled = false,
}: MenuComponentProps): ReactElement => {
  const { colors } = useTheme()
  const [visible, setVisible] = useState(false)
  const [triggerWidth, setTriggerWidth] = useState(0)

  const close = () => setVisible(false)

  const renderMenu = () => {
    if (typeof menuChildren === "function") {
      return (menuChildren as (ctx: MenuRenderCtx) => ReactNode)({ close })
    }
    return menuChildren
  }

  return (
    <View style={viewStyle}>
      <Popover
        isVisible={visible}
        onRequestClose={close}
        from={(
          <Pressable
            onLayout={e => setTriggerWidth(e.nativeEvent.layout.width)}
            onPress={() => setVisible(true)}
            disabled={disabled}
            style={({ pressed }) => [
              { opacity: pressed ? 0.8 : 1 },
              triggerStyle,
            ]}
          >
            {children}
          </Pressable>
        )}
        backgroundStyle={{ backgroundColor: "transparent" }}
        offset={6}
        arrowSize={{ width: 0, height: 0 }}
        popoverShift={{ x: -(triggerWidth / 2), y: 0 }}
        popoverStyle={{
          backgroundColor: colors.background,
          borderRadius: 8,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.surfaceDisabled,
          padding: 12,
          minWidth: triggerWidth,
          width: fullWidth ? "100%" : undefined, 
        }}
        animationConfig={{ duration: 80 }}
      >
        <ScrollView
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 0 }}
        >
          {renderMenu()}
        </ScrollView>
      </Popover>
    </View>
  )
}

export default MenuComponent
