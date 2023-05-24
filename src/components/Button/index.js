import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/variables';
import styled from 'styled-components/native';

const Button = ({ onPress, label, children, ...rest }) => {
  return (
    <StyledButton
      activeOpacity={0.8}
      style={rest.disabled && styles.disabled}
      onPress={onPress}
      {...rest}>
      {children ? children : <Text style={styles.label}>{label}</Text>}
    </StyledButton>
  );
};

export default Button;

const styles = StyleSheet.create({
  label: {
    color: 'white',
    height: 20,
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: "500",
    // fontFamily: 'AvenirNextLTPro-Regular',
  },
  disabled: {
    // backgroundColor: Colors.disabled,
    backgroundColor: Colors.primary,
  },
});

const StyledButton = styled(TouchableOpacity)`
  background-color: ${Colors.primary};
  align-items: center;
  justify-content: center;
  padding: 16px;
  height: 50px;
`;
