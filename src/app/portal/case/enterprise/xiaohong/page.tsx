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
  ProjectOutlined,
  LineChartOutlined,
  BarChartOutlined,
  FundOutlined,
  TrophyOutlined,
  AuditOutlined,
  CalculatorOutlined,
  ControlOutlined,
  DashboardOutlined,
  FileProtectOutlined,
  RadarChartOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function XiaohongAgentPage() {
  useScrollToTop();
  const router = useRouter();

  const caseData = {
    title: '萧宏集团智能体开发项目',
    subtitle: '"看得清、管得住、控得稳"的智能项目管理中枢',
    description:
      '通过AI驱动的数据融合与风险预判，构建一个"看得清、管得住、控得稳"的智能项目管理中枢。整合方案智能体、投标智能体、项目管理智能体三大核心智能体，实现从投标到履约的全生命周期智能化管理。',
    detailPicName: '/assets/images/cases/enterprise/xiaohong.png',
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
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
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
              <p className="text-xl text-blue-600 font-semibold mb-6">
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
              AI赋能建筑施工企业数字化转型
            </p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <ProjectOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                项目管理挑战
              </h3>
              <p className="text-gray-600 leading-relaxed">
                建筑施工企业面临方案编制效率低、投标废标率高、项目履约风险大等痛点，亟需智能化解决方案。
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-8 border border-indigo-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <RobotOutlined className="text-2xl text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                AI技术赋能
              </h3>
              <p className="text-gray-600 leading-relaxed">
                大语言模型、智能体技术的成熟，为建筑行业提供了从方案编制到项目履约全流程的AI赋能可能。
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 border border-purple-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <RadarChartOutlined className="text-2xl text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                全流程风控需求
              </h3>
              <p className="text-gray-600 leading-relaxed">
                从投标前端到履约后端，需要建立全方位的风险预判和控制体系，确保项目稳健运行。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 项目功能 - 核心智能体 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              核心智能体
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              三大智能体协同，覆盖项目全生命周期
            </p>
          </div>

          {/* 方案智能体 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <FileTextOutlined className="text-3xl text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  方案智能体 (Proposal Agent)
                </h3>
                <p className="text-gray-600">智能化方案编制与审核</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <FileTextOutlined className="text-white text-xl" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    方案编制
                  </h4>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>自动生成大纲</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>人机协同交互编写</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>固定内容自动填充</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <AuditOutlined className="text-white text-xl" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    方案审核
                  </h4>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>AI推荐审核清单</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>实时展示AI审核思路</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>生成审核报告</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <FileProtectOutlined className="text-white text-xl" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    技术交底书生成
                  </h4>
                </div>
                <p className="text-gray-600">
                  基于方案和历史模版自动生成初稿，快速形成技术交底文件，提升项目准备效率。
                </p>
              </div>
            </div>
          </div>

          {/* 投标智能体 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                <TrophyOutlined className="text-3xl text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  投标智能体 (Bidding Agent)
                </h3>
                <p className="text-gray-600">智能投标决策支持系统</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <AuditOutlined className="text-white text-xl" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    投标审核
                  </h4>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>资信、技术、商务标符合性检查</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>关键人员状态审查</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>自动识别风险点</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <CalculatorOutlined className="text-white text-xl" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    商务标报价模拟器
                  </h4>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>预测报价得分</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>模拟不同点位报价</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>辅助制定差异化策略</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <FundOutlined className="text-white text-xl" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    项目成本核算
                  </h4>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>工程单位成本分析</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>核查报价成本</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>控制低成本中标风险</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 项目管理智能体 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <DashboardOutlined className="text-3xl text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  项目管理智能体 (Project Management Agent)
                </h3>
                <p className="text-gray-600">全生命周期项目管控</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <DashboardOutlined className="text-white text-xl" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    智能驾驶舱
                  </h4>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>项目全生命周期可视化管理</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>单项目视图</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>项目对比视图</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <FileProtectOutlined className="text-white text-xl" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    合同管理
                  </h4>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>自动审核合同条款</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>合同风险审核</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>履约管理和内部风控</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <ControlOutlined className="text-white text-xl" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    项目信息无感管理
                  </h4>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>施工现场实时动态巡查</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>数据采集支撑履约管理</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2 flex-shrink-0" />
                    <span>自动化信息更新</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* AI底座 */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-100 rounded-2xl p-8 border border-gray-200 mt-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mr-4">
                <DatabaseOutlined className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">AI底座</h3>
            </div>
            <p className="text-gray-600 mb-6 text-lg">
              包含大模型管理、智能体管理、知识库管理、算力管理等，整合多源数据支撑智能决策
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {['历史方案库', '招投标文件库', '规范文档库', '外部价格数据'].map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 text-center font-medium text-gray-700 border border-gray-200"
                  >
                    {item}
                  </div>
                )
              )}
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
              四大核心优势，打造智能项目管理体系
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <TeamOutlined className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  多智能体协作机制
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                在方案编制中引入多个专业Agent（如桥梁Agent、隧道Agent、安全Agent等）共同协作生成和检测冲突，确保方案的专业性和完整性。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  专业领域Agent协同
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  自动冲突检测
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  跨专业方案优化
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <FileTextOutlined className="text-2xl text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  规范数字化与动态监控
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                实现规范文件的统一数字化管理、条款解析与标注，规范更新延迟可降至24小时内，确保始终符合最新标准。
              </p>
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-semibold">
                    规范更新延迟
                  </span>
                  <span className="text-indigo-600 font-bold text-2xl">
                    ≤24小时
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  实时跟踪规范变化，确保方案合规性
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <SafetyOutlined className="text-2xl text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  全方位风险控制
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                从前端（投标、合同）到后端（履约），实现风险自动预判和控制，全流程保障项目安全运行。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  投标风险评估
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  合同条款风险识别
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  履约过程风险监控
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  成本风险预警
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <DatabaseOutlined className="text-2xl text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  强大的数据底座
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                整合历史方案、招投标文件、规范文档、同业公司和外部价格等多源数据，构建全面的知识体系。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  历史项目数据积累
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  行业规范实时更新
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  市场价格动态跟踪
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  同业经验共享
                </li>
              </ul>
            </div>
          </div>

          {/* 技术架构展示 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              技术架构优势
            </h3>
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-4xl mb-4">🤝</div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  多Agent协作
                </h4>
                <p className="text-sm text-gray-600">专业领域Agent共同协作</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl">
                <div className="text-4xl mb-4">📋</div>
                <h4 className="font-semibold text-gray-900 mb-2">规范数字化</h4>
                <p className="text-sm text-gray-600">24小时内更新规范</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-4xl mb-4">🛡️</div>
                <h4 className="font-semibold text-gray-900 mb-2">全程风控</h4>
                <p className="text-sm text-gray-600">前端到后端风险预判</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-4xl mb-4">💾</div>
                <h4 className="font-semibold text-gray-900 mb-2">数据底座</h4>
                <p className="text-sm text-gray-600">多源数据智能整合</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 降本增效成果 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              降本增效成果
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              显著提升企业竞争力，实现业务跨越式发展
            </p>
          </div>

          {/* 终极价值指标 */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              终极价值指标
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <TrophyOutlined className="text-2xl text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        方案一次通过率
                      </h4>
                      <p className="text-xs text-gray-500">Quality</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-bold text-3xl">
                      ↑30%
                    </div>
                  </div>
                </div>
                <div className="w-full bg-green-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full w-[30%]"></div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  显著提升方案质量，减少返工次数
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <SafetyOutlined className="text-2xl text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">废标率</h4>
                      <p className="text-xs text-gray-500">Risk Control</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-600 font-bold text-3xl">↓50%</div>
                  </div>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full w-[50%]"></div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  有效降低投标风险，提升中标率
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <ThunderboltOutlined className="text-2xl text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        投标周期压缩
                      </h4>
                      <p className="text-xs text-gray-500">Efficiency</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-purple-600 font-bold text-3xl">
                      ↓40%
                    </div>
                  </div>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-3">
                  <div className="bg-purple-600 h-3 rounded-full w-[40%]"></div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  加快响应速度，抢占市场先机
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 shadow-lg border border-orange-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                      <RocketOutlined className="text-2xl text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        年承接项目量
                      </h4>
                      <p className="text-xs text-gray-500">Growth</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-orange-600 font-bold text-3xl">
                      ↑25%
                    </div>
                  </div>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-3">
                  <div className="bg-orange-600 h-3 rounded-full w-[25%]"></div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  扩大业务规模，增强市场竞争力
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-8 shadow-lg border border-red-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                      <FundOutlined className="text-2xl text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">人工成本</h4>
                      <p className="text-xs text-gray-500">Cost Saving</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-600 font-bold text-3xl">↓35%</div>
                  </div>
                </div>
                <div className="w-full bg-red-200 rounded-full h-3">
                  <div className="bg-red-600 h-3 rounded-full w-[35%]"></div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  大幅降低人力投入，优化资源配置
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-indigo-200 lg:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                      <BarChartOutlined className="text-2xl text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        综合效益提升
                      </h4>
                      <p className="text-xs text-gray-500">Overall Impact</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  通过AI智能体的全面应用，实现从投标到履约的全流程优化，显著提升企业整体运营效率和盈利能力
                </p>
              </div>
            </div>
          </div>

          {/* 初期价值指标 */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              初期价值指标（0-6个月）
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-cyan-200">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mr-4">
                    <LineChartOutlined className="text-3xl text-cyan-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    方案生产效率
                  </h3>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700 font-semibold">
                      效率提升幅度
                    </span>
                    <span className="text-cyan-600 font-bold text-4xl">
                      ↑20%
                    </span>
                  </div>
                  <div className="w-full bg-cyan-200 rounded-full h-4 mb-4">
                    <div className="bg-cyan-600 h-4 rounded-full w-[20%]"></div>
                  </div>
                  <p className="text-gray-600">
                    通过自动化方案生成和智能辅助，快速提升方案编制效率，缩短项目准备周期
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-violet-200">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-violet-100 rounded-xl flex items-center justify-center mr-4">
                    <AuditOutlined className="text-3xl text-violet-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    人工校对量
                  </h3>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700 font-semibold">
                      减少幅度
                    </span>
                    <span className="text-violet-600 font-bold text-4xl">
                      ↓40%
                    </span>
                  </div>
                  <div className="w-full bg-violet-200 rounded-full h-4 mb-4">
                    <div className="bg-violet-600 h-4 rounded-full w-[40%]"></div>
                  </div>
                  <p className="text-gray-600">
                    AI自动审核和检查功能显著降低人工校对工作量，让专业人员聚焦高价值工作
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 核心价值总结 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              核心价值实现
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrophyOutlined className="text-2xl text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">质量提升</h4>
                <p className="text-sm text-gray-600">方案一次通过率提升30%</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ThunderboltOutlined className="text-2xl text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">效率倍增</h4>
                <p className="text-sm text-gray-600">
                  投标周期压缩40%，快速响应
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FundOutlined className="text-2xl text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">成本优化</h4>
                <p className="text-sm text-gray-600">
                  人工成本降低35%，资源优化
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <RocketOutlined className="text-2xl text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">业务增长</h4>
                <p className="text-sm text-gray-600">年承接项目量增长25%</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
