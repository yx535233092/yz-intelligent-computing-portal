'use client';

import { useScrollToTop } from '@/hooks/useScrollToTop';
import Image from 'next/image';
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  RightOutlined,
  DatabaseOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  ApiOutlined,
  CloudServerOutlined,
  TeamOutlined,
  FileTextOutlined,
  RobotOutlined,
  SyncOutlined,
  RocketOutlined,
  BulbOutlined,
  GlobalOutlined,
  LineChartOutlined,
  BarChartOutlined,
  FundOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function AI360KnowledgeBasePage() {
  useScrollToTop();
  const router = useRouter();

  const caseData = {
    title: '360AI企业知识库',
    subtitle: '行业领先的人工智能应用场景底座',
    description:
      '打造行业领先的人工智能应用场景底座，实现知识AI化，从记录事实到AI指引行动。通过统一AI工作空间、多模型管理和知识全生命周期管理，构建智能化知识服务体系。',
    detailPicName: '/assets/images/cases/enterprise/360.png',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-lg bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => router.push('/portal/case')}
            className="flex items-center text-gray-600 hover:text-brand transition-colors duration-200 group"
          >
            <ArrowLeftOutlined className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            返回案例列表
          </button>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section className="relative bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 py-20 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-blue-600/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-6 bg-orange-100 text-orange-800">
                企业行业案例
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {caseData.title}
              </h1>
              <p className="text-xl text-purple-600 font-semibold mb-6">
                {caseData.subtitle}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {caseData.description}
              </p>
              <button
                onClick={() => router.push('/portal/contact-us')}
                className="inline-flex items-center px-6 py-3 bg-brand hover:bg-red-600 text-white font-medium rounded-lg transition-all duration-200 group"
              >
                咨询解决方案
                <RightOutlined className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-white p-4">
                <Image
                  src={caseData.detailPicName}
                  alt={caseData.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 项目背景 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              项目背景
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              知识AI化的时代变革
            </p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 border border-purple-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <RocketOutlined className="text-2xl text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                知识数字化转型
              </h3>
              <p className="text-gray-600 leading-relaxed">
                企业知识管理从传统的记录事实模式，向AI指引行动的智能化模式转变，需要构建全新的知识管理体系。
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <RobotOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                AI技术成熟
              </h3>
              <p className="text-gray-600 leading-relaxed">
                大语言模型、RAG技术、向量数据库等AI技术日趋成熟，为构建智能化知识库提供了坚实的技术基础。
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-8 border border-indigo-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <GlobalOutlined className="text-2xl text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                多场景应用需求
              </h3>
              <p className="text-gray-600 leading-relaxed">
                从智慧政务、智慧航空到智慧教育，各行业对智能化知识服务的需求日益增长，亟需统一的AI应用底座。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 项目功能 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              项目功能
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              全方位AI知识管理解决方案
            </p>
          </div>

          {/* 主要组成 */}
          <div className="grid md:grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <CloudServerOutlined className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                统一AI工作空间
              </h3>
              <p className="text-gray-600 mb-4">
                提供统一的AI应用工作空间，整合各类AI能力，为用户提供一站式智能化服务体验。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  集中化管理
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  统一入口
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  便捷操作
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <RobotOutlined className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                多模型管理
              </h3>
              <p className="text-gray-600 mb-4">
                支持多种内置和主流大模型，灵活选择最适合业务场景的AI模型，实现智能化应用。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  内置模型
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  主流大模型
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  灵活切换
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 border border-indigo-200">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <SyncOutlined className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                知识全生命周期管理
              </h3>
              <p className="text-gray-600 mb-4">
                覆盖知识捕获、处理、使用全流程，实现知识资产的智能化管理和价值最大化。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  知识捕获
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  知识处理
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  知识使用
                </li>
              </ul>
            </div>
          </div>

          {/* 知识全生命周期详解 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              知识全生命周期管理
            </h3>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="border-l-4 border-purple-500 pl-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <DatabaseOutlined className="text-purple-600 text-xl" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    知识捕获
                  </h4>
                </div>
                <p className="text-gray-600 mb-4">
                  支持多源数据采集，实现分散知识的自动采集和更新
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                    系统文件采集
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                    本地文件导入
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                    全网数据抓取
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                    AI生成内容
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <FileTextOutlined className="text-blue-600 text-xl" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    知识处理
                  </h4>
                </div>
                <p className="text-gray-600 mb-4">
                  强大的知识处理能力，确保知识资产的高质量管理
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    文件处理
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    分类分级
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    版式识别
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    多模态理解
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    RAG智能分片
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    混合检索
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-indigo-500 pl-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <ApiOutlined className="text-indigo-600 text-xl" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    知识使用
                  </h4>
                </div>
                <p className="text-gray-600 mb-4">
                  多渠道知识服务，满足不同场景应用需求
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                    Chat对话
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                    应用接口
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                    数字人
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                    智能体
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                    通用知识库
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                    专业知识库
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 应用场景 */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              应用场景覆盖
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <TeamOutlined className="text-purple-600 text-xl" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    通用场景
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['人事问答', '财务问答', '行政问答', 'IT问答'].map(
                    (item, index) => (
                      <div
                        key={index}
                        className="bg-purple-50 rounded-lg p-3 text-center text-sm font-medium text-gray-700"
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <GlobalOutlined className="text-indigo-600 text-xl" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    行业场景
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['智慧政务', '智慧航空', '智慧教育', '智慧办公'].map(
                    (item, index) => (
                      <div
                        key={index}
                        className="bg-indigo-50 rounded-lg p-3 text-center text-sm font-medium text-gray-700"
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 项目亮点 */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              项目亮点
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              四大核心优势，打造行业领先知识库
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <DatabaseOutlined className="text-2xl text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  多源数据采集
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                支持多源数据采集，并可基于文件模块进行归档及共享，一键发布形成知识库，实现知识资产的快速积累。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  多源数据接入
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  文件归档共享
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  一键发布知识库
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <FileTextOutlined className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  强大版式识别
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                自研版式识别大模型，对复杂版式与图表解析准确率高（不低于90%），确保知识内容的准确理解。
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-semibold">
                    版式识别准确率
                  </span>
                  <span className="text-blue-600 font-bold text-2xl">≥90%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full w-[90%]"></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <ApiOutlined className="text-2xl text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  知识库即服务（KBaaS）
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                通过应用接口（API、H5外链）无缝连接至企业各类业务系统，实现知识服务的快速集成和调用。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  API接口服务
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  H5外链集成
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  业务系统对接
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <SafetyOutlined className="text-2xl text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  全方位安全保障
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                整合集团模型安全能力，从模型、数据到应用进行权限、内容过滤和审计保障，确保知识安全。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  模型安全
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  数据安全
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  应用安全
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  审计保障
                </li>
              </ul>
            </div>
          </div>

          {/* 技术架构展示 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              技术架构优势
            </h3>
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-4xl mb-4">🤖</div>
                <h4 className="font-semibold text-gray-900 mb-2">多模型支持</h4>
                <p className="text-sm text-gray-600">
                  内置及主流大模型灵活切换
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-4xl mb-4">📊</div>
                <h4 className="font-semibold text-gray-900 mb-2">智能处理</h4>
                <p className="text-sm text-gray-600">
                  RAG分片、向量化、混合检索
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl">
                <div className="text-4xl mb-4">🔗</div>
                <h4 className="font-semibold text-gray-900 mb-2">无缝集成</h4>
                <p className="text-sm text-gray-600">API、H5多渠道业务对接</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-4xl mb-4">🛡️</div>
                <h4 className="font-semibold text-gray-900 mb-2">安全可控</h4>
                <p className="text-sm text-gray-600">全链路权限管控和审计</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 提效成果 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              降本增效成果
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              多行业场景验证，显著提升业务效率
            </p>
          </div>

          {/* 效果数据展示 */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-cyan-200">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mr-4">
                  <RocketOutlined className="text-3xl text-cyan-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  智慧航空场景
                </h3>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700 font-semibold">
                      维修专家处理效率提升
                    </span>
                    <span className="text-cyan-600 font-bold text-3xl">
                      90%
                    </span>
                  </div>
                  <div className="w-full bg-cyan-200 rounded-full h-3">
                    <div className="bg-cyan-600 h-3 rounded-full w-[90%]"></div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700 font-semibold">
                      问题排查时间缩短
                    </span>
                    <div className="text-right">
                      <div className="text-cyan-600 font-bold text-xl">
                        从1天到3分钟
                      </div>
                      <div className="text-sm text-gray-500">效率提升480倍</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex-1 bg-red-100 rounded-lg p-3 text-center">
                      <div className="text-red-600 font-bold">1天</div>
                      <div className="text-xs text-gray-600">传统模式</div>
                    </div>
                    <div className="text-2xl text-gray-400">→</div>
                    <div className="flex-1 bg-green-100 rounded-lg p-3 text-center">
                      <div className="text-green-600 font-bold">3分钟</div>
                      <div className="text-xs text-gray-600">AI辅助</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg border border-green-200">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <GlobalOutlined className="text-3xl text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  智慧政务场景
                </h3>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700 font-semibold">
                      线下咨询量减少
                    </span>
                    <span className="text-green-600 font-bold text-3xl">
                      80%
                    </span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full w-[80%]"></div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700 font-semibold">
                      企业办事效率提升
                    </span>
                    <span className="text-green-600 font-bold text-3xl">
                      3倍
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="bg-green-100 rounded-lg p-2 text-center">
                      <div className="text-green-600 font-bold text-sm">1x</div>
                      <div className="text-xs text-gray-600">传统</div>
                    </div>
                    <div className="bg-green-200 rounded-lg p-2 text-center">
                      <div className="text-green-600 font-bold text-sm">2x</div>
                    </div>
                    <div className="bg-green-300 rounded-lg p-2 text-center">
                      <div className="text-green-700 font-bold text-sm">3x</div>
                      <div className="text-xs text-gray-700">AI辅助</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 更多场景成果 */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-purple-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <BulbOutlined className="text-2xl text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">智慧教育</h3>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-semibold text-sm">
                      教师备课辅助提效
                    </span>
                    <span className="text-purple-600 font-bold text-2xl">
                      50%
                    </span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full w-1/2"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-semibold text-sm">
                      行政事务处理效率提升
                    </span>
                    <span className="text-purple-600 font-bold text-2xl">
                      50%
                    </span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 shadow-lg border border-orange-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <ThunderboltOutlined className="text-2xl text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">智慧办公</h3>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-semibold">
                    电力设计方案平均效率提升
                  </span>
                  <span className="text-orange-600 font-bold text-3xl">
                    30%
                  </span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-3">
                  <div className="bg-orange-600 h-3 rounded-full w-[30%]"></div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  通过AI辅助设计，显著缩短设计周期，提升设计质量
                </p>
              </div>
            </div>
          </div>

          {/* 核心价值总结 */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              核心价值实现
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ThunderboltOutlined className="text-2xl text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">效率倍增</h4>
                <p className="text-sm text-gray-600">
                  问题排查从1天缩短至3分钟
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <LineChartOutlined className="text-2xl text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">降本减负</h4>
                <p className="text-sm text-gray-600">
                  线下咨询量减少80%，人力成本下降
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrophyOutlined className="text-2xl text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">质量提升</h4>
                <p className="text-sm text-gray-600">
                  版式识别准确率≥90%，服务可靠
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GlobalOutlined className="text-2xl text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">场景广泛</h4>
                <p className="text-sm text-gray-600">
                  覆盖政务、航空、教育等多行业
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
