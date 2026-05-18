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
    url: '/py-api/speech-to-text',
    data: formData,
    params,
  });
};

// 获取媒体任务列表
const getMediaTaskListAPI = (): Promise<MediaTaskList> => {
  return api({
    method: 'GET',
    url: '/py-api/task/all',
  });
};

// 根据Id获取媒体任务详情
const getMediaTaskDetailAPI = (id: string): Promise<MediaTaskDetail> => {
  return api({
    method: 'GET',
    url: `/py-api/task/${id}`,
  });
};

// 删除任务
const deleteMediaTaskAPI = (id: string): Promise<void> => {
  return api({
    method: 'DELETE',
    url: `/py-api/task/${id}/delete`,
  });
};

export {
  createMediaTaskAPI,
  getMediaTaskListAPI,
  getMediaTaskDetailAPI,
  deleteMediaTaskAPI,
};
