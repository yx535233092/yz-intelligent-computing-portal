'use client';

import { useInView } from '@/hooks/useInView';

// 提取文本动画样式
const getTextAnimationStyle = (isInView: boolean, delay: number = 0) => ({
  opacity: isInView ? 1 : 0,
  transform: isInView ? 'translateY(0)' : 'translateY(30px)',
  transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
});

// 文件格式卡片组件
const FormatCard = ({
  icon,
  label,
  isInView,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  isInView: boolean;
  delay?: number;
}) => (
  <div
    className="bg-white rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] w-[90px] h-[110px] flex flex-col items-center justify-center text-[1.08rem] font-medium text-[#444] transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
    style={getTextAnimationStyle(isInView, delay)}
  >
    {icon}
    <span className="mt-2.5">{label}</span>
  </div>
);

export default function MultiNeedsSection() {
  const [multiNeedsRef, isMultiNeedsInView] = useInView({ threshold: 0.2 });

  // 文件格式数据
  const formats = [
    {
      label: 'PDF',
      icon: (
        <div
          className="w-12 h-14 rounded-[10px_10px_6px_6px] relative transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
          style={{
            background:
              'linear-gradient(145deg, #dc2626 0%, #ef4444 50%, #f87171 100%)',
            boxShadow:
              '0 4px 12px rgba(220, 38, 38, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          {/* 文件折角 */}
          <div
            className="absolute right-0 top-0 w-[20px] h-[20px] rounded-tr-[10px]"
            style={{
              background: 'linear-gradient(225deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: 'inset -2px -2px 4px rgba(220, 38, 38, 0.2)',
            }}
          ></div>
          <div
            className="absolute right-0 top-0 w-0 h-0"
            style={{
              borderLeft: '8px solid #dc2626',
              borderTop: '8px solid transparent',
            }}
          ></div>

          {/* PDF 标识 */}
          <div className="absolute left-1/2 top-[18px] transform -translate-x-1/2 text-white text-[0.6rem] font-black tracking-wider">
            PDF
          </div>

          {/* 装饰线条 */}
          <div className="absolute left-2 top-[30px] w-8 h-[2px] bg-white/80 rounded-full"></div>
          <div className="absolute left-2 top-[34px] w-6 h-[1.5px] bg-white/60 rounded-full"></div>
          <div className="absolute left-2 top-[38px] w-7 h-[1.5px] bg-white/60 rounded-full"></div>
        </div>
      ),
    },
    {
      label: 'Word',
      icon: (
        <div
          className="w-12 h-14 rounded-[10px_10px_6px_6px] relative transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
          style={{
            background:
              'linear-gradient(145deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
            boxShadow:
              '0 4px 12px rgba(30, 64, 175, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          {/* 文件折角 */}
          <div
            className="absolute right-0 top-0 w-[20px] h-[20px] rounded-tr-[10px]"
            style={{
              background: 'linear-gradient(225deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: 'inset -2px -2px 4px rgba(30, 64, 175, 0.2)',
            }}
          ></div>
          <div
            className="absolute right-0 top-0 w-0 h-0"
            style={{
              borderLeft: '8px solid #1e40af',
              borderTop: '8px solid transparent',
            }}
          ></div>

          {/* Word 图标 */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[1.8rem] font-black">
            W
          </div>

          {/* 装饰元素 */}
          <div className="absolute left-2 bottom-3 w-8 h-[1px] bg-white/70 rounded-full"></div>
          <div className="absolute left-2 bottom-1.5 w-6 h-[1px] bg-white/50 rounded-full"></div>
        </div>
      ),
    },
    {
      label: 'Excel',
      icon: (
        <div
          className="w-12 h-14 rounded-[10px_10px_6px_6px] relative transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
          style={{
            background:
              'linear-gradient(145deg, #15803d 0%, #22c55e 50%, #4ade80 100%)',
            boxShadow:
              '0 4px 12px rgba(21, 128, 61, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          {/* 文件折角 */}
          <div
            className="absolute right-0 top-0 w-[20px] h-[20px] rounded-tr-[10px]"
            style={{
              background: 'linear-gradient(225deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: 'inset -2px -2px 4px rgba(21, 128, 61, 0.2)',
            }}
          ></div>
          <div
            className="absolute right-0 top-0 w-0 h-0"
            style={{
              borderLeft: '8px solid #15803d',
              borderTop: '8px solid transparent',
            }}
          ></div>

          {/* 表格网格 */}
          <div className="absolute left-2 top-[18px] w-8 h-7 bg-white/90 rounded-sm overflow-hidden">
            <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-[1px] bg-green-600">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white"
                  style={{
                    background: i === 0 ? '#22c55e' : 'white',
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Excel X 标识 */}
          <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 text-white text-[1rem] font-black">
            X
          </div>
        </div>
      ),
    },
    {
      label: 'JPEG',
      icon: (
        <div
          className="w-12 h-14 rounded-[10px_10px_6px_6px] relative transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer overflow-hidden"
          style={{
            background:
              'linear-gradient(145deg, #ea580c 0%, #f97316 50%, #fb923c 100%)',
            boxShadow:
              '0 4px 12px rgba(234, 88, 12, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          {/* 文件折角 */}
          <div
            className="absolute right-0 top-0 w-[20px] h-[20px] rounded-tr-[10px]"
            style={{
              background: 'linear-gradient(225deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: 'inset -2px -2px 4px rgba(234, 88, 12, 0.2)',
            }}
          ></div>
          <div
            className="absolute right-0 top-0 w-0 h-0"
            style={{
              borderLeft: '8px solid #ea580c',
              borderTop: '8px solid transparent',
            }}
          ></div>

          {/* 图片预览框 */}
          <div className="absolute left-2 top-[20px] w-8 h-6 bg-white/90 rounded-md overflow-hidden">
            <div
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                position: 'relative',
              }}
            >
              {/* 山峰图案 */}
              <div
                className="absolute bottom-0 left-0 w-0 h-0"
                style={{
                  borderBottom: '8px solid #92400e',
                  borderRight: '12px solid transparent',
                }}
              ></div>
              <div
                className="absolute bottom-0 right-0 w-0 h-0"
                style={{
                  borderBottom: '6px solid #78350f',
                  borderLeft: '8px solid transparent',
                }}
              ></div>
              {/* 太阳 */}
              <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-200 rounded-full"></div>
            </div>
          </div>

          {/* JPEG 标识 */}
          <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 text-white text-[0.5rem] font-bold">
            JPEG
          </div>
        </div>
      ),
    },
    {
      label: 'PNG',
      icon: (
        <div
          className="w-12 h-14 rounded-[10px_10px_6px_6px] relative transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer overflow-hidden"
          style={{
            background:
              'linear-gradient(145deg, #7c3aed 0%, #8b5cf6 50%, #a78bfa 100%)',
            boxShadow:
              '0 4px 12px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          {/* 文件折角 */}
          <div
            className="absolute right-0 top-0 w-[20px] h-[20px] rounded-tr-[10px]"
            style={{
              background: 'linear-gradient(225deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: 'inset -2px -2px 4px rgba(124, 58, 237, 0.2)',
            }}
          ></div>
          <div
            className="absolute right-0 top-0 w-0 h-0"
            style={{
              borderLeft: '8px solid #7c3aed',
              borderTop: '8px solid transparent',
            }}
          ></div>

          {/* 图片预览框 */}
          <div className="absolute left-2 top-[20px] w-8 h-6 bg-white/90 rounded-md overflow-hidden">
            <div
              className="w-full h-full relative"
              style={{
                background:
                  'linear-gradient(135deg, #c084fc 0%, #a855f7 50%, #9333ea 100%)',
              }}
            >
              {/* 透明度网格背景 */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, #ffffff 25%, transparent 25%), 
                    linear-gradient(-45deg, #ffffff 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, #ffffff 75%), 
                    linear-gradient(-45deg, transparent 75%, #ffffff 75%)
                  `,
                  backgroundSize: '4px 4px',
                  backgroundPosition: '0 0, 0 2px, 2px -2px, -2px 0px',
                }}
              ></div>
              {/* 几何图案 */}
              <div className="absolute top-1 left-1 w-3 h-3 bg-white/80 rounded-full"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-white/60 rounded-sm"></div>
            </div>
          </div>

          {/* PNG 标识 */}
          <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 text-white text-[0.5rem] font-bold">
            PNG
          </div>
        </div>
      ),
    },
    {
      label: 'WebP',
      icon: (
        <div
          className="w-12 h-14 rounded-[10px_10px_6px_6px] relative transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer overflow-hidden"
          style={{
            background:
              'linear-gradient(145deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%)',
            boxShadow:
              '0 4px 12px rgba(8, 145, 178, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          {/* 文件折角 */}
          <div
            className="absolute right-0 top-0 w-[20px] h-[20px] rounded-tr-[10px]"
            style={{
              background: 'linear-gradient(225deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: 'inset -2px -2px 4px rgba(8, 145, 178, 0.2)',
            }}
          ></div>
          <div
            className="absolute right-0 top-0 w-0 h-0"
            style={{
              borderLeft: '8px solid #0891b2',
              borderTop: '8px solid transparent',
            }}
          ></div>

          {/* 现代化图片预览框 */}
          <div className="absolute left-2 top-[20px] w-8 h-6 bg-white/95 rounded-md overflow-hidden border border-cyan-200">
            <div
              className="w-full h-full relative"
              style={{
                background:
                  'linear-gradient(135deg, #ecfeff 0%, #cffafe 50%, #a5f3fc 100%)',
              }}
            >
              {/* 现代几何图案 */}
              <div className="absolute inset-0">
                {/* 圆形元素 */}
                <div className="absolute top-0.5 left-1 w-2.5 h-2.5 bg-cyan-400 rounded-full opacity-80"></div>
                <div className="absolute top-1.5 right-0.5 w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-60"></div>

                {/* 波浪线条 */}
                <div
                  className="absolute bottom-1 left-0 right-0 h-2"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, #22d3ee 20%, #06b6d4 50%, #0891b2 80%, transparent 100%)',
                    clipPath:
                      'polygon(0% 100%, 10% 80%, 30% 90%, 50% 70%, 70% 85%, 90% 75%, 100% 100%)',
                  }}
                ></div>

                {/* 现代条纹 */}
                <div className="absolute top-3 left-0.5 w-3 h-0.5 bg-cyan-500 rounded-full opacity-70 transform rotate-12"></div>
                <div className="absolute top-4 right-1 w-2 h-0.5 bg-cyan-400 rounded-full opacity-50 transform -rotate-12"></div>
              </div>

              {/* WebP 特有的压缩效果指示 */}
              <div className="absolute top-0 right-0 w-1 h-1">
                <div className="w-full h-full bg-green-400 rounded-bl-md opacity-80"></div>
              </div>
            </div>
          </div>

          {/* WebP 标识 */}
          <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 text-white text-[0.45rem] font-bold tracking-wide">
            WebP
          </div>
        </div>
      ),
    },
    {
      label: 'HTML',
      icon: (
        <div
          className="w-12 h-14 rounded-[10px_10px_6px_6px] relative transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
          style={{
            background:
              'linear-gradient(145deg, #059669 0%, #10b981 50%, #34d399 100%)',
            boxShadow:
              '0 4px 12px rgba(5, 150, 105, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          {/* 文件折角 */}
          <div
            className="absolute right-0 top-0 w-[20px] h-[20px] rounded-tr-[10px]"
            style={{
              background: 'linear-gradient(225deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: 'inset -2px -2px 4px rgba(5, 150, 105, 0.2)',
            }}
          ></div>
          <div
            className="absolute right-0 top-0 w-0 h-0"
            style={{
              borderLeft: '8px solid #059669',
              borderTop: '8px solid transparent',
            }}
          ></div>

          {/* HTML 标签 */}
          <div className="absolute left-1/2 top-[20px] transform -translate-x-1/2 text-white text-[0.7rem] font-bold">
            &lt;/&gt;
          </div>

          {/* 代码行 */}
          <div className="absolute left-2 top-[32px] w-6 h-[1.5px] bg-white/80 rounded-full"></div>
          <div className="absolute left-3 top-[36px] w-4 h-[1px] bg-white/60 rounded-full"></div>
          <div className="absolute left-2 top-[40px] w-5 h-[1px] bg-white/60 rounded-full"></div>

          {/* HTML 标识 */}
          <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 text-white text-[0.4rem] font-bold tracking-wide">
            HTML
          </div>
        </div>
      ),
    },
    {
      label: 'MP4',
      icon: (
        <div
          className="w-12 h-14 rounded-[10px_10px_6px_6px] relative transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
          style={{
            background:
              'linear-gradient(145deg, #dc2626 0%, #ef4444 50%, #f87171 100%)',
            boxShadow:
              '0 4px 12px rgba(220, 38, 38, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          {/* 文件折角 */}
          <div
            className="absolute right-0 top-0 w-[20px] h-[20px] rounded-tr-[10px]"
            style={{
              background: 'linear-gradient(225deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: 'inset -2px -2px 4px rgba(220, 38, 38, 0.2)',
            }}
          ></div>
          <div
            className="absolute right-0 top-0 w-0 h-0"
            style={{
              borderLeft: '8px solid #dc2626',
              borderTop: '8px solid transparent',
            }}
          ></div>

          {/* 视频播放图标 */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
          </div>

          {/* 视频帧指示器 */}
          <div className="absolute left-2 top-[20px] w-8 h-4 bg-white/20 rounded border border-white/30 flex items-center justify-center">
            <div className="w-4 h-2 bg-white/40 rounded"></div>
          </div>

          {/* MP4 标识 */}
          <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 text-white text-[0.4rem] font-bold tracking-wide">
            MP4
          </div>
        </div>
      ),
    },
    {
      label: 'WAV',
      icon: (
        <div
          className="w-12 h-14 rounded-[10px_10px_6px_6px] relative transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
          style={{
            background:
              'linear-gradient(145deg, #7c3aed 0%, #8b5cf6 50%, #a78bfa 100%)',
            boxShadow:
              '0 4px 12px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          {/* 文件折角 */}
          <div
            className="absolute right-0 top-0 w-[20px] h-[20px] rounded-tr-[10px]"
            style={{
              background: 'linear-gradient(225deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: 'inset -2px -2px 4px rgba(124, 58, 237, 0.2)',
            }}
          ></div>
          <div
            className="absolute right-0 top-0 w-0 h-0"
            style={{
              borderLeft: '8px solid #7c3aed',
              borderTop: '8px solid transparent',
            }}
          ></div>

          {/* 音频波形图标 */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-end gap-[1px] h-4">
              <div className="w-[2px] h-2 bg-white/90 rounded-full"></div>
              <div className="w-[2px] h-4 bg-white/90 rounded-full"></div>
              <div className="w-[2px] h-3 bg-white/90 rounded-full"></div>
              <div className="w-[2px] h-4 bg-white/90 rounded-full"></div>
              <div className="w-[2px] h-2.5 bg-white/90 rounded-full"></div>
              <div className="w-[2px] h-4 bg-white/90 rounded-full"></div>
              <div className="w-[2px] h-1.5 bg-white/90 rounded-full"></div>
            </div>
          </div>

          {/* 音频频谱指示器 */}
          <div className="absolute left-2 top-[20px] w-8 h-3 bg-white/20 rounded border border-white/30 flex items-center justify-center">
            <div className="flex items-end gap-[1px] h-2">
              <div className="w-[1px] h-1 bg-white/60 rounded-full"></div>
              <div className="w-[1px] h-2 bg-white/60 rounded-full"></div>
              <div className="w-[1px] h-1.5 bg-white/60 rounded-full"></div>
              <div className="w-[1px] h-2 bg-white/60 rounded-full"></div>
            </div>
          </div>

          {/* WAV 标识 */}
          <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 text-white text-[0.4rem] font-bold tracking-wide">
            WAV
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      ref={multiNeedsRef}
      className={`mx-auto my-[100px] p-10 rounded-[20px] max-w-[900px] relative text-center ${
        isMultiNeedsInView ? 'animate-in' : ''
      }`}
    >
      <h2
        className="text-5xl font-normal mb-10 text-[#222]"
        style={getTextAnimationStyle(isMultiNeedsInView)}
      >
        多种需求，一&ldquo;次&rdquo;搞定
      </h2>
      <p
        className="text-[1.08rem] text-[#444] mb-1"
        style={getTextAnimationStyle(isMultiNeedsInView, 0.2)}
      >
        支持
        PDF、Word（doc/docx）、常见图片（jpg/png/webp/tiff）、HTML、MP4、WAV
        等多种文件格式
      </p>
      <p
        className="text-[1.08rem] text-[#444] mb-8"
        style={getTextAnimationStyle(isMultiNeedsInView, 0.4)}
      >
        一键解析数据内容，获取文字、表格、标题层级、公式、手写字符、图片信息
      </p>
      <div className="flex justify-center gap-7 mb-8 ">
        {formats.map((format, index) => (
          <FormatCard
            key={index}
            icon={format.icon}
            label={format.label}
            isInView={isMultiNeedsInView}
            delay={0.6 + index * 0.1}
          />
        ))}
      </div>
    </section>
  );
}
