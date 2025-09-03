import { createMediaTaskAPI, getMediaTaskListAPI } from '../api/media';

// 创建媒体任务
async function createMediaTask(params: FieldType, formData: FormData) {
  const res = await createMediaTaskAPI(params, formData);
  return res;
}

async function getMediaTaskList() {
  const res = await getMediaTaskListAPI();
  return res;
}

export { createMediaTask, getMediaTaskList };
