import React from 'react';

// 媒体解析基准地址
const MEDIA_BASE_URL =
  '/portal/service/service-data/data-process/data-process-media';

// 产品数据
export const products = {
  text: [
    {
      title: '常规文档解析',
      description: [
        '支持PDF、Word、图片等常见格式',
        '识别文档基本结构和文本内容',
        '尽可能保持原有格式信息',
      ],
      link: `${MEDIA_BASE_URL}?type=doc&title=常规文档解析`,
      demoContent: (
        <div className="w-[160px] h-[120px] flex items-center justify-center relative">
          {/* 操作流程：文档 → AI解析 → 结构化文本 */}
          <div className="flex items-center gap-3">
            {/* 输入：多格式文档 */}
            <div className="flex flex-col gap-1">
              <div
                className="w-8 h-10 rounded-md shadow-md flex items-center justify-center text-white text-[0.5rem] font-bold"
                style={{
                  background:
                    'linear-gradient(145deg, #dc2626 0%, #f87171 100%)',
                }}
              >
                PDF
              </div>
              <div
                className="w-8 h-8 rounded-md shadow-md flex items-center justify-center text-white text-[0.5rem] font-bold"
                style={{
                  background:
                    'linear-gradient(145deg, #3b82f6 0%, #60a5fa 100%)',
                }}
              >
                DOC
              </div>
            </div>

            {/* 处理过程：AI解析 */}
            <div className="flex flex-col items-center">
              <div className="text-[#666] text-lg font-bold">→</div>
              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-[0.6rem] font-bold">AI</span>
              </div>
              <div className="text-[#666] text-lg font-bold">→</div>
            </div>

            {/* 输出：结构化文本 */}
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg shadow-md flex flex-col items-center justify-center border border-green-300">
              <div className="text-[0.4rem] text-green-700 font-bold mb-0.5">
                结构化文本
              </div>
              <div className="w-8 h-0.5 bg-green-600 rounded mb-0.5"></div>
              <div className="w-6 h-0.5 bg-green-500 rounded mb-0.5"></div>
              <div className="w-7 h-0.5 bg-green-500 rounded"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '表格文档解析',
      description: ['行合并表格', '列合并表格', '跨页表格'],
      link: `${MEDIA_BASE_URL}?type=doc&title=表格文档解析`,
      demoContent: (
        <div className="w-[160px] h-[120px] flex items-center justify-center relative">
          {/* 操作流程：复杂表格 → AI识别 → 结构化数据 */}
          <div className="flex items-center gap-2">
            {/* 输入：复杂表格文档 */}
            <div
              className="w-10 h-12 rounded-md shadow-md flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #059669 0%, #10b981 100%)',
              }}
            >
              <div className="text-white text-[0.4rem] font-bold mb-1">
                复杂表格
              </div>
              {/* 复杂表格结构 */}
              <div className="w-7 h-6 bg-white/20 rounded grid grid-cols-3 grid-rows-3 gap-px p-0.5">
                <div className="col-span-2 bg-white/90 rounded-sm"></div>
                <div className="bg-white/70 rounded-sm"></div>
                <div className="bg-white/60 rounded-sm"></div>
                <div className="col-span-2 bg-white/80 rounded-sm"></div>
                <div className="col-span-3 bg-white/70 rounded-sm"></div>
              </div>
            </div>

            {/* 处理过程 */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-[#666] text-sm font-bold">→</div>
              <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-[0.5rem] font-bold">AI</span>
              </div>
              <div className="text-[#666] text-sm font-bold">→</div>
            </div>

            {/* 输出：结构化数据 */}
            <div className="w-11 h-12 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg shadow-md flex flex-col items-center justify-center border border-emerald-300">
              <div className="text-[0.4rem] text-emerald-700 font-bold mb-1">
                Excel数据
              </div>
              <div className="w-8 h-5 bg-white rounded border border-emerald-200 grid grid-cols-3 grid-rows-2 gap-px p-0.5">
                <div className="bg-emerald-200 rounded-sm"></div>
                <div className="bg-emerald-200 rounded-sm"></div>
                <div className="bg-emerald-200 rounded-sm"></div>
                <div className="bg-emerald-100 rounded-sm"></div>
                <div className="bg-emerald-100 rounded-sm"></div>
                <div className="bg-emerald-100 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '公式类文档解析',
      description: ['数学公式精准识别', 'LaTeX格式输出', '复杂公式结构解析'],
      link: `${MEDIA_BASE_URL}?type=doc&title=公式类文档解析`,
      demoContent: (
        <div className="w-[160px] h-[120px] flex items-center justify-center relative">
          {/* 操作流程：公式文档 → AI识别 → LaTeX代码 */}
          <div className="flex items-center gap-2">
            {/* 输入：含公式的PDF */}
            <div
              className="w-9 h-11 rounded-md shadow-md flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #ea580c 0%, #f97316 100%)',
              }}
            >
              <div className="text-white text-[0.4rem] font-bold mb-1">
                数学PDF
              </div>
              <div className="w-7 h-3 bg-white/20 rounded flex items-center justify-center">
                <span className="text-white text-[0.4rem] font-bold">
                  ∫f(x)dx
                </span>
              </div>
              <div className="w-6 h-0.5 bg-white/50 rounded mt-1"></div>
            </div>

            {/* 处理过程 */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-[#666] text-sm font-bold">→</div>
              <div className="w-5 h-5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-[0.5rem] font-bold">AI</span>
              </div>
              <div className="text-[#666] text-sm font-bold">→</div>
            </div>

            {/* 输出：LaTeX代码 */}
            <div className="w-12 h-11 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-md flex flex-col items-center justify-center border border-orange-300">
              <div className="text-[0.4rem] text-orange-700 font-bold mb-1">
                LaTeX
              </div>
              <div className="w-9 h-6 bg-gray-800 rounded text-green-400 flex flex-col items-center justify-center">
                <div className="text-[0.3rem] font-mono">\int f(x)</div>
                <div className="text-[0.3rem] font-mono">\,dx</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '媒体报刊类文档解析',
      description: ['报纸版面解析', '杂志内容解析', '研究报告解析'],
      link: `${MEDIA_BASE_URL}?type=doc&title=媒体报刊类文档解析`,
      demoContent: (
        <div className="w-[160px] h-[120px] flex items-center justify-center relative">
          {/* 操作流程：报纸杂志 → AI解析 → 结构化内容 */}
          <div className="flex items-center gap-2">
            {/* 输入：报纸杂志 */}
            <div
              className="w-9 h-11 rounded-md shadow-md flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #1976d2 0%, #42a5f5 100%)',
              }}
            >
              <div className="text-white text-[0.4rem] font-bold mb-1">
                报纸
              </div>
              <div className="w-7 h-6 flex flex-col gap-0.5">
                <div className="w-full h-1 bg-white/90 rounded"></div>
                <div className="w-5 h-0.5 bg-white/70 rounded"></div>
                <div className="w-6 h-0.5 bg-white/70 rounded"></div>
                <div className="w-4 h-0.5 bg-white/50 rounded"></div>
              </div>
            </div>

            {/* 处理过程 */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-[#666] text-sm font-bold">→</div>
              <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-[0.5rem] font-bold">AI</span>
              </div>
              <div className="text-[#666] text-sm font-bold">→</div>
            </div>

            {/* 输出：结构化内容 */}
            <div className="w-12 h-11 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md flex flex-col items-center justify-center border border-blue-300">
              <div className="text-[0.4rem] text-blue-700 font-bold mb-1">
                新闻内容
              </div>
              <div className="w-9 h-6 bg-white rounded border border-blue-200 flex flex-col gap-0.5 p-0.5">
                <div className="w-full h-1 bg-blue-200 rounded text-[0.2rem] flex items-center justify-center text-blue-700">
                  标题
                </div>
                <div className="w-full h-0.5 bg-blue-100 rounded"></div>
                <div className="w-4/5 h-0.5 bg-blue-100 rounded"></div>
                <div className="w-full h-0.5 bg-blue-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '论文解析',
      description: ['普通论文解析', '化学论文解析', '章节结构提取'],
      link: `${MEDIA_BASE_URL}?type=doc&title=论文解析`,
      demoContent: (
        <div className="w-[160px] h-[120px] flex items-center justify-center relative">
          {/* 操作流程：学术论文 → AI分析 → 结构化数据 */}
          <div className="flex items-center gap-2">
            {/* 输入：学术论文 */}
            <div className="flex flex-col gap-1">
              <div
                className="w-8 h-10 rounded-md shadow-md flex flex-col items-center justify-center"
                style={{
                  background:
                    'linear-gradient(145deg, #1e40af 0%, #3b82f6 100%)',
                }}
              >
                <div className="text-white text-[0.4rem] font-bold mb-1">
                  普通
                </div>
                <div className="w-6 h-4 flex flex-col gap-0.5">
                  <div className="w-full h-0.5 bg-white/90 rounded"></div>
                  <div className="w-4 h-0.5 bg-white/70 rounded"></div>
                  <div className="w-5 h-0.5 bg-white/70 rounded"></div>
                </div>
              </div>
              <div
                className="w-8 h-8 rounded-md shadow-md flex flex-col items-center justify-center"
                style={{
                  background:
                    'linear-gradient(145deg, #ea580c 0%, #f97316 100%)',
                }}
              >
                <div className="text-white text-[0.4rem] font-bold mb-0.5">
                  化学
                </div>
                <div className="text-white text-[0.4rem] font-bold">H₂O</div>
              </div>
            </div>

            {/* 处理过程 */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-[#666] text-sm font-bold">→</div>
              <div className="w-5 h-5 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-[0.5rem] font-bold">AI</span>
              </div>
              <div className="text-[#666] text-sm font-bold">→</div>
            </div>

            {/* 输出：结构化学术内容 */}
            <div className="w-11 h-12 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg shadow-md flex flex-col items-center justify-center border border-indigo-300">
              <div className="text-[0.4rem] text-indigo-700 font-bold mb-1">
                论文结构
              </div>
              <div className="w-9 h-7 bg-white rounded border border-indigo-200 flex flex-col gap-0.5 p-0.5">
                <div className="w-full h-0.5 bg-indigo-300 rounded text-[0.2rem] flex items-center justify-center text-indigo-700">
                  摘要
                </div>
                <div className="w-full h-0.5 bg-indigo-200 rounded"></div>
                <div className="w-3/4 h-0.5 bg-indigo-200 rounded"></div>
                <div className="w-1/2 h-0.5 bg-indigo-100 rounded text-[0.15rem] flex items-center justify-center text-indigo-600">
                  [1]
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '试卷解析',
      description: ['题目选项识别', '答案区域提取', '评分标准解析'],
      link: `${MEDIA_BASE_URL}?type=doc&title=试卷解析`,
      demoContent: (
        <div className="w-[160px] h-[120px] flex items-center justify-center relative">
          {/* 操作流程：试卷 → AI解析 → 结构化题目 */}
          <div className="flex items-center gap-2">
            {/* 输入：试卷 */}
            <div
              className="w-9 h-11 rounded-md shadow-md flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #7c3aed 0%, #8b5cf6 100%)',
              }}
            >
              <div className="text-white text-[0.4rem] font-bold mb-1">
                试卷
              </div>
              <div className="w-7 h-6 flex flex-col gap-0.5">
                <div className="w-full h-0.5 bg-white/90 rounded"></div>
                <div className="flex gap-0.5 items-center">
                  <div className="w-1 h-1 border border-white/80 rounded-sm bg-white/90"></div>
                  <div className="w-3 h-0.5 bg-white/70 rounded"></div>
                </div>
                <div className="flex gap-0.5 items-center">
                  <div className="w-1 h-1 border border-white/80 rounded-sm"></div>
                  <div className="w-3 h-0.5 bg-white/70 rounded"></div>
                </div>
              </div>
            </div>

            {/* 处理过程 */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-[#666] text-sm font-bold">→</div>
              <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-[0.5rem] font-bold">AI</span>
              </div>
              <div className="text-[#666] text-sm font-bold">→</div>
            </div>

            {/* 输出：结构化题目 */}
            <div className="w-12 h-11 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md flex flex-col items-center justify-center border border-purple-300">
              <div className="text-[0.4rem] text-purple-700 font-bold mb-1">
                题目解析
              </div>
              <div className="w-9 h-6 bg-white rounded border border-purple-200 flex flex-col gap-0.5 p-0.5">
                <div className="w-full h-0.5 bg-purple-200 rounded text-[0.2rem] flex items-center justify-center text-purple-700">
                  题干
                </div>
                <div className="flex gap-0.5 items-center">
                  <div className="w-0.5 h-0.5 bg-purple-400 rounded-full"></div>
                  <div className="w-3 h-0.5 bg-purple-100 rounded"></div>
                </div>
                <div className="flex gap-0.5 items-center">
                  <div className="w-0.5 h-0.5 bg-purple-300 rounded-full"></div>
                  <div className="w-2 h-0.5 bg-purple-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ],
  table: [
    {
      title: '多区域表格解析',
      description: ['智能识别页面多表格', '分别解析输出', '保持数据完整性'],
      link: `${MEDIA_BASE_URL}?type=excel&title=多区域表格解析`,
      demoContent: (
        <div className="w-[160px] h-[120px] flex items-center justify-center relative">
          {/* 操作流程：多表格页面 → AI识别 → 分别解析 */}
          <div className="flex items-center gap-2">
            {/* 输入：含多个表格的页面 */}
            <div
              className="w-10 h-12 rounded-md shadow-md flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #f59e0b 0%, #f97316 100%)',
              }}
            >
              <div className="text-white text-[0.4rem] font-bold mb-1">
                多表页面
              </div>
              <div className="w-8 h-7 flex flex-col gap-0.5">
                {/* 表格1 */}
                <div className="w-4 h-2.5 bg-white/20 rounded grid grid-cols-2 gap-px p-0.5">
                  <div className="bg-white/90 rounded-sm"></div>
                  <div className="bg-white/90 rounded-sm"></div>
                  <div className="bg-white/70 rounded-sm"></div>
                  <div className="bg-white/70 rounded-sm"></div>
                </div>
                {/* 表格2 */}
                <div className="w-6 h-2.5 bg-white/20 rounded grid grid-cols-3 gap-px p-0.5">
                  <div className="bg-white/90 rounded-sm"></div>
                  <div className="bg-white/90 rounded-sm"></div>
                  <div className="bg-white/90 rounded-sm"></div>
                  <div className="bg-white/70 rounded-sm"></div>
                  <div className="bg-white/70 rounded-sm"></div>
                  <div className="bg-white/70 rounded-sm"></div>
                </div>
              </div>
            </div>

            {/* 处理过程 */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-[#666] text-sm font-bold">→</div>
              <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-[0.5rem] font-bold">AI</span>
              </div>
              <div className="text-[#666] text-sm font-bold">→</div>
            </div>

            {/* 输出：分别解析的表格 */}
            <div className="w-11 h-12 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-md flex flex-col items-center justify-center border border-yellow-300">
              <div className="text-[0.4rem] text-yellow-700 font-bold mb-1">
                分别输出
              </div>
              <div className="w-9 h-7 flex flex-col gap-0.5">
                <div className="w-full h-2.5 bg-white rounded border border-yellow-300 grid grid-cols-2 gap-px p-0.5">
                  <div className="bg-yellow-200 rounded-sm"></div>
                  <div className="bg-yellow-200 rounded-sm"></div>
                  <div className="bg-yellow-100 rounded-sm"></div>
                  <div className="bg-yellow-100 rounded-sm"></div>
                </div>
                <div className="w-full h-2.5 bg-white rounded border border-yellow-300 grid grid-cols-3 gap-px p-0.5">
                  <div className="bg-yellow-200 rounded-sm"></div>
                  <div className="bg-yellow-200 rounded-sm"></div>
                  <div className="bg-yellow-200 rounded-sm"></div>
                  <div className="bg-yellow-100 rounded-sm"></div>
                  <div className="bg-yellow-100 rounded-sm"></div>
                  <div className="bg-yellow-100 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '复杂表头解析(合并场景)',
      description: ['多层级表头识别', '合并单元格处理', '表格逻辑结构还原'],
      link: `${MEDIA_BASE_URL}?type=excel&title=复杂表头解析(合并场景)&headerMode=2`,
      demoContent: (
        <div className="w-[160px] h-[120px] flex items-center justify-center relative">
          {/* 操作流程：复杂表头 → AI解析 → 逻辑结构 */}
          <div className="flex items-center gap-2">
            {/* 输入：复杂合并表头 */}
            <div
              className="w-9 h-11 rounded-md shadow-md flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #22c55e 0%, #16a34a 100%)',
              }}
            >
              <div className="text-white text-[0.4rem] font-bold mb-1">
                复杂表头
              </div>
              <div className="w-7 h-6 bg-white/20 rounded">
                {/* 多层表头 */}
                <div className="h-2 flex border-b border-white/30">
                  <div className="w-1/2 border-r border-white/30 bg-white/40 text-[0.2rem] text-white flex items-center justify-center">
                    合并
                  </div>
                  <div className="w-1/4 border-r border-white/30 bg-white/30"></div>
                  <div className="w-1/4 bg-white/30"></div>
                </div>
                <div className="h-1.5 flex border-b border-white/20">
                  <div className="w-1/4 border-r border-white/20 bg-white/20"></div>
                  <div className="w-1/4 border-r border-white/20 bg-white/20"></div>
                  <div className="w-1/4 border-r border-white/20 bg-white/20"></div>
                  <div className="w-1/4 bg-white/20"></div>
                </div>
                <div className="h-1.5 flex">
                  <div className="w-1/4 border-r border-white/20 bg-white/10"></div>
                  <div className="w-1/4 border-r border-white/20 bg-white/10"></div>
                  <div className="w-1/4 border-r border-white/20 bg-white/10"></div>
                  <div className="w-1/4 bg-white/10"></div>
                </div>
              </div>
            </div>

            {/* 处理过程 */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-[#666] text-sm font-bold">→</div>
              <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-[0.5rem] font-bold">AI</span>
              </div>
              <div className="text-[#666] text-sm font-bold">→</div>
            </div>

            {/* 输出：逻辑结构表格 */}
            <div className="w-11 h-11 bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md flex flex-col items-center justify-center border border-green-300">
              <div className="text-[0.4rem] text-green-700 font-bold mb-1">
                结构还原
              </div>
              <div className="w-9 h-6 bg-white rounded border border-green-200">
                <div className="h-2 bg-green-200 border-b border-green-300 flex items-center justify-center text-[0.2rem] text-green-800">
                  表头逻辑
                </div>
                <div className="h-2 grid grid-cols-4 gap-px p-0.5">
                  <div className="bg-green-100 rounded-sm"></div>
                  <div className="bg-green-100 rounded-sm"></div>
                  <div className="bg-green-100 rounded-sm"></div>
                  <div className="bg-green-100 rounded-sm"></div>
                </div>
                <div className="h-2 grid grid-cols-4 gap-px p-0.5">
                  <div className="bg-green-50 rounded-sm"></div>
                  <div className="bg-green-50 rounded-sm"></div>
                  <div className="bg-green-50 rounded-sm"></div>
                  <div className="bg-green-50 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ],
  image: [
    {
      title: '书籍解析',
      description: ['古代文献识别', '繁体字、古文字', '专业书籍处理'],
      link: `${MEDIA_BASE_URL}?type=doc&title=书籍解析`,
      demoContent: (
        <div className="w-[160px] h-[120px] flex items-center justify-center relative">
          {/* 操作流程：书籍图片 → AI识别 → 繁体文本 */}
          <div className="flex items-center gap-2">
            {/* 输入：书籍图片 */}
            <div
              className="w-9 h-11 rounded-md shadow-md flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #8b4513 0%, #d2691e 100%)',
              }}
            >
              <div className="text-white text-[0.4rem] font-bold mb-1">
                书籍图片
              </div>
              <div className="w-7 h-6 bg-amber-100 rounded border border-amber-300 flex items-center justify-center">
                <div className="text-amber-800 text-base font-bold">书</div>
              </div>
            </div>

            {/* 处理过程 */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-[#666] text-sm font-bold">→</div>
              <div className="w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-[0.5rem] font-bold">AI</span>
              </div>
              <div className="text-[#666] text-sm font-bold">→</div>
            </div>

            {/* 输出：识别结果 */}
            <div className="w-11 h-11 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-md flex flex-col items-center justify-center border border-amber-300">
              <div className="text-[0.4rem] text-amber-700 font-bold mb-1">
                古文识别
              </div>
              <div className="w-9 h-6 bg-white rounded border border-amber-200 flex flex-col gap-0.5 p-0.5">
                <div className="w-full h-1 bg-amber-200 rounded text-[0.2rem] flex items-center justify-center text-amber-800">
                  繁体字
                </div>
                <div className="w-full h-0.5 bg-amber-100 rounded"></div>
                <div className="w-4/5 h-0.5 bg-amber-100 rounded"></div>
                <div className="w-full h-0.5 bg-amber-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '手写识别',
      description: ['高精度手写识别', '多种笔迹风格', '草书行书支持'],
      link: `${MEDIA_BASE_URL}?type=doc&title=手写识别`,
      demoContent: (
        <div className="w-[160px] h-[120px] flex items-center justify-center relative">
          {/* 操作流程：手写图片 → AI识别 → 数字化文本 */}
          <div className="flex items-center gap-2">
            {/* 输入：手写图片 */}
            <div
              className="w-9 h-11 rounded-md shadow-md flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #64748b 0%, #94a3b8 100%)',
              }}
            >
              <div className="text-white text-[0.4rem] font-bold mb-1">
                手写图片
              </div>
              <div className="w-7 h-6 bg-gray-100 rounded border border-gray-300 flex flex-col items-center justify-center gap-0.5">
                <div className="w-5 h-0.5 bg-gray-600 rounded transform -rotate-2"></div>
                <div className="w-4 h-0.5 bg-gray-600 rounded transform rotate-1"></div>
                <div className="w-5 h-0.5 bg-gray-600 rounded transform -rotate-1"></div>
              </div>
            </div>

            {/* 处理过程 */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-[#666] text-sm font-bold">→</div>
              <div className="w-5 h-5 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-[0.5rem] font-bold">AI</span>
              </div>
              <div className="text-[#666] text-sm font-bold">→</div>
            </div>

            {/* 输出：数字化文本 */}
            <div className="w-11 h-11 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg shadow-md flex flex-col items-center justify-center border border-slate-300">
              <div className="text-[0.4rem] text-slate-700 font-bold mb-1">
                数字化文本
              </div>
              <div className="w-9 h-6 bg-white rounded border border-slate-200 flex flex-col gap-0.5 p-0.5">
                <div className="w-full h-0.5 bg-slate-300 rounded"></div>
                <div className="w-4/5 h-0.5 bg-slate-200 rounded"></div>
                <div className="w-full h-0.5 bg-slate-200 rounded"></div>
                <div className="w-3/4 h-0.5 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ],
  midea: [
    {
      title: '音频解析',
      description: ['语音转文字识别', '多语言语音支持', '音频内容智能分析'],
      link: `${MEDIA_BASE_URL}?type=audio`,
      demoContent: (
        <div className="w-[160px] h-[120px] flex items-center justify-center relative">
          {/* 操作流程：音频文件 → AI识别 → 文字转录 */}
          <div className="flex items-center gap-2">
            {/* 输入：音频文件 */}
            <div
              className="w-9 h-11 rounded-md shadow-md flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #8b5cf6 0%, #a78bfa 100%)',
              }}
            >
              <div className="text-white text-[0.4rem] font-bold mb-1">
                音频文件
              </div>
              <div className="w-7 h-6 flex items-center justify-center">
                {/* 音频波形图标 */}
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
            </div>

            {/* 处理过程 */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-[#666] text-sm font-bold">→</div>
              <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-[0.5rem] font-bold">AI</span>
              </div>
              <div className="text-[#666] text-sm font-bold">→</div>
            </div>

            {/* 输出：转录文本 */}
            <div className="w-12 h-11 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md flex flex-col items-center justify-center border border-purple-300">
              <div className="text-[0.4rem] text-purple-700 font-bold mb-1">
                语音转录
              </div>
              <div className="w-9 h-6 bg-white rounded border border-purple-200 flex flex-col gap-0.5 p-0.5">
                <div className="w-full h-0.5 bg-purple-200 rounded text-[0.2rem] flex items-center justify-center text-purple-700">
                  转录文本
                </div>
                <div className="w-full h-0.5 bg-purple-100 rounded"></div>
                <div className="w-4/5 h-0.5 bg-purple-100 rounded"></div>
                <div className="w-full h-0.5 bg-purple-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '视频解析',
      description: ['视频内容分析', '关键帧提取', '视频转文字描述'],
      link: `${MEDIA_BASE_URL}?type=video`,
      demoContent: (
        <div className="w-[160px] h-[120px] flex items-center justify-center relative">
          {/* 操作流程：视频文件 → AI分析 → 内容摘要 */}
          <div className="flex items-center gap-2">
            {/* 输入：视频文件 */}
            <div
              className="w-9 h-11 rounded-md shadow-md flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #ef4444 0%, #f87171 100%)',
              }}
            >
              <div className="text-white text-[0.4rem] font-bold mb-1">
                视频文件
              </div>
              <div className="w-7 h-6 bg-white/20 rounded flex items-center justify-center">
                {/* 播放按钮图标 */}
                <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
              </div>
            </div>

            {/* 处理过程 */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-[#666] text-sm font-bold">→</div>
              <div className="w-5 h-5 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-[0.5rem] font-bold">AI</span>
              </div>
              <div className="text-[#666] text-sm font-bold">→</div>
            </div>

            {/* 输出：视频分析结果 */}
            <div className="w-12 h-11 bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-md flex flex-col items-center justify-center border border-red-300">
              <div className="text-[0.4rem] text-red-700 font-bold mb-1">
                内容分析
              </div>
              <div className="w-9 h-6 bg-white rounded border border-red-200 flex flex-col gap-0.5 p-0.5">
                <div className="w-full h-0.5 bg-red-200 rounded text-[0.2rem] flex items-center justify-center text-red-700">
                  关键帧
                </div>
                <div className="w-full h-0.5 bg-red-100 rounded"></div>
                <div className="w-3/4 h-0.5 bg-red-100 rounded"></div>
                <div className="w-4/5 h-0.5 bg-red-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ],
};
