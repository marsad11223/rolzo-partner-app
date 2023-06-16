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
import { convertDateFormat, createQueryString } from '../../utils/helper';

const Planned = () => {

  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [plannedBookings, setPlannedBookings] = useState(null)
  const [filterVisiblity, setFilterVisiblity] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allVehicle, setAllVehicle] = useState([]);
  const [allChauffeur, setAllChauffeur] = useState([]);
  const [vehicle, setVehicle] = useState('');
  const [chauffeur, setChauffeur] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    isFocused && getPlannedBooking();
    isFocused && getCars();
    isFocused && getChauffeur();
    return () => {
    }
  }, [isFocused])

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
    getPlannedBooking();
  }

  const getFilteredData = async (search) => {
    const filterQuery = createQueryString(search, from, to, vehicle, chauffeur);

    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/partnerToken/${token}/planned?page=1&limit=10&${filterQuery}`);
      setPlannedBookings(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
          setSearch(e);
          getFilteredData(e);
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
