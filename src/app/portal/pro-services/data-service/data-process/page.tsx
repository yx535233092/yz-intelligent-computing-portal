'use client';

import { useState } from 'react';
import Siderbar from '@/modules/data-process/components/Siderbar';
import FileList from '@/modules/data-process/components/FileList';
import Preview from '@/modules/data-process/components/Preview';
import Header from '@/modules/data-process/components/Header';
import MediaFileList from '@/modules/data-process/components/media-process/MediaFileList';
import MediaPreview from '@/modules/data-process/components/media-process/MediaPreview';
import CreateMediaTask from '@/modules/data-process/components/media-process/CreateMediaTask';

export default function DataProcess() {
  const [activeMenu, setActiveMenu] = useState(8);
  const [activeFile, setActiveFile] = useState<FileItem | null>(null);
  const [selectedMediaTask, setSelectedMediaTask] = useState<MediaTask | null>(
    null
  );

  // 新建任务弹窗状态
  const [createMediaTaskOpenState, setCreateMediaTaskOpenState] =
    useState(false);

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
    //   label: '古籍解析',
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
  ];

  // 切换菜单
  const changeActiveMenu = (menu: number) => {
    setActiveMenu(menu);
  };

  // 切换文件
  const changeActiveFile = (file: FileItem) => {
    setActiveFile(file);
  };

  // 新建任务
  const createMediaTask = () => {
    setCreateMediaTaskOpenState(true);
    setSelectedMediaTask(null);
  };

  // 选择任务
  const handleMediaTaskSelect = (mediaTask: MediaTask | null) => {
    setCreateMediaTaskOpenState(false);
    setSelectedMediaTask(mediaTask);
  };

  return (
    <div className="h-screen">
      {/* 标题栏 */}
      <Header menus={menus} activeMenu={activeMenu}></Header>
      {/* 内容块 */}
      <div className="w-full h-[calc(100vh-80px)]  flex">
        {/* 左侧边栏 */}
        <Siderbar menus={menus} onMenuChange={changeActiveMenu}></Siderbar>
        {/* 右栏 */}
        <div className="flex-1  flex flex-col h-full">
          {/* 内容 */}
          <div className="h-full flex-1 border-1 border-gray-200 bg-gray-100 px-8 py-4 flex gap-8 rounded-xl">
            {menus.find((item) => item.key === activeMenu)?.type ===
            'document' ? (
              // 文档解析
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
            ) : (
              // 媒体解析
              <>
                {menus.find((item) => item.key === activeMenu)?.type ===
                  'audio' && (
                  <div className="flex gap-8 w-full">
                    {/* 任务列表 */}
                    <MediaFileList
                      handleCreateMediaTask={createMediaTask}
                      onMediaTaskSelect={handleMediaTaskSelect}
                    ></MediaFileList>
                    {/* 任务详情和新建任务 */}
                    {createMediaTaskOpenState === true ? (
                      <CreateMediaTask></CreateMediaTask>
                    ) : (
                      <MediaPreview
                        selectedMediaTask={selectedMediaTask}
                      ></MediaPreview>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
