'use client';

import {
  Card,
  Divider,
  Tag,
  Empty,
  Spin,
  Button,
  Input,
  Tooltip,
  message,
  Popover,
  Typography,
  Descriptions,
  Space,
} from 'antd';
import {
  SoundOutlined,
  CopyOutlined,
  DownloadOutlined,
  SearchOutlined,
  ClockCircleOutlined,
  EditOutlined,
  InfoCircleOutlined,
  BarChartOutlined,
  RobotOutlined,
  TagOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useState, useRef, useEffect, useMemo } from 'react';
import judgementMediaType from '@/lib/utils/judgementMediaType';
import { updateMediaTaskResultAPI } from '@/apis/data-process/media';
import type {
  MediaTaskDetailResult,
  MediaTaskDetail,
} from '@/types/data-process';

const { Text, Title, Paragraph } = Typography;

interface TranscriptionDisplayProps {
  transcription?: MediaTaskDetailResult;
  mediaTaskDetail?: MediaTaskDetail;
}

function TranscriptionDisplay({
  transcription,
  mediaTaskDetail,
}: TranscriptionDisplayProps) {
  // 本地维护 segments 状态以便编辑
  const [segments, setSegments] = useState<any[]>([]);

  useEffect(() => {
    if (transcription?.segments) {
      setSegments(transcription.segments);
    }
  }, [transcription]);

  // 提取关键词 (模拟逻辑)
  const keywords = useMemo(() => {
    if (!segments.length) return [];
    const allText = segments.map((s) => s.text).join(' ');
    const words = allText
      .split(/[\s,，。！!？?]+/)
      .filter((w) => w.length >= 2);
    const counts: Record<string, number> = {};
    words.forEach((w) => (counts[w] = (counts[w] || 0) + 1));
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name]) => name);
  }, [segments]);

  // 自动生成摘要 (模拟逻辑)
  const aiSummary = useMemo(() => {
    if (segments.length < 3) return '内容较短，暂无详细摘要。';
    return (
      segments
        .slice(0, 3)
        .map((s) => s.text)
        .join(' ')
        .substring(0, 150) + '...'
    );
  }, [segments]);

  const [internalCurrentTime, setInternalCurrentTime] = useState(0);
  const [searchText, setSearchText] = useState('');
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const activeSegmentRef = useRef<HTMLDivElement>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const baseUrl = '';
  const mediaType = judgementMediaType(mediaTaskDetail?.metadata.url || '');

  // 过滤搜索结果
  const filteredSegments = useMemo(() => {
    if (!segments) return [];
    if (!searchText) return segments;
    return segments.filter((s) =>
      s.text.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [segments, searchText]);

  // 处理说话人修改 (单一修正)
  const handleSpeakerChange = async (index: number, newName: string) => {
    if (!newName || !mediaTaskDetail) return;

    // 乐观更新：仅更新当前索引的段落
    const newSegments = [...segments];
    newSegments[index] = { ...newSegments[index], speaker: newName };
    setSegments(newSegments);
    messageApi.success(`已修改说话人为 "${newName}"`);

    // 后台保存
    try {
      const newResult = { ...transcription, segments: newSegments };
      await updateMediaTaskResultAPI(
        mediaTaskDetail.identifier as any,
        newResult
      );
    } catch (e) {
      console.error('Save failed:', e); // Log the error
      messageApi.error('保存失败');
    }
  };

  // 3. 自动滚动
  useEffect(() => {
    if (activeSegmentRef.current) {
      activeSegmentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [internalCurrentTime]);

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 播放器时间更新处理
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement | HTMLAudioElement>) => {
    setInternalCurrentTime(e.currentTarget.currentTime);
  };

  // 点击段落跳转播放
  const handleJumpTo = (startTime: number) => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = startTime;
      mediaRef.current.play();
    }
  };

  // 复制全文
  const handleCopyFullText = () => {
    if (!segments) return;
    const text = segments.map((s) => s.text).join('\n');
    navigator.clipboard.writeText(text);
    messageApi.success('全文已复制到剪贴板');
  };

  // 导出文本
  const handleDownloadTxt = () => {
    if (!segments) return;
    const text = segments.map((s) => s.text).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mediaTaskDetail?.metadata.file_name || 'transcript'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    messageApi.success('文件下载已开始');
  };

  // 为不同speaker分配不同颜色
  const getSpeakerColor = (speaker: string) => {
    if (!speaker) return 'blue';
    const colors = [
      'magenta',
      'red',
      'volcano',
      'orange',
      'gold',
      'lime',
      'green',
      'cyan',
      'blue',
      'geekblue',
      'purple',
    ];
    let hash = 0;
    for (let i = 0; i < speaker.length; i++) {
      hash = (hash << 5) - hash + speaker.charCodeAt(i);
      hash = hash & hash;
    }
    return colors[Math.abs(hash) % colors.length];
  };

  // Speaker 编辑组件
  const SpeakerTag = ({ name, index }: { name: string; index: number }) => {
    const [tempName, setTempName] = useState(name);
    const [open, setOpen] = useState(false);

    // 当外部 name 变化时（比如重新加载），更新 tempName
    useEffect(() => {
      setTempName(name);
    }, [name]);

    const handleSave = () => {
      handleSpeakerChange(index, tempName);
      setOpen(false);
    };

    return (
      <Popover
        title="修改说话人"
        content={
          <div
            className="flex gap-2 p-1"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <Input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onPressEnter={handleSave}
              size="small"
              autoFocus
            />
            <Button type="primary" size="small" onClick={handleSave}>
              确认
            </Button>
          </div>
        }
        trigger="click"
        open={open}
        onOpenChange={setOpen}
      >
        <span
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="inline-block"
        >
          <Tag
            color={getSpeakerColor(name)}
            className="m-0 border-none px-1 py-0 h-5 leading-5 cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1"
          >
            {name}
            <EditOutlined className="text-[10px] opacity-50" />
          </Tag>
        </span>
      </Popover>
    );
  };

  // 渲染 Loading / Empty 状态
  if (!transcription) {
    return (
      <Card
        title={
          <div className="flex items-center justify-between">
            <span>转录结果</span>
            {mediaTaskDetail?.status === 'processing' && (
              <Tag color="blue">生成中...</Tag>
            )}
          </div>
        }
        className="h-full flex flex-col"
        styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column' } }}
      >
        {/* 媒体播放器占位 */}
        <div className="mb-4 bg-black rounded overflow-hidden">
          {mediaType === 'audio' ? (
            <audio
              src={`${baseUrl}${mediaTaskDetail?.metadata.url}`}
              className="w-full"
              controls
              onTimeUpdate={handleTimeUpdate}
              ref={mediaRef as React.Ref<HTMLAudioElement>}
            />
          ) : (
            <video
              src={`${baseUrl}${mediaTaskDetail?.metadata.url}`}
              className="w-full h-[300px] bg-black"
              controls
              onTimeUpdate={handleTimeUpdate}
              ref={mediaRef as React.Ref<HTMLVideoElement>}
            />
          )}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {mediaTaskDetail?.status === 'processing' ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Spin size="large" />
              <p className="mt-4 text-gray-500">正在智能分析音视频内容...</p>
              <p className="text-xs text-gray-400">
                基于 Whisper Large V3 模型
              </p>
            </div>
          ) : (
            <Empty
              description="暂无转录结果"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <SoundOutlined className="text-blue-500" />
            转录工作台
          </span>
          {mediaTaskDetail?.status === 'processing' && (
            <Tag color="blue" icon={<LoadingOutlined />}>
              智能分析中...
            </Tag>
          )}
        </div>
      }
      className="h-full flex flex-col shadow-sm border-none"
      styles={{
        body: {
          flex: 1,
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        },
      }}
    >
      {contextHolder}

      <div className="flex flex-1 h-full overflow-hidden">
        {/* 左侧：播放器与分析区域 (固定宽度 30%) */}
        <div className="w-[350px] min-w-[350px] bg-gray-50 border-r border-gray-200 flex flex-col h-full overflow-y-auto">
          <div className="p-5 space-y-6">
            {/* 播放器卡片 */}
            <div className="rounded-xl overflow-hidden shadow-lg bg-black ring-1 ring-black/10 aspect-video flex items-center justify-center group relative">
              {mediaType === 'audio' ? (
                <audio
                  src={`${baseUrl}${mediaTaskDetail?.metadata.url}`}
                  className="w-full px-4"
                  controls
                  onTimeUpdate={handleTimeUpdate}
                  ref={mediaRef as React.Ref<HTMLAudioElement>}
                />
              ) : (
                <video
                  src={`${baseUrl}${mediaTaskDetail?.metadata.url}`}
                  className="w-full h-full object-contain"
                  controls
                  onTimeUpdate={handleTimeUpdate}
                  ref={mediaRef as React.Ref<HTMLVideoElement>}
                />
              )}
            </div>

            {/* 关键词提取 */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-purple-50 rounded-lg flex items-center justify-center text-purple-500">
                  <TagOutlined />
                </div>
                <span className="font-bold text-gray-700">核心关键词</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.length > 0 ? (
                  keywords.map((tag) => (
                    <Tag
                      key={tag}
                      className="m-0 bg-gray-50 border-gray-200 text-gray-600 rounded-md px-2 py-0.5"
                    >
                      {tag}
                    </Tag>
                  ))
                ) : (
                  <Text type="secondary" className="text-xs">
                    暂无关键词
                  </Text>
                )}
              </div>
            </div>

            {/* 任务详细元信息 */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center text-green-500">
                  <InfoCircleOutlined />
                </div>
                <span className="font-bold text-gray-700">任务详情</span>
              </div>
              <Descriptions
                column={1}
                size="small"
                labelStyle={{ color: '#8c8c8c', fontSize: '12px' }}
                contentStyle={{
                  color: '#434343',
                  fontSize: '12px',
                  fontWeight: 500,
                }}
              >
                <Descriptions.Item label="文件名">
                  <div
                    className="truncate w-40"
                    title={mediaTaskDetail?.metadata.file_name}
                  >
                    {mediaTaskDetail?.metadata.file_name}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="总时长">
                  {mediaTaskDetail?.metadata.dutation
                    ? formatTime(mediaTaskDetail.metadata.dutation)
                    : '--:--'}
                </Descriptions.Item>
                <Descriptions.Item label="识别语言">
                  {mediaTaskDetail?.metadata.language === 'zh'
                    ? '简体中文'
                    : mediaTaskDetail?.metadata.language || '自动识别'}
                </Descriptions.Item>
                <Descriptions.Item label="模型精度">
                  Whisper Large V3
                </Descriptions.Item>
                <Descriptions.Item label="创建时间">
                  {new Date(
                    mediaTaskDetail?.metadata.start_time || ''
                  ).toLocaleString()}
                </Descriptions.Item>
              </Descriptions>
            </div>

            {/* 统计图表占位 - 增加高度 */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm min-h-[120px] flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500">
                  <BarChartOutlined />
                </div>
                <span className="font-bold text-gray-700">说话人分布</span>
              </div>
              <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-50 rounded-lg">
                <Text type="secondary" className="text-[10px]">
                  说话人时长比例分析图
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：转录文本区域 (自适应宽度) */}
        <div className="flex-1 flex flex-col bg-white min-w-0">
          {/* 工具栏 */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-4 flex-1">
              <Input
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder="在转录内容中搜索..."
                allowClear
                className="max-w-md h-10 rounded-lg"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Text type="secondary" className="text-xs whitespace-nowrap">
                共 {filteredSegments.length} 段
              </Text>
            </div>
            <Space size="middle">
              <Button
                icon={<CopyOutlined />}
                onClick={handleCopyFullText}
                className="rounded-lg"
              >
                复制全文
              </Button>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={handleDownloadTxt}
                className="rounded-lg bg-blue-600"
              >
                导出文本
              </Button>
            </Space>
          </div>

          {/* 滚动列表 */}
          <div className="flex-1 overflow-y-auto px-10 py-6 scroll-smooth">
            <div className="space-y-6 max-w-4xl mx-auto">
              {filteredSegments.length === 0 && (
                <div className="text-center text-gray-400 py-32 flex flex-col items-center bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100">
                  <SearchOutlined className="text-4xl mb-4 opacity-10" />
                  <span className="text-base">未找到匹配的内容</span>
                </div>
              )}

              {filteredSegments.map((segment, index) => {
                const isActive =
                  internalCurrentTime >= segment.start &&
                  internalCurrentTime < segment.end;

                return (
                  <div
                    key={`${segment.start}-${index}`}
                    ref={isActive ? activeSegmentRef : null}
                    className={`
                        group relative px-6 py-5 rounded-2xl transition-all duration-300 border
                        ${isActive ? 'bg-blue-50/60 border-blue-200 shadow-md transform scale-[1.01]' : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-100'}
                        cursor-pointer
                        `}
                    onClick={() => handleJumpTo(segment.start)}
                  >
                    {/* 侧边高亮条 */}
                    {isActive && (
                      <div className="absolute left-0 top-6 bottom-6 w-1.5 bg-blue-500 rounded-r-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <SpeakerTag
                          name={segment.speaker || 'Unknown'}
                          index={index}
                        />
                        <span
                          className={`text-[10px] uppercase tracking-wider font-bold ${isActive ? 'text-blue-400' : 'text-gray-300'}`}
                        >
                          Speaker Segment
                        </span>
                      </div>
                      <span className="font-mono text-xs text-gray-400 bg-gray-100/80 px-2 py-1 rounded-md group-hover:text-gray-600 transition-colors">
                        {formatTime(segment.start)}
                      </span>
                    </div>

                    <p
                      className={`
                        text-base leading-8 text-gray-700 m-0 text-justify
                        ${isActive ? 'text-gray-900 font-medium' : ''}
                        `}
                    >
                      {searchText
                        ? segment.text
                            .split(new RegExp(`(${searchText})`, 'gi'))
                            .map((part: string, i: number) =>
                              part.toLowerCase() ===
                              searchText.toLowerCase() ? (
                                <mark
                                  key={i}
                                  className="bg-yellow-200 text-black rounded px-0.5 shadow-sm"
                                >
                                  {part}
                                </mark>
                              ) : (
                                part
                              )
                            )
                        : segment.text}
                    </p>
                  </div>
                );
              })}

              <div className="h-32" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default TranscriptionDisplay;
