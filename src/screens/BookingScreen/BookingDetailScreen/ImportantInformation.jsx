import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { icons } from '../../../assets/images';

const ImportantInformation = () => {
  const CheckPoint = ({ text }) => {
    return (
      <View style={styles.checkPointContainer}>
        <Image source={icons.checklist} style={styles.checklistIcon} />
        <Text style={styles.checkPointText}>{text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.InformationContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>IMPORTANT INFORMATION</Text>
      </View>
      <View style={styles.checkPointsContainer}>
        <CheckPoint text={'ROLZO will pay for all services'} />
        <CheckPoint text={'The chauffeur must speak English fluently'} />
        <CheckPoint text={'The vehicle must include water bottles, wipes, and mints'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  InformationContainer: {
    minHeight: 250,
    backgroundColor: '#fbfbfb',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(139, 149, 158, 0.2)',
    marginBottom: 30,
    padding: 20,
  },
  titleContainer: {
    flexWrap: 'wrap',
  },
  titleText: {
    color: '#d0021b',
    fontSize: 15,
    backgroundColor: 'rgba(208,2,27,.1)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },
  checkPointsContainer: {
    marginTop: 25,
  },
  checkPointContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  checklistIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  checkPointText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ImportantInformation;
