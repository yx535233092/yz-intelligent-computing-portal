import api from '@/lib/api/request';

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
