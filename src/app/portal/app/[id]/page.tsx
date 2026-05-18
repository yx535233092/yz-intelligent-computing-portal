'use client';

import React, { useEffect, useState, use } from 'react';
import { Spin, message } from 'antd';
import Cookies from 'js-cookie';
import { getApplicationDetailAPI } from '@/apis/applications';
import { getHjAccessTokenAPI } from '@/apis/service-app/hj';
import type { ApplicationData } from '@/types/application';
import { useRouter } from 'next/navigation';

// 使用 Next.js 15 的 params 类型
export default function UniversalAppPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [appData, setAppData] = useState<ApplicationData | null>(null);
  const [iframeUrl, setIframeUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const initApp = async () => {
      try {
        setLoading(true);
        
        // 1. 获取应用详情 (不需要 Token 即可调用的详情接口)
        const app = await getApplicationDetailAPI(parseInt(id));
        setAppData(app);

        // 2. 权限校验：如果不是公开应用，且 Cookie 中没有 token，则跳转登录
        const token = Cookies.get('token');
        if (!app.isPublic && !token) {
          router.push(`/auth/login?redirect=/portal/app/${id}`);
          return;
        }

        // 3. 检查 URL
        if (!app.url) {          setErrorMsg('应用未配置目标地址 (URL)');
          return;
        }

        // 3. 处理浩鲸平台认证 (根据 needsAuth 字段判断)
        if (app.needsAuth) {
          if (!app.username || !app.password) {
            message.error('浩鲸未配置用户名或密码');
          } else {
            try {
              const res = await getHjAccessTokenAPI({
                username: app.username,
                password: app.password,
              });
              // 写入 Token
              Cookies.set('access_token', res.accessToken);
            } catch (e) {
              console.error('浩鲸认证失败', e);
              message.error('自动登录浩鲸平台失败，可能需要手动登录');
            }
          }
        }

        // 4. 处理 URL 变量替换
        let finalUrl = app.url;
        if (finalUrl.includes('{hostname}')) {
          finalUrl = finalUrl.replace('{hostname}', window.location.hostname);
        }

        setIframeUrl(finalUrl);
      } catch (error) {
        console.error('加载应用失败', error);
        setErrorMsg('应用加载失败，请重试');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      initApp();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <Spin size="large" tip="应用初始化中..." />
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)] text-red-500 text-lg">
        {errorMsg}
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-white overflow-hidden relative">
      <iframe
        src={iframeUrl}
        className="absolute inset-0 w-full !h-[calc(100vh-64px)] border-none block"
        allow="camera; microphone; geolocation; fullscreen"
        title={appData?.name || 'Application'}
      />
    </div>
  );
}
