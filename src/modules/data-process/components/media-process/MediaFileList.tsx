'use client';

import {
  PlusCircleOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Empty, Tooltip } from 'antd';
import { getMediaTaskList } from '../../services/media';

function MediaFileList({
  handleCreateMediaTask,
  onMediaTaskSelect,
}: MediaFileListProps) {
  const [taskList, setTaskList] = useState<MediaTask[]>([]);
  const [activeMediaTask, setActiveMediaTask] = useState<MediaTask | null>(
    null
  );

  useEffect(() => {
    // 获取媒体任务列表，立即执行
    (async function getTaskList() {
      const { tasks: mediaTaskList } = await getMediaTaskList();
      // 为每个媒体任务添加name
      for (const mediaTask of mediaTaskList) {
        mediaTask['name'] = mediaTask.file_name + mediaTask.identifier;
      }
      setTaskList(mediaTaskList);
    })();
  }, []);

  return (
    <div className="bg-white h-full overflow-y-auto w-1/4 rounded-xl flex flex-col  w-1/4">
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
                <span className="truncate">{mediaTask.name}</span>
                <span className="text-sm text-gray-500">
                  {mediaTask.status === 'processing' ? (
                    <LoadingOutlined
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
