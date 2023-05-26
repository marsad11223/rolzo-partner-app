import { Formik } from 'formik';
import React, { useRef, useState, useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Linking,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-input';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Colors } from '../../theme/variables';
import { Button, Disclosure } from '../../components';
import * as Yup from 'yup';
import { AuthContext } from '../../providers/AuthProvider';
import { getExampleNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/examples.mobile.json';
import styled from 'styled-components/native';
import axios from 'axios';

import DeviceCountry, {
  TYPE_ANY,
  TYPE_TELEPHONY,
  TYPE_CONFIGURATION,
} from 'react-native-device-country';

const LoginSchema = Yup.object().shape({
  phone: Yup.number().required('Required'),
});

const Login = ({ navigation }) => {
  const phone = useRef();
  const [isValid, setIsValid] = useState(false);
  const [maxLength, setMaxLength] = useState(13);
  const [initialCountry, setInitialCountry] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        const responseT = await DeviceCountry.getCountryCode(TYPE_ANY);
        setInitialCountry(responseT.code.toLowerCase());
      } catch (err) {
        setInitialCountry('gb');
      }
    };
    fetch();
  }, []);
  useEffect(() => {
    if (userNotFound) {
      setTimeout(() => {
        setUserNotFound(false);
        // Linking.openURL(`https://partner.rolzo.com/auth/register`);
      }, 3500);
    }
  }, [userNotFound]);
  return (
    <AuthContext.Consumer>
      {({ loading, requestOneTimePassword, checkUserAvailable }) => (
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps={'handled'}
          enableResetScrollToCoords={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Log in</Text>
            <Text style={styles.subtitle}>Enter your mobile number</Text>
            <View style={styles.form}>
              <Formik
                validationSchema={LoginSchema}
                initialValues={{ phone: '' }}
                onSubmit={(values) => {
                  checkUserAvailable(values.phone)
                    .then((response) => {
                      if (response) {
                        requestOneTimePassword(values.phone)
                          .then((sid) => {
                            if (sid) {
                              navigation.navigate('Verify', {
                                phone: values.phone,
                                sid,
                              });
                            }
                          })
                          .catch((error) => {
                            alert(error.message);
                          });
                      } else if (!response) {
                        setUserNotFound(true);
                      }
                    })
                    .catch((error) => {
                      alert(error.message);
                    });
                }}
              >
                {({ errors, handleSubmit, values, touched, setFieldValue }) => {
                  return initialCountry === '' ? (
                    <></>
                  ) : (
                    <View>
                      <Text style={styles.inputLabel}>Mobile number*</Text>
                      <Input
                        ref={phone}
                        initialValue={values.phone}
                        // initialCountry="gb"
                        initialCountry={initialCountry}
                        onChangePhoneNumber={(number) => {
                          console.log(
                            'phone.current',
                            phone.current.getISOCode()
                          );
                          setFieldValue('phone', number);
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
                      {errors.phone && touched.phone ? (
                        <Text style={styles.error}>
                          No phone number entered
                        </Text>
                      ) : null}
                      {userNotFound ? (
                        <Text style={styles.error}>
                          Couldn't find your ROLZO account, you'll be redirected
                          to register shortly.
                        </Text>
                      ) : null}
                      <Button
                        onPress={handleSubmit}
                        label="Log in"
                        disabled={!isValid}
                      >
                        {loading ? <ActivityIndicator color="white" /> : null}
                      </Button>
                    </View>
                  );
                }}
              </Formik>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </AuthContext.Consumer>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  formContainer: {
    flex: 1,
    padding: 24,
    marginTop: heightPercentageToDP(10),
  },
  title: {
    fontSize: 30,
    marginBottom: 8,
    color: Colors.black,
    fontFamily: 'AvenirNextLTPro-Regular',
  },
  subtitle: {
    color: Colors.secondary,
    fontFamily: 'AvenirNextLTPro-Regular',
    fontSize: 16,
  },
  userNotFound: {
    color: Colors.secondary,
    fontFamily: 'AvenirNextLTPro-Regular',
    fontSize: 16,
    marginTop: 15,
    color: 'red',
  },
  form: {
    marginTop: heightPercentageToDP(10),
  },
  inputLabel: {
    textTransform: 'uppercase',
    fontSize: 12,
    marginBottom: 4,
    color: Colors.secondary,
    fontFamily: 'AvenirNextLTPro-Regular',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

const Input = styled(PhoneInput)`
  margin-bottom: 16px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${Colors.inputBorder};
  padding: 10px;
  height: 50px;
  font-family: 'AvenirNextLTPro-Regular';
`;
