'use client';

import React from 'react';

const advantages = [
  {
    title: '质量与精度',
    desc: '自建标注团队与基地，流程管理规范，项目经理全程管控，专业度保障，数据准确率可达 99%。',
  },
  {
    title: '效率与规模',
    desc: '采集资源覆盖国内外多个地区，行业覆盖面广。交付团队达千人规模，团队管理成熟度高，交付快。',
  },
  {
    title: '安全可持续',
    desc: '严格的数据安全保护措施，标审分离，风险管控机制完善，项目支持稳定可持续，合作共赢。',
  },
];

export default function Advantages() {
  return (
    <section className="mb-14">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#d32d26] mb-6">
          我们的优势
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {advantages.map((a) => (
            <div
              key={a.title}
              className="rounded-xl border border-gray-100 p-5 bg-gray-50"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {a.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
