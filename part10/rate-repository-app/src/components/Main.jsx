import React from 'react';
import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1
  },
  title: {
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold'
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate Repository App</Text>
      <RepositoryList/>
    </View>
  );
};

export default Main;