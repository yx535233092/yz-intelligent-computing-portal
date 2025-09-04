'use client';

import {
  PlusCircleOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Empty, Tooltip } from 'antd';
import { getMediaTaskList } from '../../services/media';

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

  const getTaskList = async () => {
    const mediaTaskList = await getMediaTaskList(type);
    setTaskList(mediaTaskList);
    if (mediaTaskList.length > 0) {
      setActiveMediaTask(mediaTaskList[0]);
      onMediaTaskSelect(mediaTaskList[0]);
    }
  };

  useEffect(() => {
    // 获取媒体任务列表，立即执行
    getTaskList();
  }, [mediaTaskListRefresh, type]);

  useEffect(() => {
    // 每隔1s获取一次媒体任务列表
    const getTaskListInterval = setInterval(async () => {
      // 获取任务列表
      const taskList = await getMediaTaskList(type);
      setTaskList(taskList);
    }, 1000);
    return () => {
      // 组件销毁 清除定时器
      clearInterval(getTaskListInterval);
    };
  }, [type]);

  return (
    <div className="bg-white h-full overflow-y-auto rounded-xl flex flex-col  min-w-[320px] max-w-[400px]">
      {/* ----标题 */}
      <div className="h-[80px]  flex items-center text-black text-xl p-6 font-bold justify-between">
        <>
          <span>任务列表 ({taskList.length})</span>
          <div className="flex gap-4">
            <Tooltip title="新建任务">
              <PlusCircleOutlined
                style={{
                  color: '#888',
                  fontSize: '24px',
                  cursor: 'pointer',
                }}
                onClick={() => handleCreateMediaTask()}
              />
            </Tooltip>
          </div>
        </>
      </div>
      {/* ----列表 */}
      <div className="flex-1  p-4 flex flex-col gap-2 overflow-y-auto mb-4">
        {taskList.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <Empty description="暂无任务" />
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-2">
            {taskList.map((mediaTask) => (
              <div
                className={`flex justify-between gap-4 items-center text-black h-[50px] text-lg px-4 rounded-xl min-w-0 cursor-pointer transition-all duration-300 ${
                  activeMediaTask?.name === mediaTask.name
                    ? 'bg-red-100'
                    : 'bg-white'
                } ${activeMediaTask?.name === mediaTask.name ? 'text-brand' : 'text-black'}`}
                key={mediaTask.identifier}
                onClick={() => {
                  setActiveMediaTask(mediaTask);
                  onMediaTaskSelect(mediaTask);
                }}
              >
                <Tooltip title={mediaTask.name} placement={'right'}>
                  <span className="truncate">{mediaTask.name}</span>
                </Tooltip>
                <span className="text-sm text-gray-500">
                  {mediaTask.status === 'processing' ? (
                    <LoadingOutlined
                      style={{ color: '#d32d26', fontSize: '20px' }}
                    />
                  ) : mediaTask.status === 'failed' ? (
                    <CloseCircleOutlined
                      style={{ color: '#d32d26', fontSize: '20px' }}
                    />
                  ) : (
                    <CheckCircleOutlined
                      style={{ color: '#d32d26', fontSize: '20px' }}
                    />
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaFileList;
