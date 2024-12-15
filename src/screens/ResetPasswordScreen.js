import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView, // Import ScrollView for scrolling in landscape mode
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');

export default function ResetPasswordScreen() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigation = useNavigation();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.overlayContainer}>
        <Text style={styles.title}>Reset Password</Text>

        <View style={styles.inputSection}>
          <FontAwesome name={'mobile'} size={25} color={'#ccc'} />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            placeholderTextColor="#ccc"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputSection}>
          <FontAwesome name={'lock'} size={20} color={'#ccc'} />
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            placeholderTextColor="#ccc"
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.inputSection}>
          <FontAwesome name={'lock'} size={20} color={'#ccc'} />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#ccc"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.inputSection}>
          <FontAwesome name={'lock'} size={20} color={'#ccc'} />
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            placeholderTextColor="#ccc"
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Back to Login</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: 20,
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
    marginTop: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#007AFF',
    marginTop: 15,
    fontSize: width * 0.04,
  },
});
