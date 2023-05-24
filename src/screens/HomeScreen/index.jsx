import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Card from './Card';

import BookingGold from '../../assets/images/icons/icon-bookings-gold.png';
import Earning from '../../assets/images/icons/icon-earnings.png';
import ChauffeurGold from '../../assets/images/icons/icon-chauffeur-gold.png';
import VehicleGold from '../../assets/images/icons/icon-vehicle-gold.png';

const HomeScreen = () => {
  const [service, setService] = useState(0);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Hello, Abdullah</Text>
      <View style={{ marginHorizontal: 30 }}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={service === 0 ? styles.activeToggle : styles.inactiveToggle}
            onPress={() => {
              setService(0);
            }}
          >
            <Text style={styles.toggleText}>Chauffer service</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={service === 1 ? styles.activeToggle : styles.inactiveToggle}
            onPress={() => {
              setService(1);
            }}
          >
            <Text style={styles.toggleText}>Car Rental</Text>
          </TouchableOpacity>
        </View>

        <Card
          title={'Today'}
          Icon={BookingGold}
          amount={0}
          amountSubtitle={'Bookings'}
        />
        <Card
          title={'New offers'}
          Icon={BookingGold}
          amount={0}
          amountSubtitle={'New offers'}
        />
        <Card
          title={'Earnings'}
          Icon={Earning}
          amount={'240.0 USD'}
          amountSubtitle={'New offers'}
          transactions={
            service === 0
              ? [
                  { title: 'Transfer(1)', amount: '39.00' },
                  { title: 'By the hour(1)', amount: '201.00' },
                ]
              : [{ title: 'Car rental(0)', amount: '0.00' }]
          }
        />
        <Card
          title={'Chauffeurs'}
          Icon={ChauffeurGold}
          amount={1}
          amountSubtitle={'Active chauffeurs'}
        />
        <Card
          title={'Vehicles'}
          Icon={VehicleGold}
          amount={1}
          amountSubtitle={'Active chauffeurs'}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(139,149,158,.1)',
  },
  title: {
    fontSize: 30,
    marginTop: 60,
    textAlign: 'center',
  },
  toggleContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  activeToggle: {
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: 150,
  },
  inactiveToggle: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: 150,
  },
  toggleText: {
    color: '#8b959e',
    textAlign: 'center',
  },
});

export default HomeScreen;
