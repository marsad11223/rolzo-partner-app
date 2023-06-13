import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import SearchBar from '../Components/AccountSearch';
import { icons } from '../../../assets/images';
import { AddComponent, EditComponent } from '../Components';
import AppLoading from '../../../components/Loading/AppLoading';
import { getData } from '../../../utils/storage';

const Payouts = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [chauffeurs, setChauffeurs] = useState([]);

  useEffect(() => {
    fetchChauffeurs();
    return () => {
    }
  }, [])

  const fetchChauffeurs = async () => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/payout/partner/${token}?page=1&limit=10`);
      setChauffeurs(response.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const renderItem = ({ item, index }) => {
    const profilePic = item.profilePicture ? { uri: item.profilePicture } : icons.chauffeurBlack;

    if (index == 0) {
      return (
        <AddComponent
          Icon={icons.chauffeurGrey}
          title={'Add chauffeur'}
          onPress={() => {
            navigation.navigate('AddChaufferDetails')
          }}
        />
      )
    }
    return (
      <EditComponent
        Icon={profilePic}
        title={item.chauffeurName}
        subtitle={item.phoneNumber}
        roundeImage={item.profilePicture ? true : false}
        onPress={() => {
          navigation.navigate('ChaufferDetails')
        }}
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
            placeholder={'Search chauffeur name'}
            value={search}
            handleSearch={e => setSearch(e)}
          />
        </View>
        <FlatList
          data={chauffeurs ? [{ _id: 1 }, ...chauffeurs] : [{ _id: 1 }]}
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

export default Payouts;
