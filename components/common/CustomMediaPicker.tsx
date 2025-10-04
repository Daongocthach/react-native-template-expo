import * as ImagePicker from 'expo-image-picker'
import * as VideoThumbnails from 'expo-video-thumbnails'
import { useState } from 'react'

import { FileProps } from '@/lib'
import ButtonComponent from './ButtonComponent'

type PickerMode = 'single' | 'multiple'
type MediaType = 'image' | 'video' | 'all'

interface Props {
    mode?: PickerMode
    mediaType?: MediaType
    label?: string
    files: FileProps[]
    setFiles: (files: FileProps[]) => void
}

export default function CustomMediaPicker({
    mode = 'single',
    mediaType = 'all',
    label = 'choose file',
    files,
    setFiles,
}: Props) {
    const [thumbs, setThumbs] = useState<{ [uri: string]: string }>({})

    const pickMedia = async () => {
        let mediaTypes: ImagePicker.MediaTypeOptions
        if (mediaType === 'image') mediaTypes = ImagePicker.MediaTypeOptions.Images
        else if (mediaType === 'video') mediaTypes = ImagePicker.MediaTypeOptions.Videos
        else mediaTypes = ImagePicker.MediaTypeOptions.All

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes,
            allowsMultipleSelection: mode === 'multiple',
            quality: 1,
        })

        if (!result.canceled) {
            const picked: FileProps[] = []

            for (const asset of result.assets) {
                const file: FileProps = {
                    uri: asset.uri,
                    name: asset.fileName || `${asset.type}-${Date.now()}.${asset.type === 'video' ? 'mp4' : 'jpg'}`,
                    type: asset.type || (mediaType === 'video' ? 'video/mp4' : 'image/jpeg'),
                }

                if (file.type.includes('video')) {
                    try {
                        const { uri: thumbUri } = await VideoThumbnails.getThumbnailAsync(file.uri, { time: 1000 })
                        setThumbs(prev => ({ ...prev, [file.uri]: thumbUri }))
                    } catch (e) {
                        console.warn('Thumbnail error', e)
                    }
                }

                picked.push(file)
            }

            const updatedFiles = mode === 'multiple' ? [...files, ...picked] : picked
            setFiles(updatedFiles)
        }
    }

    return (
        <ButtonComponent
            text={label ?? (mode === 'multiple' ? 'choose files' : 'choose file')}
            icon={mediaType === 'video' ? 'FileVideoCamera' : 'FileImage'}
            onPress={pickMedia}
            buttonStyle={{ flex: 1 }}
            outline
        />
    )
}