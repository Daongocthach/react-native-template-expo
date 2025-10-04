import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { TextInputProps } from 'react-native'

import { useTheme } from '@/contexts/ThemeProvider'
import { icons } from 'lucide-react-native'
import CustomTextInput from './CustomTextInput'

interface TextInputFieldProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>
  name: Path<T>
  rules?: object
  errorMessage?: string
  isPassword?: boolean
  isSearch?: boolean
  leftIcon?: keyof typeof icons
  leftIconSize?: number
  rightIcon?: keyof typeof icons
  rightIconSize?: number,
  label?: string
  style?: object
  textAlignVertical?: 'center' | 'top' | 'bottom' | 'auto'
  trigger?: (name: string) => void
}

const TextInputField = <T extends FieldValues>({
  control,
  name,
  rules,
  errorMessage,
  isPassword,
  isSearch = false,
  leftIcon,
  rightIcon,
  leftIconSize,
  rightIconSize,
  trigger,
  label,
  style,
  textAlignVertical = 'center',
  ...props
}: TextInputFieldProps<T>) => {
  const { colors } = useTheme()

  return (
      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            placeholder={props.placeholder ?? ''}
            placeholderTextColor={colors.onSurfaceVariant}
            onBlur={() => {
              onBlur()
              trigger?.(name)
            }}
            onChangeText={onChange}
            value={value}
            style={{ width: '100%' }}
            viewStyle={style}
            isPassword={isPassword}
            isSearch={isSearch}
            errorMessage={errorMessage}
            leftIcon={leftIcon}
            leftIconSize={leftIconSize}
            rightIcon={rightIcon}
            rightIconSize={rightIconSize}
            isClear={value}
            label={label}
            textAlignVertical={textAlignVertical}
            {...props}
          />
        )}
      />
  )
}

export default TextInputField
