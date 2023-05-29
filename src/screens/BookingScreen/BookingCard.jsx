import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import { icons } from '../../assets/images';
import Button from '../../components/Button';
import { getLabelByValue } from '../../utils/constants';

const BookingCard = ({ booking }) => {

  const getFormatedDate = (defaultFormate) => {
    const [datePart, timePart] = defaultFormate.split(',');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes] = timePart.split(':');
    const pickupDate = new Date(year, month - 1, day, hours, minutes);
    const formattedDate = pickupDate.toLocaleString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    return formattedDate;
  }

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
  const BookingCardFooter = ({ price, viewCallback }) => {

    return (
      <View>
        <View style={styles.bookingCardFooterAmount}>
          <Text style={styles.bookingCardFooterAmountText}>
            {price?.toFixed(2)} USD
          </Text>
        </View>
        <View style={styles.bookingCardFooterButton}>
          <Button label={'View'} onPress={viewCallback} />
        </View>
      </View>
    )
  }
  const BookingCardHeader = ({ number, title, status }) => {
    return (
      <View style={styles.bookingCardHeader}>
        <Text style={styles.bookingCardHeaderText}>
          #{number}
        </Text>
        <Text style={styles.bookingCardHeaderText}>
          {title}
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
      <BookingCardHeader number={booking?.number} title={getLabelByValue(booking?.type)} />
      {/* body */}
      <View style={styles.bookingCardBody}>
        {/* Items */}
        <BookingCardItem Icon={icons.calanderIcon} text={getFormatedDate(booking?.pickUpDateString)} />
        <BookingCardItem Icon={icons.carIcon} text={booking?.vehicleName} />
        <BookingCardItem Icon={icons.locationIcon} text={booking?.pickUpLocation?.fullAddress} />
        <BookingCardItem Icon={icons.flagIcon} text={booking?.dropOffLocation?.fullAddress} />
      </View>
      {/* footer */}
      <BookingCardFooter price={booking?.buyingPrice} viewCallback={() => { }} />
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
    marginBottom: 30
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
