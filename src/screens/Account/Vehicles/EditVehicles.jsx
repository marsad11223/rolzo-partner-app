import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import SearchBar from '../Components/AccountSearch';
import { icons } from '../../../assets/images';
import { AddComponent, EditComponent } from '../Components';
import AppLoading from '../../../components/Loading/AppLoading';
import { getData } from '../../../utils/storage';
import axios from 'axios';

const EditVehicles = () => {

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState(null);

  useEffect(() => {
    fetchVehicles();
    return () => {
    }
  }, [])

  const fetchVehicles = async () => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/car/${token}?page=1&limit=10`);
      setVehicles(response.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const renderItem = ({ item, index }) => {
    const profilePic = item.vehicleImage ? { uri: item.vehicleImage } : icons.carIcon;

    if (index === 0) {
      return (
        <AddComponent
          Icon={icons.chauffeurGrey}
          title={'Add vehicle'}
          onPress={() => { }}
          key={0}
        />
      )
    }
    return (
      <EditComponent
        Icon={profilePic}
        title={`${item.make.label} ${item.model.label}`}
        subtitle={item.plateNumber}
        borderLessImage
        onPress={() => {
          navigation.navigate('ChaufferDetails')
        }}
        key={item._id}
      />
    )
  }

  return (
    <AppLoading loading={loading}>
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

        <FlatList
          data={vehicles ? [{ _id: 1 }, ...vehicles] : [{ _id: 1 }]}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />

      </View>
    </AppLoading>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EditVehicles;
