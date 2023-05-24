import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

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
