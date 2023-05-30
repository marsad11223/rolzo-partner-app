import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const TripUpdate = () => {
  const dotedBorder = {
    borderLeftWidth: 1.5,
    borderStyle: 'dashed',
    paddingBottom: 30,
  };

  const Step = ({ number, text, isLast = false }) => {
    return (
      <View style={!isLast ? [dotedBorder, styles.stepContainer] : styles.lastStepContainer}>
        <View style={styles.dotView}>
          <View style={styles.dot} />
        </View>
        <View style={styles.stepContent}>
          <Text style={styles.stepNumber}>{number}</Text>
          <Text style={styles.stepText}>{text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Step number={1} text={'You are on the way'} />
      <Step number={2} text={'You have arrived'} />
      <Step number={3} text={'The passenger is on board'} />
      <Step number={4} text={'The passenger was dropped off'} isLast={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  stepContainer: {
    paddingHorizontal: 10,
    position: 'relative',
  },
  lastStepContainer: {
    paddingHorizontal: 10,
    position: 'relative',
    marginBottom: 40,
  },
  dotView: {
    position: 'absolute',
    left: -9,
    zIndex: 999,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    borderWidth: 2.5,
  },
  stepContent: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: 'rgba(139,149,158,.3)',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 10,
    marginLeft: 10,
  },
  stepNumber: {
    fontSize: 16,
    marginRight: 10,
  },
  stepText: {
    fontSize: 16,
  },
});

export default TripUpdate;
