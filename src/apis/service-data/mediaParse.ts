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
    url: '/backend-api2/speech-to-text',
    data: formData,
    params,
  });
};

// 获取媒体任务列表
const getMediaTaskListAPI = (): Promise<MediaTaskList> => {
  return api({
    method: 'GET',
    url: '/backend-api2/task/all',
  });
};

// 根据Id获取媒体任务详情
const getMediaTaskDetailAPI = (id: string): Promise<MediaTaskDetail> => {
  return api({
    method: 'GET',
    url: `/backend-api2/task/${id}`,
  });
};

// 删除任务
const deleteMediaTaskAPI = (id: string): Promise<void> => {
  return api({
    method: 'DELETE',
    url: `/backend-api2/task/${id}/delete`,
  });
};

export {
  createMediaTaskAPI,
  getMediaTaskListAPI,
  getMediaTaskDetailAPI,
  deleteMediaTaskAPI,
};
