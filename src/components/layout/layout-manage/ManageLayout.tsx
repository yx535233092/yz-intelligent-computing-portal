'use client';

import { ReactNode, useState } from 'react';
import SiderBar from './SiderBar';
import Header from './Header';
import Container from './Container';

// 后台管理布局
function ManageLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false); // 是否折叠

  return (
    <div className="flex">
      <SiderBar isCollapsed={isCollapsed}></SiderBar>
      <main className="flex flex-col flex-1 bg-gray-100">
        <Header
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        ></Header>
        <div className="px-4 py-6 flex-1 h-full">
          <Container>{children}</Container>
        </div>
      </main>
    </div>
  );
}

export default ManageLayout;
