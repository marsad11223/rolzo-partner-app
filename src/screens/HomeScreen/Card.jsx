import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Card = ({ title, Icon, amount, amountSubtitle, transactions = [] }) => {
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
