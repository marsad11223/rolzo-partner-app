import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-toast-message';

export const fileToBase64 = async (uri) => {
  let base64 = '';
  try {
    if (uri) {
      const fileContent = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      base64 = `data:image/jpeg;base64,${fileContent}`;
    }
  } catch (error) {
    console.log('fileToBase64Error', error);
  } finally {
    return base64;
  }
};

export const showToast = (text) => {
  Toast.show({
    type: 'success',
    text1: text,
  });
}