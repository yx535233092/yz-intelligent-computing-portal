'use client';

import Header from './Header';
import Footer from './Footer';
import HeroSection from './HeroSection';
import { usePathname } from 'next/navigation';
import { Spin } from 'antd';
import { useState } from 'react';
import LoadingContext from '../../common/LoadingContext';
import ReduxProvider from '../../common/ReduxProvider';

function PageContent({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  type PageConfig = {
    isHideHeader: boolean;
    isHideHero: boolean;
    isHideFooter: boolean;
  };

  // 默认页面配置
  const defaultConfig: PageConfig = {
    isHideHeader: false,
    isHideHero: true,
    isHideFooter: true,
  };

  // 路由页面配置
  const pageConfig: Record<string, PageConfig> = {
    // 首页
    '/portal/home': {
      isHideHeader: false,
      isHideHero: true,
      isHideFooter: false,
    },
    '/portal/service/service-model': {
      isHideHeader: false,
      isHideHero: true,
      isHideFooter: false,
    },
    '/portal/service/service-data': {
      isHideHeader: false,
      isHideHero: true,
      isHideFooter: false,
    },
    '/portal/service/service-app': {
      isHideHeader: false,
      isHideHero: true,
      isHideFooter: false,
    },
    '/portal/service/service-ts': {
      isHideHeader: false,
      isHideHero: true,
      isHideFooter: false,
    },
    '/portal/service/service-data/data-process/data-process-media': {
      isHideHeader: true,
      isHideHero: true,
      isHideFooter: true,
    },
    // 联系我们
    '/portal/contact-us': {
      isHideHeader: false,
      isHideHero: false,
      isHideFooter: true,
    },
    // 行业案例
    '/portal/case': {
      isHideHeader: false,
      isHideHero: false,
      isHideFooter: false,
    },
  };

  // 获取当前路由页面配置
  const pathname = usePathname();
  const config = pageConfig[pathname] || defaultConfig;

  return (
    <>
      <Spin
        spinning={isLoading}
        tip="加载中，请稍后..."
        size="large"
        fullscreen
      ></Spin>
      {!config.isHideHeader && <Header></Header>}
      {!config.isHideHero && <HeroSection></HeroSection>}
      {children}
      {!config.isHideFooter && <Footer></Footer>}
    </>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 加载状态和切换函数
  const [isLoading, setIsLoading] = useState(false);
  const toggleLoading = (value: boolean) => {
    setIsLoading(value);
  };
  const contextValue = {
    isLoading,
    toggleLoading,
  };

  return (
    <ReduxProvider>
      <LoadingContext.Provider value={contextValue}>
        <PageContent isLoading={isLoading}>{children}</PageContent>
      </LoadingContext.Provider>
    </ReduxProvider>
  );
}
