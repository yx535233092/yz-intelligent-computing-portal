'use client';

import Logo from '@/components/common/Logo';
import { RollbackOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Siderbar({
  menus,
  onMenuChange,
}: {
  menus: {
    label: string;
    key: number;
  }[];
  onMenuChange: (menu: number) => void;
}) {
  const [activeMenu, setActiveMenu] = useState(0);

  const router = useRouter();

  // 切换选中的解析文件类型
  const changeActiveItem = (item: Item) => {
    if (activeMenu === item.key) {
      return;
    }
    setActiveMenu(item.key);
    onMenuChange(item.key);
  };

  return (
    <div className="w-[320px]  flex flex-col">
      {/* 标题 */}
      <div className="h-[80px] flex items-center justify-between px-6">
        <div className="flex gap-2 items-center">
          <Logo></Logo>
          <h1 className="text-2xl font-bold ">数据处理服务</h1>
        </div>
        {/* 返回上页 */}
        <RollbackOutlined
          onClick={() => {
            router.back();
          }}
          className="ml-6 text-xl font-bold"
          style={{
            color: '#888',
          }}
        />
      </div>
      <div className="flex-1 p-6 flex flex-col gap-2">
        {menus.map((item) => {
          return (
            <div
              className={`w-full h-[50px] rounded-xl flex items-center px-6 text-lg transition-all duration-300 cursor-pointer ${
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
    </div>
  );
}

export default Siderbar;
