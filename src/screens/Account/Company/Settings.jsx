import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import AppLoading from '../../../components/Loading/AppLoading';
import EditComponent from '../EditComponent';
import { icons } from '../../../assets/images';
import { getData } from '../../../utils/storage';

const Settings = () => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState(null);
  const focused = useIsFocused();

  useEffect(() => {
    focused && fetchCompany();
    return () => {
    }
  }, [focused])

  const fetchCompany = async () => {
    try {
      const token = await getData('authToken');
      setLoading(true);
      const response = await axios.get(`https://staging.rolzo.com/api/api/v1/external/company/${token}`);
      setCompany(response.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <AppLoading loading={loading}>
      <View style={styles.container}>
        <View style={{
          marginTop: 30,
        }}>
        </View>
        <EditComponent
          Icon={icons.companyIcon}
          title={company?.name}
          subtitle={''}
          onPress={() => {
            navigation.navigate('EditCompanyDetails', company)
          }}
        />
      </View>
    </AppLoading>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Settings;
