import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import { icons } from '../../../assets/images';
import { wp } from '../../../utils/responsiveness';

const DriverInfo = ({ name = '', phone = '', plateNo = '', vehicle = '', onPress = () => { } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowCenter}>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={icons.chauffeurBlack} />
        </View>
        <View style={{ marginLeft: wp(30) }}>
          <Text style={styles.text}>Driven by {name}</Text>
          <Text style={styles.text}>{phone}</Text>
          <Text style={styles.text}>{vehicle} . {plateNo}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
        <Image source={icons.editcircle} style={styles.editIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(139,149,158,.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8b959e',
    marginBottom: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    borderColor: '#0c0c0c',
    borderRadius: 40,
    borderWidth: 1,
    height: 40,
    width: 40,
  },
  icon: {
    resizeMode: 'contain',
    height: 22,
    width: 22,
  },
  editIcon: {
    resizeMode: 'contain',
    height: 28,
    width: 23,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default DriverInfo;
