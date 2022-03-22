import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
  Image,
  TextInput,
  Button,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { AuthContext } from '../../App';
import auth from '@react-native-firebase/auth';

export const SignInPage = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      let log = await confirm.confirm(code);
      console.log('log', log)
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+1 4804904963')}
      />
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );

  const { signIn } = React.useContext(AuthContext);
  const [phone, setPhone] = React.useState('');
  return (
    <View style={styles.container}>
      {/* title */}
      <View style={styles.container_title}>
        <Text style={styles.text_title}>Order Practice</Text>
        <Text style={styles.text_login}>SignIn</Text>
      </View>
      <View style={styles.container_button}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
              style={{ backgroundColor: '#4580c4', borderRadius: 5 }}
              onPress={() => {

              }}>
              <View style={{ alignItems: 'center', padding: 10 }}>
                <Text style={{ fontSize: 20, color: 'white' }}>Sign in with Firebase</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
      <View style={styles.container_footer} />
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
