'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { userPermissionSelector } from '@/lib/store/selectors/permissionSelector';

function DocumentProcessContent() {
  // 1. 获取用户权限
  const userPermissions = useSelector(userPermissionSelector);

  // 2. 获取url权限参数
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const permissionKey = searchParams.get('permissionKey');

  // 3. iframe地址拼接
  const url = `/dots?title=${title}`;

  // 4. 无权限禁用按钮
  useEffect(() => {
    if (!permissionKey || !userPermissions.includes(permissionKey)) {
      const iframe = document.querySelector('iframe');
      // 每隔300ms获取一次dom元素，确保加载完成
      iframe?.addEventListener('load', () => {
        let isLoaded = false;
        const interval = setInterval(() => {
          if (iframe?.contentWindow?.document.querySelector('#parse_button')) {
            isLoaded = true;
          }
          if (isLoaded) {
            const parseBtn =
              iframe?.contentWindow?.document.querySelector('#parse_button');
            console.log(parseBtn);
            parseBtn?.setAttribute('disabled', 'true');
            const uploadBtn =
              iframe?.contentWindow?.document.querySelector('.svelte-edrmkl');
            uploadBtn?.setAttribute('disabled', 'true');
            clearInterval(interval);
          }
        }, 300);
      });
    }
  }, []);

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
