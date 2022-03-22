import {configureStore} from '@reduxjs/toolkit';
import shoppingCartReducer from './main/Reducer';
import userInfoReducer from './login/Reducer';

export default configureStore({
  reducer: {
    userInfoReducer,
    shoppingCartReducer,
  },
});
