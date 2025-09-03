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
const getMediaTaskListAPI = (): Promise<MediaListRes> => {
  return api({
    method: 'GET',
    url: 'http://39.175.132.230:35034/task/all',
  });
};

export { createMediaTaskAPI, getMediaTaskListAPI };
