'use client';

import { useRef, useState } from 'react';
import { cardBase, softBtn, primaryBtn } from './styles/className';
import TaskCard from './components/TaskCard';

export default function Decmer() {
  const [fileList, setFileList] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // 上传文件
  const handleUploadFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // 文件内容改变，新文件推入队列
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileList((prev) => [...prev, file]);
    }
  };

  // 清空任务
  const handleClearTasks = () => {
    setFileList([]);
  };

  // 删除单个任务
  const handleDeleteTask = (index: number) => {
    setFileList(fileList.filter((file, i) => i !== index));
  };

  return (
    <div className="mx-auto max-w-[1280px] px-2 pb-20">
      {/* 顶部标题栏 */}
      <div className="sticky top-0 z-10 -mx-6 mb-8 border-b border-white/10 bg-gradient-to-b from-white/70 to-white/40 backdrop-blur-xl">
        <div className="mx-auto max-w-[1280px] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-md bg-black/75 flex items-center justify-center">
              🧪
            </div>
            <h1 className="text-[22px] font-semibold tracking-[-0.02em]">
              化学结构解析问答
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {fileList.length !== 0 && (
              <span className="text-[13px] text-white p-2 rounded-xl bg-blue-500">
                任务数量：{fileList.length}
              </span>
            )}

            <button
              className={softBtn}
              style={{
                cursor: fileList.length === 0 ? 'not-allowed' : 'pointer',
              }}
              onClick={handleClearTasks}
              disabled={fileList.length === 0}
            >
              清空任务
            </button>
          </div>
        </div>
      </div>

      {/* 上传区 */}
      <div className={`relative ${cardBase} p-8 mb-10`}>
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="text-[15px] text-black/70">
            将化学结构截图拖拽到此处，或
          </div>
          <div className="flex items-center gap-3">
            <button className={primaryBtn} onClick={handleUploadFile}>
              选择文件
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={inputRef}
              onChange={handleFileChange}
            />
            <div className="text-[13px] text-black/50">
              支持 PNG/JPG/WebP 等图片格式
            </div>
          </div>
          <div className="mt-4 w-full max-w-[720px] text-left flex flex-col gap-4">
            <div className="text-[13px] text-black/60">查询问题</div>
            <textarea
              placeholder="请输入问题…"
              className="min-h-[80px] w-full resize-y rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-[14px] outline-none focus:ring-2 focus:ring-black/10"
            />
            <button className={primaryBtn + ' w-[80px] ml-auto'}>查询</button>
          </div>
        </div>
      </div>

      {/* 空态 */}
      {fileList.length === 0 && (
        <div className={`${cardBase} p-12 text-center`}>
          <div className="mx-auto mb-3 h-16 w-16 rounded-2xl border border-black/10 bg-white flex items-center justify-center text-black/60">
            🧪
          </div>
          <div className="text-[15px] text-black/70">
            上传化学结构截图以创建解析任务
          </div>
          <div className="mt-1 text-[13px] text-black/50">
            每个任务都会展示原图、SMILES 与可编辑的结构编辑器
          </div>
        </div>
      )}

      {/* 非空态：任务列表 */}
      {fileList.length > 0 && (
        <div className={`${cardBase} p-12 text-center flex flex-col gap-6`}>
          {fileList.map((file, index) => (
            <TaskCard
              key={index}
              file={file}
              id={index}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}
