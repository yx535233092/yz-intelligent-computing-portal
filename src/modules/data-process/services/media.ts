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
async function getMediaTaskList() {
  const res = await getMediaTaskListAPI();
  return res;
}

// 根据媒体任务Id获取任务详情
async function getMediaTaskDetail(id: string) {
  const res = await getMediaTaskDetailAPI(id);
  return res;
}

export { createMediaTask, getMediaTaskList, getMediaTaskDetail };
