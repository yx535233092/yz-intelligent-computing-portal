'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getPermissionsAPI } from '@/apis/permission';

function DocumentProcessContent() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const dotsUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:9000/dots'
      : 'http://39.175.132.230:35036';

  useEffect(() => {
    const getPermissions = async () => {
      const res = await getPermissionsAPI();
      res.permissions.find((item) => {
        if (item.description && title) {
          const isInclude = item.description.includes(title);
          if (!isInclude) {
            const btn = document.querySelector('iframe');
            btn?.addEventListener('load', () => {
              setTimeout(() => {
                const parseBtn =
                  btn?.contentWindow?.document.querySelector('#parse_button');
                parseBtn?.setAttribute('disabled', 'true');
                const uploadBtn =
                  btn?.contentWindow?.document.querySelector('.svelte-edrmkl');
                uploadBtn?.setAttribute('disabled', 'true');
              }, 300);
            });
          }
        }
      });
    };
    // getPermissions();
  }, [title]);

  return (
    <div>
      <iframe
        className="w-full"
        style={{
          height: 'calc(100vh - 64px)',
        }}
        src={`${dotsUrl}/?title=${title}`}
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
