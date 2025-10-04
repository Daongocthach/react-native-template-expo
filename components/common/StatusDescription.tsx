import React from 'react'
import { View, ViewProps } from 'react-native'

import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import HorizontalScrollWithButtons from './HorizontalScrollWithButtons'

interface StatusDescriptionProps extends ViewProps {
  size?: number
  colorLabel?: { color: string; label: string }[]
}

const StatusDescription = (props: StatusDescriptionProps) => {
  const { size, colorLabel = [] } = props

  return (
    <HorizontalScrollWithButtons scrollStep={120}>
      {colorLabel.map((item, index) => (
        <RowComponent key={index} alignItems="center" gap={5} style={{ marginRight: 15 }}>
          <View
            style={{
              width: size || 8,
              height: size || 8,
              borderRadius: (size || 8) / 2,
              backgroundColor: item.color,
            }}
          />
          <TextComponent text={item.label} style={{ color: item.color }} />
        </RowComponent>
      ))}
    </HorizontalScrollWithButtons>
  )
}

export default StatusDescription
