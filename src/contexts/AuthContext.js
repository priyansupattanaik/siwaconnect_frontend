import React, {createContext, useState, useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const login = async userData => {
    console.log('Logging in user:', userData);
    setUser(userData);
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      Alert.alert('Login Successful', 'Welcome back!');
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem('user');
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
