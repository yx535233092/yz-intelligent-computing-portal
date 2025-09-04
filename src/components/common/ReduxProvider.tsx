'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/lib/store'; // 导入 store 和 persistor

// 为了保证redux-persist在客户端渲染时生效，需要将ReduxProvider包裹在客户端渲染的组件中
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {/* PersistGate 会等待数据恢复后再渲染子组件 */}
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
