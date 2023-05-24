import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import NewOffers from './NewOffers';

const BookingScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'New offers (0)' },
    { key: 'second', title: 'Planned (0)' },
    { key: 'third', title: 'Completed (0)' },
  ]);

  const FirstRoute = () => <View style={{ flex: 1 }} />;

  const SecondRoute = () => <View style={{ flex: 1 }} />;

  const ThirdRoute = () => <View style={{ flex: 1 }} />;

  const renderScene = SceneMap({
    first: NewOffers,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#000' }}
      style={{ backgroundColor: '#fff' }}
      labelStyle={{ color: '#8b959e', fontSize: 11 }}
      activeColor="#000"
      renderLabel={({ route, focused, color }) => {
        return (
          <Text style={{ color, margin: 0, fontSize: 16 }} numberOfLines={1}>
            {route.title}
          </Text>
        );
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookings</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 34,
    marginTop: 60,
  },
});

export default BookingScreen;
