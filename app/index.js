// app/index.js
import { View, Text, Image, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { useFonts } from 'expo-font';

export default function Splash() {
  const [fontsLoaded] = useFonts({
    'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
    'Lora-Regular': require('../assets/fonts/Lora-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      const timeout = setTimeout(() => {
        router.replace('/welcome');
      }, 4500);
      return () => clearTimeout(timeout);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GoLocal</Text>
      <Image
        source={require('../assets/shop.png')} 
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.tagline}>A free of cost local tour guide</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:0,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 45,
    color: 'green',
    fontFamily: 'LilitaOne-Regular',
    marginTop: 250,
    marginBottom:20,
  },
  image: {
    width: 210,
    height: 210,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Lora-Regular',
    position: 'absolute',
    bottom: 240,
  },
});

export const options = {
  headerShown: false,
};
