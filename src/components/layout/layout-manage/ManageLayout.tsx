'use client';

import { ReactNode, useState } from 'react';
import SiderBar from './SiderBar';
import Header from './Header';
import Container from './Container';
import ReduxProvider from '../../common/ReduxProvider';
import { ConfigProvider, Drawer, Grid } from 'antd';

const { useBreakpoint } = Grid;

// 后台管理布局
function ManageLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false); // 是否折叠
  const [mobileOpen, setMobileOpen] = useState(false); // 移动端菜单是否打开
  const screens = useBreakpoint();
  const isMobile = !screens.md; // md = 768px

  // 统一的菜单切换逻辑
  const toggleMenu = (val?: boolean) => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setIsCollapsed(val ?? !isCollapsed);
    }
  };

  return (
    <ReduxProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#d32d26',
            borderRadius: 6,
          },
          components: {
            Menu: {
              darkItemSelectedBg: '#d32d26',
              darkItemBg: '#001529',
              darkSubMenuItemBg: '#000c17',
            },
          },
        }}
      >
        <div className="flex h-screen overflow-hidden">
          {/* 桌面端侧边栏 */}
          <SiderBar
            isCollapsed={isCollapsed}
            className="hidden md:flex"
          ></SiderBar>

          {/* 移动端侧边栏 (抽屉) */}
          <Drawer
            placement="left"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            width={256}
            styles={{ body: { padding: 0 }, wrapper: { boxShadow: 'none' } }}
            classNames={{ content: 'bg-[#001529]' }}
            closeIcon={null} // 隐藏默认关闭按钮，使用遮罩关闭
          >
            <SiderBar isCollapsed={false} className="w-full" />
          </Drawer>

          <main className="flex flex-col flex-1 bg-gray-50 overflow-hidden">
            <Header
              isCollapsed={isMobile ? !mobileOpen : isCollapsed}
              setIsCollapsed={toggleMenu}
            ></Header>
            <div className="p-6 flex-1 overflow-auto">
              <Container>{children}</Container>
            </div>
          </main>
        </div>
      </ConfigProvider>
    </ReduxProvider>
  );
}

export default ManageLayout;
