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
  BarChartOutlined,
  TeamOutlined,
  SearchOutlined,
  CloudServerOutlined,
  ApiOutlined,
  LineChartOutlined,
  FileTextOutlined,
  RobotOutlined,
  SyncOutlined,
  RocketOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function QitianPCSPage() {
  useScrollToTop();
  const router = useRouter();

  const caseData = {
    title: '气田PCS智能问数',
    subtitle: '基于大模型技术的业务数据智能问答系统',
    description:
      '实现自然语言与业务数据库的问答交互，通过对接气田PCS系统生产数据库，实现大模型驱动下的业务数据问答，打造"所问即所得"的数据查询能力。',
    detailPicName: '/assets/images/cases/enterprise/qitian.png',
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
      <section className="relative bg-gradient-to-br from-slate-50 via-green-50 to-blue-50 py-20 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
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
              <p className="text-xl text-green-600 font-semibold mb-6">
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
              数字化转型浪潮下的智能问答应用探索
            </p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <RocketOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                数字化转型核心课题
              </h3>
              <p className="text-gray-600 leading-relaxed">
                在数字化转型浪潮中，如何高效利用企业级数据资源中心（以EPBP为核心）的数据，成为提升企业竞争力的核心课题。
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border border-green-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <RobotOutlined className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                大模型技术成熟
              </h3>
              <p className="text-gray-600 leading-relaxed">
                随着ChatGPT和DeepSeek等大语言模型的爆发，推动了智能问答进入快车道，为行业应用提供了技术支撑。
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 border border-purple-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <ApiOutlined className="text-2xl text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                集团战略需求
              </h3>
              <p className="text-gray-600 leading-relaxed">
                中国石化已完成DeepSeek大模型的部署，并接入长城大模型应用系统，但长城大模型应用广场缺少关于&quot;问数&quot;的应用。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 客户痛点 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              客户痛点
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              传统数据服务模式面临的核心挑战
            </p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-500">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ClockCircleOutlined className="text-2xl text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    数据交付周期长
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    传统基于数据仓库的&quot;预制&quot;服务模式（需求梳理、数据处理、服务交付）交付周期长，难以满足快节奏、多变的数据快速查询需求。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-orange-500">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ThunderboltOutlined className="text-2xl text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    效率低下
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    传统的数据查询和分析方式面临效率低、响应慢等问题，难以满足企业对决策速度和精准度的要求。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 痛点详细说明 */}
          <div className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              传统数据服务模式的困境
            </h3>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">长</div>
                <p className="text-gray-600">
                  需求梳理 → 数据处理 → 服务交付，周期漫长
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  慢
                </div>
                <p className="text-gray-600">响应速度慢，无法支撑快速决策</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  难
                </div>
                <p className="text-gray-600">多变需求难以快速满足</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 项目功能 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              项目功能
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              全方位智能问数解决方案
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <SearchOutlined className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                核心功能
              </h3>
              <p className="text-gray-600 mb-4">
                实现自然语言与业务数据库的问答交互，通过对接气田PCS系统生产数据库，实现大模型驱动下的业务数据问答。
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <DatabaseOutlined className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                业务覆盖
              </h3>
              <p className="text-gray-600 mb-4">
                支持采气生产、销售计量、措施作业、设备信息、站库信息、管线信息等八类业务场景的智能问题检索。
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <BarChartOutlined className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                多模态展示
              </h3>
              <p className="text-gray-600 mb-4">
                支持表格、图表、SQL语句等多种形式的结果输出与展示，满足不同场景需求。
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-6">
                <SafetyOutlined className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                权限控制
              </h3>
              <p className="text-gray-600 mb-4">
                对接PCS角色体系，实现分公司、厂级、管理区三级权限隔离，确保数据安全。
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 border border-pink-200">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-6">
                <LineChartOutlined className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                结果反馈机制
              </h3>
              <p className="text-gray-600 mb-4">
                支持问答内容点赞、点踩，收集反馈数据不断调优业务知识库，形成自演进机制。
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 border border-indigo-200">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <ApiOutlined className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                系统集成
              </h3>
              <p className="text-gray-600 mb-4">
                深度对接PCS系统生产数据库，实现与现有业务系统的无缝集成和数据联动。
              </p>
            </div>
          </div>

          {/* 业务场景 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              八大业务场景覆盖
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                '采气生产',
                '销售计量',
                '措施作业',
                '设备信息',
                '站库信息',
                '管线信息',
                '安全监控',
                '运营分析',
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <CheckCircleOutlined className="text-green-500 text-xl mb-2" />
                  <p className="font-semibold text-gray-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 项目亮点 */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              项目亮点
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              领先的技术架构和创新能力
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <CloudServerOutlined className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  技术架构先进
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                基于向量数据库构建知识库 +
                大模型技术路径开发的AI智能体，实现Text-To-SQL智能生成，将自然语言查询意图转化为正确的SQL语句。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  向量数据库知识库
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  大模型技术路径
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  Text-To-SQL智能生成
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <SearchOutlined className="text-2xl text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">高效检索</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                基于RAG（检索增强生成）技术构建高效检索智能体架构，确保生成答案严格基于检索到的知识，提供可靠、准确的业务数据查询结果。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  RAG检索增强生成
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  知识驱动回答
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  高精度数据检索
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <SyncOutlined className="text-2xl text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">自演进机制</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                形成问答质量迭代优化机制，通过用户交互评价（点赞/点踩）形成知识库正样本和微调语料，不断提升问答精准度。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  用户反馈收集
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  知识库迭代优化
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  微调语料生成
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <RobotOutlined className="text-2xl text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">国产大模型</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                应用基于Qwen3系列LLM模型 +
                embedding/rerank向量模型，充分利用国产大模型能力，确保技术自主可控。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  Qwen3系列LLM模型
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  Embedding向量模型
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  Rerank排序模型
                </li>
              </ul>
            </div>
          </div>

          {/* 核心能力展示 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              核心能力：Text-To-SQL
            </h3>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-4xl mb-4">💬</div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  自然语言输入
                </h4>
                <p className="text-sm text-gray-600">
                  用户用自然语言表达查询需求
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-4xl mb-4">🔄</div>
                <h4 className="font-semibold text-gray-900 mb-2">智能转换</h4>
                <p className="text-sm text-gray-600">
                  AI将自然语言转换为SQL语句
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-4xl mb-4">📊</div>
                <h4 className="font-semibold text-gray-900 mb-2">结果输出</h4>
                <p className="text-sm text-gray-600">
                  多模态展示查询结果和分析
                </p>
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
              提效成果
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              显著提升数据查询效率和决策速度
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg border border-green-200">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <ThunderboltOutlined className="text-3xl text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    查询效率革命
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    实现&quot;所问即所得&quot;能力，解决传统模式下数据交付周期长的痛点。
                  </p>
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-700 font-semibold">
                        传统模式
                      </span>
                      <span className="text-red-600 font-bold text-xl">
                        数天-数周
                      </span>
                    </div>
                    <div className="w-full bg-red-200 rounded-full h-3 mb-4">
                      <div className="bg-red-500 h-3 rounded-full w-full"></div>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-700 font-semibold">
                        智能问数
                      </span>
                      <span className="text-green-600 font-bold text-xl">
                        秒级响应
                      </span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full w-1/12"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-blue-200">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <TeamOutlined className="text-3xl text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    决策支持加速
                  </h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  助力生产运行及管理人员及时、准确、便捷地获取所需数据，提升数据利用效率和决策速度。
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                核心价值实现
              </h3>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <CheckCircleOutlined className="text-green-600 text-xl" />
                      </div>
                      <span className="font-semibold text-gray-900">
                        所问即所得
                      </span>
                    </div>
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-13">
                    自然语言直接查询，无需等待开发
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <ThunderboltOutlined className="text-blue-600 text-xl" />
                      </div>
                      <span className="font-semibold text-gray-900">
                        秒级响应
                      </span>
                    </div>
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-13">
                    从数天等待到秒级获取结果
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <BarChartOutlined className="text-purple-600 text-xl" />
                      </div>
                      <span className="font-semibold text-gray-900">
                        多模态展示
                      </span>
                    </div>
                    <span className="text-purple-600 font-bold">✓</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-13">
                    表格、图表、SQL多维度呈现
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                        <SafetyOutlined className="text-orange-600 text-xl" />
                      </div>
                      <span className="font-semibold text-gray-900">
                        权限安全
                      </span>
                    </div>
                    <span className="text-orange-600 font-bold">✓</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-13">
                    三级权限隔离，数据安全可控
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                        <SyncOutlined className="text-pink-600 text-xl" />
                      </div>
                      <span className="font-semibold text-gray-900">
                        持续优化
                      </span>
                    </div>
                    <span className="text-pink-600 font-bold">✓</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-13">
                    自演进机制，问答质量不断提升
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 应用场景 */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              典型应用场景
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <DatabaseOutlined className="text-blue-600 text-xl" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  生产数据查询
                </h4>
                <p className="text-sm text-gray-600">
                  快速查询采气生产、销售计量等核心业务数据
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <BarChartOutlined className="text-green-600 text-xl" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">运营分析</h4>
                <p className="text-sm text-gray-600">
                  支持多维度数据分析，辅助管理决策
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <FileTextOutlined className="text-purple-600 text-xl" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  设备信息管理
                </h4>
                <p className="text-sm text-gray-600">
                  便捷查询设备状态、站库、管线等信息
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <TeamOutlined className="text-orange-600 text-xl" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">决策支持</h4>
                <p className="text-sm text-gray-600">
                  为各级管理人员提供及时准确的数据支撑
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
