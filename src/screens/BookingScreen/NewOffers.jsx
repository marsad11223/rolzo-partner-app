import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { icons } from '../../assets/images';

import Searchbar from './Searchbar'
import NotFound from './NotFound'
import AppModal from '../../components/Modal'
import FilterContent from './FilterContent';

const NewOffers = () => {
  const [search, setSearch] = useState('');
  const [filterVisiblity, setFilterVisiblity] = useState(false)
  const [vehicle, setVehicle] = useState('');
  const [chauffeur, setChauffeur] = useState('');

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={'Offer number'}
        value={search}
        handleSearch={e => setSearch(e)}
        handleFilter={() => setFilterVisiblity(true)}
      />
      <NotFound
        title='No new offers'
        subTitle='We will notify you when we have a new offer'
        Icon={icons.bookingGrey}
      />

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
