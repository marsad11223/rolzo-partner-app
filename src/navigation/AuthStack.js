import React from 'react';
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, OTPScreen } from '../screens';
import { Colors } from '../theme/variables';
import { icons } from '../assets/images';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerTintColor: Colors.black,
        headerTitleAlign: 'center',
        header: () => (
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: '#8B959E',
              borderBottomWidth: StyleSheet.hairlineWidth,
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              backgroundColor: '#fff',
            }}
          >
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Image source={icons.back} style={styles.backIcon}></Image>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                // fontFamily: 'AvenirNextLTPro-Bold',
              }}
            >
              {route.name}
            </Text>
          </View>
        ),
        headerShadowVisible: false,
        headerLeft: () =>
          navigation.canGoBack() ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={icons.back} style={styles.backIcon}></Image>
            </TouchableOpacity>
          ) : null,
      })}
    >
      <Stack.Screen
        name="Login"
        options={{
          headerShown: false,
        }}
        component={Login}
      ></Stack.Screen>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Verify"
        component={OTPScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({
  backBtn: {
    paddingLeft: 16,
    position: 'absolute',
    left: 0,
  },
  backIcon: {
    height: 18,
    width: 20,
    resizeMode: 'contain',
    flex: 1,
  },
});
