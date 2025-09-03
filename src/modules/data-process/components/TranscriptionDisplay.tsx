'use client';

import { useState, useEffect } from 'react';
import { Card, Divider, Progress, Tag, Tooltip, Empty } from 'antd';
import {
  SoundOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

interface TranscriptionDisplayProps {
  transcription?: TranscriptionResult;
  currentTime: number;
  onSegmentClick?: (startTime: number) => void;
}

function TranscriptionDisplay({
  transcription,
  currentTime,
  onSegmentClick,
}: TranscriptionDisplayProps) {
  const [activeSegmentId, setActiveSegmentId] = useState<number | null>(null);

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 获取置信度颜色
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'green';
    if (confidence >= 0.6) return 'orange';
    return 'red';
  };

  // 获取置信度标签
  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return '高';
    if (confidence >= 0.6) return '中';
    return '低';
  };

  // 根据当前播放时间更新活跃片段
  useEffect(() => {
    if (transcription?.segments) {
      const activeSegment = transcription.segments.find(
        (segment) => currentTime >= segment.start && currentTime <= segment.end
      );
      setActiveSegmentId(activeSegment?.id || null);
    }
  }, [currentTime, transcription?.segments]);

  if (!transcription) {
    return (
      <Card title="转录结果" className="h-full">
        <Empty
          description="暂无转录结果"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Card>
    );
  }

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <span>转录结果</span>
          <div className="flex items-center gap-2">
            <Tag color="blue">{transcription.language}</Tag>
          </div>
        </div>
      }
      className="h-full"
    >
      {/* 整体转录文本 */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <SoundOutlined />
          完整转录文本
        </h4>
        <div className="bg-gray-50 p-3 rounded border text-sm leading-relaxed border-gray-300">
          {transcription.text}
        </div>
      </div>

      <Divider />

      {/* 分段转录结果 */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <ClockCircleOutlined />
          分段转录 ({transcription.segments.length} 段)
        </h4>

        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {transcription.segments.map((segment) => (
            <div
              key={segment.id}
              className={`p-3 rounded border transition-all cursor-pointer hover:shadow-sm ${
                activeSegmentId === segment.id
                  ? 'bg-red-50 border-red-200'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => onSegmentClick?.(segment.start)}
            >
              {/* 时间戳和置信度 */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-mono">
                    {formatTime(segment.start)} - {formatTime(segment.end)}
                  </span>
                  {activeSegmentId === segment.id && (
                    <Tag color="red">
                      <SoundOutlined className="mr-1" />
                      播放中
                    </Tag>
                  )}
                </div>
                <Tooltip
                  title={`置信度: ${Math.round(segment.confidence * 100)}%`}
                >
                  <Progress
                    type="circle"
                    size={20}
                    percent={Math.round(segment.confidence * 100)}
                    strokeColor={getConfidenceColor(segment.confidence)}
                    showInfo={false}
                  />
                </Tooltip>
              </div>

              {/* 转录文本 */}
              <div className="text-sm text-gray-800 leading-relaxed">
                {segment.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default TranscriptionDisplay;
