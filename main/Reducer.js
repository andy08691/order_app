import {createSlice} from '@reduxjs/toolkit';

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: {
    shoppingItems: {1:1},
  },
  reducers: {
    updateShoppingCart: (state, action) => {
      if (action.payload.count == 0) {
        delete state.shoppingItems[action.payload.id];
      } else {
        state.shoppingItems[action.payload.id] = action.payload.count;
      }
    },
    deleteShoppingCart: (state, action) => {
      console.log('deleteShoppingCart')
      state.shoppingItems = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateShoppingCart, deleteShoppingCart} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
