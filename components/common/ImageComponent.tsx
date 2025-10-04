import { useState, useEffect } from 'react'
import { ActivityIndicator, Image, ImageProps, TouchableOpacity, View } from 'react-native'
import { useImageViewerModal } from './ImageViewerModal'
import TextComponent from './TextComponent'
import { useTheme } from '@/contexts/ThemeProvider'

interface ImageComponentProps extends ImageProps {
  uri?: string | null
  isShowViewer?: boolean
  isOutline?: boolean
  label?: string
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'
}

const ImageComponent = (props: ImageComponentProps) => {
  const { ImageViewerModal, open } = useImageViewerModal()
  const { colors } = useTheme()
  const {
    uri,
    source,
    isShowViewer = false,
    isOutline = false,
    label,
    style,
    resizeMode = 'cover',
    ...rest
  } = props
  const [loading, setLoading] = useState(true)

  const handleOpenViewerModal = () => {
    if (uri) open(uri)
  }

  const getImageSource = () => {
    if (uri) return { uri }
    if (source) return source
    return undefined
  }

  useEffect(() => {
    let timer: any
    if (loading) {
      timer = setTimeout(() => setLoading(false), 2000)
    }
    return () => clearTimeout(timer)
  }, [loading])

  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity onPress={handleOpenViewerModal} disabled={!isShowViewer}>
        <Image
          {...rest}
          source={getImageSource()}
          style={[{
            width: '100%',
            height: '100%',
            backgroundColor: isOutline ? 'transparent' : colors.surface,
            borderWidth: isOutline ? 1 : 0,
            borderColor: isOutline ? colors.outlineVariant : 'transparent',
            borderRadius: 8,
          }, style]}
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
          onLoadEnd={() => setLoading(false)}
          onError={() => setLoading(false)}
          resizeMode={resizeMode}
        />
        {loading && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginLeft: -10,
              marginTop: -10,
            }}
            size="small"
            color={colors.primary}
          />
        )}
      </TouchableOpacity>

      {label && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            backgroundColor: 'rgba(0,0,0,0.5)',
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <TextComponent
            color="onPrimary"
            textAlign="center"
            text={label}
            numberOfLines={1}
          />
        </View>
      )}

      <ImageViewerModal />
    </View>
  )
}

export default ImageComponent
