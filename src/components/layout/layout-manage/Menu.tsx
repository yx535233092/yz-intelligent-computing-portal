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
  { key: '2', icon: <AppstoreOutlined />, label: '驾驶舱' },
  { key: '9', icon: <SafetyOutlined />, label: '系统监控' },
  { key: '8', icon: <AppstoreOutlined />, label: '应用管理' },
  { key: '7', icon: <UserOutlined />, label: '用户管理' },
  { key: '6', icon: <TeamOutlined />, label: '角色管理' },
  { key: '5', icon: <SafetyOutlined />, label: '权限管理' },
];

const ManageMenu = function ({ isCollapsed }: { isCollapsed: boolean }) {
  const router = useRouter();

  const handleMenuClick = (e: { key: string }) => {
    if (e.key === '2') {
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
    } else if (e.key === '8') {
      router.push('/manage/application');
    } else if (e.key === '9') {
      router.push('/manage/monitoring');
    }
  };

  return (
    <div className="bg-[#001529]">
      <Menu
        defaultSelectedKeys={['2']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={isCollapsed}
        items={items}
        onClick={handleMenuClick}
        style={{ borderRight: 0 }}
      />
    </div>
  );
};

export default ManageMenu;
