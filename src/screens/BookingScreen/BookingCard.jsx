import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { icons } from '../../assets/images';
import Button from '../../components/Button';
import { getLabelByValue, getStatus, secondsToMinutes } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';

const BookingCard = ({ booking, status, showCta = true, extraDetails = false }) => {
  const navigation = useNavigation()


  const getFormatedDate = (defaultFormate) => {
    const [datePart, timePart] = defaultFormate?.split(',');
    const [day, month, year] = datePart?.split('/');
    const [hours, minutes] = timePart?.split(':');
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
        {showCta &&
          <View style={styles.bookingCardFooterButton}>
            <Button label={'View'} onPress={viewCallback} />
          </View>
        }
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
        <View style={{ ...styles.bookingCardHeaderStatus, backgroundColor: getStatus(status).color }}>
          <Text style={styles.bookingCardHeaderStatusText}>
            {getStatus(status).label}
          </Text>
        </View>
      </View>
    )
  }

  const LittleDetails = ({ Icon, text }) => {
    return (
      <View style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center' }}>
        <Image source={Icon} style={styles.bookingCardItemIcon} />
        <Text style={{ fontSize: 16, marginLeft: 5 }}>{text}</Text>
      </View>
    )
  }

  return (
    <View style={[styles.bookingCardContainer, { borderTopColor: getStatus(status).color }]}>
      {/* header */}
      <BookingCardHeader number={booking?.number} title={getLabelByValue(booking?.type)} status={status} />
      {/* body */}
      <View style={styles.bookingCardBody}>
        {/* Items */}
        {extraDetails &&
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <LittleDetails Icon={icons.team} text={booking?.passengerInfo?.passenger} />
            <LittleDetails Icon={icons.portfolio} text={booking?.passengerInfo?.luggage} />
          </View>
        }

        <BookingCardItem Icon={icons.calanderIcon} text={getFormatedDate(booking?.pickUpDateString)} />
        <BookingCardItem Icon={icons.carIcon} text={booking?.vehicleName} />
        <BookingCardItem Icon={icons.locationIcon} text={booking?.pickUpLocation?.fullAddress} />
        <BookingCardItem Icon={icons.flagIcon} text={booking?.dropOffLocation?.fullAddress} />
        {booking?.duration &&
          <BookingCardItem
            Icon={icons.timeIcon}
            text={booking?.duration ? `${booking.duration} hours` : secondsToMinutes(booking?.tripInfo?.duration)}
          />
        }

      </View>
      {/* footer */}
      <BookingCardFooter price={booking?.dispatchPrice}
        viewCallback={() => {
          navigation.navigate('BookingDetails', { ...booking, bookingStatus: status })
        }} />
    </View>

  )
}

const styles = StyleSheet.create({
  bookingCardContainer: {
    width: '100%',
    minHeight: 250,
    backgroundColor: '#fbfbfb',
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
