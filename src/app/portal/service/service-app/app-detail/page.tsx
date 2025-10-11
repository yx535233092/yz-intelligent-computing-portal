'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { getApplicationsAPI } from '@/apis/applications';
import type { ApplicationData } from '@/types/application';
import { Spin } from 'antd';

function AppDetailContent() {
  const searchParams = useSearchParams();
  const appName = searchParams.get('appName');
  const [app, setApp] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApp = async () => {
      try {
        setLoading(true);
        const res = await getApplicationsAPI();
        const foundApp = res.applications.find((app) => app.name === appName);
        setApp(foundApp || null);
      } catch (error) {
        console.error('获取应用详情失败:', error);
        setApp(null);
      } finally {
        setLoading(false);
      }
    };

    if (appName) {
      fetchApp();
    } else {
      setLoading(false);
    }
  }, [appName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="加载应用中..." />
      </div>
    );
  }

  if (app && app.url) {
    return (
      <iframe
        style={{ height: 'calc(100vh - 64px)', width: '100%', border: 'none' }}
        src={app.url}
        title={app.name}
      />
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-bold">未找到相关应用</div>
      </div>
    );
  }
}

export default function AppDetail() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="text-2xl font-bold">加载中...</div>
        </div>
      }
    >
      <AppDetailContent />
    </Suspense>
  );
}
