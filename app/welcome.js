import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function Welcome() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4CAF50' }}>
      <Text style={{ fontSize: 36, fontFamily:'LilitaOne-Regular', color: 'white', marginBottom: 30 }}>
        Explore your locality
      </Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity
          onPress={() => router.push('/signup')}
          style={{
            backgroundColor: '#A5D6A7',
            paddingVertical: 15,
            paddingHorizontal: 40,
            borderRadius:10,
            opacity:0.5,
          }}>
          <Text style={{ color:'0F4E1B',fontFamily: 'LilitaOne-Regular', fontSize: 20 }}>Sign up</Text>
        </TouchableOpacity>
        <Text style={{ fontFamily:'Lora-Regular',color: 'white', paddingHorizontal:5,bottom:-10,fontSize:20}}>or</Text>
        <TouchableOpacity
          onPress={() => router.push('/signin')}
          style={{
           backgroundColor: '#A5D6A7',
            paddingVertical: 15,
            paddingHorizontal: 40,
            borderRadius: 10,
             opacity:0.5,
          }}>
          <Text style={{ color:'0F4E1B',fontFamily: 'LilitaOne-Regular', fontSize: 20}}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
