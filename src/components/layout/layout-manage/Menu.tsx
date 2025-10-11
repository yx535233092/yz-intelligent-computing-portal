import React from 'react';
import {
  AppstoreOutlined,
  UserOutlined,
  SafetyOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

// 菜单列表
const items: MenuItem[] = [
  { key: '1', icon: <AppstoreOutlined />, label: '门户页面' },
  { key: '2', icon: <AppstoreOutlined />, label: '仪表台' },
  // { key: '3', icon: <UserOutlined />, label: '个人信息' },
  // { key: '4', icon: <UserOutlined />, label: '主题配置' },
  { key: '7', icon: <UserOutlined />, label: '用户管理' },
  { key: '6', icon: <TeamOutlined />, label: '角色管理' },
  { key: '5', icon: <SafetyOutlined />, label: '权限管理' },
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
    } else if (e.key === '5') {
      router.push('/manage/permission');
    } else if (e.key === '6') {
      router.push('/manage/role');
    } else if (e.key === '7') {
      router.push('/manage/users');
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
