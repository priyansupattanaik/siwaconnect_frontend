import React, {createContext, useState, useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null); // Set user state to null initially
  const [loading, setLoading] = useState(true); // Track loading state

  // Load user data from AsyncStorage when the app starts
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Parse and set the user data if available
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setLoading(false); // Set loading to false after loading user data
      }
    };

    loadUserData();
  }, []);

  const login = async userData => {
    console.log('Logging in user:', userData); // Check user data in the console
    setUser(userData); // Set the user data in context
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData)); // Persist user data in AsyncStorage
      Alert.alert('Login Successful', 'Welcome back!');
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };

  const logout = async () => {
    setUser(null); // Clear user data from context
    try {
      await AsyncStorage.removeItem('user'); // Remove user data from AsyncStorage
      Alert.alert('Logged out', 'You have successfully logged out');
    } catch (error) {
      console.error('Failed to clear user data:', error);
    }
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{user, loading, login, logout, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};
