import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'isLoading',
  initialState: {
    value: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.value = action.payload;
    },
    toggleLoading: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleLoading, setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
