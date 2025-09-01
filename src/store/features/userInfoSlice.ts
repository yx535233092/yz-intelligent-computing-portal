import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    value: {},
  },
  reducers: {
    // 设置用户信息
    setUserInfo: (state, action) => {
      state.value = action.payload;
    },
    // 清空用户信息
    clearUserInfo: (state) => {
      state.value = {};
    },
  },
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
