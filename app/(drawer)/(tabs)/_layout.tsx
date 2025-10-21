import { Tabs } from 'expo-router'

import { Icon } from '@/components'
import BottomTabBarComponent from '@/components/common/BottomTabBarComponent'
import { useTheme } from '@/contexts/ThemeProvider'

export default function TabLayout() {
  const { colors } = useTheme()

  const screens = [
    {
      name: 'index',
      title: 'projects',
      icon: 'Layers' as const,
    },
    {
      name: 'demo',
      title: 'departments',
      icon: 'Bolt' as const,
    },
    {
      name: 'demo1',
      title: 'qr scanner',
      icon: 'Plus' as const,
    },
    {
      name: 'demo2',
      title: 'teams',
      icon: 'Tag' as const,
    },
    {
      name: 'demo3',
      title: 'meetings',
      icon: 'TvMinimal' as const,
    }
  ]

  return (
    <Tabs
      initialRouteName={'index'}
      screenOptions={{
        headerShown: false,
      }}

      tabBar={(props) => <BottomTabBarComponent {...props} />}
    >
      {screens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ color }) => (
              <Icon size={24} name={screen.icon} color={color} />
            ),
            headerShown: false
          }}
        />
      ))}
    </Tabs>
  )
}