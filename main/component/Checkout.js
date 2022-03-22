import React, {useState} from 'react';
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
import {useSelector, useDispatch} from 'react-redux';
import {updateShoppingCart, deleteShoppingCart} from '../Reducer';
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
import {quickStart} from '../database/Test';

const {width, height} = Dimensions.get('window');
export const Checkout = ({route, navigation}) => {
  const shoppingItems = useSelector(
    state => state.shoppingCartReducer.shoppingItems,
  );
  const userInfo = useSelector(state => state.userInfoReducer.userInfo);
  const dispatch = useDispatch();
  let total_amount = 0;

  function prepareListItems(dicts) {
    let temp = [];
    for (let key in dicts) {
      let value = dicts[key];
      // look up
      let item = null;
      if (key < 5) {
        item = menu_starters.filter(x => x.m_id == key)[0];
      } else if (key >= 5 && key < 9) {
        item = menu_main_course.filter(x => x.m_id == key)[0];
      } else {
        item = menu_beverage.filter(x => x.m_id == key)[0];
      }
      item.count = value;
      total_amount += item.count * item.price;
      temp.push(item);
    }
    // sort by value
    temp.sort(function (a, b) {
      return a.id - b.id;
    });
    return temp;
  }

  const renderItem = ({item}) => {
    let imagePath = '';
    switch (item.m_id) {
      case 1:
        imagePath = require('../images/Cocktails.jpeg');
        break;
      case 2:
        imagePath = require('../images/Salads.jpeg');
        break;
      case 3:
        imagePath = require('../images/Chips.jpeg');
        break;
      case 4:
        imagePath = require('../images/Taco.jpeg');
        break;
      case 5:
        imagePath = require('../images/Roast_chicken.jpeg');
        break;
      case 6:
        imagePath = require('../images/Spicy_Pork.jpeg');
        break;
      case 7:
        imagePath = require('../images/Steak.jpeg');
        break;
      case 8:
        imagePath = require('../images/Palak_Paneer.jpeg');
        break;
      case 9:
        imagePath = require('../images/Beer.jpeg');
        break;
      case 10:
        imagePath = require('../images/Milk_Tea.jpeg');
        break;
      case 11:
        imagePath = require('../images/Soda.jpeg');
        break;
    }
    return (
      <View
        style={{
          width: width,
          alignItems: 'center',
          flexDirection: 'row',
          height: 100,
          padding: 15,
        }}>
        <View style={{flex: 1.2}}>
          <Image
            source={imagePath}
            style={{
              resizeMode: 'contain',
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View style={{flex: 3, paddingLeft: 20}}>
          <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>
            {item.name}
          </Text>
          <Text style={{fontSize: 16, color: 'black'}}>$ {item.price}</Text>
        </View>
        <View style={{flex: 2}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={() => {
                let mCount = item.count > 0 ? item.count - 1 : 0;
                dispatch(updateShoppingCart({id: item.m_id, count: mCount}));
              }}>
              <FontAwesome5 name={'minus-circle'} size={20} color={'gray'} />
            </TouchableOpacity>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'black', fontSize: 25}}>{item.count}</Text>
            </View>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={() => {
                let mCount = item.count + 1;
                dispatch(updateShoppingCart({id: item.m_id, count: mCount}));
              }}>
              <FontAwesome5 name={'plus-circle'} size={20} color={'gray'} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingHorizontal: 10,
            }}>
            <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>
              ${item.count * item.price}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const dataList = prepareListItems(shoppingItems);

  function proceed_checkout() {
    // quickStart();
    if (dataList.length == 0) {
      Alert.alert('Info', 'No Selected Items', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }
    let orderItems = [];
    dataList.map(data => {
      let temp = {};
      temp.id = data.m_id;
      temp.count = data.count;
      temp.name = data.name;
      temp.unitPrice = data.price;
      temp.totalPrice = data.count * data.price;
      orderItems.push(temp);
    });
    const result = createOrderHistory(userInfo.id, {
      amount: total_amount,
      orderItems,
    });
    if (result) {
      Alert.alert('Info', 'Checkout successfully', [
        {
          text: 'OK',
          onPress: () => {
            navigation.pop();
            dispatch(deleteShoppingCart());
          },
        },
      ]);
    } else {
      Alert.alert('Info', 'Checkout failed', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={dataList}
        keyExtractor={item => `${item.m_id}`}
        renderItem={renderItem}
        ListFooterComponent={<View style={{height: 150}} />}
        contentContainerStyle={{backgroundColor: 'white'}}
      />
      <View style={styles.checkout_footer}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: width * 0.05,
          }}>
          <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>
            Total
          </Text>
          <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>
            ${' '}
            {total_amount.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'orange',
              width: '90%',
              height: 50,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              proceed_checkout();
            }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
              CHECKOUT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkout_footer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 150,
    zIndex: 10,
    backgroundColor: 'white',
  },
});
