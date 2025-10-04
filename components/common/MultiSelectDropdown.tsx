import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View, ViewStyle } from 'react-native'
import { MultiSelect } from 'react-native-element-dropdown'

import { useTheme } from '@/contexts/ThemeProvider'
import { DropdownProps, FONT_FAMILIES } from '@/lib'
import Checkbox from './CheckBox'
import Icon from './Icon'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'

interface MultiSelectDropdownProps {
  data: DropdownProps[]
  items: string[]
  setItems: (items: string[]) => void
  label?: string
  placeholder?: string
  style?: object
  viewStyle?: ViewStyle
  isSearch?: boolean
  searchPlaceholder?: string
  disable?: boolean,
  isNotShowInputSelect?: boolean
}

const MultiSelectDropdown = ({
  data,
  items = [],
  setItems,
  label,
  placeholder = 'select option',
  viewStyle,
  isSearch = false,
  disable = false,
  searchPlaceholder = 'search',
  isNotShowInputSelect = false,
}: MultiSelectDropdownProps) => {
  const { t } = useTranslation()
  const { colors } = useTheme()

  const dataTranslated = useMemo(
    () => data.map(item => ({ ...item, label: t(item.label) })),
    [data, t]
  )

  const handleChange = (selected: any) => {
    const values: string[] = Array.isArray(selected)
      ? selected.map((it: any) => (typeof it === 'string' ? it : it?.value)).filter(Boolean)
      : []
    setItems(values)
  }

  return (
    <View style={viewStyle}>
      {label && (!isNotShowInputSelect || items.length > 0) && (
        <TextComponent
          text={label}
          style={{ marginBottom: 6 }}
          color="onSurface"
          font="semibold"
        />
      )}

      <MultiSelect
        data={dataTranslated}
        disable={disable}
        labelField="label"
        valueField="value"
        value={items}
        onChange={handleChange}
        search={isSearch}
        searchPlaceholder={t(searchPlaceholder)}
        placeholder={t(placeholder)}
        style={{
          borderWidth: 1,
          borderColor: colors.outlineVariant,
          borderRadius: 8,
          padding: 12,
          backgroundColor: colors.background,
          display: isNotShowInputSelect ? 'none' : 'flex',
        }}
        placeholderStyle={{ color: colors.onSurfaceVariant, fontSize: 14, fontFamily: FONT_FAMILIES.REGULAR }}
        selectedTextStyle={{ color: colors.onSurfaceVariant, fontSize: 14, fontFamily: FONT_FAMILIES.REGULAR }}
        inputSearchStyle={{
          color: colors.onBackground,
          borderRadius: 8,
        }}
        containerStyle={{
          borderRadius: 8,
          backgroundColor: colors.background,
          borderWidth: 1,
          borderColor: colors.surfaceDisabled,
        }}
        activeColor={colors.surfaceVariant}
        renderRightIcon={() => (
          <Icon name="ChevronDown" size={18} color="onSurface" />
        )}

        renderItem={(item) => {
          const checked = items.includes(item.value)
          return (
            <RowComponent
              alignItems="center"
              style={{
                paddingVertical: 12,
                paddingHorizontal: 12,
                borderBottomWidth: 1,
                borderBottomColor: colors.surface,
              }}
            >
              <Checkbox
                checked={checked}
                setChecked={() => {
                  if (checked) {
                    setItems(items.filter(i => i !== item.value))
                  } else {
                    setItems([...items, item.value])
                  }
                }}
                style={{ marginRight: 10 }}
              />
              <TextComponent
                text={item.label}
                color={checked ? "primary" : "onBackground"}
              />
            </RowComponent>
          )
        }}

        renderSelectedItem={(selected, unSelect) => (
          <RowComponent
            key={selected.value}
            alignItems="center"
            style={{
              paddingVertical: 4,
              paddingHorizontal: 8,
              backgroundColor: colors.surface,
              borderRadius: 16,
              marginTop: 8,
              marginBottom: 2,
              marginRight: 6,
            }}
          >
            <TextComponent
              text={selected.label}
              numberOfLines={1}
              style={{ maxWidth: 120 }}
            />
            {!isNotShowInputSelect &&
              <TouchableOpacity
                onPress={() => {
                  unSelect && unSelect(selected)
                  setItems(items.filter(i => i !== selected.value))
                }}
                style={{ marginLeft: 6 }}
              >
                <Icon name="X" size={14} color="primary" />
              </TouchableOpacity>
            }
          </RowComponent>
        )}
      />
    </View>
  )
}

export default MultiSelectDropdown
