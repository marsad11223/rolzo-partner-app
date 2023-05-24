import axios from 'axios';
import { STAGING_BASE_URL } from '@env';

const BASE_URL = STAGING_BASE_URL;
const Auth = {
  requestOTP: async (phone) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/external/sms-verification/${phone}`
      );
      console.log('requestOTP', response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  verifyOTP: async (phone, sid, code) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/external/sms-verification-check/${phone}/${sid}/${code}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  requestAuthToken: async (phone, code, fcmToken) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/external/partnerToken/auth/${phone}/${code}/${fcmToken}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  validateAuthToken: async (token) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/external/partnerToken/${token}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  checkUser: async (phone) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/external/checkDriverRegistered/${phone}`
      );
      return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default Auth;
