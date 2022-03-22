import * as React from 'react';
import {View, Button, Text, Animated} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {create} from 'react-test-renderer';
import LoginPageScreen from './stack/LoginPageScreen';

const Stack = createNativeStackNavigator();

export function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginPageScreen}
        options={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: 'tomato'},
        }}
      />
    </Stack.Navigator>
  );
}
