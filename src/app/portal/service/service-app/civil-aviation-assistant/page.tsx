'use client';

import React from 'react';

export default function CivilAviationAssistant() {
  const url = 'https://v2.fangcloud.com/ai-knowledge/all/abbdac54-2c01-455c-a51d-71e947b14968';

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      <iframe
        src={url}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        title="民航规范制度助手"
        allow="microphone"
      ></iframe>
    </div>
  );
}
