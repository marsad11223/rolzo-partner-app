import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { getExampleNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/examples.mobile.json';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { Input } from '../../Login';
import { Button } from '../../../components';
import Header from '../../../components/Header';
import AppLoading from '../../../components/Loading/AppLoading';
import { Colors } from '../../../theme/variables';
import { icons } from '../../../assets/images';
import { fileToBase64, showToast } from '../../../utils/helper';
import AppPopup from '../../../components/Modal/AppPopup';

const EditChaufferDetails = ({ route: { params } }) => {
  const phone = useRef();
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState(params?.firstName);
  const [lastName, setLastName] = useState(params?.lastName);
  const [phoneNumber, setPhoneNumber] = useState(params?.phoneNumber);
  const [image, setImage] = useState(params?.profilePicture ?? null);
  const [maxLength, setMaxLength] = useState(13);
  const [isValid, setIsValid] = useState(false);
  const [base64, setBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result?.assets[0]?.uri);
      setBase64(await fileToBase64(result?.assets[0]?.uri));
    }
  };

  const handleSubmit = async () => {
    const data = {
      email: '',
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      profilePicture: base64 ?? '',
    };

    if (firstName === '' || lastName === '' || phoneNumber === '') {
      showToast('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.patch(
        `https://staging.rolzo.com/api/api/v1/external/chauffeur/edit/${params?._id}`,
        data
      );
      setLoading(false);
      if (response?.data?.meta?.success) {
        showToast('Chauffeur Updated');
        navigation.goBack();
      } else {
        showToast(response?.data?.meta?.message);
      }
    } catch (error) {
      setLoading(false);
      showToast(error?.message);
    }
  };

  const handleDelete = async () => {
    setDeleteModal(false)
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://staging.rolzo.com/api/api/v1/external/chauffeur/edit/${params?._id}`
      );
      setLoading(false);
      if (response?.data?.meta?.success) {
        showToast('Chauffeur Deleted');
        navigation.goBack();
      } else {
        showToast(response?.data?.meta?.message);
      }
    } catch (error) {
      setLoading(false);
      showToast(error?.message);
    }
  }

  return (
    <View style={styles.container}>
      <Header
        title={`${params?.firstName} ${params?.lastName}`}
        RightIcon={icons.DeleteIcon}
        RightCallBack={() => { setDeleteModal(true) }}
      />

      <AppLoading loading={loading}>
        <View style={styles.contentContainer}>
          <View style={styles.profileContainer}>
            {!image ? (
              <View style={styles.profilePhotoContainer}>
                <Image source={icons.chauffeurGrey} style={styles.profilePhoto} />
              </View>
            ) : (
              <Image source={{ uri: image }} style={styles.selectedImage} />
            )}
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.changePhotoText}>Change photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>FIRST NAME*</Text>
            <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>LAST NAME*</Text>
            <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>PHONE NUMBER*</Text>
            <Input
              initialValue={'+923249407607'}
              ref={phone}
              onChangePhoneNumber={(number) => {
                setPhoneNumber(number);
                setIsValid(phone.current.isValidNumber());
                setMaxLength(
                  phone.current.getISOCode().toUpperCase() === 'AT'
                    ? 13
                    : phone.current.getISOCode().toUpperCase() === 'BG'
                      ? 13
                      : getExampleNumber(phone.current.getISOCode().toUpperCase(), examples)?.number
                        .length
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
          <View style={styles.buttonContainer}>
            <Button label={'Save'} onPress={handleSubmit} />
          </View>
        </View>
      </AppLoading>

      <AppPopup visible={deleteModal} onClose={() => { setDeleteModal(false) }}>
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>Delete chauffeur</Text>
          <Text style={styles.popupText}>Are you sure you want to delete this chauffeur?</Text>

          <View style={styles.buttonGroup}>
            <View style={styles.buttonContainer}>
              <Button
                label={'No'}
                onPress={() => { setDeleteModal(false) }}
                backgroundColor={'#fbfbfb'}
                textColor={Colors.primary}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button label={'Yes'} onPress={handleDelete} />
            </View>
          </View>
        </View>
      </AppPopup>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  contentContainer: {
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhotoContainer: {
    width: 125,
    height: 130,
    borderRadius: 100,
    borderColor: '#8b959e',
    borderWidth: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: Colors.primary,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    marginBottom: 5,
    color: '#0c0c0c',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
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
    paddingTop: 20,
  },
  buttonContainer: {
    width: '50%',
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
    resizeMode: 'contain',
  },
  popupContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  popupTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  popupText: {
    fontSize: 15,
    marginBottom: 10,
  },
  buttonGroup: {
    marginVertical: 20,
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default EditChaufferDetails;
