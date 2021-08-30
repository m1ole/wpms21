import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
} from 'react-native';
import List from '../components/List';

const Home = (props) => {
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <View style={styles.container}>
        <List />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

Home.propTypes = {};

export default Home;
