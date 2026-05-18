import { getHjAccessTokenAPI } from '@/apis/service-app/hj';

export interface TokenAdapter {
  name: string;
  getToken: () => Promise<string>;
}

// 浩鲸平台适配器
const hjAdapter: TokenAdapter = {
  name: 'hj',
  getToken: async () => {
    // 这里使用硬编码的测试账号，或者应该从环境变量/配置中读取
    // 之前逻辑中是在调用处传参，还是在 API 内部？
    // src/apis/service-app/hj.ts 需要参数 data: LoginRequest
    // 让我们看看之前的调用方 src/app/portal/service/service-app/hj-platform/page.tsx
    
    // 为了简化，这里暂时硬编码，或者后续可以从环境变量读取
    // 实际上应该尽量避免前端硬编码密码，最好是后端代理处理
    try {
      const res = await getHjAccessTokenAPI({
        username: 'h3c_yanshi',
        password: 'H3c@12345!',
      });
      return res.accessToken;
    } catch (e) {
      console.error('Failed to get HJ token', e);
      return '';
    }
  }
};

// 适配器注册表
const adapters: Record<string, TokenAdapter> = {
  'hj': hjAdapter,
  // 将来可以添加其他平台:
  // 'other-platform': otherAdapter
};

export const getTokenByStrategy = async (strategyName: string): Promise<string> => {
  const adapter = adapters[strategyName];
  if (!adapter) {
    console.warn(`No token adapter found for strategy: ${strategyName}`);
    return '';
  }
  return await adapter.getToken();
};
