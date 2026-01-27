'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getHjAccessTokenAPI } from '@/apis/service-app/hj';

export default function HjPlatform() {
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 根据环境设置API地址
  const baseUrl = `${location.protocol}//${location.hostname}:12810`;
  console.log('baseUrl', baseUrl);
  

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await getHjAccessTokenAPI({
          username: 'h3c_yanshi',
          password: 'H3c@12345!',
        });
        const token = response.accessToken;
        setAccessToken(token);
        Cookies.set('access_token', token);
      } catch (error) {
        console.error('获取access token失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessToken();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
        }}
      >
        正在加载中...
      </div>
    );
  }

  if (!accessToken) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
          color: 'red',
        }}
      >
        获取访问令牌失败，请刷新页面重试
      </div>
    );
  }

  return (
    <div>
      <iframe
        src={`${baseUrl}/docchain/chat`}
        style={{
          height: 'calc(100vh - 64px)',
          width: '100%',
          border: 'none',
        }}
      ></iframe>
    </div>
  );
}
