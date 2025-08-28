'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { applications } from '@/lib/constants';

function AppDetailContent() {
  const searchParams = useSearchParams();
  const appName = searchParams.get('appName');
  const app = applications.find((app) => app.name === appName);

  if (app) {
    return <iframe style={{ height: 'calc(100vh - 64px)' }} src={app.url} />;
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
