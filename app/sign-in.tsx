
import IMAGES from '@/assets/images'
import Overview from '@/components/auth/Overview'
import LoginForm from '@/components/form/LoginForm'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignIn = () => {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, paddingHorizontal: 12 }}>
      <ScrollView>
        <Overview
          imageSource={IMAGES.LOGIN_BANNER}
          title='log in to level up your projects'
          caption='unlock tools to manage, collaborate, and excel. Take your projects further — smarter and faster'
        />
        <LoginForm />
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
