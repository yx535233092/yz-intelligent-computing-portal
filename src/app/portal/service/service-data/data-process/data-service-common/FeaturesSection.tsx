'use client';

import { useInView } from '@/hooks/useInView';

// 优势卡片组件
const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="bg-white rounded-[20px] shadow-[0_2px_12px_rgba(229,57,53,0.05)] p-8 min-w-[240px] max-w-[320px] flex-1 text-center">
    <h3 className="text-[#e53935] text-xl mb-3">{title}</h3>
    <p className="text-[#444]">{description}</p>
  </div>
);

export default function FeaturesSection() {
  const [featuresRef, isFeaturesInView] = useInView({ threshold: 0.2 });

  // 优势数据
  const features = [
    {
      title: '内容识别准确',
      description: '支持常见表格格式识别，包括文字、表格、图片处理。',
    },
    {
      title: '支持多种文件格式',
      description: '可以解析PDF、Word、Excel、图片等多种类型文件。',
    },
    {
      title: '服务稳定可靠',
      description: '基于成熟技术架构，提供稳定的文档解析服务。',
    },
  ];

  return (
    <section
      ref={featuresRef}
      className={`flex justify-center gap-8 my-12 mx-8 flex-wrap transition-all duration-1000 ${
        isFeaturesInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
      }`}
    >
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </section>
  );
}
