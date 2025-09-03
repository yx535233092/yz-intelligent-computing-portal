'use client';

import { Card, Divider, Tag, Empty } from 'antd';
import { SoundOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface TranscriptionDisplayProps {
  transcription?: MediaTaskDetailResult;
  currentTime: number;
  onSegmentClick?: (startTime: number) => void;
}

function TranscriptionDisplay({
  transcription,
  onSegmentClick,
}: TranscriptionDisplayProps) {
  // 拼接完整文本
  let fullText = '';
  if (transcription) {
    for (const segment of transcription.segments) {
      fullText += segment.text;
    }
  }

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 为不同speaker分配不同颜色
  const getSpeakerColor = (speaker: string) => {
    const colors = [
      'red',
      'blue',
      'green',
      'orange',
      'purple',
      'cyan',
      'magenta',
      'lime',
      'gold',
      'volcano',
      'geekblue',
      'pink',
    ];

    // 使用speaker字符串的hash值来选择颜色
    let hash = 0;
    for (let i = 0; i < speaker.length; i++) {
      const char = speaker.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // 转换为32位整数
    }

    const colorIndex = Math.abs(hash) % colors.length;
    return colors[colorIndex];
  };

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
            {/* <Tag color="blue">中文</Tag> */}
          </div>
        </div>
      }
    >
      {/* 整体转录文本 */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <SoundOutlined />
          完整转录文本
        </h4>
        <div className="bg-gray-50 p-3 rounded border text-sm leading-relaxed border-gray-300">
          {fullText}
        </div>
      </div>

      <Divider />

      {/* 分段转录结果 */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <ClockCircleOutlined />
          分段转录 ({transcription.segments.length} 段)
        </h4>

        <div className="space-y-2">
          {transcription.segments.map((segment) => (
            <div
              key={segment.start}
              className={`p-3 rounded border transition-all cursor-pointer hover:shadow-sm $'bg-white border-gray-200 hover:bg-gray-50'`}
              onClick={() => onSegmentClick?.(segment.start)}
            >
              {/* 时间戳 */}
              <div className="flex justify-between items-center  mb-2">
                <Tag color={getSpeakerColor(segment.speaker)}>
                  {segment.speaker}
                </Tag>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-mono">
                      {formatTime(segment.start)} - {formatTime(segment.end)}
                    </span>
                  </div>
                </div>
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
