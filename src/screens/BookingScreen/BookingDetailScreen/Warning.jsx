import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import { icons } from '../../../assets/images';

const Warining = ({ title = '' }) => {
  return (
    <View style={{
      backgroundColor: 'rgba(208,2,27,.1)',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#d0021b',
      marginBottom: 30,
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Image source={icons.warningIcon} style={styles.warningIcon} />
      <Text style={{
        marginLeft: 10,
        fontSize: 16
      }}>
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  warningIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});

export default Warining;