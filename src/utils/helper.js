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

export function convertDateFormat(dateString) {
  const dateParts = dateString.split(' ');
  const day = parseInt(dateParts[1].replace(/[^0-9]/g, ''), 10);
  const month = getMonthNumber(dateParts[2]);
  const year = parseInt(dateParts[3], 10);

  const date = new Date(Date.UTC(year, month, day));
  const isoDateString = date.toISOString();
  return isoDateString;
}

export function encodeURLString(string) {
  const encodedString = encodeURIComponent(string);
  return encodedString;
}

export function createQueryString(search, from, to, vehicle, chauffeur) {
  const filters = [];

  if (search) {
    filters.push(`filter[number,like]=${encodeURIComponent(search)}`);
  }
  if (from) {
    filters.push(`filter[pickUpDate,gte]=${encodeURIComponent(from)}`);
  }
  if (to) {
    filters.push(`filter[pickUpDate,lte]=${encodeURIComponent(to)}`);
  }
  if (vehicle) {
    filters.push(`filter[vehicleName,like]=${encodeURIComponent(vehicle)}`);
  }
  if (chauffeur) {
    filters.push(`filter[chauffeurName,like]=${encodeURIComponent(chauffeur)}`);
  }

  const queryString = filters.join('&');
  return queryString;
}


function getMonthNumber(monthString) {
  const monthMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11
  };

  return monthMap[monthString];
}

export const showToast = (text, type = 'success') => {
  Toast.show({
    type: type,
    text1: text,
  });
}