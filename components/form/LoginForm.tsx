import { useTheme } from '@/contexts/ThemeProvider'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'

import CardAuthentication from '@/components/auth/CardAuthentication'
import ButtonComponent from '@/components/common/ButtonComponent'
import FormWrapper from '@/components/common/FormWrapper'
import RowComponent from '@/components/common/RowComponent'
import SpaceComponent from '@/components/common/SpaceComponent'
import TextComponent from '@/components/common/TextComponent'
import TextInputComponent from '@/components/common/TextInputComponent'
import TitleComponent from '@/components/common/TitleComponent'

import useStore from '@/store'

type LoginFormInputs = {
    email: string
    password: string
}

const LoginForm = () => {
    const { colors } = useTheme()
    const router = useRouter()
    const { isLoading, signIn } = useStore()

    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = (data: LoginFormInputs) => {
        if (data.email && data.password) {
            signIn(data)
        }
    }

    return (
        <FormWrapper keyboardVerticalOffset={150}>
            <SpaceComponent height={20} />
            <CardAuthentication isOutline>
                <TitleComponent text='sign in' />
                <TextComponent text='sign in with your credentials' />
                <TextInputComponent
                    control={control}
                    name="email"
                    rules={{ required: 'email is required' }}
                    placeholder='enter your email'
                    errorMessage={errors.email?.message}
                />
                <TextInputComponent
                    control={control}
                    name="password"
                    rules={{ required: 'password is required' }}
                    placeholder='enter your password'
                    isPassword
                    errorMessage={errors.password?.message}
                />
                <SpaceComponent height={10} />
                <RowComponent justify='space-between'>
                    <ButtonComponent
                        text='forgot password'
                        ghost
                        textStyle={{ color: colors.primary, textDecorationLine: 'underline' }}
                        onPress={() => router.push('/forgot-password')}
                    />
                    <ButtonComponent
                        text='sign up'
                        ghost
                        textStyle={{ color: colors.primary, textDecorationLine: 'underline' }}
                        onPress={() => router.push('/sign-up')}
                    />
                </RowComponent>
                <SpaceComponent height={10} />
                <ButtonComponent
                    onPress={handleSubmit(onSubmit)}
                    text='sign in'
                    loading={isLoading}
                />
            </CardAuthentication>
        </FormWrapper>
    )
}

export default LoginForm
