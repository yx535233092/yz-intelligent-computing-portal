import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './features/loadingSlice';

const store = configureStore({
  reducer: {
    isLoading: loadingReducer,
  },
});
export default store;
