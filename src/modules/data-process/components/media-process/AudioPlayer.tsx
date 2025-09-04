'use client';

import { useState, useRef, useEffect } from 'react';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import { Slider, Tooltip } from 'antd';

interface AudioPlayerProps {
  audioUrl: string;
  duration: number;
  onTimeUpdate?: (currentTime: number) => void;
  onSeek?: (time: number) => void;
}

function AudioPlayer({
  audioUrl,
  duration,
  onTimeUpdate,
  onSeek,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 播放/暂停切换
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 处理进度条变化
  const handleSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
      onSeek?.(value);
    }
  };

  // 处理音量变化
  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  // 音频时间更新
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);
      onTimeUpdate?.(time);
    }
  };

  // 音频结束
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* 播放控制区域 */}
      <div className="flex items-center gap-4 mb-3">
        {/* 播放/暂停按钮 */}
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
        >
          {isPlaying ? (
            <PauseCircleOutlined className="text-xl" />
          ) : (
            <PlayCircleOutlined className="text-xl" />
          )}
        </button>

        {/* 时间显示 */}
        <div className="flex items-center gap-2 text-sm text-gray-600 min-w-[100px]">
          <span>{formatTime(currentTime)}</span>
          <span>/</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* 音量控制 */}
        {/* <div className="flex items-center gap-2 ml-auto">
          <SoundOutlined className="text-gray-500" />
          <Slider
            min={0}
            max={100}
            step={5}
            value={volume}
            onChange={handleVolumeChange}
            className="w-20"
          />
        </div> */}
      </div>

      {/* 进度条 */}
      <div className="w-full">
        <Slider
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          tooltip={{
            formatter: (value) => formatTime(value || 0),
          }}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default AudioPlayer;
