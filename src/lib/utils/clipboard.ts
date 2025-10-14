/**
 * 复制文本到剪贴板
 * 使用现代 Clipboard API，如果不可用则降级到 execCommand 方法
 *
 * @param text 要复制的文本
 * @returns Promise<boolean> 复制是否成功
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) {
    return false;
  }

  try {
    // 优先使用现代 Clipboard API
    // 检查 navigator.clipboard 是否存在且在安全上下文中
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 降级方案：使用传统的 execCommand 方法
      // 创建一个临时的 textarea 元素
      const textArea = document.createElement('textarea');
      textArea.value = text;

      // 设置样式，使其不可见
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      textArea.style.opacity = '0';

      // 添加到 DOM
      document.body.appendChild(textArea);

      // 选中文本
      textArea.focus();
      textArea.select();

      // 尝试执行复制命令
      let successful = false;
      try {
        successful = document.execCommand('copy');
      } catch (err) {
        console.error('execCommand 复制失败:', err);
      }

      // 清理：移除临时元素
      document.body.removeChild(textArea);

      return successful;
    }
  } catch (error) {
    console.error('复制失败:', error);
    return false;
  }
}

/**
 * 读取剪贴板内容
 * 仅在支持 Clipboard API 的浏览器中可用
 *
 * @returns Promise<string | null> 剪贴板内容，失败返回 null
 */
export async function readFromClipboard(): Promise<string | null> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      const text = await navigator.clipboard.readText();
      return text;
    } else {
      console.warn('Clipboard API 不可用，无法读取剪贴板');
      return null;
    }
  } catch (error) {
    console.error('读取剪贴板失败:', error);
    return null;
  }
}

/**
 * 检查 Clipboard API 是否可用
 *
 * @returns boolean
 */
export function isClipboardSupported(): boolean {
  return !!(navigator.clipboard && window.isSecureContext);
}
