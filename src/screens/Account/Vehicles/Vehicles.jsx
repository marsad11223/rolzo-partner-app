import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';

import SearchBar from '../Components/AccountSearch';
import { icons } from '../../../assets/images';
import { AddComponent, EditComponent } from '../Components';
import AppLoading from '../../../components/Loading/AppLoading';
import { getData } from '../../../utils/storage';

const Vehicles = () => {

  const navigation = useNavigation();
  const focused = useIsFocused();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState(null);

  useEffect(() => {
    focused && fetchVehicles();
    return () => {
    }
  }, [focused])

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
    }
  }

  const renderItem = ({ item, index }) => {
    const profilePic = item.vehicleImage ? { uri: item.vehicleImage } : icons.carIcon;

    if (index === 0) {
      return (
        <AddComponent
          Icon={icons.chauffeurGrey}
          title={'Add vehicle'}
          onPress={() => { navigation.navigate('AddVehicleDetails') }}
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
        onPress={() => {
          navigation.navigate('EditVehicleDetails', item)
        }}
        key={item._id}
      />
    )
  }

  return (
    <View style={styles.container}>
      {/* search */}
      <View style={{
        marginTop: 30,
      }}>
        <SearchBar
          placeholder={'Search vehicle'}
          value={search}
          handleSearch={e => {
            setSearch(e);
            searchVehicles(e);
          }}
        />
      </View>

      <AppLoading loading={loading}>
        <FlatList
          data={vehicles ? [{ _id: 1 }, ...vehicles] : [{ _id: 1 }]}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
      </AppLoading>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Vehicles;
