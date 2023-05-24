import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens';
import { icons } from '../assets/images';

const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let IconName;

          if (route.name === 'Home') {
            IconName = focused ? icons.homeBlack : icons.homeGrey;
          } else if (route.name === 'Bookings') {
            IconName = focused ? icons.bookingBlack : icons.bookingGrey;
          } else if (route.name === 'Accounts') {
            IconName = focused ? icons.accountBlack : icons.accountGrey;
          }

          return (
            <Image
              resizeMode="contain"
              source={IconName}
              style={{ width: 20, height: 20 }}
            />
          );
        },
        headerShown: false,
        tabBarStyle: { paddingBottom: 10, height: 60 },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: '#8b959e',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookings" component={HomeScreen} />
      <Tab.Screen name="Accounts" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default MainStack;
