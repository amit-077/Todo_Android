import {View} from 'react-native';
import React from 'react';
import {Box, Text} from 'native-base';

const Header = () => {
  return (
    <Box
      width={'100%'}
      alignItems={'center'}
      bgColor={'#f5f5f5'}
      paddingTop={'2'}
      paddingBottom={'2'}
      borderBottomWidth={'1'}
      borderBottomColor={'grey'}>
      <Text fontSize={25}>Todo List</Text>
    </Box>
  );
};

export default Header;
