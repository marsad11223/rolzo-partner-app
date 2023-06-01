import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { AuthProvider } from './src/providers/AuthProvider';
import RootStack from './src/navigation/RootStack';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: 'white',
    flex: 1,
    paddingBottom: Platform.OS === 'ios' ? getStatusBarHeight() / 4 : 0,
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
  };

  return (
    <NavigationContainer>
      <View style={{ zIndex: 999, }}>
        <Toast position="top" ref={ref => Toast.setRef(ref)} visibilityTime={2000} />
      </View>
      <AuthProvider>
        <View style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor="white"
          />
          <RootStack></RootStack>
        </View>
      </AuthProvider>
    </NavigationContainer>
  );
}
