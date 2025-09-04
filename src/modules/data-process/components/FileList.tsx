'use client';

import {
  PlusCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Tooltip, Empty } from 'antd';
import { getFileListByLabel } from '../services/file';

function FileList({
  menus,
  activeMenu,
  onFileChange,
}: {
  menus: { label: string; key: number }[];
  activeMenu: number;
  onFileChange: (file: FileItem) => void;
}) {
  const [activeFile, setActiveFile] = useState<FileItem | null>(null);
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [isClose, setIsClose] = useState(false);

  // 根据选中文件类型获取文件列表
  useEffect(() => {
    getFileListByLabel(menus[activeMenu].label).then((files) => {
      setFileList(files || []);
    });
  }, [activeMenu, menus]);

  useEffect(() => {
    if (activeFile) {
      onFileChange(activeFile);
    }
  }, [activeFile]);

  return (
    <div
      className={`bg-white h-full w-1/4 rounded-xl flex flex-col  ${
        isClose ? 'w-[100px]' : 'w-1/4'
      }`}
    >
      {/* 文件列表-头 */}
      <div className="h-[80px]  flex items-center text-black text-xl p-6 font-bold justify-between">
        {!isClose && (
          <>
            <span>所有文件</span>
            <div className="flex gap-4">
              {/* <PlusCircleOutlined
            style={{
              color: '#888',
              fontSize: '24px',
            }}
          /> */}
              <MenuFoldOutlined
                style={{
                  color: '#888',
                  fontSize: '24px',
                  cursor: 'pointer',
                }}
                onClick={() => setIsClose(true)}
              />
            </div>
          </>
        )}
        {isClose && (
          <div className="flex justify-center w-full">
            <MenuUnfoldOutlined
              style={{
                color: '#888',
                fontSize: '24px',
                cursor: 'pointer',
              }}
              onClick={() => setIsClose(false)}
            />
          </div>
        )}
      </div>
      {/* 文件列表-身体 */}
      <div className="flex-1  p-4 flex flex-col gap-2">
        {fileList.length > 0 ? (
          fileList.map((item) => {
            return (
              <div
                className={`flex items-center text-black h-[50px] text-lg px-4 rounded-xl min-w-0 cursor-pointer transition-all duration-300 ${
                  activeFile?.name === item.name ? 'bg-red-100' : 'bg-white'
                } ${activeFile?.name === item.name ? 'text-brand' : 'text-black'}`}
                key={item.name}
                onClick={() => setActiveFile(item)}
              >
                <Tooltip title={item.name}>
                  <span className="truncate">{item.name}</span>
                </Tooltip>
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
  );
}

export default FileList;
