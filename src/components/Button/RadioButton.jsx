import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const RadioButton = ({ title = '', selectedReason, setSelectedReason = () => { } }) => {
  return (
    <TouchableOpacity
      style={styles.radioOption}
      onPress={() => setSelectedReason(title)}
    >
      {selectedReason === title ? (
        <Text style={styles.radioButton}>●</Text>
      ) : (
        <Text style={styles.radioButton}>○</Text>
      )}
      <Text style={styles.radioLabel}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'flex-start',
    width: '100%'
  },
  radioLabel: {
    fontSize: 15,
    marginLeft: 10
  },
  radioButton: {
    fontSize: 20,
  }
});

export default RadioButton;