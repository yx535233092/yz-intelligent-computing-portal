import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  id?: number;
  username?: string;
  roleId?: number;
  [key: string]: any;
}

interface UserInfoState {
  value: {
    userInfo: UserInfo;
  };
}

const initialState: UserInfoState = {
  value: {
    userInfo: {},
  },
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    // 设置用户信息
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
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
