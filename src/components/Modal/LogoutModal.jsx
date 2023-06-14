import React from "react"
import Button from "../Button";
import { Text,View,StyleSheet,Colors } from "react-native";
import AppPopup from "./AppPopup";
import App from "../../../App";
const LogoutModal =(logout={}) =>{
    return(

<AppPopup visible={App} onClose={() => { setLogoutModal(false) }}>
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>Logout</Text>
          <Text style={styles.popupText}>Are you sure you want to logout ?</Text>

          <View style={styles.buttonGroup}>
            <View style={styles.buttonContainer}>
              <Button
                label={'No'}
                onPress={() => {setLogoutModal(false)}}
                backgroundColor={'#fbfbfb'}
                textColor={"black"}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button label={'Yes'} onPress={logout} />
            </View>
          </View>
        </View>
      </AppPopup>
    );
    }
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
      color: "black",
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
export default LogoutModal;
