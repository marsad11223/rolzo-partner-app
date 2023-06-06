import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

import { icons } from '../../assets/images';
import Searchbar from './Searchbar'
import NotFound from './NotFound'
import AppModal from '../../components/Modal';
import FilterContent from './FilterContent';
import BookingCard from './BookingCard';
import AppLoading from '../../components/Loading/AppLoading';
import { getData } from '../../utils/storage';

const Planned = () => {

  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [plannedBookings, setPlannedBookings] = useState(null)
  const [filterVisiblity, setFilterVisiblity] = useState(false)
  const [vehicle, setVehicle] = useState('');
  const [chauffeur, setChauffeur] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    isFocused && getPlannedBooking();
    return () => {
    }
  }, [isFocused])

  const getCars = async () => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/car/${token}`);
      setVehicle(response.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  const getChauffeur = async () => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/chauffeur/${token}`);
      setChauffeur(response.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const getPlannedBooking = async () => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/partnerToken/${token}/planned?page=1&limit=10`);
      setPlannedBookings(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const searchBooking = async (search) => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/partnerToken/${token}/planned?page=1&limit=10&filter[number,like]=${search}`);
      setPlannedBookings(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const renderItem = ({ item }) => {
    return (
      <BookingCard booking={item} status={'planned'} />
    )
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={'Booking number'}
        value={search}
        handleSearch={e => {
          searchBooking(e);
          setSearch(e);
        }}
        handleFilter={() => setFilterVisiblity(true)}
      />

      <AppLoading loading={loading}>
        {plannedBookings === null || plannedBookings?.length === 0 ?
          <NotFound
            title='No planned bookings'
            subTitle={`You don't have any planned bookings yet`}
            Icon={icons.bookingGrey}
          /> :
          <FlatList
            data={plannedBookings ?? []}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            style={{ marginTop: 30 }}
            showsVerticalScrollIndicator={false}
          />
        }
      </AppLoading>

      <AppModal
        visible={filterVisiblity}
        onClose={() => setFilterVisiblity(false)}
        title={'Filters'}
      >

        <FilterContent
          fromSelect={() => { }}
          toSelect={() => { }}
          vehicles={[{ label: '1', value: 'all 1' }, { label: '2', value: 'all 2' }]}
          chauffeurs={[{ label: '1', value: 'all 1' }]}
          setVehicle={(e) => { setVehicle(e) }}
          setChauffeur={(e) => { setChauffeur(e) }}
          clearFilter={() => { setFilterVisiblity(false) }}
          applyFilter={() => { setFilterVisiblity(false) }}
          selectedVehicle={vehicle}
          selectedChauffeur={chauffeur}
        />

      </AppModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Planned;
