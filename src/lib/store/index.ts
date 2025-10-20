import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 默认使用 localStorage
import userInfoReducer from './features/userInfoSlice'; // 导入userInfo切片
import userPermissionReducer from './features/userPermission'; // 导入userPermission切片

// 1. 配置持久化
const persistConfig = {
  key: 'root', // 存储在本地的键名
  storage, // 默认使用 localStorage
  version: 1, // 版本号
  whitelist: ['userInfo', 'userPermission'], // 仅持久化 userInfo 和 userPermission 切片
};

// 2. 将组合根reducer
const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  userPermission: userPermissionReducer,
});

// 3. 包装reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. 配置Store
const store = configureStore({
  reducer: persistedReducer,
  // 3. 添加中间件，忽略 redux-persist 的 action，以避免序列化警告
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 6. 导出类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 5. 创建 persistor 对象
export const persistor = persistStore(store);

// 7. 导出store
export default store;
