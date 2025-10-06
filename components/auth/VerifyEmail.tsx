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

import { useTheme } from '@/contexts/ThemeProvider'
import useStore from '@/store'

type SignUpFormInputs = {
    email: string
    password: string
}

const VerifyEmail = () => {
    const { colors } = useTheme()
    const router = useRouter()
    const { isLoading, signUp } = useStore()

    const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>({
        defaultValues: {
            email: '',
        },
    })
    return (
        <FormWrapper keyboardVerticalOffset={200}>
            <Overview
                imageSource={IMAGES.REGISTER_BANNER}
                title='register today to manage your projects smarter'
                caption='get powerful tools to collaborate, track, and achieve more — all in one place'
            />
            <SpaceComponent height={40} />
            <CardAuthentication isOutline>
                <TitleComponent text='register' />
                <TextComponent text='sign in with your credentials' />
                <TextInputComponent
                    control={control}
                    name="email"
                    rules={{ required: 'email is required' }}
                    placeholder='enter your email'
                    errorMessage={errors.email?.message}
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

export default VerifyEmail
