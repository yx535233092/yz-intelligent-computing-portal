'use client';

import { useEffect, useState } from 'react';
import 'ketcher-react/dist/index.css';
import type { Ketcher } from 'ketcher-core';
import dynamic from 'next/dynamic';

// 动态导入 Editor 和 InfoModal
const Editor = dynamic(
  () => import('ketcher-react').then((mod) => ({ default: mod.Editor })),
  {
    ssr: false,
  }
);
const InfoModal = dynamic(
  () => import('ketcher-react').then((mod) => ({ default: mod.InfoModal })),
  {
    ssr: false,
  }
);

const KetcherEditor = () => {
  const [smiles, setSmiles] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [localStructServiceProvider, setLocalStructServiceProvider] =
    useState<unknown>(null);

  // 初始化 StandaloneStructServiceProvider（仅在客户端）
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 动态导入 ketcher-standalone 避免服务器端执行
      // @ts-expect-error - ketcher-standalone types are not properly exported
      import('ketcher-standalone').then(
        (module: { StandaloneStructServiceProvider: new () => unknown }) => {
          const StandaloneStructServiceProvider =
            module.StandaloneStructServiceProvider;
          setLocalStructServiceProvider(new StandaloneStructServiceProvider());
        }
      );
    }
  }, []);

  // 1. listen parent post message
  useEffect(() => {
    console.log('mounted');
    // 监听来自 iframe 父窗口的消息
    const handleMessage = (e: MessageEvent) => {
      console.log(Date.now(), '收到消息:', e.data);
      // 检查消息是否包含 smiles 字段，并且值有变化
      if (e.data?.smiles && e.data.smiles !== smiles) {
        setSmiles(e.data.smiles);
      }
    };
    window.addEventListener('message', handleMessage);
    // 清理函数：组件卸载时移除监听器
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [smiles]);

  const onInit = (ketcher: Ketcher) => {
    window.ketcher = ketcher;
    const ket = window.ketcher;
    ket.setMolecule(smiles);
    // listen smiles change
    let index = 0;
    ket.editor.subscribe('change', () => {
      ket.getSmiles().then((res) => {
        // 只有在 iframe 中时才发送消息给父窗口
        if (window.parent !== window && index) {
          console.log('post smiles change message: ', res);
          if (typeof res === 'string') {
            window.parent.postMessage(
              {
                smiles: res,
              },
              '*'
            );
          }
        }
        index++;
      });
    });
  };

  if (!smiles || !localStructServiceProvider) {
    return <div>加载中...</div>;
  }

  return (
    <div className="w-full h-[500px]">
      {/* 化学结构编辑器 */}
      <Editor
        errorHandler={(message: string) => {
          setHasError(true);
          setErrorMessage(message.toString());
        }}
        staticResourcesUrl={'/ketcher/'}
        structServiceProvider={localStructServiceProvider as never}
        onInit={onInit}
      />
      {/* 错误处理 */}
      {hasError && (
        <InfoModal
          message={errorMessage}
          close={() => {
            setHasError(false);
            // Focus on editor after modal is closed
            const cliparea: HTMLElement | null =
              document.querySelector('.cliparea');
            cliparea?.focus();
          }}
        />
      )}
    </div>
  );
};

export default KetcherEditor;
