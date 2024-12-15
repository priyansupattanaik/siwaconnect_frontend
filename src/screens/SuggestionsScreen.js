import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios'; // Add axios for API requests
import {useAuth} from '../contexts/AuthContext'; // Import useAuth to get the user's mobile number

export default function SuggestionsScreen() {
  const [suggestion, setSuggestion] = useState('');
  const {user, loading} = useAuth(); // Access logged-in user
  const [name, setName] = useState('');

  // Debugging: Check user data on component load
  useEffect(() => {
    console.log('Logged-in user:', user);
    // Correctly set the name if it's nested inside user.user
    setName(user?.user?.name || '');
  }, [user]);

  const handleSubmitSuggestion = async () => {
    if (loading) {
      Alert.alert(
        'Loading...',
        'Please wait while the user data is being loaded.',
      );
      return;
    }

    if (!suggestion.trim() || !name.trim()) {
      Alert.alert('Please fill in all fields');
      return;
    }

    if (!user || !user.user?.mobile) {
      console.error('User object:', user); // Debugging
      Alert.alert('Error', 'User not found, please log in again.');
      return;
    }

    try {
      const response = await axios.post(
        'http://192.168.29.106:5001/api/suggestions',
        {
          name,
          mobile: user.user.mobile, // Use the nested mobile value
          suggestion,
        },
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Your suggestion has been submitted!');
        setSuggestion(''); // Clear the input
      } else {
        Alert.alert('Error', 'Failed to submit the suggestion');
      }
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      Alert.alert('Error', 'Failed to submit the suggestion');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.suggestionContainer}>
        <Text style={styles.suggestionHeader}>Submit Your Suggestion</Text>
        <TextInput
          style={styles.suggestionInput}
          placeholder="Enter your name"
          placeholderTextColor="#B8B8B8"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.suggestionInput, {marginTop: 10}]}
          placeholder="Enter your suggestion here"
          placeholderTextColor="#B8B8B8"
          value={suggestion}
          onChangeText={setSuggestion}
          multiline
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitSuggestion}>
          <Text style={styles.submitButtonText}>Submit Suggestion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4E9', // Light beige background for the whole screen
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  suggestionContainer: {
    backgroundColor: '#ffffff', // White background for the input container
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
    marginBottom: 20,
  },
  suggestionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  suggestionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    height: 50,
    backgroundColor: '#FAF4E9',
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#D9C8A1', // Light beige button color
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
