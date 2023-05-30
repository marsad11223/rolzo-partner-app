import React, { useState } from 'react';
import {
  View,
  StyleSheet,

} from 'react-native';
import SearchBar from './AccountSearch';
import { icons } from '../../assets/images';
import AddComponent from './AddComponent';
import EditComponent from './EditComponent';

const Vehicles = () => {

  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      {/* search */}
      <View style={{
        marginTop: 30,
      }}>
        <SearchBar
          placeholder={'Search vehicle'}
          value={search}
          handleSearch={e => setSearch(e)}
        />
      </View>
      {/* AddChauffer */}
      <AddComponent
        Icon={icons.chauffeurGrey}
        title={'Add vehicle'}
        onPress={() => { }} />
      {/* Chauffeur */}
      <EditComponent
        Icon={{ uri: 'https://business.rolzo.com/api/cdn/storage/images/FguaMLoMnqf5JJw8C.png' }}
        title={'BMW X7'}
        subtitle={'0381U4019'}
        borderLessImage
        onPress={() => { }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Vehicles;
