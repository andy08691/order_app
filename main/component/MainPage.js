import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  categories,
  menu_beverage,
  menu_main_course,
  menu_starters,
} from '../Constant';
const {width, height} = Dimensions.get('window');
import {useSelector, useDispatch} from 'react-redux';
import {updateShoppingCart} from '../Reducer';

export const MainPage = ({navigation}) => {
  const [selectedCategory, setsSlectedCategory] = React.useState(categories[0]);
  const [selectedMenu, setSelectedMeu] = React.useState(menu_starters);
  const shoppingItems = useSelector(
    state => state.shoppingCartReducer.shoppingItems,
  );

  function onSetCategory(categroy) {
    // TODO: filter menu data
    switch (categroy.id) {
      case 1:
        setSelectedMeu(menu_starters);
        break;
      case 2:
        setSelectedMeu(menu_main_course);
        break;
      case 3:
        setSelectedMeu(menu_beverage);
        break;
    }

    setsSlectedCategory(categroy);
  }

  function renderCategories() {
    const renderItem = ({item}) => {
      let imagePath = '';
      switch (item.id) {
        case 1:
          imagePath = require('../images/starters.png');
          break;
        case 2:
          imagePath = require('../images/maincourses.png');
          break;
        case 3:
          imagePath = require('../images/beverage.png');
          break;
      }
      return (
        <TouchableOpacity
          style={{
            padding: 5,
            paddingBottom: 20,
            backgroundColor: selectedCategory.id == item.id ? 'orange' : 'gray',
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 5,
          }}
          onPress={() => onSetCategory(item)}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Image source={imagePath} resizeMode="contain" />
          </View>
          <Text style={{color: 'white', fontWeight: 'bold'}}>{item.name}</Text>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{padding: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Categories</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{paddingVertical: 5}}
        />
      </View>
    );
  }

  function renderMenuList() {
    const renderItem = ({item}) => {
      let imagePath = '';
      let count = shoppingItems[item.m_id] ? shoppingItems[item.m_id] : 0;
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
        <View style={{width: width, alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.card, styles.shadowProp]}
            onPress={() => navigation.navigate('Detail', {item: item, imagePath: imagePath, count: count})}>
            <View style={{flex: 2}}>
              <View
                style={{
                  height: height * 0.15,
                  justifyContent: 'space-between',
                  paddingBottom: 10,
                }}>
                <Text
                  style={{fontSize: 25, fontWeight: 'bold', color: 'black'}}>
                  {item.name}
                </Text>
                <Text style={{fontSize: 18, color: 'black'}}>
                  $ {item.price}
                </Text>
              </View>
            </View>
            <View style={{flex: 1, backgroundColor: 'black'}}>
              <View style={{flex: 1}}>
                <Image
                  source={imagePath}
                  style={{
                    resizeMode: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
          {count != 0 ? (
            <View style={styles.badge}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
                {count}
              </Text>
            </View>
          ) : null}
        </View>
      );
    };
    return (
      <View
        style={{
          flex: 1,
          // padding: 10,
          alignItems: 'center',
        }}>
        <FlatList
          data={selectedMenu}
          keyExtractor={item => `${item.m_id}`}
          renderItem={renderItem}
          // contentContainerStyle={{paddingHorizontal: 10}}
          styles={{backgroundColor: 'black', width: width}}
        />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      {renderCategories()}
      {renderMenuList()}
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
    flexDirection: 'row',
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
  badge: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    right: 5,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
