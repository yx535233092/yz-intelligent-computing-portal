'use client';

import { useInView } from '@/hooks/useInView';
import {
  AimOutlined,
  BuildOutlined,
  BulbOutlined,
  RobotOutlined,
  ReadOutlined,
  CodeOutlined,
  StarOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';

export default function ConsultServicePage() {
  const [heroRef, heroInView] = useInView();
  const [consultRef, consultInView] = useInView();
  const [customRef, customInView] = useInView();
  const [trainingRef, trainingInView] = useInView();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero 介绍模块 */}
      <section
        ref={heroRef}
        className={`px-60 py-24 transition-all duration-1000 ease-out ${
          heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI 全链路技术支撑服务
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            专业的AI技术支撑服务，助力企业AI转型升级
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* 技术咨询模块 */}
      <section
        ref={consultRef}
        className={`px-60 py-20 transition-all duration-1000 ease-out delay-200 ${
          consultInView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">技术支撑</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              为AI项目提供专业的技术支撑服务，从底层规划到技术实施，全方位助力您的AI项目成功
            </p>
          </div>
          ​
          <div className="grid grid-cols-2 gap-8">
            {[
              {
                title: '基础架构集成设计服务',
                description:
                  '为企业AI战略提供基础设施架构设计，涵盖GPU/CPU集群、分布式存储、网络架构等核心组件配置，确保高扩展性、高稳定性与高效能特性，为AI模型训练与应用部署提供坚实硬件支撑。',
                icon: <BuildOutlined />,
              },
              {
                title: '训推技术指导服务​',
                description:
                  '覆盖AI模型全生命周期，从数据预处理、算法选型、超参数调优到推理部署优化，提供轻量化改造、量化压缩等技术指导，实现模型在生产环境中的低延迟、高并发运行，最大化商业价值。',
                icon: <RobotOutlined />,
              },
              {
                title: 'AI 应用支撑服务​',
                description:
                  '深度融合行业特性与业务场景，提供技术栈选型、功能模块设计、用户体验优化等定制化服务，通过自然语言交互、可视化呈现等方式，确保AI应用实现降本增效与体验升级。',
                icon: <BulbOutlined />,
              },
              {
                title: '专项培训服务',
                description:
                  '系统化培训涵盖向量数据库、RAG架构、智能体开发等应用实践，以及傲飞算力平台操作、大模型理论等核心技能，助力团队快速掌握AI技术并实现落地应用。',
                icon: <AimOutlined />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 ease-out transform hover:scale-105 ${
                  consultInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="text-4xl mb-4 text-blue-600">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 基于开源平台的定制服务（新增模块） */}
      <section
        ref={customRef}
        className={`px-60 py-20 bg-gradient-to-br from-blue-50 to-purple-50 transition-all duration-1000 ease-out delay-300 ${
          customInView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              基于开源平台的定制服务
            </h2>
            <p className="text-lg text-gray-600">
              支持各类主流开源RAG/Agent平台服务定制，包括Dify、RagFlow、MaxKB、FastGPT
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {['Dify', 'RagFlow', 'MaxKB', 'FastGPT'].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white/80 border border-gray-200 text-gray-700 text-sm shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {/* 左栏：架构优化 */}
              <div className="group h-full flex flex-col rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center mr-4 shadow-md">
                    <span className="text-xl">
                      <BuildOutlined />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      架构优化
                    </h3>
                    <p className="text-sm text-gray-500">性能与网络协同优化</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 hover:bg-blue-50 transition-colors">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      1. 系统优化
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                      <li>
                        在知识库高并发场景下，对 Dify 或 RagFlow
                        的底层向量数据库进行改造与优化。
                      </li>
                      <li>
                        内部组件性能参数优化，包括数据库连接池、并发请求数量等关键配置。
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 hover:bg-blue-50 transition-colors">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      2. 网络优化
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                      <li>
                        多组件容器化环境下，重新划分 Docker 的虚拟
                        VLAN，实现多系统无缝通信。
                      </li>
                      <li>
                        在 Dify Sandbox 沙箱环境下自定义 MySQL
                        访问链路，重新编译源码镜像。
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 中栏：源码修改 */}
              <div className="group h-full flex flex-col rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white flex items-center justify-center mr-4 shadow-md">
                    <span className="text-xl">
                      <CodeOutlined />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      源码修改
                    </h3>
                    <p className="text-sm text-gray-500">修复增强与信创兼容</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-4 hover:bg-purple-50 transition-colors">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      1. 漏洞修复
                    </h4>
                    <p className="text-gray-600 text-sm">
                      基于 Dify 开源社区最新技术方案，定向修复线上老版本的功能
                      BUG。
                    </p>
                  </div>

                  <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-4 hover:bg-purple-50 transition-colors">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      2. 功能定制
                    </h4>
                    <p className="text-gray-600 text-sm">
                      修改部署版本的工作流相关代码，实现返回引用的完整文件功能，同时修复文件名符号编码问题，提升文件下载体验。
                    </p>
                  </div>

                  <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-4 hover:bg-purple-50 transition-colors">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      3. 系统增强
                    </h4>
                    <p className="text-gray-600 text-sm">
                      重构沙盒镜像代码，以满足客户在完全离线环境下使用各类第三方代码库的需求。
                    </p>
                  </div>

                  <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-4 hover:bg-purple-50 transition-colors">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      4. 信创支持
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Dify 源码定制兼容客户侧奇安信等老版本信创浏览器。
                    </p>
                  </div>
                </div>
              </div>

              {/* 右栏：应用开发 */}
              <div className="group h-full flex flex-col rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center mr-4 shadow-md">
                    <span className="text-xl">
                      <BulbOutlined />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      应用开发
                    </h3>
                    <p className="text-sm text-gray-500">知识库与智能体</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-orange-50/70 border border-orange-100 rounded-xl p-4 hover:bg-orange-50 transition-colors">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      1. 知识库
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                      <li>
                        支持多模态文档预处理，支持自定义文档切片规则，支持最新高性能
                        Embedding 模型（Qwen3）。
                      </li>
                      <li>支持 5000+ 文档存储，支持高并发处理性能优化。</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50/70 border border-orange-100 rounded-xl p-4 hover:bg-orange-50 transition-colors">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      2. 智能体
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                      <li>
                        支持智能问数开源方案开发，包括意图识别、场景预置、名称转义等功能，并支持
                        Chart 可视化图表集成展示。
                      </li>
                      <li>
                        支持各类业务逻辑工作流开发，包括医疗问诊流程开发、交通车辆质检、OA
                        办公、企业贷款评估报告生成等。
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 智算培训模块 */}
      <section
        ref={trainingRef}
        className={`px-60 py-20 bg-gradient-to-br from-blue-50 to-purple-50 transition-all duration-1000 ease-out delay-400 ${
          trainingInView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          {/* 服务优势 */}
          <div
            className={`mt-16 transition-all duration-1000 ease-out delay-100 ${
              trainingInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">
                服务优势
              </h3>
              <p className="text-lg text-gray-600">
                一体系+双结合+多专家+可定制
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {[
                {
                  title: '专业知识体系',
                  description:
                    '课程遵循从基础到前沿的逻辑、模块化设计，目标清晰，内容实时更新，适配不同水平学员进阶。',
                  icon: <ReadOutlined />,
                  iconColor: 'text-blue-500',
                },
                {
                  title: '实验与理论结合',
                  description:
                    '50%实操课时，依托演示环境、客户环境进行实操结合行业案例，强化知识应用与项目实战能力。',
                  icon: <CodeOutlined />,
                  iconColor: 'text-green-500',
                },
                {
                  title: '专家团队护航',
                  description:
                    '汇聚云智专家团队，拥有丰富项目经验和授课经验深度指导技术学习。',
                  icon: <StarOutlined />,
                  iconColor: 'text-purple-500',
                },
                {
                  title: '服务私人定制',
                  description:
                    '可结合客户需求，定制化培训课程，教学方式与学习周期，满足客户业务需求。',
                  icon: <CustomerServiceOutlined />,
                  iconColor: 'text-orange-500',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 ease-out transform hover:scale-105 border border-gray-100 ${
                    trainingInView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${300 + index * 200}ms` }}
                >
                  <div className={`text-4xl mb-4 ${item.iconColor}`}>
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
