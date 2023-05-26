import { Dimensions } from 'react-native';

export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;
export const hp = (height) => (height / 812) * windowHeight;
export const wp = (width) => (width / 375) * windowWidth;