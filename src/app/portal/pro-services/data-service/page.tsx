'use client';

import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useInView } from '@/hooks/useInView';
import {
  FeaturesSection,
  MultiNeedsSection,
  IntelligentProcessSection,
} from './data-service-common';
import { Flow } from './data-service-flow';

export default function DataService() {
  useScrollToTop();

  // 使用自定义hook管理动画
  const [heroRef, isHeroInView] = useInView({ threshold: 0.3 });

  return (
    <div className="pb-[100px] bg-[#fafbfc] min-h-screen font-['PingFang_SC','Microsoft_YaHei',Arial,sans-serif]">
      {/* 顶部标题区 */}
      <section
        ref={heroRef}
        className={`text-center pt-[150px] pb-[90px] bg-[url('/13.webp')] bg-center bg-cover shadow-[0_4px_24px_rgba(229,57,53,0.06)] transition-all duration-1000 ${
          isHeroInView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-20'
        }`}
      >
        <h1 className="text-[#d32d26] text-5xl font-bold mb-15">
          数据服务解决方案
        </h1>
        <p className="text-[#222] text-2xl mb-4">
          面向文本、图像与表格的AI多模态数据解析服务
        </p>
        <p className="text-[#666] text-base mb-10">
          支持文档与图片文字识别，智能结构化输出，助力各类应用场景。
        </p>
      </section>

      <Flow />

      {/* 三栏优势区 */}
      {/* <FeaturesSection /> */}

      {/* 多种需求区块 */}
      {/* <MultiNeedsSection /> */}

      {/* 智能文档处理模块 */}
      {/* <IntelligentProcessSection /> */}

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            opacity: 0.6;
            transform: scaleX(1);
          }
          100% {
            opacity: 1;
            transform: scaleX(0.98);
          }
        }
        @keyframes dataLoad {
          0%,
          100% {
            opacity: 0.6;
            transform: scaleX(0.8);
          }
          50% {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        @keyframes complexDataLoad {
          0%,
          100% {
            opacity: 0.5;
            transform: scaleX(0.7);
          }
          50% {
            opacity: 1;
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
}
