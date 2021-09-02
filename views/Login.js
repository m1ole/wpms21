import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = ({navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);
  const {checkToken} = useUser();

  /*   const doLogin = async () => {
    try {
      const tokenFromApi = await login({
        username: 'john',
        password: 'examplepass',
      });
    console.log('doLogin reponse', tokenFromApi);
    await AsyncStorage.setItem('userToken', tokenFromApi);
    setIsLoggedIn(true);
  } catch (error) {
    console.log('doLogin error', error);
   }
  };
}; */

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
    <View style={styles.container}>
      <Text>Login</Text>

      <LoginForm navigation={navigation} />
      <RegisterForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
