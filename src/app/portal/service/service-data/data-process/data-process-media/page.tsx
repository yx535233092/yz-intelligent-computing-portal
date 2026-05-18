'use client';

import { useEffect, useState } from 'react';
import Siderbar from '@/components/data-process/Siderbar';
import FileList from '@/components/data-process/FileList';
import Preview from '@/components/data-process/Preview';
import Header from '@/components/data-process/Header';
import MediaProcess from '@/components/data-process/media-process/MediaProcess';
import ExcelProcess from '@/components/data-process/excel-process/ExcelProcess';
import DocProcess from '@/components/data-process/doc-process/DocProcess';
import { useSearchParams } from 'next/navigation';
import { AudioOutlined, VideoCameraOutlined, FileExcelOutlined, FileTextOutlined } from '@ant-design/icons';
import type { FileItem } from '@/types/data-process';

// 菜单列表
const menus = [
  {
    label: '文档解析',
    type: 'doc',
    key: 11,
    icon: <FileTextOutlined />,
  },
  {
    label: '表格解析',
    type: 'excel',
    key: 10,
    icon: <FileExcelOutlined />,
  },
  {
    label: '音频解析',
    type: 'audio',
    key: 8,
    icon: <AudioOutlined />,
  },
  {
    label: '视频解析',
    type: 'video',
    key: 9,
    icon: <VideoCameraOutlined />,
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
    case 'excel':
      return <ExcelProcess />;
    case 'doc':
      return <DocProcess />;
  }
}

// 数据处理页面
export default function DataProcess() {
  const searchParams = useSearchParams();
  const [activeMenu, setActiveMenu] = useState(11);
  const [activeFile, setActiveFile] = useState<FileItem | null>(null);

  // 根据搜索参数设置默认菜单
  const type = searchParams.get('type');
  useEffect(() => {
    if (type === 'audio') {
      setActiveMenu(8);
    } else if (type === 'video') {
      setActiveMenu(9);
    } else if (type === 'excel' || type === 'table') {
      setActiveMenu(10);
    } else if (type === 'doc' || type === 'text' || type === 'image') {
      setActiveMenu(11);
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
