'use client';

import React from 'react';

const items = [
  '手语语料采集',
  '金融QA语料采集',
  '医疗问答语料采集',
  '医疗引导语料采集',
  '问答社区语料采集',
  '评论打分语料采集',
  '社交媒体语料采集',
  '学术领域语料采集',
  '转账交易语料采集',
  '生活服务语料采集',
  '人机交互语料采集',
  '多语言平行语料采集',
];

export default function TextCollection() {
  return (
    <section className="mb-14">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#d32d26]">
            文本采集能力
          </h2>
          <p className="text-sm text-gray-500">
            支持 190 种语言，覆盖全球多行业与专业背景
          </p>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">
          基于全球数十个行业领域从业人员资源储备，支持 190
          种语言、专业背景下的语料采集及制作，例如医疗、金融等。
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((i) => (
            <li
              key={i}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 transition"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d32d26]"></span>
              <span className="text-gray-800 text-sm md:text-base">{i}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
