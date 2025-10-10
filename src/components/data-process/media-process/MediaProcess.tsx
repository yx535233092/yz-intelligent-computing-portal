import { useState } from 'react';
import MediaFileList from './MediaFileList';
import CreateMediaTask from './CreateMediaTask';
import MediaPreview from './MediaPreview';
import type { MediaTask } from '@/types/data-process';

export default function MediaProcess({ type }: { type: 'audio' | 'video' }) {
  // 选中任务
  const [selectedMediaTask, setSelectedMediaTask] = useState<MediaTask | null>(
    null
  );
  // 任务列表刷新状态
  const [mediaTaskListRefresh, setMediaTaskListRefresh] = useState(false);
  // 新建任务弹窗状态
  const [createMediaTaskOpenState, setCreateMediaTaskOpenState] =
    useState(false);

  // 新建任务
  const createMediaTask = () => {
    setCreateMediaTaskOpenState(true);
    setSelectedMediaTask(null);
  };

  // 选择任务
  const handleMediaTaskSelect = (mediaTask: MediaTask | null) => {
    setCreateMediaTaskOpenState(false);
    setSelectedMediaTask(mediaTask);
  };

  // 处理新建任务
  const handleTaskCreate = () => {
    setCreateMediaTaskOpenState(false);
    setMediaTaskListRefresh(!mediaTaskListRefresh);
  };

  return (
    <div className="w-full flex gap-8">
      <MediaFileList
        handleCreateMediaTask={createMediaTask}
        onMediaTaskSelect={handleMediaTaskSelect}
        mediaTaskListRefresh={mediaTaskListRefresh}
        type={type}
      ></MediaFileList>
      {/* 任务详情和新建任务 */}
      {createMediaTaskOpenState === true ? (
        <CreateMediaTask
          onTaskCreate={handleTaskCreate}
          type={type}
        ></CreateMediaTask>
      ) : (
        <MediaPreview selectedMediaTask={selectedMediaTask}></MediaPreview>
      )}
    </div>
  );
}
