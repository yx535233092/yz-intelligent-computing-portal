'use client';

import { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import { products } from './productData';
import { getUserPermissionsAPI } from '@/apis/applications';
import { message } from 'antd';

// 提取公共样式
const commonStyles = {
  cardGradient: 'linear-gradient(135deg, #fff 60%, #fff2f2 100%)',
  hoverShadow: '0 8px 24px rgba(0,0,0,0.1)',
  cardShadow: '0 2px 8px rgba(0,0,0,0.08)',
  roundedCard:
    'rounded-2xl p-8 transition-all duration-200 hover:translate-y-[-4px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]',
  demoContainer:
    'w-[200px] h-[160px] bg-white rounded-xl flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.08)]',
  linkStyle:
    'text-[#4285f4] no-underline font-medium transition-colors duration-200 hover:text-[#3367d6]',
};

// 提取动画样式
const getAnimationStyle = (isInView: boolean, delay: number = 0) => ({
  opacity: isInView ? 1 : 0,
  transform: isInView
    ? 'translateY(0) scale(1)'
    : 'translateY(40px) scale(0.95)',
  transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
});

// 提取选项卡动画样式
const getTabAnimationStyle = (isInView: boolean, delay: number = 0) => ({
  opacity: isInView ? 1 : 0,
  transform: isInView ? 'translateX(0)' : 'translateX(-30px)',
  transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
});

// 产品卡片组件
const ProductCard = ({
  title,
  description,
  demoContent,
  link,
  isInView,
  delay = 0,
  hasPermission = true,
  permissionKey,
}: {
  title: string;
  description: string[];
  demoContent: React.ReactNode;
  link: string;
  isInView: boolean;
  delay?: number;
  hasPermission?: boolean;
  permissionKey?: string;
}) => (
  <div
    className={commonStyles.roundedCard}
    style={{
      background: commonStyles.cardGradient,
      ...getAnimationStyle(isInView, delay),
      transition: 'all 0.3s ease',
      opacity: hasPermission ? 1 : 0.6,
      position: 'relative',
    }}
  >
    {!hasPermission && (
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(255, 152, 0, 0.9)',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold',
          zIndex: 10,
        }}
      >
        🔒 需要权限
      </div>
    )}
    <div className="flex flex-col items-center text-center h-full">
      <div className={`mb-6 ${commonStyles.demoContainer}`}>{demoContent}</div>
      <div className="flex-1 flex flex-col justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-[#222] mb-4">{title}</h3>
          <p className="text-[#666] leading-6 mb-5 text-sm">
            {description.map((line, index) => (
              <span key={index}>
                {line}
                {index < description.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
        {hasPermission ? (
          <a
            href={link}
            target="_blank"
            className={commonStyles.linkStyle}
            style={{
              background: 'linear-gradient(135deg, #d32d26, #b71c1c)',
              color: 'white',
              padding: '0px 16px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(211, 45, 38, 0.3)',
              border: '2px solid transparent',
              transition: 'all 0.3s ease',
              display: 'inline-block',
              transform: 'translateY(0)',
              position: 'relative',
              overflow: 'hidden',
              width: '120px',
              height: '40px',
              lineHeight: '35px',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) ';
              e.currentTarget.style.boxShadow =
                '0 8px 25px rgba(211, 45, 38, 0.4)';
              e.currentTarget.style.background =
                'linear-gradient(135deg, #b71c1c, #8b0000)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow =
                '0 4px 15px rgba(211, 45, 38, 0.3)';
              e.currentTarget.style.background =
                'linear-gradient(135deg, #d32d26, #b71c1c)';
            }}
          >
            立即体验 {'>'}
          </a>
        ) : (
          <button
            onClick={() => {
              message.warning('您没有访问此服务的权限，请联系管理员开通');
            }}
            className={commonStyles.linkStyle}
            style={{
              background: 'linear-gradient(135deg, #9e9e9e, #757575)',
              color: 'white',
              padding: '0px 16px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(158, 158, 158, 0.3)',
              border: '2px solid transparent',
              transition: 'all 0.3s ease',
              display: 'inline-block',
              width: '120px',
              height: '40px',
              lineHeight: '35px',
              textAlign: 'center',
              cursor: 'not-allowed',
            }}
          >
            暂无权限
          </button>
        )}
      </div>
    </div>
  </div>
);

// 选项卡按钮组件
const TabButton = ({
  active,
  children,
  onClick,
  isInView,
  delay = 0,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  isInView: boolean;
  delay?: number;
}) => (
  <button
    className={`bg-transparent border-none py-4 px-8 text-[1.1rem] cursor-pointer border-b-[3px] border-transparent transition-all duration-200 hover:text-[#e53935] ${
      active ? 'text-[#e53935] border-b-[#e53935] font-semibold' : 'text-[#666]'
    }`}
    style={getTabAnimationStyle(isInView, delay)}
    onClick={onClick}
  >
    {children}
  </button>
);

export default function IntelligentProcessSection() {
  const [activeTab, setActiveTab] = useState('text');
  const [productTitle, setProductTitle] = useState('智能文档处理');
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [permissionsLoaded, setPermissionsLoaded] = useState(false);

  const [intelligentProcessRef, isIntelligentProcessInView] = useInView({
    threshold: 0.1,
  });

  // 获取用户权限
  useEffect(() => {
    const fetchUserPermissions = async () => {
      try {
        const res = await getUserPermissionsAPI();
        setUserPermissions(res.data.permissions || []);
      } catch (error) {
        console.error('获取用户权限失败:', error);
        setUserPermissions([]);
      } finally {
        setPermissionsLoaded(true);
      }
    };

    fetchUserPermissions();
  }, []);

  // 检查是否有权限访问服务
  const hasPermission = (permissionKey?: string) => {
    // 如果服务没有设置权限key，表示不需要权限验证
    if (!permissionKey) {
      return true;
    }
    // 检查用户是否有该服务的权限
    return userPermissions.includes(permissionKey);
  };

  // 选项卡配置
  const tabs = [
    {
      key: 'text',
      label: '文本解析',
      title: '智能文本解析',
    },
    {
      key: 'table',
      label: '表格解析',
      title: '智能表格解析',
    },
    {
      key: 'image',
      label: '图片解析',
      title: '智能图片解析',
    },
    {
      key: 'midea',
      label: '媒体解析',
      title: '智能媒体解析',
    },
  ];

  // 产品数据已从外部文件导入

  return (
    <section
      ref={intelligentProcessRef}
      className={`mx-auto p-10 max-w-[1300px] bg-white rounded-[20px] shadow-[0_2px_16px_rgba(0,0,0,0.06)] ${
        isIntelligentProcessInView ? 'animate-in' : ''
      }`}
    >
      <h2
        className="text-[2.5rem] font-semibold mb-4 text-[#222] text-center"
        style={{
          opacity: isIntelligentProcessInView ? 1 : 0,
          transform: isIntelligentProcessInView
            ? 'translateY(0)'
            : 'translateY(-30px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        }}
      >
        {productTitle}
      </h2>

      {/* 选项卡导航 */}
      <div className="flex justify-center mb-10 border-b border-[#e0e0e0]">
        {tabs.map((tab, index) => (
          <TabButton
            key={tab.key}
            active={activeTab === tab.key}
            isInView={isIntelligentProcessInView}
            delay={0.6 + index * 0.1}
            onClick={() => {
              setActiveTab(tab.key);
              setProductTitle(tab.title);
            }}
          >
            {tab.label}
          </TabButton>
        ))}
      </div>

      {/* 选项卡内容 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {permissionsLoaded &&
          products[activeTab as keyof typeof products]?.map(
            (product, index) => (
              <ProductCard
                key={index}
                {...product}
                isInView={isIntelligentProcessInView}
                delay={index * 0.2}
                hasPermission={hasPermission(product.permissionKey)}
              />
            )
          )}
      </div>
    </section>
  );
}
