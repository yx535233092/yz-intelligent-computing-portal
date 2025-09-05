'use client';

import { useEffect, useState } from 'react';
import Siderbar from '@/modules/data-process/components/Siderbar';
import FileList from '@/modules/data-process/components/FileList';
import Preview from '@/modules/data-process/components/Preview';
import Header from '@/modules/data-process/components/Header';
import MediaProcess from '@/modules/data-process/components/media-process/MediaProcess';
import { useSearchParams } from 'next/navigation';

// 菜单列表
const menus = [
  // {
  //   label: '常规文档解析',
  //   type: 'document',
  //   key: 0,
  // },
  // {
  //   label: '表格文档解析',
  //   type: 'document',
  //   key: 1,
  // },
  // {
  //   label: '公式类文档解析',
  //   type: 'document',
  //   key: 2,
  // },
  // {
  //   label: '媒体报刊类文档解析',
  //   type: 'document',
  //   key: 3,
  // },
  // {
  //   label: '论文解析',
  //   type: 'document',
  //   key: 4,
  // },
  // {
  //   label: '试卷解析',
  //   type: 'document',
  //   key: 5,
  // },
  // {
  //   label: '书籍解析',
  //   type: 'document',
  //   key: 6,
  // },
  // {
  //   label: '手写解析',
  //   type: 'document',
  //   key: 7,
  // },
  {
    label: '音频解析',
    type: 'audio',
    key: 8,
  },
  {
    label: '视频解析',
    type: 'video',
    key: 9,
  },
];

// 根据菜单key获取菜单详情
const getMenuTypeByMenuKey = (menuKey: number) => {
  return menus.find((menuItem: { key: number }) => menuItem.key === menuKey)
    ?.type;
};

// 内容组件
function ProcessContent({
  activeMenu,
  activeFile,
  changeActiveFile,
}: {
  activeMenu: number;
  activeFile: FileItem | null;
  changeActiveFile: (file: FileItem) => void;
}) {
  // 根据菜单key获取菜单详情
  switch (getMenuTypeByMenuKey(activeMenu)) {
    case 'document':
      return (
        <>
          {/* 文件列表 */}
          <FileList
            menus={menus}
            activeMenu={activeMenu}
            onFileChange={changeActiveFile}
          ></FileList>
          {/* 文件预览 */}
          <Preview activeFile={activeFile}></Preview>
        </>
      );
    case 'audio':
      return <MediaProcess type="audio"></MediaProcess>;
    case 'video':
      return <MediaProcess type="video"></MediaProcess>;
  }
}

// 数据处理页面
export default function DataProcess() {
  const searchParams = useSearchParams();
  const [activeMenu, setActiveMenu] = useState(8);
  const [activeFile, setActiveFile] = useState<FileItem | null>(null);

  // 根据搜索参数设置默认菜单
  const type = searchParams.get('type');
  useEffect(() => {
    if (type === 'audio') {
      setActiveMenu(8);
    } else if (type === 'video') {
      setActiveMenu(9);
    }
  }, [type]);

  // 切换文件
  const changeActiveFile = (file: FileItem) => {
    setActiveFile(file);
  };

  return (
    <div className="h-screen">
      {/* 标题栏 */}
      <Header menus={menus} activeMenu={activeMenu}></Header>
      {/* 内容块 */}
      <div className="w-full h-[calc(100vh-80px)] flex">
        {/* 左侧边栏 */}
        <Siderbar
          menus={menus}
          onMenuChange={setActiveMenu}
          activeMenu={activeMenu}
        ></Siderbar>
        {/* 右栏 */}
        <div className="flex-1  flex flex-col h-full">
          {/* 内容 */}
          <div className="h-full flex-1 border-1 border-gray-200 bg-gray-100 px-8 py-4 flex gap-8 rounded-xl">
            {
              <ProcessContent
                activeMenu={activeMenu}
                activeFile={activeFile || null}
                changeActiveFile={changeActiveFile}
              ></ProcessContent>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
