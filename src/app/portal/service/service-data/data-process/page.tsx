'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  FeaturesSection,
  MultiNeedsSection,
  IntelligentProcessSection,
} from './data-service-common';

export default function DataServiceProcessPage() {
  const router = useRouter();

  return (
    <div className="pb-[100px] bg-[#fafbfc] min-h-screen font-['PingFang_SC','Microsoft_YaHei',Arial,sans-serif]">
      {/* 顶部返回与标题 */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-10 flex items-center gap-4">
        <button
          aria-label="返回"
          onClick={() => router.push('/portal/service/service-data')}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          返回
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1f2a54]">
          数据加工与能力展示
        </h1>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 mt-8 space-y-16">
        <FeaturesSection />
        <MultiNeedsSection />
        <IntelligentProcessSection />
      </div>
    </div>
  );
}
