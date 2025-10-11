'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function DocumentProcessContent() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');

  useEffect(() => {
    console.log(title);
  }, [title]);

  return (
    <div>
      <iframe
        className="w-full"
        style={{
          height: 'calc(100vh - 64px)',
        }}
        src={`http://39.175.132.230:35036/?title=${title}`}
      ></iframe>
    </div>
  );
}
// http://39.175.132.230:35022/
//http://192.168.10.24:7860/?title=${title}

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
