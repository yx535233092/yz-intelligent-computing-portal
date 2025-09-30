import ChemicalEditor from '@/components/chemical/ChemicalEditor';
import { cardBase, softBtn } from './className';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { chemicalParseAPI } from '@/apis/chemicalParse';
import Image from 'next/image';

export default function ParseTask({
  file,
  id,
  onDelete,
}: {
  file: File;
  id: number;
  onDelete: (id: number) => void;
}) {
  const { name, lastModified } = file;

  const [status, setStatus] = useState<'解析中' | '解析完成' | '解析失败'>(
    '解析中'
  );
  const [smiles, setSmiles] = useState('');
  const [uploaded_file_url, setUploaded_file_url] = useState('');

  // 解析化学结构为 SMILES
  const transformChemical2SMILES = (async () => {
    const postData = new FormData();
    postData.append('file', file);
    postData.append('mode', 'analyze');
    try {
      const result = await chemicalParseAPI(postData);
      if (result.status === 'success_with_analysis') {
        setStatus('解析完成');
        setSmiles(result.SMILES);
        setUploaded_file_url(result.uploaded_file_url);
      } else {
        setStatus('解析失败');
      }
    } catch (error) {
      setStatus('解析失败');
    }
  })();

  return (
    <div className="flex flex-col gap-8 mt-8">
      <div className={`${cardBase} overflow-hidden`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 bg-white/70">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-6 w-6 rounded-md bg-black/80" />
            <div>
              <div className="text-[14px] font-medium  text-left ">
                {name || '-'}
              </div>
              <div className="text-[12px] text-black/50">
                {new Date(lastModified).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-blue-500">{status}</span>
            {status === '解析中' && <LoadingOutlined />}
            <button className={softBtn} onClick={() => onDelete(id)}>
              删除
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
          {/* SMILES 与操作 */}
          <div className="col-span-1 flex flex-col lg:col-span-1">
            <div className="mb-2 text-[13px] text-black/60">SMILES 结构</div>
            <div className="rounded-xl border border-black/10 bg-white/80 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-h-[24px] flex-1 truncate text-[14px] text-black/80">
                  {smiles || '解析中，请稍后...'}
                </div>
                <div className="flex items-center gap-2"></div>
              </div>
              <div className="mt-3 rounded-lg border border-black/5 bg-white/70 p-3 text-[13px] text-black/70">
                基于图像的初步解析结果，请结合编辑器校对。
              </div>
            </div>
            {/* 原图片 */}
            <div className="col-span-1 mt-4">
              <div className="mb-2 text-[13px] text-black/60">原图片</div>
              <div className="aspect-square overflow-hidden rounded-xl border border-black/10 bg-white flex items-center justify-center">
                {status === '解析中' && (
                  <div className="text-[14px] text-black/40">解析中…</div>
                )}
                {status === '解析完成' && (
                  <Image
                    src={uploaded_file_url}
                    alt="原图片"
                    width={300}
                    height={300}
                  />
                )}
              </div>
            </div>
          </div>
          {/* 内联编辑器示例 */}
          <div className="lg:col-span-2 pb-8">
            <div className="mb-2 text-[13px] text-black/60">结构编辑器</div>
            <div className="rounded-xl border border-black/10 bg-white/90 p-2 h-full">
              {status === '解析完成' && <ChemicalEditor smiles={smiles} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
