import { Button, Tabs, Empty, TabsProps } from 'antd';
import { DownloadOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import FilePreview from '@/components/common/FilePreview';

function Preview({ activeFile }: { activeFile: FileItem | null }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeResult, setAnalyzeResult] = useState<string>('');

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '原始文件',
      children: <FilePreview file={activeFile?.url || ''} />,
    },
    {
      key: '2',
      label: '解析结果',
      children: <FilePreview file={activeFile?.url || ''} />,
    },
    {
      key: '3',
      label: 'Markdown（去除标签）',
      children: <FilePreview file={activeFile?.url || ''} />,
    },
  ];

  return (
    <div className=" flex flex-col bg-white h-full flex-1 rounded-xl">
      <div className="flex items-center px-6 h-[100px] justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-2">文件预览</h1>
          <div className="flex gap-4">
            <span>
              文件大小：
              {activeFile?.size
                ? (activeFile.size / 1024 / 1024).toFixed(2)
                : ' - '}
              MB
            </span>
            <span>创建时间：{activeFile?.lastModified || ' - '}</span>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            style={{
              backgroundColor: '#888',
              borderColor: '#888',
            }}
            type="primary"
            icon={<DownloadOutlined />}
            size="large"
            onClick={() => {
              console.log('下载文件');
            }}
          >
            下载文件
          </Button>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            size="large"
            loading={isAnalyzing}
            onClick={() => {
              setIsAnalyzing(true);
              setTimeout(() => {
                setIsAnalyzing(false);
                setAnalyzeResult('结果');
              }, 2000);
            }}
          >
            解析文件
          </Button>
        </div>
      </div>
      <div className="flex-1 px-6 pb-4">
        {activeFile ? (
          <Tabs
            defaultActiveKey="1"
            items={analyzeResult ? items : items.slice(0, 1)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center h-[770px]">
            <Empty
              image="/empty.svg"
              styles={{ image: { height: 200 } }}
              description="请选择文件"
            ></Empty>
          </div>
        )}
      </div>
    </div>
  );
}

export default Preview;
