import { Image, TouchableOpacity, FlatList } from 'react-native'
import { useImageViewerModal } from './ImageViewerModal'
import IMAGES from '@/assets/images'
import TextComponent from './TextComponent'
import ColumnComponent from './ColumnComponent'
import ImageComponent from './ImageComponent'

interface Props {
  uris: string[]
  size?: number
  label?: string
}

export default function ImageList({ uris = [], size = 60, label }: Props) {
  const { open, ImageViewerModal } = useImageViewerModal()

  if (!uris || uris.length === 0) {
    return (
      <Image
        source={IMAGES.NOTHING}
        style={{
          width: size,
          height: size,
          borderRadius: 8,
        }}
        loadingIndicatorSource={IMAGES.LOADING}
      />
    )
  }

  return (
    <ColumnComponent gap={8}>
      {label && (
        <TextComponent
          text={label}
          font="semibold"
          style={{ marginBottom: 2 }}
          color="onSurface"
        />
      )}

      <FlatList
        data={uris}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => open(uris, index)}
            style={{ marginRight: 4 }}
          >
            <ImageComponent
              uri={item}
              style={{
                width: size,
                height: size,
                borderRadius: 8,
              }}
            />
          </TouchableOpacity>
        )}
      />

      <ImageViewerModal />
    </ColumnComponent>
  )
}
