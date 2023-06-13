import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { useColorScheme, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { AuthProvider } from './src/providers/AuthProvider';
import RootStack from './src/navigation/RootStack';

export default function App() {

  const isDarkMode = useColorScheme() === 'dark';

  const [fontsLoaded] = useFonts({
    'AvenirNextLTPro-Regular': require('./src/assets/fonts/AvenirNextLTPro-Regular.otf'),
    'AvenirNextLTPro-Bold': require('./src/assets/fonts/AvenirNextLTPro-Bold.otf'),
    'BentonSans-Bold': require('./src/assets/fonts/BentonSans-Bold.otf'),
    'BentonSans-Medium': require('./src/assets/fonts/BentonSans-Medium.otf'),
    'BentonSans-Regular': require('./src/assets/fonts/BentonSans-Regular.otf'),
  });

  Text.defaultProps = {
    style: {
      fontFamily: 'AvenirNextLTPro-Regular',
    },
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const backgroundStyle = {
    backgroundColor: 'white',
    flex: 1,
    paddingBottom: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() * 2.5 : 0,
  };
  onLayoutRootView();

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
        <View style={{ zIndex: 999, }}>

          <Toast position="top" refs={(refs) => Toast.setRef(refs)} visibilityTime={2000} />
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
      </SafeAreaView>
    </NavigationContainer>
  );
}
