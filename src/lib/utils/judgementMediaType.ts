const audioExt = [
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

const videoExt = ['mp4', 'avi', 'mov', 'flv', 'wmv', 'mkv', 'webm'];

/**
 * 判断媒体类型
 * @param url 媒体文件url
 * @returns video | audio | null 媒体类型
 */
function judgementMediaType(url: string): 'audio' | 'video' | null {
  const ext = url.split('.').pop() || '';
  if (audioExt.includes(ext)) {
    return 'audio';
  }
  if (videoExt.includes(ext)) {
    return 'video';
  }
  return null;
}

export default judgementMediaType;
