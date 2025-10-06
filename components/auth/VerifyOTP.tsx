import { useTheme } from '@/contexts/ThemeProvider'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'

import IMAGES from '@/assets/images'
import CardAuthentication from '@/components/auth/CardAuthentication'
import Overview from '@/components/auth/Overview'
import ButtonComponent from '@/components/common/ButtonComponent'
import FormWrapper from '@/components/common/FormWrapper'
import RowComponent from '@/components/common/RowComponent'
import SpaceComponent from '@/components/common/SpaceComponent'
import TextComponent from '@/components/common/TextComponent'
import TextInputComponent from '@/components/common/TextInputComponent'
import TitleComponent from '@/components/common/TitleComponent'


type SignUpFormInputs = {
    otp: string
}

const VerifyOTP = () => {
    const { colors } = useTheme()
    const router = useRouter()

    const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>({
        defaultValues: {
            otp: '',
        },
    })

    return (
        <FormWrapper keyboardVerticalOffset={120}>
            <Overview imageSource={IMAGES.REGISTER_BANNER}/>
            <SpaceComponent height={40} />
            <CardAuthentication isOutline>
                <TitleComponent text='register' />
                <TextComponent text='sign in with your credentials' />
                <TextInputComponent
                    control={control}
                    name="otp"
                    rules={{ required: 'otp is required' }}
                    placeholder='enter your otp'
                    errorMessage={errors.otp?.message}
                />
                <SpaceComponent height={10} />
                <RowComponent justify='flex-end' gap={5}>
                    <TextComponent text='already have an account' />
                    <ButtonComponent
                        text='login'
                        ghost
                        textStyle={{ color: colors.primary, textDecorationLine: 'underline' }}
                        onPress={() => router.push('/sign-in')}
                    />
                </RowComponent>
            </CardAuthentication>
        </FormWrapper>
    )
}

export default VerifyOTP
