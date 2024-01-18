import {ActivityIndicator, Pressable, RefreshControl, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, Center, Input, ScrollView, Text} from 'native-base';
import Header from './Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AIcon from 'react-native-vector-icons/AntDesign';
import Note from './Note';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './Context';

const Display = ({navigation}) => {
  // const [notes, setNotes] = useState([]);
  let {notes, setNotes} = useContext(AppContext);
  const [refreshing, setRefreshing] = useState(false);
  // const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const getNotes = async () => {
    setLoading(true);
    let data = JSON.parse(await AsyncStorage.getItem('Todos'));
    setNotes(data);
    setLoading(false);
  };

  useEffect(() => {
    getNotes();
    console.log('Refreshed');
  }, []);

  function displaySearchedNotes(text) {
    let newNotes = notes.filter(e => {
      return e.title.includes(text);
    });
    console.log(newNotes);
    setNotes(newNotes);
    if (text.length == 0) {
      getNotes();
    }
  }

  return (
    <Box w={'100%'} h={'100%'}>
      <ScrollView
        position={'relative'}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              getNotes();
            }}
          />
        }>
        <Box w={'100%'} h={'100%'}>
          <Header />
          <Box w={'100%'} alignItems={'center'} mt={'5'}>
            <Input
              variant={'rounded'}
              backgroundColor={'#e1e1e1'}
              w={'90%'}
              placeholder="Search"
              fontSize={'17'}
              color={'#555'}
              InputLeftElement={
                <Icon name={'search'} size={20} style={{paddingLeft: 15}} />
              }
              onChangeText={displaySearchedNotes}
            />
          </Box>

          {!loading && (
            <Box
              w={'100%'}
              pl={'3'}
              pr={'3'}
              mt={'5'}
              ml={'5'}
              display={'flex'}
              flexDir={'row'}
              flexWrap={'wrap'}
              gap={'5'}
              justifyContent={'left'}>
              {notes.reverse().map((e, index) => {
                return (
                  <Note
                    title={e.title}
                    note={e.note}
                    key={index}
                    noteIndex={notes.length - index - 1}
                    getNotes={getNotes}
                  />
                );
              })}
              <Box width={'100%'}></Box>
            </Box>
          )}
          {/* Add button */}
        </Box>
      </ScrollView>
      {!loading && (
        <Button
          position={'absolute'}
          right={'5'}
          bottom={'5'}
          background={'#F9DA6D'}
          borderRadius={'100'}
          padding={4}
          onPress={() => {
            navigation.navigate('Create');
          }}>
          <Text color={'#f5f5f5'}>
            <AIcon name={'plus'} size={24} />
          </Text>
        </Button>
      )}
      {loading && (
        <Center>
          <Box
            w={'100%'}
            h={'70%'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}>
            <Text>
              <ActivityIndicator color={'#333'} size={'lg'} />
            </Text>
          </Box>
        </Center>
      )}
    </Box>
  );
};

export default Display;
