import { useEffect, useState } from 'react'
import { ViewStyle } from 'react-native'

import i18next from '@/locales'
import useStore from '@/store'
import InlineDropdown from './InlineDropdown'


const ChangeLanguageDropdown = ({ viewStyle }: { viewStyle?: ViewStyle }) => {
    const { setActionName, currentLanguage } = useStore()
    const [language, setLanguage] = useState<'en' | 'vi' | 'zh-TW' | 'zh-CN'>(currentLanguage)

    useEffect(() => {
        setActionName('currentLanguage', language)
        i18next.changeLanguage(language)
    }, [language, setActionName])

    return (
        <InlineDropdown
            select={language}
            setSelect={(value) => setLanguage(value as 'en' | 'vi' | 'zh-TW' | 'zh-CN')}
            selects={[
                { label: 'english', value: 'en' },
                { label: 'vietnamese', value: 'vi' },
                { label: 'taiwanese', value: 'zh-TW' },
                { label: 'chinese', value: 'zh-CN' },
            ]}
            viewStyle={{ width: 152, ...viewStyle }}
        />
    )
}

export default ChangeLanguageDropdown

