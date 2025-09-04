import { getFileListByLabelAPI } from '../api/file';

// 根据标签获取文件列表
async function getFileListByLabel(label: string) {
  const res = await getFileListByLabelAPI(label);
  return res.files;
}

export { getFileListByLabel };
