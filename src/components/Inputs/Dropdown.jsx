import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, Image } from 'react-native';
import { AvenirNextLTProRegular } from '../../utils/fonts';
import { icons } from '../../assets/images';

const SelectionComponent = ({ options, selectedValue, onValueChange, style = {} }) => {
  const [visible, setVisible] = useState(false);

  const handleValueChange = (value) => {
    if (selectedValue !== value) {
      onValueChange(value);
    }
    setVisible(false);
  };

  return (
    <View style={[styles.border, style]}>

      <TouchableOpacity
        style={styles.container}
        onPress={() => setVisible(true)}
      >
        <Text style={selectedValue ? styles.selectedValue : styles.placeholder}>
          {selectedValue ? selectedValue : 'Select'}
        </Text>
        <Image resizeMode='contain' style={styles.downIcon} source={icons.downIcon}></Image>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.contentContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleValueChange('')}
              style={{
                marginBottom: 15
              }}
            >
              <Text style={styles.placeholder}>
                Select
              </Text>
            </TouchableOpacity>

            {options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.5}
                onPress={() => handleValueChange(option?.value)}
              >
                <Text style={styles.selectedValue}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  selectedValue: {
    fontSize: 18,
    color: '#0c0c0c',
    fontFamily: AvenirNextLTProRegular,
    marginVertical: 5
  },
  placeholder: {
    fontSize: 18,
    color: '#8b959e',
    fontFamily: AvenirNextLTProRegular,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    maxHeight: '80%',
  },
  downIcon: {
    height: 25,
    width: 30
  },
});

export default SelectionComponent;
