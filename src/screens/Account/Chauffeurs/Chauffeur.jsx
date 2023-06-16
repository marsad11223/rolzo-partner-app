import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';

import SearchBar from '../Components/AccountSearch';
import { icons } from '../../../assets/images';
import { AddComponent, EditComponent } from '../Components';
import { getData } from '../../../utils/storage';
import AppLoading from '../../../components/Loading/AppLoading';
const Chauffer = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [chauffeurs, setChauffeurs] = useState([]);

  useEffect(() => {
    isFocused && fetchChauffeurs();
    return () => {
    }
  }, [isFocused])

  const fetchChauffeurs = async () => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/chauffeur/${token}?page=1&limit=10`);
      setChauffeurs(response.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const searchChauffeurs = async (search) => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/chauffeur/${token}?page=1&limit=10&filter[chauffeurName,like]=${search}`);
      setChauffeurs(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
          key={0}
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
          navigation.navigate('EditChaufferDetails', item)
        }}
        key={item._id}
      />
    )
  }
  return (
    <View style={styles.container}>
      <View style={{
        marginTop: 30,
      }}>
        <SearchBar
          placeholder={'Search chauffeur name'}
          value={search}
          handleSearch={e => {
            setSearch(e)
            searchChauffeurs(e)
          }}
        />
      </View>
      <AppLoading loading={loading}>
        <FlatList
          data={chauffeurs ? [{ _id: '1' }, ...chauffeurs] : [{ _id: '1' }]}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
      </AppLoading>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Chauffer;
