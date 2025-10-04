import { View, StyleSheet } from 'react-native'
import RowComponent from './RowComponent'

interface DotIndicatorProps {
  total: number
  activeIndex: number
}

export default function DotIndicator({ total, activeIndex }: DotIndicatorProps) {
  return (
    <RowComponent gap={8} justify='center'>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </RowComponent>
  )
}

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activeDot: {
    backgroundColor: '#00BFFF',
  },
  inactiveDot: {
    backgroundColor: '#D3D3D3',
  },
})
