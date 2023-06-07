import { Formik } from 'formik';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OTPTextView from 'react-native-otp-textinput';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Colors } from '../../theme/variables';
import { AuthContext } from '../../providers/AuthProvider';
import { AvenirNextLTProRegular } from '../../utils/fonts';

const OTPScreen = ({ route, navigation }) => {
  const { phone, sid } = route.params;
  const [currentSid, setCurrentSid] = useState(sid);

  return (
    <AuthContext.Consumer>
      {({ loading, login, requestOneTimePassword }) => (
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps={'handled'}
          enableResetScrollToCoords={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>SMS verification</Text>
            <Text style={styles.subtitle}>
              Please enter the verification code sent to {phone}
            </Text>
            <View style={styles.form}>
              <Formik
                initialValues={{ code: '' }}
                onSubmit={(values) => {
                  login(phone, currentSid, values.code);
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View>
                    <OTPTextView
                      handleTextChange={handleChange('code')}
                      containerStyle={styles.input}
                      textInputStyle={styles.inputField}
                      inputCount={4}
                      keyboardType="numeric"
                      values={values}
                      tintColor={Colors.primary}
                    />
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={styles.submitButton}
                    >
                      {loading ? <ActivityIndicator size={'small'} loading={loading} color={'#fbfbfb'} /> :
                        <Text style={styles.submitButtonText}>Submit</Text>}
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
            <View style={styles.footer}>
              <Text style={styles.subtitle}>
                Didn't get the code?{' '}
                <Text
                  onPress={() => {
                    requestOneTimePassword(phone)
                      .then((sid) => {
                        console.log('sid', sid);
                        if (sid) {
                          alert('OTP sent');
                          setCurrentSid(sid);
                        } else throw Error('Unable to send OTP. Try again.');
                      })
                      .catch((error) => {
                        console.log(error.message);
                        alert(error.message);
                      });
                  }}
                  style={styles.pressable}
                >
                  Resend
                </Text>
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </AuthContext.Consumer>
  );
};

export default OTPScreen;

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
    fontFamily: AvenirNextLTProRegular,
  },
  subtitle: {
    color: Colors.secondary,
    fontFamily: AvenirNextLTProRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    marginTop: heightPercentageToDP(10),
    flex: 1,
    alignItems: 'center',
  },
  input: { width: '60%', height: 100 },
  inputField: { color: Colors.black },
  // inputHiglighted: {borderColor: Colors.secondary},
  inputHiglighted: { borderColor: Colors.black },
  pressable: {
    color: Colors.primary,
  },
  footer: {
    alignItems: 'center',
  },

  submitButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
