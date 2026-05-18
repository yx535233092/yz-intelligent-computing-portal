import Link from 'next/link';
import { useState } from 'react';
import { Drawer, Grid } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Logo from '@/components/common/Logo';
import Nav from '@/components/features/nav/Nav';
import UserInfoDropdown from '@/components/common/UserInfoDropdown';

const { useBreakpoint } = Grid;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.lg; // lg (992px) 以下视为移动端/平板端，使用汉堡菜单

  return (
    <header className="sticky top-0 w-full px-4 md:px-8 lg:px-16 flex items-center bg-white h-16 border-t-brand border-t-2 shadow-lg z-50">
      {/* 标题与图标 */}
      <div className="flex items-center flex-shrink-0">
        <Logo />
        <Link
          className="text-lg md:text-xl font-normal ml-2 md:ml-4 tracking-wide title whitespace-nowrap"
          href="/"
        >
          智算专业服务
        </Link>
      </div>

      {/* 桌面端导航 */}
      {!isMobile && (
        <div className="ml-auto flex items-center">
          <Nav />
          <UserInfoDropdown
            style={{
              marginLeft: '16px',
            }}
          />
        </div>
      )}

      {/* 移动端汉堡菜单 */}
      {isMobile && (
        <div className="ml-auto flex items-center">
          <UserInfoDropdown style={{ marginRight: '16px' }} />
          <MenuOutlined
            className="text-xl text-gray-600 cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
          />
          <Drawer
            title="导航菜单"
            placement="right"
            onClose={() => setMobileMenuOpen(false)}
            open={mobileMenuOpen}
            width={250}
            styles={{ body: { padding: 0 } }}
          >
            {/* 点击菜单项后关闭抽屉，这里通过传递 onClick 处理比较复杂，
                暂时依赖 Nav 内部的路由跳转导致页面刷新/组件重渲染来隐含关闭，
                或者用户手动关闭。更好的体验是 Nav 点击后回调关闭。
                由于 Nav 组件目前自管状态，我们可以暂时这样，或者修改 Nav 组件接受 onSelect。
                但 Next.js 跳转通常不会卸载 layout，所以抽屉可能保持打开。
                这里给外层加个 div 捕获点击是个简单 trick。
            */}
            <div onClick={() => setMobileMenuOpen(false)}>
              <Nav mode="inline" />
            </div>
          </Drawer>
        </div>
      )}
    </header>
  );
}
