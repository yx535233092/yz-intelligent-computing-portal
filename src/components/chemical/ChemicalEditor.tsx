'use client';

import { useEffect, useState } from 'react';
import 'ketcher-react/dist/index.css';
import { Ketcher } from 'ketcher-core';
// @ts-expect-error no types
import { StandaloneStructServiceProvider } from 'ketcher-standalone';
import dynamic from 'next/dynamic';

declare global {
  interface Window {
    ketcher: Ketcher;
  }
}

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

const ChemicalEditor = ({ smiles }: { smiles: string }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const localStructServiceProvider = new StandaloneStructServiceProvider();

  // const getSmiles = async () => {
  //   const ket = window.ketcher;
  //   const smiles = await ket.getSmiles();
  //   console.log('Smiles:', smiles);
  // };
  // setInterval(() => {
  //   getSmiles();
  // }, 2000);

  const onInit = (ketcher: Ketcher) => {
    window.ketcher = ketcher;
    const ket = window.ketcher;
    ket.setMolecule(smiles);
    ket.editor.subscribe('change', (eventData) => {
      console.log('Structure changed:', eventData);
      ket.getSmiles().then((res) => {
        console.log('Smiles:', res);
      });
    });
  };

  return (
    <div className="w-full h-full">
      {/* 化学结构编辑器 */}
      <Editor
        errorHandler={(message: string) => {
          setHasError(true);
          setErrorMessage(message.toString());
        }}
        staticResourcesUrl={'/ketcher/'}
        structServiceProvider={localStructServiceProvider}
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

export default ChemicalEditor;
