import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { icons } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, RightIcon = null, RightCallBack = () => { } }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
        <Image source={icons.backIcon} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {RightIcon ? (
        <TouchableOpacity activeOpacity={0.5} onPress={RightCallBack}>
          <Image source={RightIcon} style={styles.rightIcon} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: 'rgba(139,149,158,.2)',
    borderBottomWidth: 1.5,
    marginTop: 30,
  },
  backIcon: {
    height: 42,
    width: 22,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
  },
  rightIcon: {
    height: 42,
    width: 22,
    resizeMode: 'contain',
  },
});

export default Header;
