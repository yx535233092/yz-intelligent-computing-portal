import type { RootState } from '..';

export const userPermissionSelector = (state: RootState) => {
  return state.userPermission.value.userPermissions;
};
