import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { icons } from '../../assets/images';

import Searchbar from './Searchbar'
import NotFound from './NotFound'
import AppModal from '../../components/Modal'
import FilterContent from './FilterContent';
import AppLoading from '../../components/Loading/AppLoading';
import BookingCard from './BookingCard';
import { getData } from '../../utils/storage';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

const NewOffers = () => {

  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [newBooking, setNewBookings] = useState(null)
  const [filterVisiblity, setFilterVisiblity] = useState(false)
  const [vehicle, setVehicle] = useState('');
  const [chauffeur, setChauffeur] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    isFocused && getNewBooking();
    return () => {
    }
  }, [isFocused])

  const searchBooking = async (search) => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/partnerToken/${token}/new-booking?page=1&limit=10&filter[number,like]=${search}`);
      setNewBookings(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  const getNewBooking = async () => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/partnerToken/${token}/new-booking?page=1&limit=10`);
      setNewBookings(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const renderItem = ({ item }) => {
    return (
      <BookingCard booking={item} status='pending' />
    )
  }
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={'Offer number'}
        value={search}
        handleSearch={e => {
          searchBooking(e);
          setSearch(e);
        }}
        handleFilter={() => setFilterVisiblity(true)}
      />

      <AppLoading loading={loading}>
        {newBooking === null || newBooking?.length === 0 ?
          <NotFound
            title='No new offers'
            subTitle={`We will notify you when we have a new offer`}
            Icon={icons.bookingGrey}
          /> :
          <FlatList
            data={newBooking ?? []}
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
  button: {
    paddingHorizontal: 40
  }
});

export default NewOffers;
