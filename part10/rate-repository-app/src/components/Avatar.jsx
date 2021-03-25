import React from 'react';
import { StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  logo: {
    width: 70,
    height: 70,
    borderRadius: 5
  }
});

const Avatar = ({ url }) => {
  return (
      <Image
      style={styles.logo}
        source={{
          uri: url,
        }}
      />
  );
};

export default Avatar;