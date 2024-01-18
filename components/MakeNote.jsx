import {View} from 'react-native';
import React, {useContext, useState} from 'react';
import {Box, Button, Input, Text} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import {AppContext} from './Context';

const MakeNote = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  let {notes, setNotes} = useContext(AppContext);

  const showData = async () => {
    let data = JSON.parse(await AsyncStorage.getItem('Todos'));
    console.log(data);
  };

  showData();

  const storeData = async () => {
    if (!title || !note) {
      console.warn('Please add data');
      return;
    }

    try {
      let todo = {title: title, note: note};
      let prevData = JSON.parse(await AsyncStorage.getItem('Todos'));
      if (!prevData) {
        prevData = await AsyncStorage.setItem('Todos', JSON.stringify('[]'));
      }
      await AsyncStorage.setItem(
        'Todos',
        prevData ? JSON.stringify([...prevData, todo]) : JSON.stringify([todo]),
      );
      setNotes([...prevData, todo]);
      setNote('');
      setTitle('');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <Header />

      <Box mt={'20'}>
        <Box alignItems={'center'}>
          <Text fontSize={20}>Create a note</Text>
        </Box>
        <Box alignItems={'center'} display={'flex'}>
          <Input
            variant={'filled'}
            placeholder="Enter note title"
            width={'80%'}
            marginTop={'5'}
            fontSize={'15'}
            value={title}
            onChangeText={e => {
              setTitle(e);
            }}
          />
          <Input
            variant={'filled'}
            placeholder="Enter note content"
            width={'80%'}
            marginTop={'7'}
            fontSize={'15'}
            value={note}
            onChangeText={e => {
              setNote(e);
            }}
          />
        </Box>
      </Box>

      <Box mt={'10'} alignItems={'center'}>
        <Button
          onPress={() => {
            storeData();
            navigation.navigate('Display');
          }}
          variant={'subtle'}
          bgColor={'#D4BD74'}
          width={'60%'}
          borderRadius={'10'}>
          <Text color={'#f5f5f5'}>Create note</Text>
        </Button>
      </Box>

      <Box alignItems={'center'} mt={'20'}>
        <Button
          w={'50%'}
          onPress={() => {
            navigation.navigate('Display');
          }}>
          <Text color={'#f5f5f5'}>Navigate</Text>
        </Button>
      </Box>
    </View>
  );
};

export default MakeNote;
