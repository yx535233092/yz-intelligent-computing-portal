import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPermissionState {
  value: {
    userPermissions: string[];
  };
}

const initialState: UserPermissionState = {
  value: {
    userPermissions: [],
  },
};

const userPermissionSlice = createSlice({
  name: 'userPermission',
  initialState,
  reducers: {
    // 设置用户权限
    setUserPermissions: (state, action: PayloadAction<string[]>) => {
      state.value.userPermissions = action.payload;
    },
    // 清空用户权限
    clearUserPermissions: (state) => {
      state.value.userPermissions = [];
    },
  },
});

export const { setUserPermissions, clearUserPermissions } =
  userPermissionSlice.actions;
export default userPermissionSlice.reducer;
