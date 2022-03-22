import {createSlice} from '@reduxjs/toolkit';

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    userInfo: {},
  },
  reducers: {
    updateUserInfo: (state, action) => {
      console.log('updateUserInfo', action);
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateUserInfo} = userInfoSlice.actions;

export default userInfoSlice.reducer;
