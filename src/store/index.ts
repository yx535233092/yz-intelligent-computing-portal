import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './features/loadingSlice';
import userInfoReducer from './features/userInfoSlice';

const store = configureStore({
  reducer: {
    // 加载状态
    isLoading: loadingReducer,
    // 用户信息
    userInfo: userInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
