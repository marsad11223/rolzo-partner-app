import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectionComponent = ({ options, selectedValue, onValueChange, placeholder }) => {

  const handleValueChange = (value) => {
    if (selectedValue !== value) {
      onValueChange(value);
    }
  };

  return (
    <View style={styles.border}>
      <Picker
        onValueChange={handleValueChange}
        style={styles.container}
        dropdownIconColor={'#0c0c0c'}
        selectionColor={'#fbfbfb'}
        selectedValue={selectedValue}
      >
        <Picker.Item label={placeholder} value="Unknown" style={styles.placeholder} />
        {options?.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} style={styles.selectedValue} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    borderRadius: 10,
    borderColor: 'rgba(139,149,158,.2)',
    borderWidth: 1.5,
    backgroundColor: '#fbfbfb',
    marginBottom: 12,
  },
  container: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  selectedValue: {
    fontSize: 18,
    color: '#0c0c0c',
  },
  placeholder: {
    fontSize: 18,
    color: '#8b959e',
  },
});

export default SelectionComponent;
