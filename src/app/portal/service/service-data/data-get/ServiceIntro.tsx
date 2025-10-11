'use client';

import React from 'react';

export default function ServiceIntro() {
  return (
    <section className="mb-14">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#d32d26] mb-4">
          数据采集服务介绍
        </h2>
        <p className="text-gray-700 leading-relaxed">
          我们提供数据采集服务，提升规模化机器学习效率。作为数据服务行业的领先者，
          我们能够专业规划以及快速交付涵盖多种类型的优质数据，包括图像、视频、语音、音频和文本，
          以满足客户待定的 AI 项目需求。
        </p>
      </div>
    </section>
  );
}
