import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
   item: {
    backgroundColor: '#ccc',
    padding: 10
  }
});

const RepositoryItem = ({ item }) => {
  const { fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount } = item;

  return (
    <View style={styles.item}>
      <Text>Full name: {fullName}</Text>
      <Text>Description: {description}</Text>
      <Text>Language: {language}</Text>
      <Text>Stars: {stargazersCount}</Text>
      <Text>Forks: {forksCount}</Text>
      <Text>Reviews: {reviewCount}</Text>
      <Text>Rating: {ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;