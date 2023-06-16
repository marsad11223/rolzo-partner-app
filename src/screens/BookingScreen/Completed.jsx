import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

import { icons } from '../../assets/images';
import Searchbar from './Searchbar'
import NotFound from './NotFound'
import AppModal from '../../components/Modal';
import FilterContent from './FilterContent';
import { getData } from '../../utils/storage';
import BookingCard from './BookingCard';
import AppLoading from '../../components/Loading/AppLoading';
import { convertDateFormat, createQueryString } from '../../utils/helper';

const Completed = () => {

  const isFocused = useIsFocused()
  const [search, setSearch] = useState('');
  const [completedBookings, setCompletedBookings] = useState(null);
  const [filterVisiblity, setFilterVisiblity] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allVehicle, setAllVehicle] = useState([]);
  const [allChauffeur, setAllChauffeur] = useState([]);
  const [vehicle, setVehicle] = useState('');
  const [chauffeur, setChauffeur] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    isFocused && getCompletedBooking();
    isFocused && getCars();
    isFocused && getChauffeur();
    return () => {
    }
  }, [isFocused])

  const getCompletedBooking = async () => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/partnerToken/${token}/completed?page=1&limit=10`);
      setCompletedBookings(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const getCars = async () => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/car/${token}`);
      setAllVehicle(() => {
        return response.data?.data.map((car) => {
          return {
            label: car?.make?.label,
            value: car?.make?.label
          }
        })
      });
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
      setAllChauffeur(() => {
        return response.data?.data.map((chauffeur) => {
          return {
            label: chauffeur?.firstName + ' ' + chauffeur?.lastName,
            value: chauffeur?.firstName + ' ' + chauffeur?.lastName
          }
        })
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const getFilteredData = async (search) => {
    const filterQuery = createQueryString(search, from, to, vehicle, chauffeur);

    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/partnerToken/${token}/completed?page=1&limit=10&${filterQuery}`);
      setCompletedBookings(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const clearFilter = () => {
    setTo('');
    setFrom('');
    setChauffeur('');
    setVehicle('');
    setSearch('');
    setFilterVisiblity(false);
    getCompletedBooking();
  }

  const renderItem = ({ item }) => {
    return (
      <BookingCard booking={item} status={'completed'} />
    )
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={'Booking number'}
        value={search}
        handleSearch={e => {
          setSearch(e);
          getFilteredData(e);
        }}
        handleFilter={() => setFilterVisiblity(true)}
      />


      <AppLoading loading={loading}>
        {completedBookings === null || completedBookings?.length === 0 ?
          <NotFound
            title='No completed bookings'
            subTitle={`You don't have any completed bookings yet`}
            Icon={icons.bookingGrey}
          /> :
          <FlatList
            data={completedBookings ?? []}
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
          fromSelect={(e) => { setFrom(convertDateFormat(e)) }}
          toSelect={(e) => { setTo(convertDateFormat(e)) }}
          selectedFrom={to}
          selectedTo={from}
          vehicles={allVehicle}
          chauffeurs={allChauffeur}
          setVehicle={(e) => { setVehicle(e) }}
          setChauffeur={(e) => { setChauffeur(e) }}
          clearFilter={clearFilter}
          applyFilter={() => {
            getFilteredData(search)
            setFilterVisiblity(false)
          }}
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
