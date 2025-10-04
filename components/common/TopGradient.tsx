import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native'

export default function TopGradient() {
  return (
    <LinearGradient
      colors={[
        'rgba(78, 222, 255, 0.2)',
        'rgba(78, 222, 255, 0.05)',
        'rgba(78, 222, 255, 0.025)',
        'transparent', 
      ]}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 1 }}
      style={styles.circle}
    />
  )
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    top: -220,
    left:  -150,
    alignSelf: 'center',
    width: 550,
    height: 550,
    borderRadius: 200,
  },
})
