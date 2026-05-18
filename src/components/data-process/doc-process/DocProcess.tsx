'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  FileTextOutlined, 
  TableOutlined, 
  FunctionOutlined, 
  ReadOutlined, 
  BookOutlined, 
  EditOutlined,
  FilePdfOutlined,
  ProfileOutlined,
  CloudServerOutlined
} from '@ant-design/icons';
import { Empty } from 'antd';

const capabilities = [
  { id: '常规文档解析', name: '常规文档解析', icon: <FileTextOutlined />, category: 'text' },
  { id: '表格文档解析', name: '表格文档解析', icon: <TableOutlined />, category: 'text' },
  { id: '公式类文档解析', name: '公式类文档解析', icon: <FunctionOutlined />, category: 'text' },
  { id: '媒体报刊类文档解析', name: '媒体报刊类文档解析', icon: <ReadOutlined />, category: 'text' },
  { id: '论文解析', name: '论文解析', icon: <FilePdfOutlined />, category: 'text' },
  { id: '试卷解析', name: '试卷解析', icon: <ProfileOutlined />, category: 'text' },
  { id: '书籍解析', name: '书籍解析', icon: <BookOutlined />, category: 'image' },
  { id: '手写识别', name: '手写识别', icon: <EditOutlined />, category: 'image' },
];

export default function DocProcess() {
  const searchParams = useSearchParams();
  const initialTitle = searchParams.get('title');
  const [selectedId, setSelectedId] = useState(initialTitle || capabilities[0].id);

  useEffect(() => {
    if (initialTitle) {
      // 检查 title 是否在能力列表中，如果不在（比如部分匹配），可以做模糊匹配或保持默认
      const exactMatch = capabilities.find(c => c.id === initialTitle);
      if (exactMatch) {
        setSelectedId(initialTitle);
      } else {
        // 尝试模糊匹配
        const fuzzyMatch = capabilities.find(c => initialTitle.includes(c.name) || c.name.includes(initialTitle));
        if (fuzzyMatch) {
          setSelectedId(fuzzyMatch.id);
        }
      }
    }
  }, [initialTitle]);

  const selectedCap = capabilities.find(c => c.id === selectedId) || capabilities[0];
  const url = `http://119.45.162.155:7860?title=${selectedCap.name}`;

  return (
    <div className="w-full h-full flex gap-8 overflow-hidden">
      {/* 左侧：能力列表 */}
      <div className="w-[280px] min-w-[280px] h-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
        <div className="h-[60px] flex items-center px-6 border-b border-gray-100 bg-gray-50/50 shrink-0">
          <div className="flex items-center gap-2 text-gray-800">
            <CloudServerOutlined />
            <span className="font-bold text-lg">解析能力</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {capabilities.map(cap => (
             <div
               key={cap.id}
               onClick={() => setSelectedId(cap.id)}
               className={`
                 group flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 border border-transparent
                 ${selectedId === cap.id 
                   ? 'bg-blue-50 text-blue-600 border-blue-100 font-medium shadow-sm' 
                   : 'text-gray-600 hover:bg-gray-50 hover:border-gray-100'
                 }
               `}
             >
               <span className={`text-lg transition-transform duration-200 ${selectedId === cap.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                 {cap.icon}
               </span>
               <span className="text-sm">{cap.name}</span>
             </div>
          ))}
        </div>
      </div>

      {/* 右侧：Iframe 内容区 */}
      <div className="flex-1 h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-w-0">
         <div className="h-14 border-b border-gray-100 px-6 flex items-center justify-between bg-white shrink-0 z-10">
             <div className="flex items-center gap-3">
                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedId === selectedCap.id ? 'bg-blue-50 text-blue-600' : 'bg-gray-100'}`}>
                    {selectedCap.icon}
                 </div>
                 <span className="font-bold text-gray-800 text-base">{selectedCap.name}</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs text-gray-500 font-mono">Service Active</span>
             </div>
         </div>
         
         <div className="flex-1 relative bg-gray-50">
           {/* 使用 key 强制重新渲染 iframe，确保 title 变化时内容刷新 */}
           <iframe 
             key={url}
             src={url}
             className="w-full h-full border-none"
             title="Document Parsing Service"
             loading="lazy"
           />
         </div>
      </div>
    </div>
  );
}
