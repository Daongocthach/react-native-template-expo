import React, { useRef, useState } from 'react'
import { ScrollView, TouchableOpacity, View, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import Icon from './Icon'
import { useTheme } from '@/contexts/ThemeProvider'

interface HorizontalScrollWithButtonsProps {
  children: React.ReactNode
  scrollStep?: number
}

const HorizontalScrollWithButtons = ({
  children,
  scrollStep = 100,
}: HorizontalScrollWithButtonsProps) => {
  const { colors } = useTheme()
  const scrollRef = useRef<ScrollView>(null)

  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [currentX, setCurrentX] = useState(0)

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent
    setCurrentX(contentOffset.x)
    setAtStart(contentOffset.x <= 0)
    setAtEnd(contentOffset.x + layoutMeasurement.width >= contentSize.width - 1)
  }

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: currentX + offset, animated: true })
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => scrollBy(-scrollStep)} style={styles.button} disabled={atStart}>
        <Icon name="ChevronLeft" size={24} color={atStart ? colors.surfaceDisabled : colors.outlineVariant} />
      </TouchableOpacity>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {children}
      </ScrollView>

      <TouchableOpacity onPress={() => scrollBy(scrollStep)} style={styles.button} disabled={atEnd}>
        <Icon name="ChevronRight" size={24} color={atEnd ? colors.surfaceDisabled : colors.outlineVariant} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 5,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 2,
  },
})

export default HorizontalScrollWithButtons
