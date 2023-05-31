import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { getExampleNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/examples.mobile.json';

import { icons } from '../../assets/images';
import Header from '../../components/Header';
import { Colors } from '../../theme/variables';
import { Input } from '../Login';
import { Button } from '../../components';

const EditChaufferDetails = () => {
  const [firstName, setFirstName] = useState('Abdullah');
  const [lastName, setLastName] = useState('Abc');
  const [phoneNumber, setPhoneNumber] = useState('+923249407607');
  const [maxLength, setMaxLength] = useState(13);
  const [initialCountry, setInitialCountry] = useState('');
  const [isValid, setIsValid] = useState(false);

  const phone = useRef();

  return (
    <View style={styles.container}>
      <Header title={'Abdullah Abc'}
        RightIcon={icons.DeleteIcon}
        RightCallBack={() => { }}
      />

      <View style={{
        padding: 20,
      }}>
        <View style={styles.profileContainer}>
          <View style={{
            width: 125,
            height: 130,
            borderRadius: 100,
            borderColor: '#8b959e',
            borderWidth: 1,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={icons.chauffeurGrey} style={styles.profilePhoto} />
          </View>
          <TouchableOpacity >
            <Text style={styles.changePhotoText}>Change photo</Text>
          </TouchableOpacity>
        </View>

        {/* First name and last name fields */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>FIRST NAME*</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>LAST NAME*</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>PHONE NUMBER*</Text>
          <Input
            initialValue={'+923249407607'}
            ref={phone}
            // initialCountry="gb"
            initialCountry={initialCountry}
            onChangePhoneNumber={(number) => {
              setPhoneNumber(number);
              setIsValid(phone.current.isValidNumber());
              setMaxLength(
                phone.current.getISOCode().toUpperCase() === 'AT'
                  ? 13
                  : phone.current.getISOCode().toUpperCase() ===
                    'BG'
                    ? 13
                    : getExampleNumber(
                      phone.current.getISOCode().toUpperCase(),
                      examples
                    )?.number.length
              );
            }}
            textProps={{
              maxLength: maxLength,
            }}
            textStyle={{
              color: 'black',
            }}
          />
        </View>

      </View>

      <View style={styles.bottomContainer}>
        <View style={{ width: '90%' }}>
          <Button label={'Save'} onPress={() => { }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  changePhotoText: {
    marginTop: 10,
    textDecorationLine: 'underline',
    fontSize: 17,
    color: Colors.primary
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    marginBottom: 5,
    color: '#0c0c0c'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  countryPickerButton: {
    marginRight: 10,
  },
  countryPickerText: {
    fontSize: 16,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignItems: 'center',
    borderTopColor: 'rgba(139,149,158,.25)',
    borderTopWidth: 1.5,
    paddingTop: 20
  }
});

export default EditChaufferDetails;
