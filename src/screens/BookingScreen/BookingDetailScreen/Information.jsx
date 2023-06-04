import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import BookingCard from '../BookingCard';
import ImportantInformation from './ImportantInformation';
import Warning from './Warning';

const Information = ({ booking, marginBottom = 0 }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          padding: 20,
          marginBottom: marginBottom
        }}
      >
        {!booking?.dispatchChauffeurAssigned &&
          <Warning title={'The chauffeur is not yet assigned.'} />
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