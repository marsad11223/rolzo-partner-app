import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

import Header from '../../components/Header';
import { Colors } from '../../theme/variables';
import { Button } from '../../components';

const EditCompanyDetails = () => {
  const [name, setName] = useState('Supply App Cpmpany');
  const [city, setCity] = useState('');
  const [website, setWebsite] = useState('');

  return (
    <View style={styles.container}>
      <Header title={name} />
      <View style={{
        padding: 30,
      }}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>FIRST NAME*</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>LAST NAME*</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>LAST NAME*</Text>
          <TextInput
            style={styles.input}
            value={website}
            onChangeText={setWebsite}
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

export default EditCompanyDetails;
