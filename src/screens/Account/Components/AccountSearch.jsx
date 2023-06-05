import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import { icons } from '../../../assets/images';

const Searchbar = ({ placeholder, value, handleSearch, style = {} }) => {

  return (
    <View style={[styles.searchInputContainer, style]}>
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
  );
};

const styles = StyleSheet.create({
  searchInputContainer: {
    height: 60,
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fbfbfb',
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    height: 60,
    borderRadius: 10,
    width: '85%',
    fontSize: 16
  },

  search: {
    width: 17,
    height: 19,
    resizeMode: 'contain'
  },
  searchIconContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});


export default Searchbar;
