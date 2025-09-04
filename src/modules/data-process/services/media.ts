import {
  createMediaTaskAPI,
  getMediaTaskDetailAPI,
  getMediaTaskListAPI,
} from '../api/media';

// 创建媒体任务
async function createMediaTask(params: FieldType, formData: FormData) {
  const res = await createMediaTaskAPI(params, formData);
  return res;
}

// 获取媒体任务列表
async function getMediaTaskList(type?: string) {
  // 给每个task添加name属性
  let { tasks: mediaTaskList } = await getMediaTaskListAPI();
  for (const mediaTask of mediaTaskList) {
    mediaTask['name'] = `${mediaTask.file_name} ( ${mediaTask.identifier} )`;
  }
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
async function getMediaTaskDetail(id: string) {
  const res = await getMediaTaskDetailAPI(id);
  return res;
}

export { createMediaTask, getMediaTaskList, getMediaTaskDetail };
