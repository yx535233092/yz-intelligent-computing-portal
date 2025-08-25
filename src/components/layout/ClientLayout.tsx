'use client';

import Header from './Header';
import Footer from './Footer';
import HeroSection from './HeroSection';
import { usePathname } from 'next/navigation';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
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
    isHideFooter: false,
  };

  // 路由页面配置
  const pageConfig: Record<string, PageConfig> = {
    '/login': {
      isHideHeader: true,
      isHideHero: true,
      isHideFooter: true,
    },
    '/contact-us': {
      isHideHeader: false,
      isHideHero: false,
      isHideFooter: false,
    },
    '/industry-cases': {
      isHideHeader: false,
      isHideHero: false,
      isHideFooter: false,
    },
    '/document-process': {
      isHideHeader: false,
      isHideHero: true,
      isHideFooter: true,
    },
    '/excel-process': {
      isHideHeader: false,
      isHideHero: true,
      isHideFooter: true,
    },
    '/hj-platform': {
      isHideHeader: false,
      isHideHero: true,
      isHideFooter: true,
    },
    '/ocr-recognize': {
      isHideHeader: false,
      isHideHero: true,
      isHideFooter: true,
    },
    '/text-translate': {
      isHideHeader: false,
      isHideHero: true,
      isHideFooter: true,
    },
    '/pro-services/app-service/app-detail': {
      isHideHeader: false,
      isHideHero: true,
      isHideFooter: true,
    },
  };

  // 获取当前路由页面配置
  const pathname = usePathname();
  const config = pageConfig[pathname] || defaultConfig;

  return (
    <>
      {!config.isHideHeader && <Header></Header>}
      {!config.isHideHero && <HeroSection></HeroSection>}
      {children}
      {!config.isHideFooter && <Footer></Footer>}
    </>
  );
}
