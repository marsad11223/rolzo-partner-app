import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import BookingCard from '../BookingCard';
import ImportantInformation from './ImportantInformation';

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
});

export default Information;