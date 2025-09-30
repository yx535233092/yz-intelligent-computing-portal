import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    value: {
      userInfo: {},
    },
  },
  reducers: {
    // 设置用户信息
    setUserInfo: (state, action) => {
      state.value.userInfo = action.payload;
    },
    // 清空用户信息
    clearUserInfo: (state) => {
      state.value = {
        userInfo: {},
      };
    },
  },
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
