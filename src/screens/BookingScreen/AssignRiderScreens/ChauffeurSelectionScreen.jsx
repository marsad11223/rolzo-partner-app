import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';

import Button from '../../../components/Button';
import { AddComponent, EditComponent } from '../../Account/Components';
import SearchBar from '../../Account/Components/AccountSearch';
import Header from '../../../components/Header';
import { getData } from '../../../utils/storage';
import AppLoading from '../../../components/Loading/AppLoading';
import { hp } from '../../../utils/responsiveness'
import { icons } from '../../../assets/images';

const ChauffeurSelectionScreen = ({ route }) => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [booking, setBooking] = useState(route?.params);
  const [chauffeurs, setChauffeurs] = useState([]);
  const [selectedChauffeur, setSelectedChauffeur] = useState(route?.params?.partnerChauffeurId);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

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
      setChauffeurs(response?.data?.data);
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
        mode={'select'}
        selected={selectedChauffeur}
        setSelected={setSelectedChauffeur}
        key={item._id}
        value={item._id}
        style={{
          borderColor: item._id === selectedChauffeur ? '#0c0c0c' : 'rgba(139,149,158,.5)'
        }}
      />
    )
  }

  const handleSubmit = async () => {

    try {
      const geo = `00.00-00.00`
      const token = await getData('authToken');
      const data = {
        token,
        action: 'accepted',
        chauffeurId: selectedChauffeur,
        isLiveLocation: false,
        geoLocation: geo
      }
      setLoading(true);
      const response = await axios.patch(`https://staging.rolzo.com/api/api/v1/external/confirm/assign/${booking?._id}`, data);
      if (response?.data?.meta?.success) {
        setLoading(false);
        navigation.navigate('VehicleSelectionScreen', booking)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <Header title={`Booking #${booking?.number}`} />
      {/* body */}
      <View style={{
        padding: 30,
        flex: 1
      }}>
        <Text style={{
          fontSize: 25,
          marginBottom: hp(30)
        }}>
          Select a chauffeur
        </Text>
        <SearchBar
          placeholder={'Search chauffeur name'}
          value={search}
          handleSearch={e => {
            setSearch(e)
            searchChauffeurs(e)
          }}
          style={{
            borderRadius: 10,
            backgroundColor: '#fbfbfb',
          }}
        />

        <AppLoading loading={loading}>
          <FlatList
            data={chauffeurs ? [{ _id: '1' }, ...chauffeurs] : [{ _id: '1' }]}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: hp(60) }}
          />
        </AppLoading>
      </View>

      <View style={styles.bottomContainer}>
        <View style={{ width: '90%', marginBottom: 10 }}>
          <Button label={'Next'} onPress={handleSubmit} />
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    position: 'relative',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    borderTopColor: 'rgba(139,149,158,.25)',
    borderTopWidth: 1.5,
    paddingTop: 20,
    backgroundColor: '#fbfbfb',
    width: "100%"
  },
});

export default ChauffeurSelectionScreen;
