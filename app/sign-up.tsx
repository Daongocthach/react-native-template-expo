import { useTheme } from '@/contexts/ThemeProvider'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'

import {
  ProgressStep,
  ProgressSteps,
  RegisterForm,
  VerifyEmail,
  VerifyOTP
} from '@/components'

import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type SignUpFormInputs = {
  email: string
  password: string
}

const SignUp = () => {
  const { colors } = useTheme()
  const router = useRouter()

  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>({
    defaultValues: {
      email: '',

    },
  })

  const onSubmit = (data: SignUpFormInputs) => {
    console.log('Login data:', data)
  }


  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, paddingHorizontal: 12 }}>
      <ScrollView>
        <ProgressSteps>
          <ProgressStep label='email'>
            <VerifyEmail />
          </ProgressStep>
          <ProgressStep label='verify otp'>
            <VerifyOTP />
          </ProgressStep>
          <ProgressStep label='credentials'>
            <RegisterForm />
          </ProgressStep>
        </ProgressSteps>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
