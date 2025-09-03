'use client';

import {
  PlusCircleOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Empty, Tooltip } from 'antd';
import { getMediaTaskList } from '../services/media';

function MediaFileList({
  handleCreateMediaTask,
  onTaskSelect,
}: {
  handleCreateMediaTask: () => void;
  onTaskSelect: (task: TaskItem | null) => void;
}) {
  const [taskList, setTaskList] = useState<TaskItem[]>([]);
  const [activeTask, setActiveTask] = useState<TaskItem | null>(null);

  useEffect(() => {
    setTaskList([
      {
        id: '1',
        name: '案例音频',
        status: 'completed',
        createdAt: '2025-09-01 10:30:00',
        type: 'audio',
        duration: 9,
        fileUrl: '/audio.wav',
        transcription: {
          text: '联想控股2014年营业收入为2895亿元。',
          language: '中文',
          speaker: 'SPEAKER_00',
          segments: [
            {
              word: '联',
              start: 0.402,
              end: 0.884,
              score: 0.876,
              speaker: 'SPEAKER_00',
            },
            {
              word: '想',
              start: 0.884,
              end: 0.904,
              score: 0.921,
              speaker: 'SPEAKER_00',
            },
            {
              word: '控',
              start: 0.904,
              end: 1.186,
              score: 0.996,
              speaker: 'SPEAKER_00',
            },
            {
              word: '股',
              start: 1.186,
              end: 2.009,
              score: 1,
              speaker: 'SPEAKER_00',
            },
            {
              word: '2',
              start: 2.009,
              end: 2.471,
              score: 0.991,
              speaker: 'SPEAKER_00',
            },
            {
              word: '0',
              start: 2.471,
              end: 2.873,
              score: 0.995,
              speaker: 'SPEAKER_00',
            },
            {
              word: '1',
              start: 2.873,
              end: 3.175,
              score: 1,
              speaker: 'SPEAKER_00',
            },
            {
              word: '4',
              start: 3.175,
              end: 3.355,
              score: 1,
              speaker: 'SPEAKER_00',
            },
            {
              word: '年',
              start: 3.355,
              end: 3.717,
              score: 0.999,
              speaker: 'SPEAKER_00',
            },
            {
              word: '营',
              start: 3.717,
              end: 3.938,
              score: 0.997,
              speaker: 'SPEAKER_00',
            },
            {
              word: '业',
              start: 3.938,
              end: 4.179,
              score: 1,
              speaker: 'SPEAKER_00',
            },
            {
              word: '收',
              start: 4.179,
              end: 4.44,
              score: 1,
              speaker: 'SPEAKER_00',
            },
            {
              word: '入',
              start: 4.44,
              end: 4.601,
              score: 1,
              speaker: 'SPEAKER_00',
            },
            {
              word: '为',
              start: 4.601,
              end: 5.324,
              score: 1,
              speaker: 'SPEAKER_00',
            },
            {
              word: '2',
              start: 5.324,
              end: 6.148,
              score: 0.998,
              speaker: 'SPEAKER_00',
            },
            {
              word: '8',
              start: 6.148,
              end: 6.69,
              score: 1,
              speaker: 'SPEAKER_00',
            },
            {
              word: '9',
              start: 6.69,
              end: 7.373,
              score: 1,
              speaker: 'SPEAKER_00',
            },
            {
              word: '5',
              start: 7.373,
              end: 9.021,
              score: 0.962,
              speaker: 'SPEAKER_00',
            },
            {
              word: '亿',
              start: 9.021,
              end: 9.041,
              score: 0.045,
              speaker: 'SPEAKER_00',
            },
            {
              word: '元',
              start: 9.041,
              end: 9.262,
              score: 0.995,
              speaker: 'SPEAKER_00',
            },
            {
              word: '。',
              start: 9.262,
              end: 9.282,
              score: 0,
            },
          ],
        },
      },
      {
        id: '2',
        name: '会议录音',
        status: 'processing',
        createdAt: '2024-01-02 14:20:00',
        type: 'audio',
        duration: 3600,
        fileUrl: '/meeting-audio.mp3',
      },
    ]);
  }, []);

  useEffect(() => {
    async function getTaskList() {
      const taskList = await getMediaTaskList();
      console.log('taskList:', taskList);
    }
    getTaskList();
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
                onClick={() => handleCreateMediaTask()}
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
                onClick={() => {
                  setActiveTask(task);
                  onTaskSelect(task);
                }}
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
