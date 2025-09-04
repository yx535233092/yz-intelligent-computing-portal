/**
 * 格式化 ISO 8601 格式的日期字符串
 * @param isoString 要格式化的 ISO 8601 字符串，例如 "2025-08-25T10:01:00.181002"
 * @param format 格式化字符串，例如 "YYYY-MM-DD HH:mm:ss"
 * @returns 格式化后的日期字符串
 */
function formatISODate(isoString: string, format: string): string {
  const date = new Date(isoString);

  // 检查日期对象是否有效
  if (isNaN(date.getTime())) {
    throw new Error('无效的日期字符串');
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
    .replace('SSS', milliseconds);
}

export default formatISODate;
