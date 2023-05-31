import React, { useState } from 'react';
import {
  View,
  StyleSheet,

} from 'react-native';
import SearchBar from './AccountSearch';
import { icons } from '../../assets/images';
import AddComponent from './AddComponent';
import EditComponent from './EditComponent';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* search */}
      <View style={{
        marginTop: 30,
      }}>
      </View>
      {/* Chauffeur */}
      <EditComponent
        Icon={icons.companyIcon}
        title={'Supply App Company'}
        subtitle={''}
        onPress={() => {
          navigation.navigate('EditCompanyDetails')
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Settings;
