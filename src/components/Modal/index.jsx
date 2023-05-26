import React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { icons } from '../../assets/images';
import { windowHeight, windowWidth, hp } from '../../utils/responsiveness';

const AppModal = ({ visible, onClose, children, title }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Image style={styles.close} source={icons.close} ></Image>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {title}
            </Text>
            <View />
          </View>
          <View style={styles.modalContent}>{children}</View>
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
    width: windowWidth,
    height: windowHeight,
  },
  closeButtonText: {
    color: 'blue',
  },
  modalContent: {
    flex: 1,
  },
  close: {
    height: 12,
    width: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(139,149,158,.2)',
    borderBottomWidth: 1.5,
    paddingVertical: hp(20),
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 20,
    color: '#0c0c0c',
    fontWeight: 500
  }
});

export default AppModal;
