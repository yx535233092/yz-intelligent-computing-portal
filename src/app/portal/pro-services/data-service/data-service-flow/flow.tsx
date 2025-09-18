'use client';

import React from 'react';

/**
 * 2.5D 科技风 数据处理流程图
 * 流程：数据采集 → 数据处理 → 分流至 知识库数据集｜微调数据集
 * 使用纯 SVG（渐变、阴影、发光、等距顶面）实现 2.5D 质感与动效
 */
export default function Flow(): React.ReactElement {
  return (
    <section className="relative py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold tracking-wide">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #67e8f9 0%, #60a5fa 40%, #a78bfa 70%, #f472b6 100%)',
              textShadow: '0 0 0 rgba(0,0,0,0)',
            }}
          >
            数据处理流程
          </span>
        </h2>
        <p className="text-center mt-3 text-[#55708a] text-sm md:text-base">
          数据采集 → 数据处理 → 知识库数据集 / 微调数据集
        </p>

        <div className="mt-12 rounded-xl border border-[#e6eef6] bg-white/70 shadow-[0_10px_30px_rgba(19,55,100,0.08)] p-4 md:p-6">
          <div className="relative w-full">
            <svg
              viewBox="0 0 1200 520"
              role="img"
              aria-label="数据采集经过数据处理转化为知识库数据集或微调数据集的流程图"
              className="w-full h-auto"
            >
              <defs>
                <pattern
                  id="grid-pattern"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#cfe0f1"
                    strokeWidth="1"
                    opacity="0.45"
                  />
                  <path
                    d="M 20 0 L 20 40 M 0 20 L 40 20"
                    fill="none"
                    stroke="#d9e7f4"
                    strokeWidth="0.5"
                    opacity="0.35"
                  />
                </pattern>

                <radialGradient id="radial-glow" cx="50%" cy="46%" r="60%">
                  <stop offset="0%" stopColor="#68e8ff" stopOpacity="0.25" />
                  <stop offset="35%" stopColor="#3bbdff" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
                </radialGradient>

                <linearGradient
                  id="scan-grad"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.35" />
                  <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>

                <mask id="scan-mask">
                  <rect
                    x="36"
                    y="36"
                    width="1128"
                    height="448"
                    fill="url(#scan-grad)"
                  >
                    <animate
                      attributeName="y"
                      values="-412;36;36;36;484"
                      dur="6s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </mask>

                <filter id="noise" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.8"
                    numOctaves="2"
                    stitchTiles="stitch"
                    result="turb"
                  />
                  <feColorMatrix
                    type="saturate"
                    values="0"
                    in="turb"
                    result="mono"
                  />
                  <feComponentTransfer in="mono">
                    <feFuncA type="linear" slope="0.035" />
                  </feComponentTransfer>
                </filter>
                <filter
                  id="platform-blur"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="14" />
                </filter>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="50%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
                <linearGradient
                  id="grad-blue"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#6fd3ff" />
                  <stop offset="100%" stopColor="#2a7fff" />
                </linearGradient>
                <linearGradient
                  id="grad-cyan"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#38f9d7" />
                  <stop offset="100%" stopColor="#00bcd4" />
                </linearGradient>
                <linearGradient
                  id="grad-indigo"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#7aa2ff" />
                  <stop offset="100%" stopColor="#3b52ff" />
                </linearGradient>
                <linearGradient
                  id="grad-purple"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <linearGradient
                  id="grad-orange"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ffcf6f" />
                  <stop offset="100%" stopColor="#ff7d2a" />
                </linearGradient>

                <filter
                  id="shadow-soft"
                  x="-30%"
                  y="-30%"
                  width="160%"
                  height="160%"
                >
                  <feOffset dy="6" in="SourceAlpha" result="off" />
                  <feGaussianBlur stdDeviation="8" in="off" result="blur" />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="0 0 0 0 0.08  0 0 0 0 0.19  0 0 0 0 0.35  0 0 0 0.28 0"
                    result="shadow"
                  />
                  <feMerge>
                    <feMergeNode in="shadow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter
                  id="glow-blue"
                  x="-40%"
                  y="-40%"
                  width="180%"
                  height="180%"
                >
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <marker
                  id="arrow"
                  viewBox="0 0 12 12"
                  refX="10"
                  refY="6"
                  markerWidth="12"
                  markerHeight="12"
                  orient="auto-start-reverse"
                >
                  <path d="M0,0 L12,6 L0,12 L3.2,6 z" fill="url(#grad-cyan)" />
                </marker>
              </defs>

              <g>
                <rect
                  x="36"
                  y="36"
                  width="1128"
                  height="448"
                  rx="18"
                  fill="#f7fbff"
                />
                <rect
                  x="36"
                  y="36"
                  width="1128"
                  height="448"
                  rx="18"
                  fill="url(#grad-blue)"
                  opacity="0.06"
                />
                <rect
                  x="36"
                  y="36"
                  width="1128"
                  height="448"
                  rx="18"
                  fill="url(#grid-pattern)"
                />
                <rect
                  x="36"
                  y="36"
                  width="1128"
                  height="448"
                  rx="18"
                  fill="url(#radial-glow)"
                />
                <rect
                  x="36"
                  y="36"
                  width="1128"
                  height="448"
                  rx="18"
                  fill="#ffffff"
                  opacity="0.06"
                  filter="url(#noise)"
                />
                <rect
                  x="36"
                  y="36"
                  width="1128"
                  height="448"
                  rx="18"
                  fill="#ffffff"
                  opacity="0.35"
                  mask="url(#scan-mask)"
                />
              </g>

              <g filter="url(#shadow-soft)" className="hoverable-node">
                <rect
                  x="120"
                  y="170"
                  width="240"
                  height="140"
                  rx="14"
                  fill="url(#grad-blue)"
                />
                <linearGradient
                  id="collect-gloss"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <polygon
                  points="120,170 156,144 396,144 360,170"
                  fill="#a9e5ff"
                  opacity="0.9"
                />
                <polygon
                  points="360,170 396,144 396,284 360,310"
                  fill="#7dc6ff"
                  opacity="0.75"
                />
                <rect
                  x="120"
                  y="170"
                  width="240"
                  height="140"
                  rx="14"
                  fill="#0b2a4a"
                  opacity="0.08"
                />
                <rect
                  x="120"
                  y="170"
                  width="240"
                  height="70"
                  rx="14"
                  fill="url(#collect-gloss)"
                />

                <g transform="translate(144,196)">
                  <circle cx="32" cy="32" r="28" fill="#ffffff" opacity="0.2" />
                  <path
                    d="M24 44c8-2 14-2 24 0M18 30c10-3 26-3 36 0M22 18c8-2 20-2 28 0"
                    stroke="#e6f7ff"
                    strokeWidth="2"
                    fill="none"
                  />
                </g>

                <text
                  x="240"
                  y="260"
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="700"
                  fill="#0b2a4a"
                >
                  数据采集
                </text>
                <ellipse
                  cx="240"
                  cy="322"
                  rx="110"
                  ry="16"
                  fill="#7fb6ff"
                  opacity="0.35"
                  filter="url(#platform-blur)"
                />
              </g>

              <g filter="url(#shadow-soft)" className="hoverable-node">
                <rect
                  x="480"
                  y="150"
                  width="260"
                  height="180"
                  rx="18"
                  fill="url(#grad-indigo)"
                />
                <linearGradient
                  id="process-gloss"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <polygon
                  points="480,150 512,126 772,126 740,150"
                  fill="#b7c9ff"
                  opacity="0.9"
                />
                <polygon
                  points="740,150 772,126 772,306 740,330"
                  fill="#7b8cff"
                  opacity="0.7"
                />
                <rect
                  x="480"
                  y="150"
                  width="260"
                  height="180"
                  rx="18"
                  fill="#0b2a4a"
                  opacity="0.08"
                />
                <rect
                  x="480"
                  y="150"
                  width="260"
                  height="86"
                  rx="18"
                  fill="url(#process-gloss)"
                />

                <g transform="translate(520,184)">
                  <circle cx="110" cy="66" r="56" fill="#0ff" opacity="0.08" />
                  <circle
                    cx="110"
                    cy="66"
                    r="46"
                    stroke="url(#grad-cyan)"
                    strokeWidth="3"
                    fill="none"
                    filter="url(#glow-blue)"
                  />
                  <g transform="translate(90,48)" fill="#e6f7ff">
                    <rect x="0" y="12" width="40" height="8" rx="2" />
                    <rect x="12" y="0" width="8" height="40" rx="2" />
                  </g>
                </g>

                <text
                  x="610"
                  y="252"
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="700"
                  fill="#0b2a4a"
                >
                  数据处理
                </text>
                <g transform="translate(610,240)">
                  <circle
                    r="86"
                    fill="none"
                    stroke="url(#ringGrad)"
                    strokeWidth="2"
                    opacity="0.55"
                  >
                    <animateTransform
                      attributeName="transform"
                      attributeType="XML"
                      type="rotate"
                      from="0"
                      to="360"
                      dur="12s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    r="66"
                    fill="none"
                    stroke="url(#grad-cyan)"
                    strokeWidth="2"
                    opacity="0.45"
                  >
                    <animateTransform
                      attributeName="transform"
                      attributeType="XML"
                      type="rotate"
                      from="360"
                      to="0"
                      dur="9s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    r="54"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="1.5"
                    opacity="0.25"
                  >
                    <animate
                      attributeName="r"
                      values="50;58;50"
                      dur="3.6s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.15;0.35;0.15"
                      dur="3.6s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
                <ellipse
                  cx="610"
                  cy="340"
                  rx="130"
                  ry="18"
                  fill="#9cc6ff"
                  opacity="0.35"
                  filter="url(#platform-blur)"
                />
              </g>

              <g filter="url(#shadow-soft)" className="hoverable-node">
                <rect
                  x="880"
                  y="90"
                  width="240"
                  height="120"
                  rx="14"
                  fill="url(#grad-cyan)"
                />
                <linearGradient id="kb-gloss" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <polygon
                  points="880,90 908,72 1120,72 1092,90"
                  fill="#baf7ee"
                  opacity="0.9"
                />
                <polygon
                  points="1092,90 1120,72 1120,210 1092,228"
                  fill="#6fded0"
                  opacity="0.7"
                />
                <rect
                  x="880"
                  y="90"
                  width="240"
                  height="120"
                  rx="14"
                  fill="#0b2a4a"
                  opacity="0.06"
                />
                <rect
                  x="880"
                  y="90"
                  width="240"
                  height="58"
                  rx="14"
                  fill="url(#kb-gloss)"
                />
                <text
                  x="1000"
                  y="160"
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="700"
                  fill="#05324f"
                >
                  知识库数据集
                </text>
                <ellipse
                  cx="1000"
                  cy="222"
                  rx="110"
                  ry="14"
                  fill="#8dece1"
                  opacity="0.32"
                  filter="url(#platform-blur)"
                />
              </g>

              <g filter="url(#shadow-soft)" className="hoverable-node">
                <rect
                  x="880"
                  y="310"
                  width="240"
                  height="120"
                  rx="14"
                  fill="url(#grad-orange)"
                />
                <linearGradient id="ft-gloss" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <polygon
                  points="880,310 908,292 1120,292 1092,310"
                  fill="#ffe6b5"
                  opacity="0.9"
                />
                <polygon
                  points="1092,310 1120,292 1120,430 1092,448"
                  fill="#ffb36f"
                  opacity="0.7"
                />
                <rect
                  x="880"
                  y="310"
                  width="240"
                  height="120"
                  rx="14"
                  fill="#0b2a4a"
                  opacity="0.06"
                />
                <rect
                  x="880"
                  y="310"
                  width="240"
                  height="58"
                  rx="14"
                  fill="url(#ft-gloss)"
                />
                <text
                  x="1000"
                  y="380"
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="700"
                  fill="#4a2505"
                >
                  微调数据集
                </text>
                <ellipse
                  cx="1000"
                  cy="452"
                  rx="110"
                  ry="14"
                  fill="#ffd19b"
                  opacity="0.35"
                  filter="url(#platform-blur)"
                />
              </g>

              <g>
                <defs>
                  <filter
                    id="neon"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="2.4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  id="path-left"
                  d="M360,240 C420,240 440,240 480,240"
                  fill="none"
                  stroke="url(#grad-cyan)"
                  strokeWidth="4"
                  markerEnd="url(#arrow)"
                  className="flow-dash"
                  filter="url(#neon)"
                />

                <path
                  id="path-top"
                  d="M740,240 C820,210 820,160 880,150"
                  fill="none"
                  stroke="url(#grad-cyan)"
                  strokeWidth="4"
                  markerEnd="url(#arrow)"
                  className="flow-dash"
                  filter="url(#neon)"
                />

                <path
                  id="path-bottom"
                  d="M740,240 C820,270 820,330 880,360"
                  fill="none"
                  stroke="url(#grad-purple)"
                  strokeWidth="4"
                  markerEnd="url(#arrow)"
                  className="flow-dash"
                  filter="url(#neon)"
                />

                <g>
                  <circle r="3" fill="#22d3ee">
                    <animateMotion
                      dur="3.6s"
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath href="#path-left" />
                    </animateMotion>
                  </circle>
                  <circle r="2.6" fill="#38bdf8">
                    <animateMotion
                      dur="4.2s"
                      repeatCount="indefinite"
                      begin="0.7s"
                      rotate="auto"
                    >
                      <mpath href="#path-left" />
                    </animateMotion>
                  </circle>
                  <circle r="2.2" fill="#60a5fa">
                    <animateMotion
                      dur="3.2s"
                      repeatCount="indefinite"
                      begin="1.4s"
                      rotate="auto"
                    >
                      <mpath href="#path-left" />
                    </animateMotion>
                  </circle>
                </g>

                <g>
                  <circle r="2.6" fill="#22d3ee">
                    <animateMotion
                      dur="4s"
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath href="#path-top" />
                    </animateMotion>
                  </circle>
                  <circle r="2.2" fill="#60a5fa">
                    <animateMotion
                      dur="3.5s"
                      repeatCount="indefinite"
                      begin="0.9s"
                      rotate="auto"
                    >
                      <mpath href="#path-top" />
                    </animateMotion>
                  </circle>
                </g>

                <g>
                  <circle r="2.8" fill="#c084fc">
                    <animateMotion
                      dur="3.8s"
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath href="#path-bottom" />
                    </animateMotion>
                  </circle>
                  <circle r="2.2" fill="#f472b6">
                    <animateMotion
                      dur="3.2s"
                      repeatCount="indefinite"
                      begin="0.8s"
                      rotate="auto"
                    >
                      <mpath href="#path-bottom" />
                    </animateMotion>
                  </circle>
                </g>
              </g>

              <g opacity="0.35">
                <circle cx="240" cy="340" r="2" fill="#2a7fff">
                  <animate
                    attributeName="cx"
                    values="240;610;1000"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values="340;252;160"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="240" cy="220" r="2" fill="#00bcd4">
                  <animate
                    attributeName="cx"
                    values="240;610;1000"
                    dur="7s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values="220;252;380"
                    dur="7s"
                    repeatCount="indefinite"
                  />
                </circle>
                <g>
                  <circle
                    cx="200"
                    cy="120"
                    r="1.6"
                    fill="#7c3aed"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.2;0.8;0.2"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx="420"
                    cy="420"
                    r="1.8"
                    fill="#06b6d4"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.2;0.8;0.2"
                      dur="2.6s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx="780"
                    cy="90"
                    r="1.4"
                    fill="#3b82f6"
                    opacity="0.45"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.2;0.85;0.2"
                      dur="3.6s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx="1060"
                    cy="260"
                    r="1.6"
                    fill="#f59e0b"
                    opacity="0.55"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.2;0.85;0.2"
                      dur="3.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              </g>
            </svg>
          </div>
        </div>

        <style jsx>{`
          .flow-dash {
            stroke-dasharray: 8 10;
            animation: dash-move 3.2s linear infinite;
            filter: url(#glow-blue);
          }
          @keyframes dash-move {
            to {
              stroke-dashoffset: -180;
            }
          }
          .hoverable-node {
            transition:
              transform 0.35s ease,
              filter 0.35s ease;
            transform-box: fill-box;
            transform-origin: center;
          }
          .hoverable-node:hover {
            transform: translateY(-4px);
          }
          @media (max-width: 768px) {
            svg {
              height: auto;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
