'use client';

import { ReactNode } from 'react';
import SiderBar from './SiderBar';
import Header from './Header';
import Container from './Container';

// 后台管理布局
function ManageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <SiderBar></SiderBar>
      <main className="flex flex-col flex-1 bg-gray-100">
        <Header></Header>
        <div className="px-4 py-6">
          <Container></Container>
        </div>
      </main>
    </div>
  );
}

export default ManageLayout;
