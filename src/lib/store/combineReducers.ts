import { combineReducers } from '@reduxjs/toolkit';
import userInfoReducer from './features/userInfoSlice';

// 组合reducer
const rootReducer = combineReducers({
  userInfo: userInfoReducer,
});

export default rootReducer;
