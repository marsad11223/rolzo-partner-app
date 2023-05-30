import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import axios from 'axios';
import AppLoading from '../../components/Loading/AppLoading';
import Card from './Card';

import BookingGold from '../../assets/images/icons/icon-bookings-gold.png';
import Earning from '../../assets/images/icons/icon-earnings.png';
import ChauffeurGold from '../../assets/images/icons/icon-chauffeur-gold.png';
import VehicleGold from '../../assets/images/icons/icon-vehicle-gold.png';
import { getData, setData, removeData } from '../../utils/storage';

const HomeScreen = () => {
  const [service, setService] = useState(0);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    return () => {
    }
  }, [])

  const fetchData = async () => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/partnerToken/${token}/home-page?page=1&limit=10`);
      setUserData(response.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <AppLoading loading={loading}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{userData?.userName}</Text>
        <View style={{ marginHorizontal: 30 }}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={service === 0 ? styles.activeToggle : styles.inactiveToggle}
              onPress={() => {
                setService(0);
              }}
            >
              <Text style={service === 0 ? styles.activeText : styles.inactiveText}>Chauffer service</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={service === 1 ? styles.activeToggle : styles.inactiveToggle}
              onPress={() => {
                setService(1);
              }}
            >
              <Text style={service === 1 ? styles.activeText : styles.inactiveText}>Car Rental</Text>
            </TouchableOpacity>
          </View>

          <Card
            title={'Today'}
            Icon={BookingGold}
            amount={userData?.todaysBookings?.length}
            amountSubtitle={'Bookings'}
          />
          <Card
            title={'New offers'}
            Icon={BookingGold}
            amount={userData?.newOffers?.length}
            amountSubtitle={'New offers'}
          />
          <Card
            title={'Earnings'}
            Icon={Earning}
            amount={`${userData?.totalEarnings} USD`}
            amountSubtitle={'Total earnings'}
            transactions={
              service === 0
                ? [
                  { title: `Transfer(${userData?.transferBookingsCounter})`, amount: userData?.transferEarnings },
                  { title: `By the hour(${userData?.hourlyBookingsCounter})`, amount: userData?.hourlyEarnings },
                ]
                : [{ title: `Car rental(${userData?.carRentalBookingsCounter})`, amount: userData?.carRentalEarnings }]
            }
          />
          <Card
            title={service === 0 ? 'Chauffeurs' : 'Agents'}
            Icon={ChauffeurGold}
            amount={service === 0 ? userData?.chauffeurs : userData?.agents}
            amountSubtitle={`Active ${service === 0 ? 'chauffeurs' : 'agents'}`}
          />
          <Card
            title={'Vehicles'}
            Icon={VehicleGold}
            amount={userData?.vehicles}
            amountSubtitle={'Active vehicles'}
          />
        </View>
      </ScrollView>
    </AppLoading>
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
  inactiveText: {
    color: '#8b959e',
    textAlign: 'center',
  },
  activeText: {
    color: '#fbfbfb',
    textAlign: 'center',
  }
});

export default HomeScreen;
