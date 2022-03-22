import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {updateShoppingCart} from '../Reducer';

const {width, height} = Dimensions.get('window');

export const Detail = ({route, navigation}) => {
  // get the param
  const {item, imagePath, count} = route.params;
  const [mCount, setMCount] = useState(count);
  const shoppingItems = useSelector(
    state => state.shoppingCartReducer.shoppingItems,
  );
  const dispatch = useDispatch();
  function updateCart() {
    // shoppingItems[] = mCount;
    if (mCount == 0 && count == 0) {
      Alert.alert('Warning', 'Please add amount', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      dispatch(updateShoppingCart({id: item.m_id, count: mCount}));
      navigation.pop();
    }
  }
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 3}}>
        <Image
          source={imagePath}
          style={{
            resizeMode: 'stretch',
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      {/* <View style={{width: width, height: height * 0.3}}>

      </View> */}
      <View style={{flex: 5, backgroundColor: 'white', alignItems: 'center'}}>
        <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
          {item.name}
        </Text>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          $ {item.price}
        </Text>
      </View>
      <View style={{flex: 3, backgroundColor: 'white'}}>
        <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
          <Text
            style={{
              color: 'black',
              fontSize: 30,
              fontWeight: 'bold',
              marginLeft: 15,
            }}>
            Total:
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 30,
              fontWeight: 'bold',
              marginLeft: 20,
            }}>
            ${mCount * item.price}
          </Text>
        </View>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                width: width * 0.4,
                height: 50,
                borderRadius: 5,
                backgroundColor: 'orange',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => updateCart()}>
              <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
                {count > 0 ? 'Update' : 'Add'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                mCount > 0 ? setMCount(mCount - 1) : null;
              }}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5 name={'minus-circle'} size={40} color={'orange'} />
            </TouchableOpacity>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'black', fontSize: 45}}>{mCount}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setMCount(mCount + 1)}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5 name={'plus-circle'} size={40} color={'orange'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
