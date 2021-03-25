import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  block: {
    alignItems: 'center'
  }
});

const DataBlock = ({ data, label }) => {
  return (
    <View style={styles.block}>
      <Text bold heading>{data}</Text>
      <Text secondary>{label}</Text>
    </View>
  );
};

export default DataBlock;