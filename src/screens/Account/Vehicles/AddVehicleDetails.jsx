import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import Header from '../../../components/Header';
import AppLoading from '../../../components/Loading/AppLoading';
import { Button } from '../../../components';
import { SelectionComponent } from '../../../components/Inputs';
import { hp } from '../../../utils/responsiveness';

const AddVehicleDetails = () => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  }

  return (
    <View style={styles.container}>
      <Header title={'Vehicle'} />
      <AppLoading loading={loading}>
        <ScrollView style={{
          padding: 20,
          marginBottom: hp(90),
        }}>

          <Text style={styles.title}>Add vehicle</Text>
          <View style={styles.fieldContainer}>

            <Text style={styles.label}>MAKE*</Text>

            <SelectionComponent
              options={[]}
              selectedValue={''}
              onValueChange={(e) => { setVehicle(e) }}
              placeholder={'Select...'}
              style={styles.dropDown}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>MODEL*</Text>
            <SelectionComponent
              options={[]}
              selectedValue={''}
              onValueChange={(e) => { setVehicle(e) }}
              placeholder={'Select...'}
              style={styles.dropDown}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>PLATE NUMBER*</Text>
            <TextInput
              style={styles.input}
              value={''}
              onChangeText={() => { }}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>YEAR*</Text>
            <SelectionComponent
              options={[]}
              selectedValue={''}
              onValueChange={(e) => { setVehicle(e) }}
              placeholder={'Select...'}
              style={styles.dropDown}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>EXTERIOR COLOUR*</Text>
            <SelectionComponent
              options={[]}
              selectedValue={''}
              onValueChange={(e) => { setVehicle(e) }}
              placeholder={'Select...'}
              style={styles.dropDown}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>INTERIOR COLOUR*</Text>
            <SelectionComponent
              options={[]}
              selectedValue={''}
              onValueChange={(e) => { setVehicle(e) }}
              placeholder={'Select...'}
              style={styles.dropDown}
            />
          </View>

        </ScrollView>
        <View style={styles.bottomContainer}>
          <View style={{ width: '90%' }}>
            <Button label={'Save'} onPress={handleSubmit} />
          </View>
        </View>

      </AppLoading>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fbfbfb'
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 10,
    marginBottom: 5,
    color: '#8b959e'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    height: 60
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
    backgroundColor: '#fbfbfb'
  },
  title: {
    fontSize: 30,
    marginVertical: 10
  },
  dropDown: {
    borderRadius: 2,
    backgroundColor: '#fbfbfb',
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  }
});

export default AddVehicleDetails;
