import { useTheme } from '@/contexts/ThemeProvider'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'

import CardAuthentication from '@/components/auth/CardAuthentication'
import ButtonComponent from '@/components/common/ButtonComponent'
import FormWrapper from '@/components/common/FormWrapper'
import RowComponent from '@/components/common/RowComponent'
import TextComponent from '@/components/common/TextComponent'
import TextInputComponent from '@/components/common/TextInputComponent'
import TitleComponent from '@/components/common/TitleComponent'

import useStore from '@/store'

type SignUpFormInputs = {
    email: string
    password: string
    first_name: string
    last_name: string
    confirm_password: string
}

const RegisterForm = () => {
    const { colors } = useTheme()
    const router = useRouter()
    const { isLoading, signUp } = useStore()

    const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>({
        defaultValues: {
            email: '',
            first_name: "",
            last_name: "",
            password: "",
            confirm_password: "",
        },
    })

    return (
        <FormWrapper keyboardVerticalOffset={120}>
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
                <TextInputComponent
                    control={control}
                    name="first_name"
                    rules={{ required: 'first name is required' }}
                    placeholder='enter your first name'
                    errorMessage={errors.first_name?.message}
                />
                <TextInputComponent
                    control={control}
                    name="last_name"
                    rules={{ required: 'last name is required' }}
                    placeholder='enter your last name'
                    errorMessage={errors.last_name?.message}
                />
                <TextInputComponent
                    control={control}
                    name="password"
                    rules={{ required: 'password is required' }}
                    placeholder='enter your password'
                    errorMessage={errors.password?.message}
                    isPassword
                />
                <TextInputComponent
                    control={control}
                    name="confirm_password"
                    rules={{ required: 'confirm password is required' }}
                    placeholder='confirm your password'
                    errorMessage={errors.confirm_password?.message}
                    isPassword

                />
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

export default RegisterForm
