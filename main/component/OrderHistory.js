import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { updateShoppingCart, deleteShoppingCart } from '../Reducer';
import {
  categories,
  menu_beverage,
  menu_main_course,
  menu_starters,
} from '../Constant';
import {
  createOrderHistory,
  searchOrderHistory,
} from '../database/DatabaseManager';
const { width, height } = Dimensions.get('window');

export const OrderHistory = () => {
  let dataList = [];
  const userInfo = useSelector(state => state.userInfoReducer.userInfo);

  function getUserHistoryData() {
    dataList = searchOrderHistory(userInfo.id);
    console.log('[OrderHistory] getUserHistoryData', dataList);
  }

  const renderItem = ({ item }) => {
    console.log('renderItem', item)
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return (
      <View style={[styles.card, styles.shadowProp]}>
        <Text style={{fontWeight:'800', fontSize:20}}>{item.orderDate.toLocaleString('en-us', options)}</Text>
        <Text style={{fontWeight:'bold', fontSize:23, color:'orange', alignSelf:'center',marginTop:20}}>${item.amount}</Text>
      </View>
    );
  };

  getUserHistoryData();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
      <FlatList
        data={dataList}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        ListFooterComponent={<View style={{ height: 150 }} />}
        contentContainerStyle={{ backgroundColor: 'white' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
    width: width * 0.9,
    marginVertical: 10,
    height: height * 0.15,
    borderWidth:1,
    borderColor: 'gray'
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
