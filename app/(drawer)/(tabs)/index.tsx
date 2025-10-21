import { ImageComponent } from '@/components';
import { windowHeight, windowWidth } from '@/lib';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <ImageComponent
        source={{ uri: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3BmLWx1a2VzdGFja3Bvb2xlNi1kb3JzZXQtdWstZy1qb2I1ODAuanBn.jpg' }}
        resizeMode='cover'
        style={{ width: windowWidth, height: windowHeight }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
