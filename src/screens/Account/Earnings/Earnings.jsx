import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import SearchBar from '../AccountSearch';
import { icons } from '../../../assets/images';
import AddComponent from '../AddComponent';
import EditComponent from '../EditComponent';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { getData } from '../../../utils/storage';
import AppLoading from '../../../components/Loading/AppLoading';

const Earnings = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [chauffeurs, setChauffeurs] = useState([]);

  useEffect(() => {
    fetchChauffeurs();
    return () => {
    }
  }, [])

  const fetchChauffeurs = async () => {
    // try {
    //   const token = await getData('authToken');
    //   setLoading(true);
    //   const response = await axios.get(`https://staging.rolzo.com/api/api/v1/earnings/partner/${token}?page=1&limit=10`);
    //   setChauffeurs(response.data?.data);
    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    //   console.log(error);
    // }
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
          data={chauffeurs ? [0, ...chauffeurs] : [0]}
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

export default Earnings;
