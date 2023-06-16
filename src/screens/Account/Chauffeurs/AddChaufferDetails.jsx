import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { getExampleNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/examples.mobile.json';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import Header from '../../../components/Header';
import AppLoading from '../../../components/Loading/AppLoading';
import { Button } from '../../../components';
import { Colors } from '../../../theme/variables';
import { icons } from '../../../assets/images';
import { Input } from '../../Login';
import { getData } from '../../../utils/storage';
import { fileToBase64, showToast } from '../../../utils/helper';



const AddChaufferDetails = () => {

  const phone = useRef();
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [maxLength, setMaxLength] = useState(13);
  const [isValid, setIsValid] = useState(false);
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64(await fileToBase64(result.assets[0].uri));
    }
  };

  const handleSubmit = async () => {

    const data = {
      email: "",
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      profilePicture: base64 ?? ''
    }

    if (firstName == '' || lastName == '' || phoneNumber == '') {
      showToast('Please fill all required fields')
      return;
    }

    try {
      setLoading(true);
      const token = await getData('authToken');
      const response = await axios.post(`https://staging.rolzo.com/api/api/v1/external/chauffeur/${token}`, data);
      setLoading(false);
      if (response?.data?.meta?.success) {
        showToast('Chauffeur Added')
        navigation.goBack()
      } else {
        showToast(response?.data?.meta?.message)
      }
    } catch (error) {
      setLoading(false);
      showToast(error?.message);
    }
  }

  return (
    <View style={styles.container}>
      <Header title={'Add a chauffeur'} />

      <AppLoading loading={loading}>
        <ScrollView>
          <View style={styles.scrollviewContainer}>
            <View style={styles.profileContainer}>
              {!image ? <View style={{
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
                :
                <Image source={{ uri: image }} style={styles.selectedImage} />
              }
              <TouchableOpacity onPress={pickImage}>
                <Text style={styles.changePhotoText}>Upload photo</Text>
              </TouchableOpacity>
            </View>

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
              <Text style={styles.label}>MOBILE NUMBER*</Text>
              <Input
                initialValue={''}
                ref={phone}
                initialCountry="gb"
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
            <View style={styles.submitButton}>
              <Button label={'Save'} onPress={handleSubmit} />
            </View>
          </View>
        </ScrollView>
      </AppLoading>
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
    paddingTop: 10
  },
  selectedImage: {
    width: 125,
    height: 130,
    borderRadius: 100,
    borderColor: '#8b959e',
    borderWidth: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain'
  },
  scrollviewContainer: {
    padding: 20,
  },
  submitButton: {
    width: '90%',
  }
});

export default AddChaufferDetails;
