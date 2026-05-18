'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Spin } from 'antd';
import Cookies from 'js-cookie';
import { getTokenByStrategy } from '@/lib/utils/token-adapters';

function IframeAppContent() {
  const searchParams = useSearchParams();
  // 必须参数
  const targetUrl = searchParams.get('url');
  // 可选参数
  const tokenStrategy = searchParams.get('tokenStrategy'); // 'hj' | 'query' | 'header' ...
  const tokenParamName = searchParams.get('tokenParamName') || 'token'; // 如果是 query 模式，参数名
  const title = searchParams.get('title');

  const [isLoading, setIsLoading] = useState(true);
  const [finalUrl, setFinalUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const init = async () => {
      if (!targetUrl) {
        setErrorMsg('未配置应用地址 (url)');
        setIsLoading(false);
        return;
      }

      let url = decodeURIComponent(targetUrl);
      
      // 动态替换 hostname，方便配置 localhost 但在局域网访问
      if (url.includes('{hostname}')) {
        url = url.replace('{hostname}', window.location.hostname);
      }
      
      if (tokenStrategy) {
        try {
          const token = await getTokenByStrategy(tokenStrategy);
          if (!token) {
            throw new Error('获取 Token 失败');
          }

          // 策略分发
          if (tokenStrategy === 'hj') {
            // 浩鲸策略：写入 Cookie
            Cookies.set('access_token', token);
            // 浩鲸的 URL 可能包含相对路径，保持原样即可
          } else {
            // 默认策略：URL 替换或追加
            if (url.includes('{token}')) {
              url = url.replace('{token}', token);
            } else {
              const separator = url.includes('?') ? '&' : '?';
              url = `${url}${separator}${tokenParamName}=${token}`;
            }
          }
        } catch (e) {
          console.error(e);
          setErrorMsg('应用初始化失败：Token 获取异常');
          setIsLoading(false);
          return;
        }
      }

      setFinalUrl(url);
      setIsLoading(false);
    };

    init();
  }, [targetUrl, tokenStrategy, tokenParamName]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <Spin size="large" tip="应用加载中..." />
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)] text-red-500">
        {errorMsg}
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-white">
      {title && (
        <div className="h-12 border-b flex items-center px-6 font-bold text-lg">
          {title}
        </div>
      )}
      <iframe
        src={finalUrl}
        className="w-full h-full border-none"
        allow="camera; microphone; geolocation; fullscreen" // 允许常用权限
      />
    </div>
  );
}

export default function IframeAppPage() {
  return (
    <Suspense fallback={<Spin fullscreen />}>
      <IframeAppContent />
    </Suspense>
  );
}
