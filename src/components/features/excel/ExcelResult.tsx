import { useState } from 'react';
import { UploadResult } from './types';

interface ExcelResultProps {
  result?: UploadResult;
  error?: string | null;
  isProcessing: boolean;
  fileName: string | null;
}

export default function ExcelResult({
  result,
  error,
  isProcessing,
  fileName,
}: ExcelResultProps) {
  const [activeTab, setActiveTab] = useState<'json' | 'md'>('md');

  // 处理中状态
  if (isProcessing) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center">
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-blue-600 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <div>
              <h3 className="text-lg font-medium text-blue-800">
                正在处理中...
              </h3>
              <p className="text-blue-600 text-sm mt-1">
                {fileName ? `正在解析 ${fileName}` : '正在解析Excel文件'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-medium text-red-800 mb-2">
                处理失败
              </h3>
              <p className="text-red-600">{error}</p>
              {fileName && (
                <p className="text-red-500 text-sm mt-1">文件: {fileName}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 无结果状态
  if (!result) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg
              className="w-12 h-12 mx-auto mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-lg font-medium">暂无处理结果</p>
            <p className="text-sm mt-1">
              请先选择文件并点击&ldquo;解析表格&rdquo;
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 判断data是否为对象格式（包含json_format和md_format）
  const isDataObject = result.data && !Array.isArray(result.data);
  const dataObj = isDataObject
    ? (result.data as {
        json_format?: string;
        md_format?: string;
        [key: string]: unknown;
      })
    : null;

  return (
    <div className="h-full flex flex-col">
      {/* 头部信息区域 */}
      <div className="flex-shrink-0 bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="text-lg font-medium text-green-800 mb-1">
              处理成功
            </h3>
            {fileName && (
              <p className="text-green-700 text-sm">文件: {fileName}</p>
            )}
          </div>
        </div>
      </div>

      {/* 数据预览区域 */}
      {result.data && Array.isArray(result.data) && (
        <div className="flex-shrink-0 mb-4">
          <h4 className="font-medium text-gray-800 mb-2">数据预览</h4>
          <div className="max-h-32 overflow-auto border border-gray-200 rounded-lg bg-white">
            <table className="min-w-full">
              <tbody>
                {result.data
                  .slice(0, 5)
                  .map((row: Record<string, unknown>, rowIndex: number) => (
                    <tr
                      key={rowIndex}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      {Object.values(row).map(
                        (cell: unknown, cellIndex: number) => (
                          <td
                            key={cellIndex}
                            className="border-r border-gray-100 px-3 py-2 text-sm text-gray-700"
                          >
                            {String(cell)}
                          </td>
                        )
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {result.data.length > 5 && (
            <p className="text-sm text-gray-500 mt-2">
              显示前 5 行，共 {result.data.length} 行数据
            </p>
          )}
        </div>
      )}

      {/* 格式化结果显示区域 */}
      {dataObj && (dataObj.json_format || dataObj.md_format) && (
        <div className="flex-1 flex flex-col min-h-0">
          {/* 标签页切换 */}
          <div className="flex border-b border-gray-200 mb-3 flex-shrink-0">
            {dataObj.md_format && (
              <button
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'md'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('md')}
              >
                Markdown 格式
              </button>
            )}
            {dataObj.json_format && (
              <button
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'json'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('json')}
              >
                JSON 格式
              </button>
            )}
          </div>

          {/* 自适应内容容器 */}
          <div className="flex-1 min-h-0 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            {activeTab === 'md' && dataObj.md_format && (
              <div className="h-full overflow-auto">
                <pre className="p-4 whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
                  {dataObj.md_format}
                </pre>
              </div>
            )}
            {activeTab === 'json' && dataObj.json_format && (
              <div className="h-full overflow-auto">
                <pre className="p-4 text-sm whitespace-pre-wrap text-gray-800 leading-relaxed font-mono">
                  {dataObj.json_format}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
