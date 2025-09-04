import api from '@/lib/api/request';

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

export { createMediaTaskAPI, getMediaTaskListAPI, getMediaTaskDetailAPI };
