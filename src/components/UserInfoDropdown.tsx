'use client';

import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { authService } from '@/modules/login/services/login';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const items: MenuProps['items'] = [
  {
    label: '个人中心',
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: <span onClick={() => authService.logout()}>退出登录</span>,
    key: '1',
  },
];

interface UserInfoDropdownProps {
  style?: React.CSSProperties;
}

const UserInfoDropdown: React.FC<UserInfoDropdownProps> = ({ style }) => {
  const userInfo = useSelector((state: RootState) => state.userInfo.value);

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
