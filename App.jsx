import {View, Text} from 'react-native';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NativeBaseProvider} from 'native-base';
import MakeNote from './components/MakeNote';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Display from './components/Display';
import {AppContext} from './components/Context';

const App = () => {
  const Stack = createNativeStackNavigator();

  const [notes, setNotes] = useState([]);

  return (
    <NativeBaseProvider>
      <AppContext.Provider value={{notes, setNotes}}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Display">
            <Stack.Screen name="Create" component={MakeNote} />
            <Stack.Screen name="Display" component={Display} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </NativeBaseProvider>
  );
};

export default App;
