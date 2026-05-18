'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function DocumentProcessContent() {
  // 1. 获取url权限参数
  const searchParams = useSearchParams();
  const title = searchParams.get('title');

  // 2. iframe地址拼接
  const url = `http://119.45.162.155:7860?title=${title}`;

  return (
    <div>
      <iframe
        className="w-full"
        style={{
          height: 'calc(100vh - 64px)',
        }}
        src={url}
      ></iframe>
    </div>
  );
}

export default function DocumentProcess() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[1100px] flex items-center justify-center">
          加载中...
        </div>
      }
    >
      <DocumentProcessContent />
    </Suspense>
  );
}
