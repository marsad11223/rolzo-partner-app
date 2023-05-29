import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import axios from 'axios';

import { icons } from '../../assets/images';
import Searchbar from './Searchbar'
import NotFound from './NotFound'
import AppModal from '../../components/Modal';
import FilterContent from './FilterContent';
import Button from '../../components/Button';
import { getData } from '../../utils/storage';
import BookingCard from './BookingCard';
BookingCard
const Completed = () => {

  const [search, setSearch] = useState('');
  const [filterVisiblity, setFilterVisiblity] = useState(false)
  const [vehicle, setVehicle] = useState('');
  const [chauffeur, setChauffeur] = useState('');
  const [loading, setLoading] = useState('');

  useEffect(() => {
    // getCars();
    // getChauffeur();
    getCompletedBooking();
    return () => {
    }
  }, [])

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

  const getCompletedBooking = async () => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/partnerToken/${token}/completed-rentals?page=1&limit=10`);
      console.log('getCompletedBooking', response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={'Booking number'}
        value={search}
        handleSearch={e => setSearch(e)}
        handleFilter={() => setFilterVisiblity(true)}
      />
      {/* <NotFound
        title='No completed bookings'
        subTitle={`You don't have any completed bookings yet`}
        Icon={icons.bookingGrey}
      /> */}

      <BookingCard />

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
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Completed;
