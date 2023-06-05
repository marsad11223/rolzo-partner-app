import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RadioButton = ({ value = null, title = '', selected, setSelected = () => { }, size = 15 }) => {
  return (
    <TouchableOpacity
      style={styles.radioOption}
      onPress={() => setSelected(value)}
    >
      <View style={styles.radioContainer}>
        {
          selected === value &&
          <View style={styles.radioSelected} />
        }
      </View>
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
  radioContainer: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0c0c0c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#0c0c0c',
  }
});

export default RadioButton;