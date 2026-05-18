'use client';

import React from 'react';

export default function HjPlatform() {
  // 使用代理地址，确保 Cookie (access_token) 能够同源传递
  const iframeUrl = '/docchain/chat';

  return (
    <div className="w-full h-full bg-white relative">
      <iframe
        src={iframeUrl}
        className="absolute inset-0 w-full h-full border-none block"
        allow="camera; microphone; geolocation; fullscreen"
        title="浩鲸文档知识库"
      />
    </div>
  );
}