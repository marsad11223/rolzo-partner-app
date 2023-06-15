import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AvenirNextLTProRegular } from '../../utils/fonts';
import Modal from 'react-native-modal';
import { icons } from '../../assets/images';


const SelectionComponent = ({ options = [], selectedValue, onValueChange, placeholder, style = {} }) => {
  const [visible, setVisible] = useState(false);

  const handleValueChange = (value) => {
    if (selectedValue !== value) {
      onValueChange(value);
    }
    setVisible(false);
  };

  const getLabel = () => {
    let label = '';
    options.forEach(option => {
      if (option?.value === selectedValue) {
        label = option.label
      }
    })
    return label
  }
  return (
    <View style={[styles.border, style]}>

      <TouchableOpacity
        style={styles.container}
        onPress={() => setVisible(true)}
      >
        <Text style={selectedValue ? styles.selectedValue : styles.placeholder}>
          {selectedValue ? getLabel() : placeholder}
        </Text>
        <Image resizeMode='contain' style={styles.downIcon} source={icons.downIcon}></Image>
      </TouchableOpacity>
      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0.5}
      >
        <View style={styles.modalContainer}>
          <View style={styles.contentContainer}>
            <TouchableOpacity
              activeOpacity={1}

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
              <ScrollView>
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.5}
                  onPress={() => handleValueChange(option?.value)}
                  style={{ flex: 1 }}
                >
                  <Text style={styles.selectedValue}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            ))}
          </View>

        </View>
      </Modal>
    </View >
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  downIcon: {
    height: 25,
    width: 30
  },

});

export default SelectionComponent;
