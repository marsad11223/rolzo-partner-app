import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { icons } from '../../../assets/images';
import Information from './Information';
import TripUpdate from './TripUpdate';
import Button from '../../../components/Button';
import { Colors } from '../../../theme/variables';
import Header from '../../../components/Header';

const BookingDetailsScreen = ({ route, navigation }) => {
  const booking = route?.params
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(0);

  const [routes] = useState([
    { key: 'first', title: 'Information' },
    { key: 'second', title: 'Trip updates' },
  ]);

  const renderScene = SceneMap({
    first: () => <Information booking={booking} />,
    second: () => <TripUpdate />,
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

  const handleAccept = async () => {
  }
  const handleDecline = () => {
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <Header title={`Booking #${booking?.number}`} />
      {/* body */}
      {booking?.bookingStatus === 'pending'
        ?
        <>
          <Information booking={booking} marginBottom={140} />
          <View style={styles.bottomContainer}>
            <View style={{ width: '90%', marginBottom: 10 }}>
              <Button label={'Accept offer'} onPress={() => { }} />
            </View>
            <View style={{ width: '90%', marginBottom: 10 }}>
              <Button label={'Decline'} backgroundColor={'#fbfbfb'} textColor={Colors.primary} onPress={() => { }} />
            </View>
          </View>
        </>
        :
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    position: 'relative'
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    borderTopColor: 'rgba(139,149,158,.25)',
    borderTopWidth: 1.5,
    paddingTop: 20,
    backgroundColor: '#fbfbfb',
    width: "100%"
  }
});

export default BookingDetailsScreen;
