import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { icons } from '../../assets/images';
import { Colors } from '../../theme/variables';

const AddComponent = ({ title, Icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={onPress}>
      <View style={styles.leftContainer}>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={Icon} />
        </View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <Image style={styles.plusIcon} source={icons.addCircle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(139,149,158,.5)',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    borderColor: '#8b959e',
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
  text: {
    color: Colors.primary,
    fontSize: 16,
    marginLeft: 20,
  },
  plusIcon: {
    resizeMode: 'contain',
    height: 28,
    width: 23,
  },
});

export default AddComponent;
