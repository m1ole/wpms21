import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import {Card, ListItem, Text} from 'react-native-elements';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {checkToken} = useUser();
  const [registerFormToggle, setRegisterFormToggle] = useState(false);

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('logIn asyncstorage token:', userToken);
    if (userToken) {
      try {
        const userInfo = await checkToken(userToken);
        if (userInfo.user_id) {
          setUser(userInfo);
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.log('getToken', e.message);
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ImageBackground
        // eslint-disable-next-line no-undef
        source={require('../assets/game_bg.png')}
        style={styles.image}
      >
        <Card style={styles.Card}>
          <Text style={styles.header}>MY APP</Text>
          {registerFormToggle ? (
            <Card>
              <Card.Title h4>Register</Card.Title>
              <RegisterForm navigation={navigation} />
            </Card>
          ) : (
            <Card>
              <Card.Title h4>Login</Card.Title>
              <LoginForm navigation={navigation} />
            </Card>
          )}
          <ListItem
            onPress={() => {
              setRegisterFormToggle(!registerFormToggle);
            }}
          >
            <Card.Divider />
            <Card.Divider />
            <ListItem.Content>
              <Text style={styles.text}>
                {registerFormToggle
                  ? 'Already an account? Login here!'
                  : 'No account ? Register Here!'}
              </Text>
            </ListItem.Content>

            <ListItem.Chevron />
          </ListItem>
        </Card>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
    margin: 20,
  },
  text: {
    fontWeight: 'bold',
  },
  Card: {
    opacity: 50,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
