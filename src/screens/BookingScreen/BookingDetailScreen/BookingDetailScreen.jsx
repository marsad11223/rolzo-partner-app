import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, useWindowDimensions, TextInput } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import Information from './Information';
import TripUpdate from './TripUpdate';
import Button from '../../../components/Button';
import { Colors } from '../../../theme/variables';
import Header from '../../../components/Header';
import { getData } from '../../../utils/storage';
import { showToast } from '../../../utils/helper';
import AppLoading from '../../../components/Loading/AppLoading';
import AppPopup from '../../../components/Modal/AppPopup';
import { declineReasons } from '../../../utils/constants';
import RadioButton from '../../../components/Button/RadioButton';
import { hp } from '../../../utils/responsiveness'

const BookingDetailsScreen = ({ route }) => {

  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [booking, setBooking] = useState(route?.params);
  const [index, setIndex] = useState(0);
  const [suplierId, setSuplierId] = useState(null);
  const [loading, setLoading] = useState(0);
  const [declineModal, setDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState(declineReasons[0].label);
  const [declineComment, setDeclineComment] = useState('');

  const [routes] = useState([
    { key: 'first', title: 'Information' },
    { key: 'second', title: 'Trip updates' },
  ]);

  useEffect(() => {
    getSuplierId()
  }, [])

  const renderScene = SceneMap({
    first: () => <Information booking={booking} marginBottom={!booking?.dispatchChauffeurAssigned ? hp(80) : 0} />,
    second: () => <TripUpdate />,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#000' }}
      style={{ backgroundColor: '#fff' }}
      labelStyle={{ color: '#8b959e', fontSize: 11 }}
      activeColor="#000"
      renderLabel={({ route, focused, color }) => {
        return (
          <Text style={{ color, margin: 0, fontSize: 16 }} numberOfLines={1}>
            {route.title}
          </Text>
        );
      }}
    />
  );

  const handleAccept = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://staging.rolzo.com/api/api/v1/dispatch/${booking?._id}/${suplierId}/`
      );
      if (response?.data?.meta?.success) {
        setLoading(false);
        navigation.goBack()
        showToast('Accepted');
      } else {
        showToast(response?.data?.meta?.message);
      }
    } catch (error) {
      setLoading(false);
      showToast(error?.message);
    }
  }

  const handleDecline = async () => {
    const data = {
      declineReason,
      declineComment
    }
    try {
      setLoading(true);
      const response = await axios.patch(`https://staging.rolzo.com/api/api/v1/booking/cancelDispatchPartner/decline/${booking?._id}/${suplierId}/`, data);
      if (response?.data?.meta?.success) {
        setDeclineModal(false);
        setLoading(false);
        navigation.goBack()
        showToast('Declined');
      } else {
        showToast(response?.data?.meta?.message);
      }
    } catch (error) {
      setLoading(false);
      showToast(error?.message);
    }
  }

  const getSuplierId = async () => {
    const token = await getData('authToken');
    try {
      setLoading(true);
      const response = await axios.get(
        `https://staging.rolzo.com/api/api/v1/external/partner/${token}?page=1&limit=10`
      );
      setLoading(false);
      if (response?.data?.meta?.success) {
        setSuplierId(response?.data?.data[0]?._id)
      }
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <Header title={`Booking #${booking?.number}`} />
      {/* body */}
      <AppLoading loading={loading}>
        {booking?.bookingStatus === 'pending'
          ?
          <>
            <Information booking={booking} marginBottom={hp(140)} />
            <View style={styles.bottomContainer}>
              <View style={{ width: '90%', marginBottom: 10 }}>
                <Button label={'Accept offer'} onPress={handleAccept} />
              </View>
              <View style={{ width: '90%', marginBottom: 10 }}>
                <Button label={'Decline'} backgroundColor={'#fbfbfb'} textColor={Colors.primary} onPress={() => setDeclineModal(true)} />
              </View>
            </View>
          </>
          :
          <>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              renderTabBar={renderTabBar}
            />
            <>
              {!booking?.dispatchChauffeurAssigned && <View style={styles.bottomContainer}>
                <View style={{ width: '90%', marginBottom: 10 }}>
                  <Button label={'Assign chauffeur'} onPress={() => { }} />
                </View>
              </View>}
            </>
          </>
        }
      </AppLoading>

      <AppPopup visible={declineModal} onClose={() => { setDeclineModal(false) }}>
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>Decline offer</Text>
          <Text style={styles.popupText}>Choose the reason</Text>

          {
            declineReasons.map((reason) => {
              return (
                <RadioButton
                  selectedReason={declineReason}
                  setSelectedReason={setDeclineReason}
                  title={reason.label}
                  key={reason.id}
                />
              )
            })
          }
          <View style={{
            justifyContent: 'flex-start', width: '100%'
          }}>
            <Text style={{
              marginBottom: 10,
              marginTop: 20,
              color: '#8b959e',
              fontSize: 10
            }}
            >LEAVE A COMMENT
            </Text>
            <TextInput
              style={styles.commentBox}
              value={declineComment}
              onChangeText={setDeclineComment}
              multiline
            />
          </View>
          <View style={{ width: '100%', alignItems: 'flex-end' }}>
            <View style={styles.buttonContainer}>
              <Button label={'Decline'} onPress={handleDecline} />
            </View>
          </View>
        </View>
      </AppPopup>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    position: 'relative'
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
  buttonContainer: {
    width: '50%'
  },
  popupContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  popupTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  popupText: {
    fontSize: 17,
    marginVertical: 15,
    textAlign: 'left',
    width: '100%'
  },
  commentBox: {
    borderColor: 'rgba(139,149,158,.2)',
    borderWidth: 1,
    marginBottom: hp(20),
    padding: hp(5)
  }
});

export default BookingDetailsScreen;
