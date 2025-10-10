import { Modal } from 'antd';
import FilePreview from '@/components/common/FilePreview';
import type { FileItem } from '@/types/data-process';

function CompareModal({
  open,
  setOpen,
  activeFile,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeFile: FileItem | null;
}) {
  return (
    <Modal
      title={<p>对比视图</p>}
      open={open}
      onCancel={() => setOpen(false)}
      width={1800}
      footer={null}
      style={{
        top: '20px',
      }}
    >
      <div className="flex h-[810px]">
        <div className="flex-1 py-2 ">
          <h1 className="py-2 px-2">原文件</h1>
          <FilePreview file={activeFile?.url || ''} />,
        </div>
        <div className="flex-1 py-2 ">
          <h1 className="py-2 px-2">解析后</h1>
        </div>
      </div>
    </Modal>
  );
}

export default CompareModal;
