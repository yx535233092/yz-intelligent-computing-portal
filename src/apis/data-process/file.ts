import api from '@/lib/api/request';
import type { FileListRes } from '@/types/data-process';

function getFileListByLabelAPI(label: string): Promise<FileListRes> {
  return api({
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/getFileListByLabel`,
    params: {
      label,
    },
  });
}

export { getFileListByLabelAPI };

// ============= 业务逻辑层 =============

// 根据标签获取文件列表
export async function getFileListByLabel(label: string) {
  const res = await getFileListByLabelAPI(label);
  return res.files;
}
