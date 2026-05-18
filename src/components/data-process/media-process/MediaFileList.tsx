'use client';

import {
  PlusCircleOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { useEffect, useState, useRef } from 'react';
import { Empty, Tooltip, Dropdown, Modal, message, Button } from 'antd';
import type { MenuProps } from 'antd';
import { getMediaTaskList, deleteMediaTaskAPI } from '@/apis/data-process/media';
import type { MediaFileListProps, MediaTask } from '@/types/data-process';

function MediaFileList({
  handleCreateMediaTask,
  onMediaTaskSelect,
  mediaTaskListRefresh,
  type,
}: MediaFileListProps) {
  const [taskList, setTaskList] = useState<MediaTask[]>([]);
  const [activeMediaTask, setActiveMediaTask] = useState<MediaTask | null>(
    null
  );
  
  // 任务列表ref
  const taskListRef = useRef<HTMLDivElement>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [modal, modalContextHolder] = Modal.useModal();

  // ... (getTaskList, useEffects, handleDeleteTask, getMenuItems 保持不变)
  const getTaskList = async () => {
    try {
      const mediaTaskList = await getMediaTaskList(type);
      setTaskList(mediaTaskList);
      // 切换类型或初始化时不默认选中第一个
      setActiveMediaTask(null);
      onMediaTaskSelect(null);
    } catch (error) {
      console.error("Failed to fetch task list", error);
    }
  };

  useEffect(() => {
    // 获取媒体任务列表，立即执行
    getTaskList();
  }, [mediaTaskListRefresh, type]);

  // 轮询更新列表状态 (每3秒)
  useEffect(() => {
    const getTaskListInterval = setInterval(async () => {
       const list = await getMediaTaskList(type);
       setTaskList(list);
    }, 3000);

    return () => clearInterval(getTaskListInterval);
  }, [type]);

  // 处理删除任务
  const handleDeleteTask = (task: MediaTask) => {
    modal.confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除任务 "${task.name}" 吗？此操作不可恢复。`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        try {
          await deleteMediaTaskAPI(task.identifier);
          messageApi.success('删除成功');
          // 刷新列表
          getTaskList();
          // 如果删除了当前选中的任务，清空选中状态
          if (activeMediaTask?.identifier === task.identifier) {
            setActiveMediaTask(null);
            onMediaTaskSelect(null);
          }
        } catch (error) {
          messageApi.error('删除失败');
        }
      },
    });
  };

  // 生成右键菜单项
  const getMenuItems = (task: MediaTask): MenuProps['items'] => [
    {
      label: '删除任务',
      key: 'delete',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDeleteTask(task),
    },
  ];

  return (
    <div className="bg-white h-full overflow-hidden rounded-xl flex flex-col w-[280px] min-w-[280px] border-r border-gray-100 transition-all duration-300 shadow-sm">
      {contextHolder}
      {modalContextHolder}
      {/* ----标题 */}
      <div className="h-[60px] flex items-center text-gray-800 text-lg px-4 font-bold justify-between border-b border-gray-50 bg-gray-50/50">
        <div className="flex items-center gap-2">
            <span>列表 ({taskList.length})</span>
        </div>
        <div className="flex gap-2">
            <Tooltip title="新建任务">
              <Button 
                type="text" 
                icon={<PlusCircleOutlined className="text-gray-500" />} 
                onClick={() => handleCreateMediaTask()} 
                size="small"
              />
            </Tooltip>
        </div>
      </div>
      {/* ----列表 */}
      <div className="flex-1 p-2 flex flex-col gap-1 overflow-y-auto">
        {taskList.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <Empty description="暂无任务" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-1" ref={taskListRef}>
            {taskList.map((mediaTask) => (
              <Dropdown 
                key={mediaTask.identifier} 
                menu={{ items: getMenuItems(mediaTask) }} 
                trigger={['contextMenu']}
              >
                <div
                  className={`flex justify-between gap-2 items-center text-sm px-3 py-2.5 rounded-lg min-w-0 cursor-pointer transition-all duration-200 border border-transparent ${
                    activeMediaTask?.identifier === mediaTask.identifier
                      ? 'bg-blue-50 text-blue-600 border-blue-100 font-medium'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setActiveMediaTask(mediaTask);
                    onMediaTaskSelect(mediaTask);
                  }}
                >
                  <span className="truncate flex-1">{mediaTask.name}</span>
                  <span className="text-xs">
                    {mediaTask.status === 'processing' ? (
                      <LoadingOutlined className="text-blue-500" />
                    ) : mediaTask.status === 'failed' ? (
                      <CloseCircleOutlined className="text-red-500" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-green-400 block"></span>
                    )}
                  </span>
                </div>
              </Dropdown>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaFileList;
