'use client';

import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { authService } from '@/modules/login/services/login';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const items: MenuProps['items'] = [
  {
    label: (
      <a
        onClick={(e) => {
          e.preventDefault();
          location.href = location.origin + '/manage/profile';
        }}
      >
        个人中心
      </a>
    ),
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: (
      <a
        onClick={(e) => {
          e.preventDefault();
          location.href = location.origin + '/manage';
        }}
      >
        系统设置
      </a>
    ),
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: (
      <a
        onClick={(e) => {
          e.preventDefault();
          authService.logout();
        }}
      >
        退出登录
      </a>
    ),
    key: '2',
  },
];

interface UserInfoDropdownProps {
  style?: React.CSSProperties;
}

const UserInfoDropdown: React.FC<UserInfoDropdownProps> = ({ style }) => {
  const userInfo = useSelector(
    (state: RootState) => state.userInfo.value.userInfo
  );

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Space style={{ cursor: 'pointer', ...style }}>
        <UserOutlined
          style={{
            color: '#888',
            fontSize: '18px',
          }}
        />
        {(userInfo as UserInfoData)?.username}
      </Space>
    </Dropdown>
  );
};

export default UserInfoDropdown;
