import React from 'react';
import { Pressable } from 'react-native';
import Text from './Text';

const AppBarTab = ({children}) => {
  return <Pressable>
  <Text primary heading bold style={{color: '#fff'}}>{children}</Text>
</Pressable>;
};

export default AppBarTab;