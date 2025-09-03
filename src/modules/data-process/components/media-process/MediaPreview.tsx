'use client';

import { useEffect, useState } from 'react';
import { Card, Tag, Spin } from 'antd';
import {
  PlayCircleOutlined,
  SoundOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import TranscriptionDisplay from './TranscriptionDisplay';
import { getMediaTaskDetail } from '../../services/media';
import formatTime from '@/lib/utils/formatTime';

function MediaPreview({ selectedMediaTask }: MediaPreviewProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [mediaTaskDetail, setMediaTaskDetail] =
    useState<MediaTaskDetail | null>(null);

  useEffect(() => {
    // 获取媒体任务详情
    (async function () {
      // 防止首次进入预览页面没有选择任务时，报错
      if (selectedMediaTask?.identifier) {
        const mediaTaskDetail = await getMediaTaskDetail(
          selectedMediaTask!.identifier
        );
        setMediaTaskDetail(mediaTaskDetail);
      }
    })();
  }, [selectedMediaTask]);

  if (!selectedMediaTask || !mediaTaskDetail) {
    return (
      <div className="bg-white h-full w-3/4 rounded-xl flex flex-col items-center justify-center">
        <div className="text-center text-gray-500">
          <SoundOutlined className="text-4xl mb-4" />
          <p className="text-lg">请创建或选择一个媒体任务</p>
          <p className="text-sm">从左侧任务列表中选择要预览的媒体任务</p>
          <p className="text-sm">或点击任务列表右侧创建媒体任务</p>
        </div>
      </div>
    );
  }

  const handleSegmentClick = (startTime: number) => {
    setCurrentTime(startTime);
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
    <div className="bg-white  h-full  w-3/4 rounded-xl flex flex-col">
      {/* 标题栏 */}
      <header className="h-[80px] flex items-center justify-between text-black text-xl p-6 font-bold border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span>任务详情</span>
        </div>
      </header>

      {/* 内容区域 */}
      <main className="flex-1 p-6 overflow-y-auto mb-4">
        {mediaTaskDetail?.status === 'processing' ? (
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
                      {mediaTaskDetail?.metadata.file_name}
                    </h3>
                    {getStatusTag(mediaTaskDetail!.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <ClockCircleOutlined />
                      创建时间:{' '}
                      {formatTime(
                        mediaTaskDetail?.metadata.start_time,
                        'YYYY-MM-DD HH:mm:ss'
                      )}
                    </span>
                    {mediaTaskDetail?.metadata.dutation && (
                      <span className="flex items-center gap-1">
                        <PlayCircleOutlined />
                        时长: {mediaTaskDetail!.metadata.dutation}
                      </span>
                    )}
                    {/* {mediaTaskDetail?.metadata.language && (
                      <span className="flex items-center gap-1">
                        <FileTextOutlined />
                        类型:{' '}
                        {mediaTaskDetail?.metadata.language === 'audio'
                          ? '音频'
                          : '视频'}
                      </span>
                    )} */}
                  </div>
                </div>
              </div>
            </Card>

            {/* 转录结果显示 */}
            <TranscriptionDisplay
              transcription={mediaTaskDetail?.result}
              currentTime={currentTime}
              onSegmentClick={handleSegmentClick}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default MediaPreview;
