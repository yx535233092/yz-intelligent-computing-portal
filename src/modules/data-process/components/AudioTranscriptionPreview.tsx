'use client';

import { useState } from 'react';
import { Card, Divider, Tag, Button, Space, Spin } from 'antd';
import {
  PlayCircleOutlined,
  DownloadOutlined,
  FileTextOutlined,
  SoundOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import AudioPlayer from './AudioPlayer';
import TranscriptionDisplay from './TranscriptionDisplay';

interface AudioTranscriptionPreviewProps {
  task: TaskItem | null;
}

function AudioTranscriptionPreview({ task }: AudioTranscriptionPreviewProps) {
  const [currentTime, setCurrentTime] = useState(0);

  if (!task) {
    return (
      <div className="bg-white h-full w-3/4 rounded-xl flex flex-col items-center justify-center">
        <div className="text-center text-gray-500">
          <SoundOutlined className="text-4xl mb-4" />
          <p className="text-lg">请选择一个音频任务</p>
          <p className="text-sm">从左侧任务列表中选择要预览的音频转文字任务</p>
        </div>
      </div>
    );
  }

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  const handleSegmentClick = (startTime: number) => {
    setCurrentTime(startTime);
  };

  const handleDownloadTranscription = () => {
    if (task.transcription) {
      const content = task.transcription.text;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${task.name}_转录结果.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'completed':
        return <Tag color="green">转录完成</Tag>;
      case 'processing':
        return <Tag color="blue">转录中</Tag>;
      case 'failed':
        return <Tag color="red">转录失败</Tag>;
      default:
        return <Tag color="default">等待中</Tag>;
    }
  };

  return (
    <div className="bg-white h-full w-3/4 rounded-xl flex flex-col">
      {/* 标题栏 */}
      <header className="h-[80px] flex items-center justify-between text-black text-xl p-6 font-bold border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span>任务详情</span>
        </div>
        <div className="flex items-center gap-2">
          {task.status === 'completed' && task.transcription && (
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownloadTranscription}
              size="small"
            >
              下载结果
            </Button>
          )}
        </div>
      </header>

      {/* 内容区域 */}
      <main className="flex-1 p-6 overflow-hidden">
        {task.status === 'processing' ? (
          // 处理中状态
          <div className="h-full flex flex-col items-center justify-center">
            <Spin size="large" />
            <p className="mt-4 text-lg text-gray-600">正在转录中...</p>
            <p className="text-sm text-gray-500">
              这可能需要几分钟时间，请耐心等待
            </p>
          </div>
        ) : (
          // 完成状态或其他状态
          <div className="h-full flex flex-col gap-6">
            {/* 任务信息卡片 */}
            <Card size="small">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {task.name}
                    </h3>
                    {getStatusTag(task.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <ClockCircleOutlined />
                      创建时间: {task.createdAt}
                    </span>
                    {task.duration && (
                      <span className="flex items-center gap-1">
                        <PlayCircleOutlined />
                        时长: {formatTime(task.duration)}
                      </span>
                    )}
                    {task.type && (
                      <span className="flex items-center gap-1">
                        <FileTextOutlined />
                        类型: {task.type === 'audio' ? '音频' : '视频'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {task.fileUrl && task.duration && (
              <>
                {/* 音频播放器 */}
                <Card title="原始音频" size="small">
                  <AudioPlayer
                    audioUrl={task.fileUrl}
                    duration={task.duration}
                    onTimeUpdate={handleTimeUpdate}
                    onSeek={handleSeek}
                  />
                </Card>

                <Divider className="my-4" />
              </>
            )}

            {/* 转录结果显示 */}
            <div className="flex-1 overflow-hidden">
              <TranscriptionDisplay
                transcription={task.transcription}
                currentTime={currentTime}
                onSegmentClick={handleSegmentClick}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AudioTranscriptionPreview;
