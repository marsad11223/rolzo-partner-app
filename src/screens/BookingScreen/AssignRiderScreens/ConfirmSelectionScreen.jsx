import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { useNavigation, useIsFocused, CommonActions } from '@react-navigation/native';
import axios from 'axios';

import Button from '../../../components/Button';
import { AddComponent, EditComponent } from '../../Account/Components';
import Header from '../../../components/Header';
import { getData } from '../../../utils/storage';
import AppLoading from '../../../components/Loading/AppLoading';
import { hp } from '../../../utils/responsiveness'
import { icons } from '../../../assets/images';
import { showToast } from '../../../utils/helper'

const ConfirmSelectionScreen = ({ route }) => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [booking, setBooking] = useState(route?.params);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    isFocused && fetchData();
    return () => {
    }
  }, [isFocused])

  const fetchData = async () => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/confirm/${booking._id}?page=1&limit=10`);
      setData(response.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const renderItem = ({ item, index }) => {
    const vehicleImage = item?.vehicleImage ? { uri: item.vehicleImage } : icons.carIcon;
    const chauffeurImage = item?.profilePicture ? { uri: item.profilePicture } : icons.chauffeurBlack;

    if (index == 0) {
      return (
        <EditComponent
          Icon={chauffeurImage}
          title={`${item.firstName} ${item.lastName}`}
          subtitle={item.phoneNumber}
          roundeImage={item.profilePicture ? true : false}
          mode='confirm'
        />
      )
    }
    return (
      <EditComponent
        Icon={vehicleImage}
        title={`${item.make.label} ${item.model.label}`}
        subtitle={item.plateNumber}
        borderLessImage
        mode='confirm'
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
        isLiveLocation: false,
        geoLocation: geo
      }
      setLoading(true);
      const response = await axios.patch(`https://staging.rolzo.com/api/api/v1/external/car/assign/${booking._id}`, data);
      console.log(response?.data?.meta?.success, 'response');
      if (response?.data?.meta?.success) {
        setLoading(false);
        showToast('Assigned');
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'Tabs' }],
          })
        );

      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast(error?.message, 'error');
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
          Assign the chauffeur and vehicle
        </Text>

        <AppLoading loading={loading}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: hp(60) }}
          />
        </AppLoading>
      </View>

      <View style={styles.bottomContainer}>
        <View style={{ width: '90%', marginBottom: 10 }}>
          <Button label={'Assign'} onPress={handleSubmit} />
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

export default ConfirmSelectionScreen;
