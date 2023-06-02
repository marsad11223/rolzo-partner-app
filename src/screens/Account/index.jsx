import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { Chauffer } from './Chauffeurs';
import { Vehicles } from './Vehicles';
import { Earnings } from './Earnings';
import { Payouts } from './Payouts';
import Settings from './Settings';

const AccountScreen = () => {

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'first', title: 'Chauffers' },
    { key: 'second', title: 'Vehicles' },
    { key: 'third', title: 'Earnings' },
    { key: 'fourth', title: 'Payouts' },
    { key: 'fifth', title: 'Settings' },
  ]);

  const renderScene = SceneMap({
    first: () => <Chauffer key={1} />,
    second: () => <Vehicles key={2} />,
    third: () => <Earnings key={3} />,
    fourth: () => <Payouts key={4} />,
    fifth: () => <Settings key={5} />,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#000' }}
      tabStyle={{ width: 100 }}
      scrollEnabled={true}
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
      <Text style={styles.title}>Account</Text>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        overScrollMode={'auto'}
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
  },
});

export default AccountScreen;
