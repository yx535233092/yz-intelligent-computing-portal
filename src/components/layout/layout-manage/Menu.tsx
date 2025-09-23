import React from 'react';
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

// 菜单列表
const items: MenuItem[] = [
  { key: '1', icon: <AppstoreOutlined />, label: '门户页面' },
  { key: '2', icon: <AppstoreOutlined />, label: '仪表台' },
  { key: '3', icon: <UserOutlined />, label: '个人信息' },
  { key: '4', icon: <UserOutlined />, label: '主题配置' },
  // { key: '2', icon: <DesktopOutlined />, label: 'Option 2' },
  // { key: '3', icon: <ContainerOutlined />, label: 'Option 3' },
  // {
  //   key: 'sub1',
  //   label: 'Navigation One',
  //   icon: <MailOutlined />,
  //   children: [
  //     { key: '5', label: 'Option 5' },
  //     { key: '6', label: 'Option 6' },
  //     { key: '7', label: 'Option 7' },
  //     { key: '8', label: 'Option 8' },
  //   ],
  // },
  // {
  //   key: 'sub2',
  //   label: 'Navigation Two',
  //   icon: <AppstoreOutlined />,
  //   children: [
  //     { key: '9', label: 'Option 9' },
  //     { key: '10', label: 'Option 10' },
  //     {
  //       key: 'sub3',
  //       label: 'Submenu',
  //       children: [
  //         { key: '11', label: 'Option 11' },
  //         { key: '12', label: 'Option 12' },
  //       ],
  //     },
  //   ],
  // },
];

const ManageMenu = function ({ isCollapsed }: { isCollapsed: boolean }) {
  const router = useRouter();

  const handleMenuClick = (e: { key: string }) => {
    if (e.key === '1') {
      router.push('/');
    } else if (e.key === '2') {
      router.push('/manage/dashborad');
    } else if (e.key === '3') {
      router.push('/manage/profile');
    } else if (e.key === '4') {
      router.push('/manage/theme-config');
    }
  };

  return (
    <div>
      <Menu
        defaultSelectedKeys={['2']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={isCollapsed}
        items={items}
        onClick={handleMenuClick}
      />
    </div>
  );
};

export default ManageMenu;
