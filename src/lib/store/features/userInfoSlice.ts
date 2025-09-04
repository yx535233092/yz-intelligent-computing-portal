import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    value: {
      userInfo: {},
      userAppList: [],
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
        userAppList: [],
      };
    },
    // 设置用户应用列表
    setUserAppList: (state, action) => {
      state.value.userAppList = action.payload;
    },
  },
});

export const { setUserInfo, clearUserInfo, setUserAppList } =
  userInfoSlice.actions;
export default userInfoSlice.reducer;
