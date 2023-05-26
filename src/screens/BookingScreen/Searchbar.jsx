import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
import { icons } from '../../assets/images';

const Searchbar = ({ placeholder, value, handleSearch, handleFilter }) => {

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <View style={styles.searchIconContainer}>
          <Image style={styles.search} source={icons.search} ></Image>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          value={value}
          onChangeText={handleSearch}
        />
      </View>
      <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
        <Image source={icons.filter} style={styles.filterIcon}></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginRight: 8,
    backgroundColor: '#fbfbfb',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchInput: {
    height: 60,
    borderRadius: 10,
    width: '80%'
  },
  filterButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 60,
    width: 69,
    borderColor: 'rgba(139,149,158,.2)',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterIcon: {
    width: 24,
    height: 15
  },
  search: {
    width: 17,
    height: 19,
    resizeMode: 'contain'
  },
  searchIconContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});


export default Searchbar;
