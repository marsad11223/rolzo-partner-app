import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';

import Button from '../../../components/Button';
import { AddComponent, EditComponent } from '../../Account/Components';
import SearchBar from '../../Account/Components/AccountSearch';
import Header from '../../../components/Header';
import { getData } from '../../../utils/storage';
import AppLoading from '../../../components/Loading/AppLoading';
import { hp } from '../../../utils/responsiveness'
import { icons } from '../../../assets/images';
import { showToast } from '../../../utils/helper'

const VehicleSelectionScreen = ({ route }) => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [booking, setBooking] = useState(route?.params);
  const [vehicles, setVehicles] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(route?.params?.partnerVehicleId);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    isFocused && fetchVehicles();
    return () => {
    }
  }, [isFocused])

  const fetchVehicles = async () => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/car/${token}?page=1&limit=10`);
      setVehicles(response.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const searchVehicles = async (search) => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/car/${token}?page=1&limit=10&filter[vehicleName,like]=${search}`);
      setVehicles(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const renderItem = ({ item, index }) => {
    const profilePic = item.vehicleImage ? { uri: item.vehicleImage } : icons.carIcon;

    if (index == 0) {
      return (
        <AddComponent
          Icon={icons.chauffeurGrey}
          title={'Add vehicle'}
          onPress={() => {
            navigation.navigate('AddVehicleDetails')
          }}
          key={0}
        />
      )
    }
    return (
      <EditComponent
        Icon={profilePic}
        title={`${item.make.label} ${item.model.label}`}
        subtitle={item.plateNumber}
        borderLessImage
        mode={'select'}
        selected={selectedVehicle}
        setSelected={setSelectedVehicle}
        key={item._id}
        value={item._id}
        style={{
          borderColor: item._id === selectedVehicle ? '#0c0c0c' : 'rgba(139,149,158,.5)'
        }}
      />
    )
  }

  const handleSubmit = async () => {

    try {
      const data = {
        vehicleId: selectedVehicle
      }
      setLoading(true);
      const response = await axios.patch(`https://staging.rolzo.com/api/api/v1/external/car/assign/${booking._id}`, data);
      console.log(response?.data?.meta?.success, 'response');
      if (response?.data?.meta?.success) {
        setLoading(false);
        navigation.navigate('ConfirmSelectionScreen', booking)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast(error?.message, 'error');
    }
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <Header title={`Booking #${booking?.number}`} />
      {/* body */}
      <View style={{
        padding: 30,
        flex: 1
      }}>
        <Text style={{
          fontSize: 25,
          marginBottom: hp(30)
        }}>
          Select a vehicle
        </Text>
        <SearchBar
          placeholder={'Search vehicle name'}
          value={search}
          handleSearch={e => {
            setSearch(e)
            searchVehicles(e)
          }}
          style={{
            borderRadius: 10,
            backgroundColor: '#fbfbfb',
          }}
        />

        <AppLoading loading={loading}>
          <FlatList
            data={vehicles ? [{ _id: '1' }, ...vehicles] : [{ _id: '1' }]}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: hp(60) }}
          />
        </AppLoading>
      </View>

      <View style={styles.bottomContainer}>
        <View style={{ width: '90%', marginBottom: 10 }}>
          <Button label={'Next'} onPress={handleSubmit} />
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    position: 'relative',
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
  },
});

export default VehicleSelectionScreen;
