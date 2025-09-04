'use client';

import {
  PlusCircleOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { useEffect, useState, useRef } from 'react';
import { Empty, Tooltip } from 'antd';
import { getMediaTaskList } from '../../services/media';
import ContextMenu from './ContextMenu';

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

  const getTaskList = async () => {
    const mediaTaskList = await getMediaTaskList(type);
    setTaskList(mediaTaskList);
    if (mediaTaskList.length > 0) {
      setActiveMediaTask(mediaTaskList[0]);
      onMediaTaskSelect(mediaTaskList[0]);
    }
  };
  useEffect(() => {
    console.log(activeMediaTask);
  }, [activeMediaTask]);

  useEffect(() => {
    // 获取媒体任务列表，立即执行
    getTaskList();
  }, [mediaTaskListRefresh, type]);

  useEffect(() => {
    // 存储事件监听器引用以便清除
    const eventListeners = new Map<
      Node,
      { contextmenu: EventListener; click: EventListener }
    >();

    // 每隔1s获取一次媒体任务列表
    const getTaskListInterval = setInterval(async () => {
      // 获取任务列表
      const taskList = await getMediaTaskList(type);
      setTaskList(taskList);

      // 清除之前的事件监听器
      eventListeners.forEach((listeners, task) => {
        task.removeEventListener('contextmenu', listeners.contextmenu);
        document.body.removeEventListener('click', listeners.click);
      });
      eventListeners.clear();

      // 右键菜单
      const taskListNodes = taskListRef.current?.childNodes;
      for (const task of taskListNodes || []) {
        const contextMenu = document.querySelector(
          '.context-menu'
        ) as HTMLDivElement;

        // 创建事件监听器函数
        const contextmenuListener = (e: Event) => {
          e.preventDefault();
          if (contextMenu) {
            const id = (task as HTMLElement).dataset.id;
            contextMenu.dataset.id = id;
            contextMenu.style.display = 'none';
            contextMenu.style.position = 'absolute';
            contextMenu.style.left = (e as MouseEvent).clientX + 'px';
            contextMenu.style.top = (e as MouseEvent).clientY + 'px';
            contextMenu.style.display = 'block';
          }
        };

        // 点击页面其他地方关闭右键菜单
        const clickListener = () => {
          if (contextMenu) {
            contextMenu.style.display = 'none';
          }
        };

        // 添加事件监听器
        task.addEventListener('contextmenu', contextmenuListener);
        document.body.addEventListener('click', clickListener);

        // 存储监听器引用
        eventListeners.set(task, {
          contextmenu: contextmenuListener,
          click: clickListener,
        });
      }
    }, 1000);

    return () => {
      // 组件销毁时清除定时器和所有事件监听器
      clearInterval(getTaskListInterval);

      // 清除所有事件监听器
      eventListeners.forEach((listeners, task) => {
        task.removeEventListener('contextmenu', listeners.contextmenu);
        document.body.removeEventListener('click', listeners.click);
      });
      eventListeners.clear();
    };
  }, [type]);

  return (
    <div className="bg-white h-full overflow-y-auto rounded-xl flex flex-col  w-[400px] min-w-[400px]">
      {/* ----标题 */}
      <div className="h-[80px]  flex items-center text-black text-xl p-6 font-bold justify-between">
        <>
          <span>任务列表 ({taskList.length})</span>
          <div className="flex gap-4">
            <Tooltip
              title="新建任务"
              className="hover:scale-110 transition-all duration-300"
            >
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
          <div className="flex-1 flex flex-col gap-2" ref={taskListRef}>
            {taskList.map((mediaTask) => (
              <div
                data-id={mediaTask.identifier}
                className={`flex justify-between gap-4 items-center text-black h-[50px] text-lg px-4 rounded-xl min-w-0 cursor-pointer transition-all duration-300 ${
                  activeMediaTask?.identifier === mediaTask.identifier
                    ? 'bg-red-100'
                    : 'bg-white'
                } ${activeMediaTask?.identifier === mediaTask.identifier ? 'text-brand' : 'text-black'}`}
                key={mediaTask.identifier}
                onClick={() => {
                  setActiveMediaTask(mediaTask);
                  onMediaTaskSelect(mediaTask);
                }}
              >
                {/* <Tooltip title={mediaTask.name} placement={'right'}> */}
                <span className="truncate">{mediaTask.name}</span>
                {/* </Tooltip> */}
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
      {/* 右键菜单 */}
      <ContextMenu></ContextMenu>
    </div>
  );
}

export default MediaFileList;
