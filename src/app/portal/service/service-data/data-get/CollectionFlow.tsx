'use client';

import React from 'react';
// import Flow from '../../Flow';

export default function CollectionFlow() {
  return (
    <section className="mb-14">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-0">
        <div className="px-6 pt-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#d32d26] mb-2">
            采集与处理流程
          </h2>
          <p className="text-gray-600 mb-4">
            从数据采集与汇聚，到智能加工，再到数据集输出的全链路展示。
          </p>
        </div>
        {/* <Flow /> */}
      </div>
    </section>
  );
}
