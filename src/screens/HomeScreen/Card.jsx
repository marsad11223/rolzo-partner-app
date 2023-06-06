import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from '../../components';
import { useNavigation } from '@react-navigation/native';

import moment from 'moment';

const Card = ({ title, Icon, amount, amountSubtitle, transactions = [], bookings = [], status = '' }) => {

  const navigation = useNavigation();

  const BookingCard = ({ date, type, name, price, onPress = () => { } }) => {
    return (
      <View style={styles.bookingCardContainer}>
        <View style={styles.bookingCardInfo}>
          <Text style={styles.bookingCardDate}>{date}</Text>
          <Text style={styles.bookingCardType}>{type}</Text>
          <Text style={styles.bookingCardVehicle}>{name}</Text>
        </View>

        <View style={styles.bookingCardAmount}>
          <Text style={styles.bookingCardAmountText}>{price}</Text>
          <View style={styles.bookingCardButton}>
            <Button label={'View'} onPress={onPress} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.earningContainer}>
        <View>
          <Image resizeMode="contain" source={Icon} style={styles.cardIcon} />
        </View>
        <View>
          <Text style={styles.amountText}>{amount}</Text>
          <Text style={styles.amountSubtitle}>{amountSubtitle}</Text>
        </View>
      </View>

      {bookings?.map((booking) => {
        return (
          <BookingCard
            date={moment(booking.date)?.format('ddd D MM YY, HH:mm')}
            type={booking?.type}
            name={booking?.modelName}
            price={`${booking?.price} ${booking?.currency}`}
            key={booking._id}
            onPress={() => {
              // navigation.navigate('BookingDetails', { ...booking, bookingStatus: status })
            }}
          />
        );
      })}

      {transactions?.map((transaction, index) => {
        return (
          <View style={styles.transferAmount} key={index}>
            <Text>{transaction.title}</Text>
            <Text>{transaction.amount} USD</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    minHeight: 150,
    borderRadius: 10,
    marginVertical: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139,149,158,.2)',
  },
  cardTitle: {
    fontSize: 17,
    color: '#0C0C0C',
    marginBottom: 10,
  },
  earningContainer: {
    marginVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    height: 30,
    width: 30,
    marginRight: 30,
  },
  amountText: {
    fontSize: 20,
    color: '#0c0c0c',
  },
  amountSubtitle: {
    color: '#8B959E',
    fontSize: 14,
  },
  bookingCardContainer: {
    backgroundColor: '#8B959E1A',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  bookingCardInfo: {
    width: '60%',
  },
  bookingCardDate: {
    fontSize: 18,
    fontWeight: 400,
    marginBottom: 10,
  },
  bookingCardType: {
    fontSize: 16,
    color: '#8b959e',
  },
  bookingCardVehicle: {
    fontSize: 16,
    color: '#8b959e',
  },
  bookingCardAmount: {
    width: '40%',
    alignItems: 'flex-end',
  },
  bookingCardAmountText: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
  bookingCardButton: {
    width: '80%',
  },
  transferAmount: {
    backgroundColor: '#8B959E1A',
    minHeight: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 8,
  },
});

export default Card;
