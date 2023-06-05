import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BookingCard from '../BookingCard';
import ImportantInformation from './ImportantInformation';
import Warning from './Warning';
import DriverInfo from './DriverInfo';

const Information = ({ booking, marginBottom = 0 }) => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          padding: 20,
          marginBottom: marginBottom
        }}
      >
        {(booking?.bookingStatus === 'pending' ||
          booking?.bookingStatus === 'planned'
        ) && !booking?.dispatchChauffeurAssigned &&
          <Warning title={'The chauffeur is not yet assigned.'} />
        }
        {
          (booking?.bookingStatus === 'pending' ||
            booking?.bookingStatus === 'planned') && booking?.driverTemp &&
          <DriverInfo
            name={booking?.driverTemp?.fullName}
            phone={booking?.driverTemp?.phone}
            plateNo={booking?.driverTemp?.plateNo}
            vehicle={booking?.partnerVehicle}
            onPress={() => navigation.navigate('ChauffeurSelectionScreen', booking)}
          />
        }
        <BookingCard
          booking={booking}
          status={booking?.dispatchStatus}
          showCta={false}
          extraDetails={true}
        />
        <ImportantInformation />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  warningIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});

export default Information;