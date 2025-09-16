'use client';

import React from 'react';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useInView } from '@/hooks/useInView';

export default function OpenSourceService() {
  useScrollToTop();

  // 动画相关的hooks
  const [heroRef, isHeroInView] = useInView({ threshold: 0.3 });
  const [architectureRef, isArchitectureInView] = useInView({ threshold: 0.2 });
  const [sourceRef, isSourceInView] = useInView({ threshold: 0.2 });
  const [applicationRef, isApplicationInView] = useInView({ threshold: 0.2 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero介绍模块 */}
      <section
        ref={heroRef}
        className={`px-60 pt-20 pb-16 transition-all duration-1000 ${
          isHeroInView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-gray-800">开源软件</span>
            <span className="text-red-600 mx-2">定制服务</span>
            <span className="text-gray-800">解决方案</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            支持各类主流开源RAG/Agent平台服务定制，包括Dify、RagFlow、MaxKB、FastGPT
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            从架构优化到源码修改，从应用开发到系统增强，提供全方位的开源平台定制化服务
          </p>
        </div>

        {/* 核心优势展示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              架构优化
            </h3>
            <p className="text-gray-600 text-center">
              系统性能优化、网络架构改造，提升平台整体运行效率和稳定性
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              源码定制
            </h3>
            <p className="text-gray-600 text-center">
              深度源码修改、功能定制开发，满足特定业务需求和信创环境要求
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              应用开发
            </h3>
            <p className="text-gray-600 text-center">
              知识库构建、智能体开发，打造完整的AI应用解决方案
            </p>
          </div>
        </div>
      </section>

      {/* 架构优化模块 */}
      <section
        ref={architectureRef}
        className={`px-60 py-16 bg-gray-50 transition-all duration-1000 ${
          isArchitectureInView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              架构优化服务
            </h2>
            <p className="text-xl text-gray-600">
              系统性能提升与网络架构改造，打造高性能AI平台
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 系统优化 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">系统优化</h3>
                  <p className="text-gray-600">高并发场景下的性能提升</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    向量数据库优化
                  </h4>
                  <p className="text-gray-600 text-sm">
                    在知识库高并发场景下对Dify或RagFlow的底层向量数据库进行改造和优化
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    组件性能调优
                  </h4>
                  <p className="text-gray-600 text-sm">
                    内部组件性能参数优化，包括数据库连接池等关键组件的配置优化
                  </p>
                </div>
              </div>
            </div>

            {/* 网络优化 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mr-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">网络优化</h3>
                  <p className="text-gray-600">容器化环境网络架构改造</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 rounded-xl p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    虚拟网络重构
                  </h4>
                  <p className="text-gray-600 text-sm">
                    多组件容器化环境下，重新划分Docker的虚拟VLAN，实现多系统间无缝通信
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    沙箱环境定制
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Dify
                    Sandbox沙箱环境下自定义MySQL数据库访问链路，重新编译源码镜像
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 源码修改模块 */}
      <section
        ref={sourceRef}
        className={`px-60 py-16 transition-all duration-1000 ${
          isSourceInView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              源码定制服务
            </h2>
            <p className="text-xl text-gray-600">
              深度源码修改与功能定制，满足特定业务需求
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 漏洞修复 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    漏洞修复
                  </h3>
                  <p className="text-gray-600 text-sm">安全漏洞定向修复</p>
                </div>
              </div>
              <p className="text-gray-600">
                基于Dify开源社区最新技术方案，定向修复线上老版本的功能BUG，确保系统安全稳定运行
              </p>
            </div>

            {/* 功能定制 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    功能定制
                  </h3>
                  <p className="text-gray-600 text-sm">工作流功能增强</p>
                </div>
              </div>
              <p className="text-gray-600">
                修改部署版本的工作流相关代码，实现返回引用的完整文件功能，修复文件名符号编码问题，提升文件下载体验
              </p>
            </div>

            {/* 系统增强 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    系统增强
                  </h3>
                  <p className="text-gray-600 text-sm">离线环境适配</p>
                </div>
              </div>
              <p className="text-gray-600">
                重构沙盒镜像代码，满足客户在完全离线环境下使用各种第三方代码库的需求，保障业务连续性
              </p>
            </div>

            {/* 信创支持 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    信创支持
                  </h3>
                  <p className="text-gray-600 text-sm">国产化环境兼容</p>
                </div>
              </div>
              <p className="text-gray-600">
                Dify源码定制兼容客户侧奇安信等老版本信创浏览器，确保在国产化环境下的稳定运行
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 应用开发模块 */}
      <section
        ref={applicationRef}
        className={`px-60 py-16 bg-gray-50 transition-all duration-1000 ${
          isApplicationInView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              应用开发服务
            </h2>
            <p className="text-xl text-gray-600">
              知识库构建与智能体开发，打造完整AI应用生态
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 知识库开发 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mr-4">
                  <svg
                    className="w-8 h-8 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    知识库构建
                  </h3>
                  <p className="text-gray-600">多模态文档处理与高性能检索</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-orange-50 rounded-xl p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    多模态文档预处理
                  </h4>
                  <p className="text-gray-600 text-sm">
                    支持多模态文档预处理，支持自定义文档切片规则，集成最新高性能embedding模型（Qwen3）
                  </p>
                </div>

                <div className="bg-orange-50 rounded-xl p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    大规模存储与并发优化
                  </h4>
                  <p className="text-gray-600 text-sm">
                    支持5000+文档存储，提供高并发处理性能优化，满足企业级应用需求
                  </p>
                </div>
              </div>
            </div>

            {/* 智能体开发 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mr-4">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    智能体开发
                  </h3>
                  <p className="text-gray-600">业务场景智能化解决方案</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-indigo-50 rounded-xl p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    智能问数方案
                  </h4>
                  <p className="text-gray-600 text-sm">
                    支持智能问数开源方案开发，包括意图识别、场景预置、名称转义等功能，集成Chart可视化图表展示
                  </p>
                </div>

                <div className="bg-indigo-50 rounded-xl p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    业务工作流开发
                  </h4>
                  <p className="text-gray-600 text-sm">
                    支持各类业务逻辑工作流开发：医疗问诊流程、交通车辆质检、OA办公、企业贷款评估报告生成等
                  </p>
                </div>

                <div className="bg-indigo-50 rounded-xl p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    跨境智能体开发
                  </h4>
                  <p className="text-gray-600 text-sm">
                    支持小语种实时翻译、越南身份证识别
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 应用场景展示 */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              典型应用场景
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-xl hover:border-indigo-300 transition-colors">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h5 className="font-semibold text-gray-800 mb-2">医疗问诊</h5>
                <p className="text-gray-600 text-sm">智能问诊流程开发</p>
              </div>

              <div className="text-center p-6 border border-gray-200 rounded-xl hover:border-green-300 transition-colors">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h5 className="font-semibold text-gray-800 mb-2">质检系统</h5>
                <p className="text-gray-600 text-sm">交通车辆智能质检</p>
              </div>

              <div className="text-center p-6 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                    />
                  </svg>
                </div>
                <h5 className="font-semibold text-gray-800 mb-2">OA办公</h5>
                <p className="text-gray-600 text-sm">智能办公流程自动化</p>
              </div>

              <div className="text-center p-6 border border-gray-200 rounded-xl hover:border-orange-300 transition-colors">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h5 className="font-semibold text-gray-800 mb-2">金融评估</h5>
                <p className="text-gray-600 text-sm">企业贷款评估报告生成</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
