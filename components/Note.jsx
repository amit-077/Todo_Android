import {View} from 'react-native';
import React, {useState} from 'react';
import {Box, Pressable, Text} from 'native-base';
import MIcon from 'react-native-vector-icons/dist/MaterialIcons';
import {MotiView} from 'moti';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Note = ({title, note, noteIndex, getNotes}) => {
  const [deleteBtnVisible, setDeleteBtnVisible] = useState(false);

  async function deleteItem() {
    let data = JSON.parse(await AsyncStorage.getItem('Todos'));
    // console.log(data.length);
    data.splice(noteIndex, 1);
    // console.log(data.length);
    await AsyncStorage.setItem('Todos', JSON.stringify(data));
    console.log('Item Deleted');
    getNotes();
  }

  return (
    <Box
      w={'40%'}
      height={'150'}
      p={'3'}
      background={'#D5BC73'}
      borderWidth={'0.5'}
      borderRadius={'8'}
      position={'relative'}>
      <Box
        position={'absolute'}
        right={'2'}
        bottom={'2'}
        display={deleteBtnVisible ? 'block' : 'none'}
        borderRadius={'100'}>
        <Pressable onPress={deleteItem}>
          <Text
            fontSize={'30'}
            bg={'#e1e1e1'}
            borderRadius={'100'}
            pl={'1'}
            pr={'1'}>
            <MIcon name="delete" size={30} color={'#cc0000'} />
          </Text>
        </Pressable>
      </Box>
      <Pressable
        onLongPress={() => {
          setDeleteBtnVisible(true);
        }}
        onPress={() => {
          setDeleteBtnVisible(false);
        }}>
        <Box w={'100%'}>
          <Text
            w={'100%'}
            fontSize={'17'}
            color={'#f5f5f5'}
            fontWeight={'700'}
            mb={'1'}>
            {title}
          </Text>
        </Box>
        <Box>
          <Text w={'100%'} fontSize={'14'} color={'#f5f5f5'} fontWeight={'500'}>
            {note.length >= 60 ? note.slice(0, 50) + '...' : note}
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
};

export default Note;
