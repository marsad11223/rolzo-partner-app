import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import { icons } from '../../assets/images';
import Button from '../../components/Button';

const BookingCard = () => {

  const BookingCardItem = ({ Icon, text }) => {
    return (
      <View style={styles.bookingCardItem}>
        <Image source={Icon} style={styles.bookingCardItemIcon} />
        <Text style={styles.bookingCardItemText}>
          {text}
        </Text>
      </View>
    )
  }
  const BookingCardFooter = () => {
    return (
      <View>
        <View style={styles.bookingCardFooterAmount}>
          <Text style={styles.bookingCardFooterAmountText}>
            39.00 USD
          </Text>
        </View>
        <View style={styles.bookingCardFooterButton}>
          <Button label={'View'} />
        </View>
      </View>
    )
  }
  const BookingCardHeader = () => {
    return (
      <View style={styles.bookingCardHeader}>
        <Text style={styles.bookingCardHeaderText}>
          #4205-R
        </Text>
        <Text style={styles.bookingCardHeaderText}>
          TRANSFER
        </Text>
        <View style={styles.bookingCardHeaderStatus}>
          <Text style={styles.bookingCardHeaderStatusText}>
            COMPLETED
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.bookingCardContainer}>
      {/* header */}
      <BookingCardHeader />
      {/* body */}
      <View style={styles.bookingCardBody}>
        {/* Items */}
        <BookingCardItem Icon={icons.calanderIcon} text={'Wed 24th May 2023, 4:45 PM'} />
        <BookingCardItem Icon={icons.carIcon} text={'Lexus S350'} />
        <BookingCardItem Icon={icons.locationIcon} text={'Dubai Mall - Dubai - United Arab Emirates'} />
        <BookingCardItem Icon={icons.flagIcon} text={'Mall of the Emirates - Sheikh Zayed Road - Dubai - United Arab Emirates'} />
      </View>
      {/* footer */}
      <BookingCardFooter />
    </View>

  )
}

const styles = StyleSheet.create({
  bookingCardContainer: {
    width: '100%',
    minHeight: 250,
    backgroundColor: '#fbfbfb',
    borderTopColor: '#0c0c0c',
    borderRadius: 6,
    borderTopWidth: 6,
    borderWidth: 1,
    borderColor: 'rgba(139, 149, 158, 0.2)',
    position: 'relative',
  },
  bookingCardHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(139, 149, 158, 0.2)',
    borderBottomWidth: 1.5,
    paddingBottom: 10,
    padding: 10
  },
  bookingCardHeaderText: {
    fontSize: 14,
    color: '#0c0c0c'
  },
  bookingCardHeaderStatus: {
    backgroundColor: '#0c0c0c',
    padding: 5,
    borderRadius: 3
  },
  bookingCardHeaderStatusText: {
    fontSize: 14,
    color: '#fbfbfb'
  },
  bookingCardBody: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  bookingCardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  bookingCardItemIcon: {
    height: 22,
    width: 22,
    resizeMode: 'contain'
  },
  bookingCardItemText: {
    fontSize: 17,
    marginLeft: 20,
    width: '90%'
  },
  bookingCardFooterAmount: {
    alignItems: 'center',
    borderTopColor: 'rgba(139, 149, 158, 0.2)',
    borderTopWidth: 1.5,
    paddingVertical: 10,
    borderBottomColor: 'rgba(139, 149, 158, 0.2)',
    borderBottomWidth: 1.5
  },
  bookingCardFooterAmountText: {
    fontSize: 16
  },
  bookingCardFooterButton: {
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
    padding: 10
  },
});

export default BookingCard;
