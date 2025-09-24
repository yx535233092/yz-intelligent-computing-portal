'use client';
import React from 'react';

interface FlowProps {
  onProcessClick?: () => void;
}

/**
 * 数据服务流程图（等距网络安全插画风）
 * - 流程：数据采集 -> 数据加工 -> 输出（微调数据集 / 知识库数据集）
 * - 风格：蓝紫渐变、云计算元素、数据中心机柜、二进制与锁/盾牌图标、玻璃拟态与体积光
 * - 特性：透明/白色背景、响应式，适合官网头图展示
 */
export default function Flow({ onProcessClick }: FlowProps) {
  return (
    <section className="w-full bg-transparent mt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-blue-500 to-violet-500">
              数据处理全链路流程
            </span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600">
            从数据采集与汇聚，到智能加工，再到微调与知识库数据集输出
          </p>
        </div>

        <div className="w-full rounded-[24px] md:rounded-[28px] p-[1px] bg-gradient-to-br from-indigo-400/70 via-blue-400/60 to-violet-500/60">
          <div className="rounded-[24px] md:rounded-[28px] bg-white/80 backdrop-blur-xl">
            <svg
              role="img"
              aria-labelledby="flowTitle flowDesc"
              viewBox="0 0 1440 720"
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
            >
              <title id="flowTitle">数据处理流程图</title>
              <desc id="flowDesc">
                展示数据采集、数据加工、以及输出为微调数据集或知识库数据集的全流程等距插画。
              </desc>

              <defs>
                {/* 方向箭头定义 */}
                <marker
                  id="arrow"
                  markerWidth="10"
                  markerHeight="10"
                  refX="6"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="#6366f1" />
                </marker>
                <linearGradient id="g-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5b7cfa" stopOpacity="0.08" />
                  <stop offset="50%" stopColor="#7056ff" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#9b5cfb" stopOpacity="0.08" />
                </linearGradient>
                <radialGradient id="g-glow" cx="50%" cy="10%" r="60%">
                  <stop offset="0%" stopColor="#8ab6ff" stopOpacity="0.22" />
                  <stop offset="60%" stopColor="#7b6dff" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#6a42ff" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="g-panel" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#e9efff" stopOpacity="0.55" />
                </linearGradient>
                <linearGradient id="g-accent" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <linearGradient id="g-arrow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>

                {/* 流光管道用渐变 */}
                <linearGradient id="g-pipe" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="g-lane-1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#93c5fd" />
                </linearGradient>
                <linearGradient id="g-lane-2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#c4b5fd" />
                </linearGradient>
                <linearGradient id="g-lane-3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#a5b4fc" />
                </linearGradient>

                <filter
                  id="f-blur-strong"
                  x="-30%"
                  y="-30%"
                  width="160%"
                  height="160%"
                >
                  <feGaussianBlur stdDeviation="24" />
                </filter>
                <filter
                  id="f-glow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="12" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="f-glass">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="0.35"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="0.95 0 0 0 0  0 0.96 0 0 0  0 0 0.99 0 0  0 0 0 1 0"
                  />
                </filter>

                <clipPath id="clip-rounded">
                  <rect
                    x="40"
                    y="40"
                    width="1360"
                    height="640"
                    rx="28"
                    ry="28"
                  />
                </clipPath>

                <style>
                  {`
                  .floating { animation: floating 6s ease-in-out infinite; }
                  .floating-1 { animation: floating 6s ease-in-out infinite; animation-delay: 0s; }
                  .floating-2 { animation: floating 6.5s ease-in-out infinite; animation-delay: .6s; }
                  .floating-3 { animation: floating 7s ease-in-out infinite; animation-delay: 1.2s; }
                  .floating-fast { animation: floating 3s ease-in-out infinite; }
                  .pulse { animation: pulse 3s ease-in-out infinite; }
                  .blink { animation: blink 1.6s ease-in-out infinite; }
                  @keyframes floating { 0%,100%{ transform: translateY(0px);} 50%{ transform: translateY(-8px);} }
                  @keyframes pulse { 0%,100%{ opacity: .7;} 50%{ opacity: 1;} }
                  @keyframes blink { 0%,100%{ opacity: .35;} 50%{ opacity: .9;} }
                  /* 流光管道样式 */
                  .pipe-base { stroke: url(#g-pipe); stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; fill: none; opacity: 0.8; filter: url(#f-glow); }
                  .lane-1 { stroke: url(#g-lane-1); stroke-width: 4.2; stroke-linecap: round; stroke-linejoin: round; fill: none; stroke-dasharray: 12 14; stroke-dashoffset: 0; animation: flow 1.1s linear infinite; }
                  .lane-2 { stroke: url(#g-lane-2); stroke-width: 3.4; stroke-linecap: round; stroke-linejoin: round; fill: none; stroke-dasharray: 9 12; stroke-dashoffset: 0; animation: flow 1.3s linear infinite; animation-delay: -0.25s; }
                  .lane-3 { stroke: url(#g-lane-3); stroke-width: 2.8; stroke-linecap: round; stroke-linejoin: round; fill: none; stroke-dasharray: 7 10; stroke-dashoffset: 0; animation: flow 1.5s linear infinite; animation-delay: -0.5s; }
                  @keyframes flow { to { stroke-dashoffset: -120; } }
                  /* 粒子沿直线路径移动 */
                  .particle { filter: url(#f-glow); }
                  .move-h-60 { animation: moveH60 1.1s linear infinite; }
                  .move-h-60.delay-1 { animation-delay: .25s; }
                  .move-h-60.delay-2 { animation-delay: .55s; }
                  @keyframes moveH60 { 0% { transform: translateX(0); opacity: .9; } 100% { transform: translateX(60px); opacity: .9; } }
                  /* PCB 多路并行走线样式（更细、更密） */
                  .trace-shadow { stroke: #ffffff; stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; fill: none; opacity: 0.95; }
                  .trace-base { stroke: #4f46e5; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; fill: none; opacity: 1; }
                  .trace-l1 { stroke: url(#g-lane-1); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; fill: none; stroke-dasharray: 4 6; animation: flow 0.9s linear infinite; }
                  .trace-l2 { stroke: url(#g-lane-2); stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; fill: none; stroke-dasharray: 3 5; animation: flow 1.05s linear infinite; animation-delay: -0.2s; }
                  .trace-l3 { stroke: url(#g-lane-3); stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; fill: none; stroke-dasharray: 2 4; animation: flow 1.2s linear infinite; animation-delay: -0.4s; }
                  
                  `}
                </style>
              </defs>

              {/* 背景网格与体积光 */}
              <g clipPath="url(#clip-rounded)">
                <rect x="0" y="0" width="1440" height="720" fill="url(#g-bg)" />
                <ellipse
                  cx="720"
                  cy="140"
                  rx="620"
                  ry="260"
                  fill="url(#g-glow)"
                />
                <g opacity="0.08">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={60 + i * 68}
                      y1="40"
                      x2={60 + i * 68}
                      y2="680"
                      stroke="#6b6bff"
                      strokeWidth="1"
                    />
                  ))}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <line
                      key={`h-${i}`}
                      x1="40"
                      y1={80 + i * 60}
                      x2="1400"
                      y2={80 + i * 60}
                      stroke="#6b6bff"
                      strokeWidth="1"
                    />
                  ))}
                </g>
              </g>

              {/* 云元素 */}
              <g className="floating">
                <g opacity="0.7" filter="url(#f-blur-strong)">
                  <circle cx="200" cy="130" r="40" fill="#9bb5ff" />
                  <circle cx="240" cy="120" r="26" fill="#b19cff" />
                  <circle cx="265" cy="135" r="34" fill="#96a7ff" />
                </g>
                <g opacity="0.55" filter="url(#f-blur-strong)">
                  <circle cx="1220" cy="180" r="44" fill="#9bb5ff" />
                  <circle cx="1262" cy="168" r="28" fill="#b19cff" />
                  <circle cx="1290" cy="186" r="36" fill="#96a7ff" />
                </g>
              </g>

              {/* 三阶段图片流程：数据采集(data3) -> 数据加工(data2) -> 生成数据集(data1) */}
              <g>
                {/* 阶段标签 */}
                <text
                  x="300"
                  y="510"
                  textAnchor="middle"
                  fontSize="18"
                  fill="#1f2a54"
                  style={{ cursor: 'pointer' }}
                >
                  数据采集
                </text>
                <text
                  x="720"
                  y="510"
                  textAnchor="middle"
                  fontSize="18"
                  fill="#1f2a54"
                  style={{ cursor: 'pointer' }}
                  onClick={onProcessClick}
                >
                  数据加工
                </text>
                <text
                  x="1110"
                  y="260"
                  textAnchor="middle"
                  fontSize="18"
                  fill="#1f2a54"
                  style={{ cursor: 'pointer' }}
                >
                  微调数据集
                </text>
                <text
                  x="1110"
                  y="660"
                  textAnchor="middle"
                  fontSize="18"
                  style={{ cursor: 'pointer' }}
                  fill="#1f2a54"
                >
                  知识库数据集
                </text>

                {/* 新增输出分支标题 */}
                <text
                  x="1110"
                  y="460"
                  textAnchor="middle"
                  fontSize="18"
                  fill="#1f2a54"
                  style={{ cursor: 'pointer' }}
                >
                  xxxx
                </text>

                {/* 图片放置 */}
                <image
                  href="/data3.png"
                  x="120"
                  y="170"
                  width="360"
                  height="300"
                  preserveAspectRatio="xMidYMid meet"
                  className="floating-fast"
                />
                <image
                  href="/data2.png"
                  x="540"
                  y="170"
                  width="360"
                  height="300"
                  preserveAspectRatio="xMidYMid meet"
                  className="floating-fast"
                />
                <image
                  href="/data1.png"
                  x="980"
                  y="60"
                  width="260"
                  height="180"
                  preserveAspectRatio="xMidYMid meet"
                  className="floating-fast"
                />
                <image
                  href="/data5.png"
                  x="980"
                  y="460"
                  width="260"
                  height="180"
                  preserveAspectRatio="xMidYMid meet"
                  className="floating-fast"
                />

                {/* 新增输出分支图片 */}
                <image
                  href="/data6.png"
                  x="980"
                  y="260"
                  width="260"
                  height="180"
                  preserveAspectRatio="xMidYMid meet"
                  className="floating-fast"
                />

                {/* 数据流动方向动画管道 */}
                {/* 采集 -> 加工（与后续流程一致的管道动效） */}
                <g>
                  <path
                    d="M480 320 H 540"
                    className="pipe-base"
                    markerEnd="url(#arrow)"
                  />
                  <path d="M480 320 H 540" className="lane-1" />
                  <path d="M480 320 H 540" className="lane-2" />
                  <path d="M480 320 H 540" className="lane-3" />
                  {/* 可见的流动粒子，增强方向感 */}
                  <g>
                    <circle
                      cx="482"
                      cy="320"
                      r="3"
                      className="particle move-h-60"
                      fill="#60a5fa"
                    />
                    <circle
                      cx="488"
                      cy="320"
                      r="2.4"
                      className="particle move-h-60 delay-1"
                      fill="#a78bfa"
                    />
                    <circle
                      cx="494"
                      cy="320"
                      r="2"
                      className="particle move-h-60 delay-2"
                      fill="#38bdf8"
                    />
                  </g>
                </g>

                {/* 加工 -> 分支（上、下）：公共短段 */}
                <g>
                  <path
                    d="M900 320 H 930"
                    className="pipe-base"
                    markerEnd="url(#arrow)"
                  />
                  <path d="M900 320 H 930" className="lane-1" />
                  <path d="M900 320 H 930" className="lane-2" />
                  <path d="M900 320 H 930" className="lane-3" />
                </g>

                {/* 上支路：折线路径到 (980,150) */}
                <g>
                  <path d="M930 320 V 150 H 980" className="pipe-base" />
                  <path d="M930 320 V 150 H 980" className="lane-1" />
                  <path d="M930 320 V 150 H 980" className="lane-2" />
                  <path d="M930 320 V 150 H 980" className="lane-3" />
                  <polygon points="980,150 972,146 972,154" fill="#6366f1" />
                </g>

                {/* 下支路：折线路径到 (980,550) */}
                <g>
                  <path d="M930 320 V 550 H 980" className="pipe-base" />
                  <path d="M930 320 V 550 H 980" className="lane-1" />
                  <path d="M930 320 V 550 H 980" className="lane-2" />
                  <path d="M930 320 V 550 H 980" className="lane-3" />
                  <polygon points="980,550 972,546 972,554" fill="#6366f1" />
                </g>

                {/* 中支路：折线路径到 (980,350) */}
                <g>
                  <path d="M930 320 V 350 H 980" className="pipe-base" />
                  <path d="M930 320 V 350 H 980" className="lane-1" />
                  <path d="M930 320 V 350 H 980" className="lane-2" />
                  <path d="M930 320 V 350 H 980" className="lane-3" />
                  <polygon points="980,350 972,346 972,354" fill="#6366f1" />
                </g>
              </g>

              {/* 前景轻微高光边框 */}
              <rect
                x="40"
                y="40"
                width="1360"
                height="640"
                rx="28"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.65"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
