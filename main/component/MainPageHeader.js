import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {updateShoppingCart} from '../Reducer';

export const MainPageHeader = ({navigation: {navigate}}) => {
  // console.log('MainPageHeader', navigation);
  const shoppingItems = useSelector(
    state => state.shoppingCartReducer.shoppingItems,
  );
  let count = Object.keys(shoppingItems).length;
  return (
    <TouchableOpacity
      style={{marginRight: 10}}
      onPress={() => navigate('Checkout')}>
      <Icon
        name="shopping-cart"
        size={30}
        color={count > 0 ? 'orange' : 'gray'}
      />
    </TouchableOpacity>
  );
};
