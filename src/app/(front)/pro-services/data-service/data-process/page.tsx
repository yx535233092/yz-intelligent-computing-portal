'use client';

import Logo from '@/components/common/Logo';
import {
  RollbackOutlined,
  PlusCircleOutlined,
  MenuFoldOutlined,
  DownloadOutlined,
  FullscreenOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { Button, Tabs, Tooltip } from 'antd';
import type { TabsProps } from 'antd';
import FilePreview from '@/components/common/FilePreview';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Empty } from 'antd';

export default function DataProcess() {
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeFile, setActiveFile] = useState<FileItem | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeResult, setAnalyzeResult] = useState<string>('');

  const router = useRouter();

  interface FileItem {
    name: string;
    url: string;
    size: number;
    lastModified: string;
    type: string;
  }
  const [fileList, setFileList] = useState<FileItem[]>([]);

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

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '原始文件',
      children: <FilePreview file={activeFile?.url || ''} />,
    },
    {
      key: '2',
      label: '解析结果',
      children: <FilePreview file={activeFile?.url || ''} />,
    },
    {
      key: '3',
      label: 'Markdown（去除标签）',
      children: <FilePreview file={activeFile?.url || ''} />,
    },
  ];

  type Item = {
    key: number;
    label: string;
  };
  // 切换选中的解析文件类型
  const changeActiveItem = (item: Item) => {
    if (activeMenu === item.key) {
      return;
    }
    setActiveMenu(item.key);
    fetch(`/api/getFileListByLabel?label=${item.label}`)
      .then((res) => res.json())
      .then((data) => {
        setActiveFile(null);
        setFileList(data.files || []);
      });
  };

  const initFileList = () => {
    fetch(`/api/getFileListByLabel?label=${menus[0].label}`)
      .then((res) => res.json())
      .then((data) => {
        setFileList(data.files || []);
      });
  };

  useEffect(() => {
    initFileList();
  }, []);

  return (
    <div>
      <div className="w-full h-screen  flex">
        {/* 左栏 */}
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
        {/* 右栏 */}
        <div className="flex-1  flex flex-col">
          {/* 标题 */}
          <div className="min-h-[80px] flex items-center text-2xl px-8 font-bold transition-all duration-300">
            {menus.find((item) => item.key === activeMenu)?.label}
          </div>
          {/* 内容 */}
          <div className="flex-1 border-1 border-gray-200 bg-gray-50 p-8 pb-4 flex gap-8 rounded-xl">
            {/* 文件列表 */}
            <div className="bg-white h-full w-1/4 rounded-xl flex flex-col">
              {/* 文件列表-头 */}
              <div className="h-[80px]  flex items-center text-black text-xl p-6 font-bold justify-between">
                <span>所有文件</span>
                <div className="flex gap-4">
                  <PlusCircleOutlined
                    style={{
                      color: '#888',
                      fontSize: '24px',
                    }}
                  />
                  <MenuFoldOutlined
                    style={{
                      color: '#888',
                      fontSize: '24px',
                    }}
                  />
                </div>
              </div>
              {/* 文件列表-身体 */}
              <div className="flex-1  p-4 flex flex-col gap-2">
                {fileList.length > 0 ? (
                  fileList.map((item) => {
                    return (
                      <div
                        className={`flex items-center text-black h-[50px] text-lg px-4 rounded-xl min-w-0 cursor-pointer transition-all duration-300 ${
                          activeFile?.name === item.name
                            ? 'bg-red-100'
                            : 'bg-white'
                        } ${activeFile?.name === item.name ? 'text-brand' : 'text-black'}`}
                        key={item.name}
                        onClick={() => setActiveFile(item)}
                      >
                        {item.name.length > 10 ? (
                          <Tooltip title={item.name}>
                            <span className="truncate">{item.name}</span>
                          </Tooltip>
                        ) : (
                          <span>{item.name}</span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <Empty description="暂无文件" />
                  </div>
                )}
              </div>
            </div>
            {/* 预览区域 */}
            <div className=" flex flex-col bg-white h-full flex-1 rounded-xl">
              <div className="flex items-center px-6 h-[100px] justify-between">
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold mb-2">文件预览</h1>
                  <div className="flex gap-4">
                    <span>
                      文件大小：
                      {activeFile?.size
                        ? (activeFile.size / 1024 / 1024).toFixed(2)
                        : ' - '}
                      MB
                    </span>
                    <span>创建时间：{activeFile?.lastModified || ' - '}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button
                    style={{
                      backgroundColor: '#888',
                      borderColor: '#888',
                    }}
                    type="primary"
                    icon={<DownloadOutlined />}
                    size="large"
                    onClick={() => {
                      console.log('下载文件');
                    }}
                  >
                    下载文件
                  </Button>
                  <Button
                    type="primary"
                    icon={<PlayCircleOutlined />}
                    size="large"
                    loading={isAnalyzing}
                    onClick={() => {
                      setIsAnalyzing(true);
                      setTimeout(() => {
                        setIsAnalyzing(false);
                        setAnalyzeResult('结果');
                      }, 2000);
                    }}
                  >
                    解析文件
                  </Button>
                </div>
              </div>
              <div className="flex-1 px-6 pb-4">
                {activeFile ? (
                  <Tabs
                    defaultActiveKey="1"
                    items={analyzeResult ? items : items.slice(0, 1)}
                  />
                ) : (
                  <div className="flex-1 flex items-center justify-center h-[770px]">
                    <Empty
                      image="/empty.svg"
                      styles={{ image: { height: 200 } }}
                      description="请选择文件"
                    ></Empty>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style global jsx>{`
        header {
          display: none;
        }
        footer {
          display: none;
        }
      `}</style>
    </div>
  );
}
