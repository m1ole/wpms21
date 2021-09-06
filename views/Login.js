import React, {useContext, useEffect} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Text} from 'react-native-elements';

const Login = ({navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);
  const {checkToken} = useUser();

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('logIn asyncstorage token:', userToken);
    if (userToken) {
      const userInfo = await checkToken(userToken);
      if (userInfo.user_id) {
        setIsLoggedIn(true);
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={StyleSheet.container}
    >
      <Text h3 h3Style={{alignContent: 'center'}}>
        {' '}
        Login
      </Text>
      <LoginForm navigation={navigation} />
      <RegisterForm navigation={navigation} />
    </KeyboardAvoidingView>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
