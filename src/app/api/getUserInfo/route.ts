import { NextResponse } from 'next/server';

export const getUserInfoAPI = async () => {
  return NextResponse.json({
    message: 'success',
    data: {
      id: 1,
      name: 'test',
      role: 'admin',
      state: 'active',
    },
  });
};
