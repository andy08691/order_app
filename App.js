import * as React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginPage} from './login/component/LoginPage';
import 'react-native-gesture-handler';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import store from './store';
import {Provider} from 'react-redux';
import {MainPage} from './main/component/MainPage';
import {MainPageHeader} from './main/component/MainPageHeader';
import {Detail} from './main/component/Detail';
import {Checkout} from './main/component/Checkout';
import {updateUserInfo} from './login/Reducer';
import {useSelector, useDispatch} from 'react-redux';
import {OrderHistory} from './main/component/OrderHistory';
import {SignInPage} from './login/component/SignInPage';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

// function SignInScreen() {
//   const [username, setUsername] = React.useState('');
//   const [password, setPassword] = React.useState('');

//   const {signIn} = React.useContext(AuthContext);

//   return (
//     <View>
//       <TextInput
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Sign in" onPress={() => signIn({username, password})} />
//     </View>
//   );
// }

// for some function no screen, such as logout
function CustomDrawerContent(props) {
  const {signOut} = React.useContext(AuthContext);
  function logout() {
    auth()
      .signOut()
      .then(() => {
        console.log('user log out!');
      });
    signOut();
    removeValue();
  }

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
    } catch (e) {
      // remove error
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          logout();
        }}
      />
    </DrawerContentScrollView>
  );
}

const Stack = createStackNavigator();
const LoginStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();
const MainStack = createStackNavigator();

// create main route
function MainRoute() {
  const dispatch = useDispatch();
  dispatch(
    updateUserInfo({
      id: '123',
      account: 123123,
    }),
  );
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="MainPage"
        component={DrawerRoute}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Detail"
        component={Detail}
        options={{headerTitle: 'Ordering...'}}
      />
      <MainStack.Screen name="Checkout" component={Checkout} />
    </MainStack.Navigator>
  );
}

// create drawer navigation
function DrawerRoute() {
  return (
    <DrawerStack.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <DrawerStack.Screen
        name="MainPage"
        component={MainPage}
        options={({route, navigation}) => ({
          title: 'Order Page',
          headerStyle: {alignSelf: 'center', flex: 1},
          headerRight: props => (
            <MainPageHeader {...props} navigation={navigation} />
          ),
          headerTitleAlign: 'center',
        })}
        // options={{
        //   // headerLeft: props => <MainPageHeader {...props} />,
        //   // headerTitle:
        //   title: 'Order Page',
        //   headerStyle: {alignSelf: 'center', flex: 1},
        //   headerRight: props => <MainPageHeader {...props} />,
        //   headerTitleAlign: 'center',
        // }}
      />
      <DrawerStack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={({route, navigation}) => ({
          title: 'Order History',
        })}
      />
    </DrawerStack.Navigator>
  );
}

// create login route
function LoginRoute() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{
          headerShown: false,
        }}
      />
      <LoginStack.Screen
        name="SiginPage"
        component={SignInPage}
        options={{
          headerShown: false,
        }}
      />
    </LoginStack.Navigator>
  );
}

export default function App({navigation}) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    console.log('useEffect');
    const bootstrapAsync = async () => {
      let userToken;
      const value = await AsyncStorage.getItem('userInfo');
      if (value !== null) {
        // value previously stored
        userToken = value;
      }
      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        console.log('signIn data', data);
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator>
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : state.userToken == null ? (
              // No token found, user isn't signed in
              <Stack.Screen
                name="Log"
                component={LoginRoute}
                options={{
                  headerShown: false,
                  title: 'Sign in',
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
            ) : (
              // User is signed in
              <Stack.Screen
                name="MainPage"
                component={MainRoute}
                options={{
                  headerShown: false,
                  title: 'MainPage',
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}
