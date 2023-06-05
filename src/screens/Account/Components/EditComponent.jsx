import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { icons } from '../../../assets/images';
import RadioButton from '../../../components/Button/RadioButton';

const EditComponent = ({
  title,
  subtitle,
  Icon,
  onPress,
  style = {},
  borderLessImage = false,
  roundeImage = false,
  mode = 'edit',
  selected = null,
  value = null,
  setSelected = () => { }
}) => {
  return (
    <View style={[styles.container, style]}>
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
      <TouchableOpacity onPress={onPress} disabled={mode === 'confirm'}>
        {
          mode === 'edit' ?
            <Image style={styles.editIcon} source={icons.editcircle} />
            :
            mode === 'select' ?
              <RadioButton
                selected={selected}
                setSelected={setSelected}
                value={value}
                size={35}
              /> :
              mode === 'confirm' &&
              <Image style={styles.editIcon} source={icons.checklist} />
        }
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
    marginLeft: 15,
    justifyContent: 'center',
    width: '63%',
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
