'use client';

import { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import type { Item } from '@/types/data-process';

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
  // 是否折叠，默认设置为 true (缩小)
  const [isClose, setIsClose] = useState(true);

  // 切换选中的解析文件类型
  const changeActiveItem = (item: any) => {
    if (activeMenu === item.key) {
      return;
    }
    onMenuChange(item.key);
  };

  return (
    <div
      className={`flex flex-col ${isClose ? 'w-[64px]' : 'w-[280px]'} transition-all duration-300 bg-white border-r border-gray-200 h-full`}
    >
      {/* 顶部控制栏 */}
      <div className={`h-[80px] flex items-center ${isClose ? 'justify-center' : 'justify-between px-4'} border-b border-gray-100`}>
        {!isClose && <h1 className="text-lg font-bold text-gray-800 whitespace-nowrap">数据类型</h1>}
        
        {isClose ? (
          <MenuUnfoldOutlined
            className="text-gray-500 text-xl cursor-pointer hover:text-brand transition-colors"
            onClick={() => setIsClose(false)}
          />
        ) : (
          <MenuFoldOutlined
            className="text-gray-500 text-xl cursor-pointer hover:text-brand transition-colors"
            onClick={() => setIsClose(true)}
          />
        )}
      </div>

      {/* 菜单列表 */}
      <div className="flex-1 py-4 flex flex-col gap-2 px-2">
        {menus.map((item: any) => {
          const isActive = activeMenu === item.key;
          return (
            <div
              key={item.key}
              className={`
                h-[50px] rounded-xl flex items-center cursor-pointer transition-all duration-300
                ${isActive ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-100'}
                ${isClose ? 'justify-center px-0' : 'px-4 gap-3'}
              `}
              onClick={() => changeActiveItem(item)}
            >
              <span className="text-xl">{item.icon}</span>
              {!isClose && <span className="text-base font-medium whitespace-nowrap overflow-hidden">{item.label}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Siderbar;
