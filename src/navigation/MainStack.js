import React, { useContext, useEffect } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../providers/AuthProvider';
import { icons } from '../assets/images';
import {
  BookingScreen,
  HomeScreen,
  BookingDetailsScreen,
  AccountScreen,
  EditChaufferDetails,
  AddChaufferDetails,
  EditCompanyDetails,
  AddVehicleDetails,
  EditVehicleDetails,
  VehicleSelectionScreen,
  ChauffeurSelectionScreen,
  ConfirmSelectionScreen
}
  from '../screens';

const Tab = createBottomTabNavigator();
const Main = createStackNavigator();

const Tabs = () => {
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
          } else if (route.name === 'Logout') {
            IconName = icons.logoutIcon
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
      <Tab.Screen name="Bookings" component={BookingScreen} />
      <Tab.Screen name="Accounts" component={AccountScreen} />
      <Tab.Screen name="Logout"
        component={() => {
          const { logout } = useContext(AuthContext);
          useEffect(() => {
            logout();
          }, []);
          return null;
        }}
      />
    </Tab.Navigator>
  );
}

const MainStack = () => {
  return (
    <Main.Navigator screenOptions={{ headerShown: false }} >
      <Main.Screen name="Tabs" component={Tabs} />
      <Main.Screen name="BookingDetails" component={BookingDetailsScreen} />
      <Main.Screen name="EditChaufferDetails" component={EditChaufferDetails} />
      <Main.Screen name="AddChaufferDetails" component={AddChaufferDetails} />
      <Main.Screen name="EditCompanyDetails" component={EditCompanyDetails} />
      <Main.Screen name="AddVehicleDetails" component={AddVehicleDetails} />
      <Main.Screen name="EditVehicleDetails" component={EditVehicleDetails} />
      <Main.Screen name="ChauffeurSelectionScreen" component={ChauffeurSelectionScreen} />
      <Main.Screen name="VehicleSelectionScreen" component={VehicleSelectionScreen} />
      <Main.Screen name="ConfirmSelectionScreen" component={ConfirmSelectionScreen} />
    </Main.Navigator>
  );
};

export default MainStack;
