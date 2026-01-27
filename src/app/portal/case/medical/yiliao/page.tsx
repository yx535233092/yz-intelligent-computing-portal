'use client';

import { useScrollToTop } from '@/hooks/useScrollToTop';
import Image from 'next/image';
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  RightOutlined,
  ExperimentOutlined,
  EyeOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  DatabaseOutlined,
  FileImageOutlined,
  TeamOutlined,
  BulbOutlined,
  ApiOutlined,
  SyncOutlined,
  RocketOutlined,
  MedicineBoxOutlined,
  FundOutlined,
  ClockCircleOutlined,
  AlertOutlined,
  DotChartOutlined,
  GlobalOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function MedicalImageAIPage() {
  useScrollToTop();
  const router = useRouter();

  const caseData = {
    title: '医学图像智能分析诊断',
    subtitle: 'AI+医学图像的智能诊断解决方案',
    description:
      '突破人工智慧病理诊断核心技术挑战，构建面向病理图像的人在回路智能AI诊断平台，研发针对高发癌症的辅助诊断、预后评估和生物标志物预测算法。',
    detailPicName: '/assets/images/cases/medical/yiliao.png',
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
      <section className="relative bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 py-20 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
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
              <p className="text-xl text-cyan-600 font-semibold mb-6">
                {}
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
              AI赋能医学图像诊断的技术革命
            </p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-xl p-8 border border-cyan-200">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-6">
                <RocketOutlined className="text-2xl text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                技术驱动
              </h3>
              <p className="text-gray-600 leading-relaxed">
                AI+医学图像发展迅速，数字病理人工智慧正在改变传统诊疗流程，为医疗行业带来革命性的技术变革。
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 border border-blue-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <TrophyOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                战略目标
              </h3>
              <p className="text-gray-600 leading-relaxed">
                突破人工智慧病理诊断核心技术挑战，推动病理AI技术与产品的产业化落地和转化，实现医工信协同发展。
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
              传统医学图像诊断面临的核心挑战
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <DatabaseOutlined className="text-2xl text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                数据获取难
              </h3>
              <p className="text-gray-600 leading-relaxed">
                医学图像标注费时费力，缺乏超大规模公开数据集，制约AI模型的训练和优化。
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <AlertOutlined className="text-2xl text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                特征抽取复杂
              </h3>
              <p className="text-gray-600 leading-relaxed">
                病理图像尺寸巨大，特征细微，且易受伪影影响，特征抽取困难，识别精度难以保证。
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <EyeOutlined className="text-2xl text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                模型可信度低
              </h3>
              <p className="text-gray-600 leading-relaxed">
                AI模型推理过程不透明，结果难以获得临床专家和患者的信服，影响实际应用。
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <ClockCircleOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                效率瓶颈
              </h3>
              <p className="text-gray-600 leading-relaxed">
                传统诊断效率低、供需缺口大，且缺乏客观性，难以满足日益增长的诊断需求。
              </p>
            </div>
          </div>

          {/* 痛点详细说明 */}
          <div className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              传统医学图像诊断的困境
            </h3>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-900">
                      资源稀缺：
                    </span>
                    病理专家数量不足，无法满足大量诊断需求
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-900">
                      标注成本高：
                    </span>
                    医学图像标注需要专业知识，耗时耗力
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-900">
                      精度要求高：
                    </span>
                    医疗诊断容错率低，需要极高的准确性
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-5xl font-bold text-red-600 mb-2">
                  急需突破
                </div>
                <p className="text-gray-600">
                  传统医学图像诊断模式已无法满足现代医疗需求，急需借助AI技术实现智能化升级
                </p>
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
              解决方案
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              全方位AI医学图像诊断平台
            </p>
          </div>

          <div className="grid md:grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8 border border-cyan-200">
              <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-6">
                <DatabaseOutlined className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                平台建设
              </h3>
              <p className="text-gray-600 mb-4">
                建设医学图像资料库和智能标注平台，为AI模型训练提供高质量数据支撑。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  医学图像资料库
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  智能标注平台
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  数据质量管理
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <MedicineBoxOutlined className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                AI诊断平台
              </h3>
              <p className="text-gray-600 mb-4">
                构建面向病理图像的人在回路（Human-in-the-Loop,
                HITL）智能AI诊断平台。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  人在回路框架
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  智能诊断引擎
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  人机协同决策
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 border border-indigo-200">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <ExperimentOutlined className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                算法研发
              </h3>
              <p className="text-gray-600 mb-4">
                研发针对高发癌症（如宫颈癌、胃癌、肝癌等）的辅助诊断、预后评估和生物标志物预测算法。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  辅助诊断算法
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  预后评估模型
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  生物标志物预测
                </li>
              </ul>
            </div>
          </div>

          {/* 覆盖癌症类型 */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              高发癌症覆盖
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['宫颈癌', '胃癌', '肝癌', '肺癌', '乳腺癌', '其他高发癌症'].map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    <MedicineBoxOutlined className="text-cyan-500 text-xl mb-2" />
                    <p className="font-semibold text-gray-900">{item}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 项目亮点 */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              项目亮点
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              领先的技术创新和科研成果
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <SafetyOutlined className="text-2xl text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  鲁棒性与少标注
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                提出噪声鲁棒性的原发性肝癌分级诊断框架，并研发了基于弱监督/少标注的血管和细胞分割技术，显著提升性能。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  噪声鲁棒性框架
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  弱监督学习技术
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  少标注高性能
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <EyeOutlined className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">可解释诊断</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                研发可信循环网络等技术，实现对诊断关键特征（如癌细胞定位）的可视化，满足临床对模型可信度的要求。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  可信循环网络
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  关键特征可视化
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  癌细胞定位
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <TeamOutlined className="text-2xl text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  人在回路（HITL）框架
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                建立人机协同、知识趋优的进化框架，确保AI辅助诊断的质量，充分发挥人类专家和AI系统的各自优势。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  人机协同工作
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  知识趋优进化
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  质量保证机制
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <TrophyOutlined className="text-2xl text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">顶尖成果</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                成果在多个国际顶级AI和医学期刊/会议上发表，获得学术界和产业界的广泛认可。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  国际顶级期刊发表
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  学术界广泛认可
                </li>
                <li className="flex items-center">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  产业界高度评价
                </li>
              </ul>
            </div>
          </div>

          {/* 技术创新展示 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              核心技术创新
            </h3>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-4xl mb-4">🔬</div>
                <h4 className="font-semibold text-gray-900 mb-2">弱监督学习</h4>
                <p className="text-sm text-gray-600">
                  降低标注成本，提升模型训练效率
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-4xl mb-4">👁️</div>
                <h4 className="font-semibold text-gray-900 mb-2">可解释AI</h4>
                <p className="text-sm text-gray-600">
                  诊断过程透明化，提升临床信任度
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-4xl mb-4">🤝</div>
                <h4 className="font-semibold text-gray-900 mb-2">人机协同</h4>
                <p className="text-sm text-gray-600">
                  结合人类专家和AI优势，确保质量
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
              显著提升医学诊断效率和医疗服务能力
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-cyan-200">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mr-4">
                    <ThunderboltOutlined className="text-3xl text-cyan-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    提升诊断效率
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    通过自动化智能诊疗平台，解决病理诊断效率低的问题，大幅缩短诊断时间。
                  </p>
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-700 font-semibold">
                        CT扫描处理时间
                      </span>
                      <span className="text-cyan-600 font-bold text-xl">
                        约30秒/例
                      </span>
                    </div>
                    <div className="w-full bg-cyan-200 rounded-full h-3">
                      <div className="bg-cyan-500 h-3 rounded-full w-1/12"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg border border-green-200">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <ClockCircleOutlined className="text-3xl text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">加速筛查</h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  例如，平扫CT主动脉夹层筛查，处理一例CT仅需约30秒，极大提升筛查效率。
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-blue-200">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <GlobalOutlined className="text-3xl text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    缓解资源不均
                  </h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  允许将癌症诊断模型部署到基层医院，减少对稀缺病理专家的依赖，促进优质医疗资源下沉。
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-purple-200">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                    <RocketOutlined className="text-3xl text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    推动产业转化
                  </h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  助力&quot;医工信&quot;协同发展，将技术成果转化为实际产品，推动病理AI产业化落地。
                </p>
              </div>
            </div>
          </div>

          {/* 核心价值 */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              核心价值实现
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ThunderboltOutlined className="text-2xl text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">效率提升</h4>
                <p className="text-sm text-gray-600">30秒完成CT扫描诊断分析</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <SafetyOutlined className="text-2xl text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">精度保障</h4>
                <p className="text-sm text-gray-600">
                  少标注高性能，噪声鲁棒性强
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <EyeOutlined className="text-2xl text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">可信赖</h4>
                <p className="text-sm text-gray-600">
                  可解释AI，诊断过程透明化
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GlobalOutlined className="text-2xl text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">普惠医疗</h4>
                <p className="text-sm text-gray-600">
                  基层医院可部署，资源下沉
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
