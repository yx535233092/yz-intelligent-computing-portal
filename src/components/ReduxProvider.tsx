import { Provider } from 'react-redux';
import store from '@/store';

// 确保ReduxProvider只包裹客户端渲染的组件
const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
