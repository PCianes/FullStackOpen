import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
  },
  text: {
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    paddingVertical: 5,
    paddingHorizontal: 10
  }
});

const Tag = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text heading style={styles.text}>{children}</Text>
    </View>
  );
};

export default Tag;