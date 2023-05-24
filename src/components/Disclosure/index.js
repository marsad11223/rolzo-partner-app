import React, { useState } from 'react';
import {
  Alert,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Linking,
} from 'react-native';
import { icons } from '../../assets/images/index';
import { Colors } from '../../theme/variables';
import Button from '../Button';
// import Modal from "react-native-modal";

const Disclosure = ({ modalVisible = false, hideModal = () => {} }) => {
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={hideModal}
      // isVisible={modalVisible}
      // onModalHide={hideModal}
      // backdropColor={"white"}
      // backdropOpacity={0.9}
    >
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          // contentContainerStyles={{ flexGrow: 1 }}
        >
          <TouchableOpacity onPress={hideModal}>
            <Image source={icons.back} style={styles.backIcon}></Image>
          </TouchableOpacity>
          <Text style={styles.modalText}>
            ROLZO Partner collects location data to enable its customers to
            follow their trip in real-time until drop-off, to be alerted when
            their chauffeur is on the way and on location even when the app is
            closed or not in use.
          </Text>
          <Text style={styles.modalText}>
            ROLZO Partner collects location data to enable background real-time
            location tracking, departure of the chauffeurs to pick-ups, and
            through drop-offs even when the app is closed or not in use.
          </Text>
          <Text style={styles.modalText}>
            ROLZO Partner collects location data to enable chauffeurs to update
            their location manually i.e. “I’m on my way”, “I’m on location”,
            “Passenger on board”, and “Passenger dropped-off”, and enable
            chauffeurs to update their location automatically through background
            real-time location even when the app is closed or not in use.
          </Text>

          {/* <Text style={styles.header}>Terms and conditions</Text>
          <Text style={[styles.modalText, { marginBottom: 20 }]}>
            By clicking Agree, you agree and consent to the
            <Text
              style={styles.links}
              onPress={() =>
                Linking.openURL('https://rolzo.com/partners-terms')
              }>
              {' '}
              Terms of Service
            </Text>{' '}
            and
            <Text
              style={{ color: 'blue' }}
              onPress={() =>
                Linking.openURL('https://rolzo.com/privacy-policy')
              }>
              {' '}
              Privacy Policy
            </Text>
            .
          </Text> */}
          {/* <View style={{ height: "100%", backgroundColor: "yellow" }}>
            <Button
              style={[styles.button]}
              onPress={hideModal}
              // label="Agree"
              label="I Understand"
            ></Button>
          </View> */}
        </ScrollView>
        <View>
          <Button
            style={[styles.button]}
            onPress={hideModal}
            // label="Agree"
            label="I understand"
          ></Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    paddingTop: StatusBar.currentHeight - 10,
    paddingBottom: StatusBar.currentHeight - 10,
    backgroundColor: 'rgba(255,255,255, 0.8)',
  },
  scrollView: {
    backgroundColor: 'white',
    // marginHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    // maxHeight: '100%',
    elevation: 5,
    // flex: 1
  },
  button: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    elevation: 2,
    //     align- items: center;
    //   justify- content: flex - end;
    // flex - direction: row;
    // position: absolute;
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'left',
    fontFamily: 'AvenirNextLTPro-Regular',
    fontSize: 16,
    marginBottom: 15,
    // color: Colors.secondary,
    color: Colors.black,
    letterSpacing: 0.5,
    // display: "flex",
    // flexDirection: "row"
  },
  links: {
    color: 'blue',
    fontFamily: 'AvenirNextLTPro-Regular',
    fontSize: 16,
  },
  header: {
    fontFamily: 'AvenirNextLTPro-Bold',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'left',
  },
  backIcon: {
    marginLeft: 15,
    marginBottom: 45,
    marginTop: 30,
    height: 18,
    width: 20,
    resizeMode: 'contain',
    flex: 1,
  },
});

export default Disclosure;
