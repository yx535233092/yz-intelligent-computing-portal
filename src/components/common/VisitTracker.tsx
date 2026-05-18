'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

export default function VisitTracker() {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const userInfo = useSelector((state: RootState) => state.userInfo.value.userInfo);

  useEffect(() => {
    // 每次路径变化时
    startTimeRef.current = Date.now();
    const currentPath = pathname;

    // 当用户离开页面或组件卸载时上报
    return () => {
      const duration = (Date.now() - startTimeRef.current) / 1000;
      
      // 过滤掉停留时间太短的记录 (比如小于 1 秒)
      if (duration < 1) return;

      const data = {
        path: currentPath,
        duration: duration,
        username: userInfo?.username,
        userId: userInfo?.id,
      };

      // 使用 navigator.sendBeacon 确保在页面关闭时也能发送成功
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        navigator.sendBeacon('/api/monitoring/visit', blob);
      } else {
        // Fallback
        fetch('/api/monitoring/visit', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
        }).catch(() => {});
      }
    };
  }, [pathname, userInfo]);

  return null; // 该组件不渲染任何内容
}
