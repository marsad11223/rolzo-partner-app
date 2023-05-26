import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

const NotFound = ({ Icon, title = '', subTitle = '' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.IconContainer}>
        <Image style={styles.Icon} source={Icon} />
      </View>
      <Text style={styles.title}>
        {title}
      </Text>
      <Text style={styles.subTitle}>
        {subTitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  IconContainer: {
    width: 70,
    height: 70,
    borderRadius: 70,
    borderWidth: 1.5,
    borderColor: '#8b959e',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Icon: {
    resizeMode: 'contain',
    width: 25
  },
  title: {
    color: '#0c0c0c',
    fontSize: 20,
    marginVertical: 10
  },
  subTitle: {
    color: '#8b959e',
    fontSize: 15
  }
});

export default NotFound;
