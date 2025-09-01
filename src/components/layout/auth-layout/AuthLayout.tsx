'use client';

import ReduxProvider from '@/components/common/ReduxProvider';
import LoadingContext from '@/components/common/LoadingContext';
import { Spin } from 'antd';
import { useState } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 加载状态和切换函数
  const [isLoading, setIsLoading] = useState(false);
  const toggleLoading = (value: boolean) => {
    setIsLoading(value);
  };
  const contextValue = {
    isLoading,
    toggleLoading,
  };

  return (
    <ReduxProvider>
      <LoadingContext.Provider value={contextValue}>
        <Spin
          spinning={isLoading}
          tip="加载中，请稍后..."
          size="large"
          fullscreen
        ></Spin>
        {children}
      </LoadingContext.Provider>
    </ReduxProvider>
  );
}
