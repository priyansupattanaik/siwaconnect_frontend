import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useAuth} from '../contexts/AuthContext';

const LoginScreen = () => {
  const navigation = useNavigation();
  const {login} = useAuth();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  // Handle login
  const handleLogin = async () => {
    if (!mobile || !password) {
      Alert.alert('Error', 'Please enter both mobile number and password');
      return;
    }

    try {
      const response = await fetch(
        'http://192.168.29.106:5001/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({mobile, password}),
        },
      );

      const result = await response.json();

      if (response.ok) {
        login(result);
        Alert.alert('Login successful', 'Welcome back!');
        navigation.navigate('Main');
      } else {
        Alert.alert('Error', result.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Unable to login. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/bg.png')}
        style={styles.backgroundImage}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.overlayContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.header}>Login</Text>
          <Text style={styles.tagline}>Connect with your community</Text>

          <View style={styles.inputSection}>
            <FontAwesome name="mobile" size={30} color="#ccc" />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor="#ccc"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputSection}>
            <FontAwesome name="lock" size={25} color="#ccc" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#ccc"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={styles.link}>Reset Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.link}>Don't have an account? Signup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfdda',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scrollView: {
    flexGrow: 1,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    marginHorizontal: 20,
    borderRadius: 20,
    marginVertical: 90,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
    textAlign: 'center',
  },
  tagline: {
    fontSize: width * 0.04,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '9%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    color: 'grey',
  },
  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#007AFF',
    marginTop: 10,
    fontSize: width * 0.04,
    textAlign: 'center',
  },
});

export default LoginScreen;
