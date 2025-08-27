import { getFileListByLabelAPI } from '../api/file';

async function getFileListByLabel(label: string) {
  const res = await getFileListByLabelAPI(label);
  return res.files;
}

export { getFileListByLabel };
