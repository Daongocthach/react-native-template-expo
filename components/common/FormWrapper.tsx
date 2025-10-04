import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  Keyboard,
} from 'react-native'

interface FormWrapperProps {
  children: React.ReactNode
  scroll?: boolean
  style?: StyleProp<ViewStyle>
  keyboardVerticalOffset?: number
}

const FormWrapper = ({
  children,
  scroll = true,
  style,
  keyboardVerticalOffset = 80,
}: FormWrapperProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={[{ flex: 1 }, style]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {scroll ? (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        ) : (
          <View style={{ flex: 1 }}>
            {children}
          </View>
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default FormWrapper
