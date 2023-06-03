import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { icons } from '../../../assets/images';

const EditComponent = ({
  title,
  subtitle,
  Icon,
  onPress,
  borderLessImage = false,
  roundeImage = false
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>

        {borderLessImage ?
          <Image style={styles.borderLessImage} source={Icon} /> :
          !roundeImage && <View style={styles.iconContainer}>
            <Image style={styles.icon} source={Icon} />
          </View>
        }
        {roundeImage && <Image style={styles.roundeImage} source={Icon} />}

        <View style={styles.textContainer}>
          <Text style={styles.name}>{title}</Text>
          {subtitle && <Text style={styles.phone}>{subtitle}</Text>}
        </View>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.editIcon} source={icons.editcircle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(139,149,158,.5)',
    borderWidth: 1.5,
    borderRadius: 5,
    padding: 20,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    borderColor: '#0c0c0c',
    borderRadius: 40,
    borderWidth: 1,
    height: 40,
    width: 40,
  },
  icon: {
    resizeMode: 'contain',
    height: 22,
    width: 22,
  },
  textContainer: {
    marginLeft: 20,
    justifyContent: 'center',
    maxWidth: '70%'
  },
  name: {
    fontSize: 16,
  },
  phone: {
    fontSize: 16,
  },
  editIcon: {
    resizeMode: 'contain',
    height: 28,
    width: 23,
  },
  borderLessImage: {
    resizeMode: 'contain',
    height: 40,
    width: 80,
  },
  roundeImage: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    borderColor: '#0c0c0c',
    borderRadius: 40,
    borderWidth: 1,
    height: 40,
    width: 40,
    resizeMode: 'contain'
  },
});

export default EditComponent;
