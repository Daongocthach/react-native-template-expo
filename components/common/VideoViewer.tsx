import { TouchableOpacity, View } from 'react-native'
import { useEffect } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'
import Video from 'react-native-video'
import Icon from '@/components/common/Icon'
import ModalComponent from './ModalComponent'
import { Portal } from 'react-native-paper'


interface VideoViewerProps {
  uri: string | null
  onClose: () => void
}

export default function VideoViewer({ uri, onClose }: VideoViewerProps) {
  useEffect(() => {
    if (uri) {
      ScreenOrientation.unlockAsync()
    }
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    }
  }, [uri])

  return (
    <Portal>
      <ModalComponent visible={!!uri} transparent animationType="slide">
        <View style={{
          justifyContent: 'center',
          backgroundColor: 'black'
        }}>
          {uri && (
            <Video
              source={{ uri }}
              style={{ width: "100%", height: "100%" }}
              controls
              resizeMode="contain"
            />
          )}
          <TouchableOpacity style={{
            position: 'absolute',
            right: 20,
            top: 50,
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: 6,
            borderRadius: 20,
          }} onPress={onClose}>
            <Icon name="X" size={28} color="onPrimary" />
          </TouchableOpacity>
        </View>
      </ModalComponent>
    </Portal>
  )
}
