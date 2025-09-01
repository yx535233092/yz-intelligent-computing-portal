import { configureStore } from '@reduxjs/toolkit';
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
import rootReducer from './combineReducers'; // 导入组合后的 reducer

// 1. 配置持久化
const persistConfig = {
  key: 'root', // 存储在本地的键名
  version: 1, // 版本号
  storage, // 默认使用 localStorage
  // 仅持久化 userInfo 切片，而忽略 isLoading
  whitelist: ['userInfo'],
};

// 2. 将你的 rootReducer 包裹在 persistReducer 中
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  // 使用包裹后的 reducer
  reducer: persistedReducer,
  // 3. 添加中间件，忽略 redux-persist 的 action，以避免序列化警告
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 4. 创建 persistor 对象
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
