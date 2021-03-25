import React from 'react';
import { View, StyleSheet } from 'react-native';
import Avatar from './Avatar';
import Text from './Text';
import Tag from './Tag';
import DataBlock from './DataBlock';

import theme from '../theme';

const styles = StyleSheet.create({
   item: {
    backgroundColor: theme.colors.white,
    padding: 15
  },
  main: {
    flexDirection: 'row',
  },
  description: {
    marginLeft: 20,
    flex: 1
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  }
});

const getFormatNumber = (number) => {
  const roundedNumber = Math.round( number / 100 ) / 10 ;
  return `${roundedNumber.toString()}k`;
};

const RepositoryItem = ({ item }) => {
  const { fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl } = item;

  return (
    <View style={styles.item}>
      <View style={styles.main}>
        <Avatar url={ownerAvatarUrl}/>
        <View style={styles.description}>
          <Text heading bold>{fullName}</Text>
          <Text secondary>{description}</Text>
          <Tag>{language}</Tag>
        </View>
      </View>
      <View style={styles.data}>
        <DataBlock data={getFormatNumber(stargazersCount)} label="Stars"/>
        <DataBlock data={getFormatNumber(forksCount)} label="Forks"/>
        <DataBlock data={reviewCount} label="Reviews"/>
        <DataBlock data={ratingAverage} label="Rating"/>
      </View>
    </View>
  );
};

export default RepositoryItem;