import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { icons } from '../../assets/images';
import BookingCard from './BookingCard';

const BookingDetailsScreen = ({ route, navigation }) => {
  const booking = route?.params
  return (
    <View style={styles.container}>
      {/* header */}
      <TouchableOpacity style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: 'rgba(139,149,158,.2)',
        borderBottomWidth: 1.5,
        marginTop: 20
      }}
        activeOpacity={0.5}
        onPress={() => { navigation.goBack() }}>
        <Image
          source={icons.backIcon}
          style={{
            height: 42,
            width: 22,
            resizeMode: 'contain',
          }}
        />
        <Text style={{
          fontSize: 18
        }}>
          Booking #{booking?.number}
        </Text>
        <View />

      </TouchableOpacity>
      {/* body */}
      <View style={{ padding: 20 }}>
        <BookingCard
          booking={booking}
          status={booking?.bookingStatus}
          showCta={false}
          showDuration={true}
          extraDetails={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
  },
});

export default BookingDetailsScreen;
