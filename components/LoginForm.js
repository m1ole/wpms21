import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import FormTextInput from './FormTextInput';
import useLoginForm from '../hooks/LoginHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from '../hooks/ApiHooks';

const LoginForm = ({navigation}) => {
  const {inputs, handleInputChange} = useLoginForm();
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  4;
  const {login} = useLogin();

  const doLogin = async () => {
    try {
      const loginInfo = await login(inputs);
      console.log('doLogin response', loginInfo);
      await AsyncStorage.setItem('userToken', loginInfo.token);
      setUser(loginInfo.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('doLogin error', error);
    }
  };

  return (
    <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />

      <Button title="Sing In!" onPress={doLogin} />
    </View>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginForm;
