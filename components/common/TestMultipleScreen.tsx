import { View } from 'react-native'
import { ReactNode } from 'react'

type DeviceType =
  | 'iphoneSE'
  | 'iphone12'
  | 'iphone14ProMax'
  | 'androidSmall'
  | 'androidLarge'
  | 'tablet10'
  | 'custom'

interface TestWrapperProps {
  device?: DeviceType
  width?: number
  height?: number
  children: ReactNode
}

const DEVICE_SIZES: Record<DeviceType, { width: number; height: number }> = {
  iphoneSE: { width: 320, height: 568 },       // iPhone SE (2016)
  iphone12: { width: 390, height: 844 },       // iPhone 12/13
  iphone14ProMax: { width: 430, height: 932 }, // iPhone 14 Pro Max
  androidSmall: { width: 360, height: 740 },   // Android 5-6 inch
  androidLarge: { width: 412, height: 915 },   // Android 6.5-6.7 inch
  tablet10: { width: 800, height: 1280 },      // Tablet 10 inch
  custom: { width: 320, height: 640 },         // fallback
}

export default function TestWrapper({
  device = 'custom',
  width,
  height,
  children,
}: TestWrapperProps) {
  const { width: defaultWidth, height: defaultHeight } = DEVICE_SIZES[device]

  return (
    <View
      style={{
        width: width ?? defaultWidth,
        height: height ?? defaultHeight,
        borderWidth: 2,
        borderColor: 'red',
        alignSelf: 'center',
        overflow: 'hidden',
      }}
    >
      {children}
    </View>
  )
}
