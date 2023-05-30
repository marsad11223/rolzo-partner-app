import React, { useState } from 'react';
import {
  View,
  StyleSheet,

} from 'react-native';
import SearchBar from './AccountSearch';
import { icons } from '../../assets/images';
import AddComponent from './AddComponent';
import EditComponent from './EditComponent';

const Chauffer = () => {

  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      {/* search */}
      <View style={{
        marginTop: 30,
      }}>
        <SearchBar
          placeholder={'Search chauffeur name'}
          value={search}
          handleSearch={e => setSearch(e)}
        />
      </View>
      {/* AddChauffer */}
      <AddComponent
        Icon={icons.chauffeurGrey}
        title={'Add chauffeur'}
        onPress={() => { }} />
      {/* Chauffeur */}
      <EditComponent
        Icon={icons.chauffeurBlack}
        title={'Abdullah Abc'}
        subtitle={'+923249407607'}
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

export default Chauffer;
