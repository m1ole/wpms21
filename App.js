import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import List from './components/List';
import {Settings} from 'react-native-feather';

const App = () => {
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <StatusBar animated={true} backgroundColor="#61dafb" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <Settings stroke="white" width={35} height={35} />
          </View>
          <ImageBackground
            source={{uri: 'https://placekitten.com/301/250'}}
            resizeMode="cover"
            style={styles.image}
            imageStyle={styles.catLogoImg}
          ></ImageBackground>
          <Text style={styles.kitten_slogan}>Homeless Kittens</Text>
        </View>
        <List />
      </View>
      <StatusBar style="auto" />
      <View style={styles.footer}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexBasis: 770,
    backgroundColor: '#000814',
  },
  catLogoImg: {
    borderBottomRightRadius: 80,
    marginBottom: 15,
  },
  image: {
    flex: 1,
  },
  header: {
    flexBasis: 300,
    backgroundColor: '#000814',
  },
  kitten_slogan: {
    width: 300,
    height: 50,
    position: 'absolute',
    bottom: 20,
    left: 10,
    fontSize: 35,
    color: 'white',
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    right: 10,
    top: 30,
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: 'rgb(36,40,52)',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

export default App;
