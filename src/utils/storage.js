import AsyncStorage from '@react-native-async-storage/async-storage';

// Method to get data from AsyncStorage
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log('Error retrieving data from AsyncStorage:', error);
    return null;
  }
};

// Method to set data in AsyncStorage
const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Error setting data in AsyncStorage:', error);
  }
};

// Method to remove data from AsyncStorage
const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Error removing data from AsyncStorage:', error);
  }
};

export {
  getData,
  setData,
  removeData
}