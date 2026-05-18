'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import { Card, Tag, Spin } from 'antd';
import {
  PlayCircleOutlined,
  SoundOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import TranscriptionDisplay from './TranscriptionDisplay';
import { getMediaTaskDetail } from '@/apis/data-process/media';
import formatTime from '@/lib/utils/formatTime';
import type { MediaPreviewProps, MediaTaskDetail } from '@/types/data-process';

function MediaPreview({ selectedMediaTask }: MediaPreviewProps) {
  const [mediaTaskDetail, setMediaTaskDetail] =
    useState<MediaTaskDetail | null>(null);

  // 使用 useMemo 缓存格式化后的创建时间，避免重复计算
  const formattedCreateTime = useMemo(() => {
    if (!mediaTaskDetail?.metadata.start_time) return '';
    return formatTime(
      mediaTaskDetail.metadata.start_time,
      'YYYY-MM-DD HH:mm:ss'
    );
  }, [mediaTaskDetail?.metadata.start_time]);

  useEffect(() => {
    // 清空任务详情
    setMediaTaskDetail(null);

    let getMediaTaskDetailInterval: NodeJS.Timeout | null = null;

    // 获取媒体任务详情
    const fetchTaskDetail = async () => {
      // 防止首次进入预览页面没有选择任务时，报错
      if (selectedMediaTask?.identifier) {
        // 获取任务详情
        const mediaTaskDetail = await getMediaTaskDetail(
          selectedMediaTask!.identifier
        );
        console.log(mediaTaskDetail);
        setMediaTaskDetail(mediaTaskDetail);

        // 只在处理中状态时设置定时器，避免已完成任务的不必要刷新
        if (mediaTaskDetail?.status === 'processing') {
          // 高频轮询 (300ms) 以减少感知延迟
          getMediaTaskDetailInterval = setInterval(async () => {
            const mediaTaskDetail = await getMediaTaskDetail(
              selectedMediaTask!.identifier
            );
            setMediaTaskDetail(mediaTaskDetail);
          }, 300);
        }
      }
    };

    fetchTaskDetail();

    // 清理函数：组件卸载或依赖项变化时清理定时器
    return () => {
      if (getMediaTaskDetailInterval) {
        clearInterval(getMediaTaskDetailInterval);
        getMediaTaskDetailInterval = null;
      }
    };
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

  return (
    <Suspense fallback={<div>加载中...</div>}>
      <div className="bg-white  h-full  rounded-xl flex flex-col flex-1 ">
        {/* 标题栏 */}
        <header className="h-[80px] flex items-center justify-between text-black text-xl p-6 font-bold border-b border-gray-100">
          <div className="flex items-center gap-3">
            <span>任务详情</span>
            <span className="text-base font-normal text-gray-500 ml-2">{mediaTaskDetail.metadata.file_name}</span>
          </div>
        </header>

        {/* 内容区域 */}
        <main className="flex-1 p-6 overflow-hidden mb-4">
            {/* 始终展示内容框架，不再根据 processing 状态全屏 Loading */}
            <div className="h-full flex flex-col gap-6">
              {/* 转录结果显示 (现在集成了播放器和所有功能) */}
              <TranscriptionDisplay
                transcription={mediaTaskDetail?.result}
                mediaTaskDetail={mediaTaskDetail}
              />
            </div>
        </main>
      </div>
    </Suspense>
  );
}

export default MediaPreview;
