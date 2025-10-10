import api from '@/lib/api/request';
import type {
  FieldType,
  CreateMediaTaskRes,
  MediaTaskList,
  MediaTaskDetail,
} from '@/types/data-process';

// 媒体转录接口
const createMediaTaskAPI = (
  params: FieldType,
  formData: FormData
): Promise<CreateMediaTaskRes> => {
  return api({
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: 'http://39.175.132.230:35034/speech-to-text',
    data: formData,
    params,
  });
};

// 获取媒体任务列表
const getMediaTaskListAPI = (): Promise<MediaTaskList> => {
  return api({
    method: 'GET',
    url: 'http://39.175.132.230:35034/task/all',
  });
};

// 根据Id获取媒体任务详情
const getMediaTaskDetailAPI = (id: string): Promise<MediaTaskDetail> => {
  return api({
    method: 'GET',
    url: `http://39.175.132.230:35034/task/${id}`,
  });
};

// 删除任务
const deleteMediaTaskAPI = (id: string): Promise<void> => {
  return api({
    method: 'DELETE',
    url: `http://39.175.132.230:35034/task/${id}/delete`,
  });
};

export {
  createMediaTaskAPI,
  getMediaTaskListAPI,
  getMediaTaskDetailAPI,
  deleteMediaTaskAPI,
};

// ============= 业务逻辑层 =============

import formatTime from '@/lib/utils/formatTime';

// 创建媒体任务
export async function createMediaTask(params: FieldType, formData: FormData) {
  const res = await createMediaTaskAPI(params, formData);
  return res;
}

// 获取媒体任务列表
export async function getMediaTaskList(type?: string) {
  // 给每个task添加name属性
  let { tasks: mediaTaskList } = await getMediaTaskListAPI();
  mediaTaskList.forEach((mediaTask, index) => {
    mediaTask['name'] =
      `任务${index + 1}（${formatTime(mediaTask.start_time, 'YYYY-MM-DD HH:mm:ss')}）`;
  });
  mediaTaskList.reverse();

  // 如果传入type参数，则过滤任务类型
  if (type) {
    const audioType = [
      'aac',
      'mp3',
      'awb',
      'oga',
      'wma',
      'amr',
      'ogg',
      'wav',
      'm4a',
    ];
    const videoType = ['mp4', 'avi', 'mov', 'flv', 'wmv', 'mkv', 'webm'];
    if (type === 'audio') {
      mediaTaskList = mediaTaskList.filter((item) => {
        return audioType.includes(item.file_name.split('.').pop() || '');
      });
    } else if (type === 'video') {
      mediaTaskList = mediaTaskList.filter((item) => {
        return videoType.includes(item.file_name.split('.').pop() || '');
      });
    }
  }
  return mediaTaskList;
}

// 根据媒体任务Id获取任务详情
export async function getMediaTaskDetail(id: string) {
  const res = await getMediaTaskDetailAPI(id);
  return res;
}
