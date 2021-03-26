import React from 'react';
import { Pressable } from 'react-native';
import { Link } from "react-router-native";
import Text from './Text';

const AppBarTab = ({to, children}) => {
  return (
    <Pressable>
      <Link to={to}>
        <Text primary heading bold style={{color: '#fff'}}>{children}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;