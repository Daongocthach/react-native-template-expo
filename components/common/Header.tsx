import { formatPathToTitle } from '@/lib'
import { DrawerToggleButton } from '@react-navigation/drawer'
import { usePathname, useRouter } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const Header = () => {
    const pathName = usePathname()
    const router = useRouter()
    const title = formatPathToTitle(pathName)

    const handleBack = () => {
        router.back()
    }

    return (
        <SafeAreaView edges={['top']} className=''>
            <View className='flex flex-row justify-between items-center h-20'>
                <TouchableOpacity onPress={handleBack} className='flex flex-row items-center space-x-2 pl-4'>
                    <ChevronLeft size={32} />
                    <Text className='text-light-tint font-bold'>{title}</Text>
                </TouchableOpacity>
                <DrawerToggleButton />
            </View>
        </SafeAreaView>
    )
}

export default Header