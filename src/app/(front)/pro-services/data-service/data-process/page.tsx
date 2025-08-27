'use client';

import { useState } from 'react';
import Siderbar from '@/modules/data-process/components/Siderbar';
import FileList from '@/modules/data-process/components/FileList';
import Preview from '@/modules/data-process/components/Preview';

export default function DataProcess() {
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeFile, setActiveFile] = useState<FileItem | null>(null);

  // 菜单列表
  const menus = [
    {
      label: '常规文档解析',
      key: 0,
    },
    {
      label: '表格文档解析',
      key: 1,
    },
    {
      label: '公式类文档解析',
      key: 2,
    },
    {
      label: '媒体报刊类文档解析',
      key: 3,
    },
    {
      label: '论文解析',
      key: 4,
    },
    {
      label: '试卷解析',
      key: 5,
    },
    {
      label: '古籍解析',
      key: 6,
    },
    {
      label: '手写解析',
      key: 7,
    },
  ];

  // 切换菜单
  const changeActiveMenu = (menu: number) => {
    setActiveMenu(menu);
  };

  // 切换文件
  const changeActiveFile = (file: FileItem) => {
    setActiveFile(file);
  };

  return (
    <div>
      <div className="w-full h-screen  flex">
        {/* 左侧边栏 */}
        <Siderbar menus={menus} onMenuChange={changeActiveMenu}></Siderbar>
        {/* 右栏 */}
        <div className="flex-1  flex flex-col">
          {/* 标题 */}
          <div className="min-h-[80px] flex items-center text-2xl px-8 font-bold transition-all duration-300">
            {menus.find((item) => item.key === activeMenu)?.label}
          </div>
          {/* 内容 */}
          <div className="flex-1 border-1 border-gray-200 bg-gray-50 p-8 pb-4 flex gap-8 rounded-xl">
            {/* 文件列表 */}
            <FileList
              menus={menus}
              activeMenu={activeMenu}
              onFileChange={changeActiveFile}
            ></FileList>
            {/* 文件预览 */}
            <Preview activeFile={activeFile}></Preview>
          </div>
        </div>
      </div>
    </div>
  );
}
