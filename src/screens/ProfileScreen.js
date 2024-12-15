import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useAuth} from '../contexts/AuthContext';

const dummySuggestions = [
  {id: '1', text: 'We should organize a community garden event!'},
  {id: '2', text: 'How about a monthly book club meeting?'},
];

export default function ProfileScreen({navigation}) {
  const {logout, user} = useAuth();
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
  });

  useEffect(() => {
    console.log('User data in ProfileScreen:', user);

    if (user) {
      setUserDetails({
        name: user.user?.name || 'No Name Provided',
        email: user.user?.email || 'No Email Provided',
        mobile: user.user?.mobile || 'No Mobile Provided',
        address: user.user?.address || 'No Address Provided',
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/pfp.jpg')}
          style={styles.profilePicture}
        />
        <Text style={styles.name}>{userDetails.name}</Text>
        <Text style={styles.username}>@{userDetails.mobile}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Details</Text>
        <Text style={styles.detail}>Email: {userDetails.email}</Text>
        <Text style={styles.detail}>Mobile: {userDetails.mobile}</Text>
        <Text style={styles.detail}>Address: {userDetails.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suggestions and Feedback</Text>
        {dummySuggestions.map(suggestion => (
          <Text key={suggestion.id} style={styles.suggestion}>
            {suggestion.text}
          </Text>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4E9',
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#D9C8A1',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  username: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detail: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  suggestion: {
    fontSize: 14,
    marginBottom: 8,
    fontStyle: 'italic',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
