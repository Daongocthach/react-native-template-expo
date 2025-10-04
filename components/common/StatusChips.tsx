import React from 'react'
import { Pressable, View, StyleSheet } from 'react-native'
import { useTheme } from '@/contexts/ThemeProvider'
import HorizontalScrollWithButtons from './HorizontalScrollWithButtons'
import TextComponent from './TextComponent'

interface StatusChipsProps {
  value: number | string
  onChange: (value: any) => void
  options: { label: string; value: number | string }[]
}

const StatusChips = ({ value, onChange, options }: StatusChipsProps) => {
  const { colors } = useTheme()

  return (
    <View style={{ marginVertical: 8 }}>
      <HorizontalScrollWithButtons>
        {options.map((status) => {
          const isActive = value === status.value
          return (
            <Pressable
              key={status.value}
              onPress={() => onChange(status.value)}
              style={[
                styles.chip,
                {
                  borderColor: isActive ? colors.primary : colors.outlineVariant,
                  marginRight: 4,
                },
              ]}
            >
              <TextComponent
                color={isActive ? "primary" : "onBackground"}
                text={status.label}
                size={12}
              />
            </Pressable>
          )
        })}
      </HorizontalScrollWithButtons>
    </View>
  )
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
})

export default StatusChips
