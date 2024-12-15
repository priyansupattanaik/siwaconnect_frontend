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
import {useAuth} from '../contexts/AuthContext'; // Importing AuthContext

const {width, height} = Dimensions.get('window');

export default function SignupScreen() {
  const navigation = useNavigation();
  const {login} = useAuth(); // Destructuring the login function from AuthContext
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle signup form submission
  const handleSignup = async () => {
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await fetch(
        'http://192.168.29.106:5001/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            mobile,
            address,
            password,
          }),
        },
      );

      const result = await response.json();
      console.log('API Response:', result);

      if (response.ok) {
        login(result); // Assuming 'result' contains user data or token
        Alert.alert('Signup successful', 'You can now log in!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Signup failed', result.message || 'Please try again');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Unable to signup. Please try again later.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.overlayContainer}>
        <Image
          source={require('../assets/signup-vector.jpg')}
          style={styles.vectorImage}
        />
        <Text style={styles.title}>Signup</Text>
        <Text style={styles.subtitle}>Register with your personal details</Text>

        <View style={styles.inputSection}>
          <FontAwesome name={'user'} size={20} color={'#ccc'} />
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#ccc"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputSection}>
          <FontAwesome name={'mail-forward'} size={18} color={'#ccc'} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputSection}>
          <FontAwesome name={'mobile'} size={25} color={'#ccc'} />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            placeholderTextColor="#ccc"
            value={mobile}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputSection}>
          <FontAwesome name={'location-arrow'} size={20} color={'#ccc'} />
          <TextInput
            style={styles.input}
            placeholder="Address"
            placeholderTextColor="#ccc"
            value={address}
            onChangeText={setAddress}
            multiline
          />
        </View>

        <View style={styles.inputSection}>
          <FontAwesome name={'lock'} size={20} color={'#ccc'} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.inputSection}>
          <FontAwesome name={'lock'} size={20} color={'#ccc'} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#ccc"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup} // Call handleSignup on press
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbfdda',
    paddingBottom: 20,
  },
  overlayContainer: {
    width: width * 0.85,
    height: height * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
  },
  vectorImage: {
    width: width * 0.4,
    height: width * 0.4,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  subtitle: {
    fontSize: width * 0.04,
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
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
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#007AFF',
    marginTop: 10,
    fontSize: width * 0.04,
  },
});
