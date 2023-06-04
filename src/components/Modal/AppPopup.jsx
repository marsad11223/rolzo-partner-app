import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { icons } from '../../assets/images';

const AppPopup = ({ visible, onClose, children }) => {

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Image style={styles.close} source={icons.close} />
            </TouchableOpacity>
            <View />
          </View>
          <View>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    maxHeight: '80%',
  },
  close: {
    height: 12,
    width: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    alignItems: 'center'
  },
});

export default AppPopup;
