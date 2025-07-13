import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.includes('@') || !email.includes('.')) newErrors.email = 'Enter a valid email';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validate()) {
      console.log('Form is valid!');
      router.replace('/(drawer)/home'); 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={{ fontFamily: 'Lora-Regular', fontWeight: 'bold' }}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '85%',
    padding: 20,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'Lora-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    paddingVertical: 8,
    fontFamily: 'Lora-Regular',
  },
  button: {
    backgroundColor: '#A5D6A7',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Lora-Regular',
  },
});
