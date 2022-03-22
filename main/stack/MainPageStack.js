import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainPage} from '../component/MainPage';
import {Detail} from '../component/Detail';
const Stack = createNativeStackNavigator();

export const MainPageStack = () => {
  return (
    <Stack.Navigator initialRouteName="MainPage">
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Detail" component={Detail} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};
