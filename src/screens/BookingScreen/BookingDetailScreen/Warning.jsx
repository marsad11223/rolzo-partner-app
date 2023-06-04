import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import { icons } from '../../../assets/images';

const Warning = ({ title = '' }) => {
  return (
    <View style={styles.warningContainer}>
      <Image source={icons.warningIcon} style={styles.warningIcon} />
      <Text style={styles.warningText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  warningContainer: {
    backgroundColor: 'rgba(208, 2, 27, .1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d0021b',
    marginBottom: 30,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  warningText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default Warning;
