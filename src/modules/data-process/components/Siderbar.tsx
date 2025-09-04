'use client';

import { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

function Siderbar({
  menus,
  activeMenu,
  onMenuChange,
}: {
  menus: {
    label: string;
    key: number;
  }[];
  activeMenu: number;
  onMenuChange: (menu: number) => void;
}) {
  // 是否折叠
  const [isClose, setIsClose] = useState(false);

  // 切换选中的解析文件类型
  const changeActiveItem = (item: Item) => {
    if (activeMenu === item.key) {
      return;
    }
    onMenuChange(item.key);
  };

  return (
    <div
      className={`flex flex-col ${isClose ? 'w-[80px]' : 'w-[320px]'} transition-all duration-300`}
    >
      {/* 菜单 */}
      <div className="flex-1 px-6 flex flex-col gap-4">
        {isClose ? (
          <div className="py-6 flex justify-center">
            <Tooltip title="展开">
              <MenuUnfoldOutlined
                style={{
                  color: '#888',
                  fontSize: '24px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setIsClose(false);
                }}
              />
            </Tooltip>
          </div>
        ) : (
          <div>
            <div className="text-lg font-bold py-6 border-b border-gray-200 flex justify-between overflow-hidden transition-all duration-300 whitespace-nowrap">
              <h1>数据类型</h1>
              <Tooltip title="折叠">
                <MenuFoldOutlined
                  style={{
                    color: '#888',
                    fontSize: '24px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setIsClose(true);
                  }}
                />
              </Tooltip>
            </div>
            {menus.map((item) => {
              return (
                <div
                  className={`whitespace-nowrap w-full h-[50px] rounded-xl flex items-center px-6 text-lg transition-all duration-300 cursor-pointer ${
                    activeMenu === item.key ? 'bg-red-700' : 'bg-white'
                  } ${activeMenu === item.key ? 'text-white' : 'text-black'}`}
                  key={item.key}
                  onClick={() => changeActiveItem(item)}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Siderbar;
