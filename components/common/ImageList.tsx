import { FlatList, Image, TouchableOpacity } from 'react-native'

import IMAGES from '@/assets/images'
import ColumnComponent from './ColumnComponent'
import ImageComponent from './ImageComponent'
import { useImageViewerModal } from './ImageViewerModal'
import TextComponent from './TextComponent'

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
        source={IMAGES.NOIMAGE}
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
