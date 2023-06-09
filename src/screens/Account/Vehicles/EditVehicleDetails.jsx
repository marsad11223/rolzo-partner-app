import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, Image } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import Header from '../../../components/Header';
import { Button } from '../../../components';
import { SelectionComponent } from '../../../components/Inputs';
import { hp, wp } from '../../../utils/responsiveness';
import { getData } from '../../../utils/storage'
import AppLoading from '../../../components/Loading/AppLoading'
import { icons } from '../../../assets/images';
import { carYears, interiorColors, exteriorColors } from '../../../utils/constants';
import { showToast } from '../../../utils/helper';
import AppPopup from '../../../components/Modal/AppPopup';
import { Colors } from '../../../theme/variables';

const validationSchema = yup.object().shape({
  make: yup.string().required('Required'),
  model: yup.string().required('Required'),
  plateNumber: yup.string().required('Required'),
  year: yup.string().required('Required'),
  exteriorColour: yup.string().required('Required'),
  interiorColour: yup.string().required('Required'),
  specifyYear: yup.string()
});

const EditVehicleDetails = ({ route: { params } }) => {

  const navigation = useNavigation();
  const [cars, setCars] = useState([]);
  const [model, setModel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [carLoading, setCarLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [carImage, setCarImage] = useState(params?.vehicleImage);
  const [specifyYear, setSpecifyYear] = useState(carYears.find(item => item.label === params.year) ? null : params.year);
  const [deleteModal, setDeleteModal] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && fetchCars();
    isFocused && fetchModel(params?.make?.value)
    return () => {
    }
  }, [isFocused])

  const fetchCars = async () => {
    try {
      const token = await getData('authToken');
      setCarLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/global-fleet/partnerBrands/${token}?page=1&limit=30&filter[name,like]=`);
      setCars((prev) => {
        return response.data?.data?.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
      });
      setCarLoading(false);
    } catch (error) {
      setCarLoading(false);
    }
  }

  const fetchModel = async (id) => {
    try {
      const token = await getData('authToken');
      setModelLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/global-fleet/partnerBrands/${id}/model/${token}?page=1&limit=30&filter[name,like]=`);

      const uniqueModels = new Set();
      response.data?.data?.forEach(item => {
        uniqueModels.add(JSON.stringify(item));
      });

      setModel([...uniqueModels].map(item => {
        const model = JSON.parse(item);
        return {
          value: model.id,
          label: model.name
        }
      }));

      setModelLoading(false);
    } catch (error) {
      setModelLoading(false);
      console.log(error);
    }
  }

  const fetchCarsImage = async (makeId, modelId) => {
    try {
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/vehicleImage/${makeId}/${modelId}`);
      setCarImage(response?.data?.data?.imageUrl)
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (values) => {
    if (values.year === 'other' && !specifyYear) {
      showToast('Please specify the year')
      return
    }
    const data = {
      exteriorColour: values.exteriorColour,
      interiorColour: values.interiorColour,
      make: cars.find(item => item.value === values.make),
      model: model.find(item => item.value === values.model),
      plateNumber: values.plateNumber,
      year: values.year === 'other' ? specifyYear : values.year
    }

    try {
      setLoading(true);
      const response = await axios.patch(`https://staging.rolzo.com/api/api/v1/external/car/edit/${params._id}`, data);
      setLoading(false);
      if (response?.data?.meta?.success) {
        showToast('Car Updated')
        navigation.goBack()
      } else {
        showToast(response?.data?.meta?.message)
      }
    } catch (error) {
      setLoading(false);
      showToast(error?.message)
    }
  };

  const handleDelete = async () => {
    setDeleteModal(false)
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://staging.rolzo.com/api/api/v1/external/car/edit/${params?._id}`
      );
      setLoading(false);
      if (response?.data?.meta?.success) {
        showToast('Car deleted');
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
        title={`${params?.make?.label} ${params?.model?.label}`}
        RightCallBack={() => { setDeleteModal(true) }}
        RightIcon={icons.DeleteIcon}
      />
      <AppLoading loading={carLoading || loading}>
        <Formik
          initialValues={{
            make: params?.make.value,
            model: params?.model.value,
            plateNumber: params?.plateNumber,
            year: carYears.find(item => item.label === params.year) ? params.year : 'other',
            exteriorColour: params?.exteriorColour,
            interiorColour: params?.interiorColour,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={{ flex: 1 }}>
              <ScrollView style={styles.scrollView}>
                <View style={styles.carImageContainer}>
                  <Image source={{ uri: carImage }} style={styles.carImage} />
                </View>
                <View style={styles.formContainer}>
                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>MAKE*</Text>
                    <SelectionComponent
                      options={cars}
                      selectedValue={values.make}
                      onValueChange={(val) => {
                        handleChange('make')(val);
                        fetchModel(val);
                      }}
                      placeholder={'Select...'}
                      style={styles.dropDown}
                    />
                    <Text style={styles.error}>{touched.make && errors.make ? errors.make : ''}</Text>
                  </View>

                  <AppLoading loading={modelLoading}>
                    <View style={styles.fieldContainer}>
                      <Text style={styles.label}>MODEL*</Text>
                      <SelectionComponent
                        options={model}
                        selectedValue={values.model}
                        onValueChange={(val) => {
                          handleChange('model')(val);
                          fetchCarsImage(values.make, val);
                        }}
                        placeholder={'Select...'}
                        style={styles.dropDown}
                      />
                      <Text style={styles.error}>{touched.model && errors.model ? errors.model : ''}</Text>
                    </View>
                  </AppLoading>
                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>PLATE NUMBER*</Text>
                    <TextInput
                      style={styles.input}
                      value={values.plateNumber}
                      onChangeText={handleChange('plateNumber')}
                      onBlur={handleBlur('plateNumber')}
                    />
                    <Text style={styles.error}>{touched.plateNumber && errors.plateNumber ? errors.plateNumber : ''}</Text>
                  </View>

                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>YEAR*</Text>
                    <SelectionComponent
                      options={carYears}
                      selectedValue={values.year}
                      onValueChange={handleChange('year')}
                      placeholder={'Select...'}
                      style={styles.dropDown}
                    />
                    <Text style={styles.error}>{touched.year && errors.year ? errors.year : ''}</Text>
                  </View>

                  {
                    values.year === 'other' &&
                    <View style={styles.fieldContainer}>
                      <Text style={styles.label}>SPECIFY YEAR*</Text>
                      <TextInput
                        style={styles.input}
                        value={specifyYear}
                        onBlur={handleBlur('specifyYear')}
                        onChangeText={(val) => {
                          handleChange('specifyYear')(val);
                          setSpecifyYear(val);
                        }}
                      />
                      <Text style={styles.error}>{touched.specifyYear && specifyYear === null ? 'Required' : ''}</Text>
                    </View>
                  }

                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>EXTERIOR COLOUR*</Text>
                    <SelectionComponent
                      options={exteriorColors}
                      selectedValue={values.exteriorColour}
                      onValueChange={handleChange('exteriorColour')}
                      placeholder={'Select...'}
                      style={styles.dropDown}
                    />
                    <Text style={styles.error}>{touched.exteriorColour && errors.exteriorColour ? errors.exteriorColour : ''}</Text>
                  </View>

                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>INTERIOR COLOUR*</Text>
                    <SelectionComponent
                      options={interiorColors}
                      selectedValue={values.interiorColour}
                      onValueChange={handleChange('interiorColour')}
                      placeholder={'Select...'}
                      style={styles.dropDown}
                    />
                    <Text style={[styles.error, { marginBottom: 30 }]}>{touched.interiorColour && errors.interiorColour ? errors.interiorColour : ''}</Text>
                  </View>
                </View>
              </ScrollView>
              <View style={styles.bottomContainer}>
                <View style={{ width: '90%' }}>
                  <Button label={'Save'} onPress={handleSubmit} />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </AppLoading>
      <AppPopup visible={deleteModal} onClose={() => { setDeleteModal(false) }}>
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>Delete vehicle</Text>
          <Text style={styles.popupText}>Are you sure you want to delete this vehicle?</Text>

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
    backgroundColor: '#fbfbfb',
  },
  scrollView: {
    padding: 20,
    marginBottom: hp(90),
  },
  formContainer: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 10,
    marginBottom: 5,
    color: '#8b959e',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    height: 60,
  },
  title: {
    fontSize: 30,
    marginVertical: 10,
  },
  dropDown: {
    borderRadius: 2,
    backgroundColor: '#fbfbfb',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  error: {
    fontSize: 12,
    color: '#d0021b',
    textAlign: 'right',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 10,
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
  carImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(20)
  },
  carImage: {
    resizeMode: 'contain',
    height: hp(150),
    width: wp(250)
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
  buttonContainer: {
    width: '50%',
  },
});

export default EditVehicleDetails;
