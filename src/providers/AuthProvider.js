import React, { createContext, useCallback, useEffect, useState } from 'react';
import Auth from '../services/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { firebase } from '../../firebaseConfig';
import * as Device from 'expo-device';
import { getExpoPushTokenAsync } from 'expo-notifications';
import { getData, removeData, setData } from '../utils/storage';

const options = {
  projectId: 'c782bfd7-9c84-4c9b-bd7c-08599f56fda2',
};

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(false);

  const requestOneTimePassword = useCallback(async (phone) => {
    setLoading(true);
    try {
      const response = await Auth.requestOTP(phone);
      setLoading(false);
      return response?.data?.sid;
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  }, []);

  const login = useCallback(async (phone, sid, code) => {
    setLoading(true);
    try {
      const response = await Auth.verifyOTP(phone, sid, code);
      if (response?.data?.status === 'approved' && Device.isDevice) {
        const { data: token } = await getExpoPushTokenAsync(options);
        const response = await Auth.requestAuthToken(phone, code, token);
        if (response?.data?.partnerToken) {
          await setData('authToken', response?.data?.partnerToken);
          setToken(response?.data?.partnerToken);
          setIsSessionValid(true);
        } else {
          throw Error('Authentication failed');
        }
      } else {
        throw Error('The OTP you have entered is invalid.');
      }
      setLoading(false);
      return response.data.sid;
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  }, []);

  const validateToken = useCallback(async (token) => {
    try {
      const response = await Auth.validateAuthToken(token);
      if (response?.data?.isValid) {
        return true;
      } else return false;
    } catch (error) {
      return false;
    }
  }, []);

  const restoreSession = useCallback(async () => {
    try {
      const token = await getData('authToken');
      const isTokenValid = await validateToken(token);
      if (isTokenValid) {
        setToken(token);
        setIsSessionValid(true);
      } else {
        throw new Error('Session expired');
      }
    } catch (error) {
      console.log(error.message);
      setToken(null);
      setIsSessionValid(false);
      if (SplashScreen && SplashScreen.hide) {
        SplashScreen.hide();
      }
    }
  }, []);


  const logout = useCallback(() => {
    try {
      removeData('authToken');
      setToken(null);
      setIsSessionValid(false);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const checkUserAvailable = useCallback(async (phone) => {
    setLoading(true);
    try {
      const response = await Auth.checkUser(phone);
      setLoading(false);
      return response.registered;
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  }, []);
  useEffect(() => {
    // To logout forcefully
    // AsyncStorage.removeItem('authToken');
    restoreSession();
  }, []);

  // const checkSession = async () => {
  //   setLoading(true);
  //   try {
  //     setLoading(true);
  //     const token = await getData('authToken');
  //     if (token) {
  //       restoreSession();
  //     }
  //     else {
  //       logout()
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
        isSessionValid,
        requestOneTimePassword,
        login,
        logout,
        checkUserAvailable,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
