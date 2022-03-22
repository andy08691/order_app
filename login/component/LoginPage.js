import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {AuthContext} from '../../App';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginPage = ({route, navigation}) => {
  const {signIn} = React.useContext(AuthContext);
  const [phone, setPhone] = React.useState('+1 4804904963');
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    try {
      const result = await auth().signInWithPhoneNumber(phone);
      await AsyncStorage.setItem('userInfo', '123');
      console.log('result', result);
      setLoading(false);
      signIn({phone});
    } catch (error) {
      console.log('[LoginPage] login error', error);
      setLoading(false);
      setTimeout(() => {
        Alert.alert('Warning', 'Account login failed, please sign in', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }, 100);
    }
  }
  return (
    <View style={styles.container}>
      {/* title */}
      <View style={styles.container_title}>
        <Text style={styles.text_title}>Order Practice</Text>
        <Text style={styles.text_login}>Login</Text>
      </View>
      <View style={styles.container_button}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}>
          <View style={styles.button}>
            <TextInput
              style={{
                borderWidth: 1,
                fontSize: 20,
                borderRadius: 5,
                paddingLeft: 10,
              }}
              placeholder="phone"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View style={styles.button}>
            <TouchableHighlight
              style={{backgroundColor: '#4580c4', borderRadius: 5}}
              onPress={() => {
                login();
              }}>
              <View style={{alignItems: 'center', padding: 10}}>
                <Text style={{fontSize: 20, color: 'white'}}>Log in</Text>
              </View>
            </TouchableHighlight>
          </View>

          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
            OR
          </Text>
          <View style={[styles.button, {marginTop: 20}]}>
            <TouchableHighlight
              // style={{backgroundColor: '#4580c4', borderRadius: 5}}
              onPress={() => {
                navigation.navigate('SiginPage');
              }}>
              <View style={{alignItems: 'center', padding: 10}}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    textDecorationLine: 'underline',
                  }}>
                  Sign in
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
      <View style={styles.container_footer} />
      <View
        style={{
          position: 'absolute',
          left: width / 2 - 20,
          top: height / 2 - 100,
        }}>
        <ActivityIndicator animating={loading} size="large" color={'orange'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container_title: {
    flex: 1.5,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_button: {
    flex: 3,
    // backgroundColor: 'green',
  },
  container_footer: {
    flex: 1,
    // backgroundColor: 'red',
  },
  text_title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_login: {
    fontSize: 20,
  },
  textinput_phone: {},
  button: {
    width: width * 0.6,
    height: height * 0.1,
  },
});
