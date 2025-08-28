'use client';

import {
  PlusCircleOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Empty, Tooltip } from 'antd';

function MediaFileList({}) {
  const [taskList, setTaskList] = useState<TaskItem[]>([]);
  const [activeTask, setActiveTask] = useState<TaskItem | null>(null);

  useEffect(() => {
    setTaskList([
      {
        id: '1',
        name: '任务1',
        status: 'processing',
        createdAt: '2021-01-01',
      },
      {
        id: '2',
        name: '任务2',
        status: 'completed',
        createdAt: '2021-01-02',
      },
    ]);
  }, []);

  return (
    <div className="bg-white h-full w-1/4 rounded-xl flex flex-col  w-1/4">
      {/* 标题 */}
      <div className="h-[80px]  flex items-center text-black text-xl p-6 font-bold justify-between">
        <>
          <span>任务列表</span>
          <div className="flex gap-4">
            <Tooltip title="新建任务">
              <PlusCircleOutlined
                style={{
                  color: '#888',
                  fontSize: '24px',
                  cursor: 'pointer',
                }}
              />
            </Tooltip>
          </div>
        </>
      </div>
      {/* 列表 */}
      <div className="flex-1  p-4 flex flex-col gap-2">
        {taskList.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <Empty description="暂无任务" />
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-2">
            {taskList.map((task) => (
              <div
                className={`flex justify-between items-center text-black h-[50px] text-lg px-4 rounded-xl min-w-0 cursor-pointer transition-all duration-300 ${
                  activeTask?.name === task.name ? 'bg-red-100' : 'bg-white'
                } ${activeTask?.name === task.name ? 'text-brand' : 'text-black'}`}
                key={task.name}
                onClick={() => setActiveTask(task)}
              >
                <span className="truncate">{task.name}</span>
                <span className="text-sm text-gray-500">
                  {task.status === 'processing' ? (
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
