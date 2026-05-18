'use client';

import Header from './Header';
import Footer from './Footer';
import HeroSection from './HeroSection';
import { usePathname } from 'next/navigation';
import { Spin } from 'antd';
import { useState, useEffect } from 'react';
import LoadingContext from '../../common/LoadingContext';
import ReduxProvider from '../../common/ReduxProvider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { getUserInfoAPI } from '@/apis/login';
import { setUserInfo } from '@/lib/store/features/userInfoSlice';
import { getUserPermissionsAPI } from '@/apis/applications';
import { setUserPermissions } from '@/lib/store/features/userPermission';

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
    '/portal/service/service-app/civil-aviation-assistant': {
      isHideHeader: true,
      isHideHero: true,
      isHideFooter: true,
    },
    '/portal/service/service-app/ocr-recognize': {
      isHideHeader: true,
      isHideHero: true,
      isHideFooter: true,
    },
    '/portal/service/service-app/text-translate': {
      isHideHeader: true,
      isHideHero: true,
      isHideFooter: true,
    },
    '/portal/service/service-app/hj-platform': {
      isHideHeader: true,
      isHideHero: true,
      isHideFooter: true,
    },
    '/portal/service/service-app/app-detail': {
      isHideHeader: true,
      isHideHero: true,
      isHideFooter: true,
    },
    '/portal/service/service-data/data-process/data-process-media': {
      isHideHeader: true,
      isHideHero: true,
      isHideFooter: true,
    },
    '/portal/service/service-data/data-process/data-process-doc': {
      isHideHeader: true,
      isHideHero: true,
      isHideFooter: true,
    },
    '/portal/service/service-data/data-process/data-process-excel': {
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

  // 自动登录 (Mock Mode 支持)
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userInfo.value.userInfo);

  useEffect(() => {
    // 如果没有用户信息，尝试获取（在放开模式下会返回 Mock 数据）
    if (!userInfo) {
      const initUser = async () => {
        try {
          const user = await getUserInfoAPI();
          dispatch(setUserInfo(user));
          
          const perms = await getUserPermissionsAPI();
          dispatch(setUserPermissions(perms.data.permissions));
        } catch (e) {
          console.error("Auto login failed", e);
        }
      };
      initUser();
    }
  }, [dispatch, userInfo]);


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
