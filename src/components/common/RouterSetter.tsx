'use client';

import { useRouter } from 'next/navigation';
import { setAppRouter, setMessageApi } from '@/lib/api/request';
import { message } from 'antd';

export default function RouterSetter() {
  const [messageApi, contextHolder] = message.useMessage();
  // 为axios设置router实例
  const router = useRouter();
  setAppRouter(router);
  // 为axios设置message方法
  setMessageApi(messageApi);
  return <>{contextHolder}</>;
}
