import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { AuthContext } from '../providers/AuthProvider';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <AuthContext.Consumer>
      {({ isSessionValid }) => (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {isSessionValid || true ? (
            <Stack.Screen name="Main" component={MainStack}></Stack.Screen>
          ) : (
            <Stack.Screen name="Auth" component={AuthStack}></Stack.Screen>
          )}
        </Stack.Navigator>
      )}
    </AuthContext.Consumer>
  );
};

export default RootStack;
