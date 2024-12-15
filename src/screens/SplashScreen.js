import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';

export default function SplashScreen() {
  const navigation = useNavigation();
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../assets/splash_video.mp4.mp4')}
        style={styles.video}
        resizeMode="cover"
        repeat={false}
        onEnd={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
