import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';

const { Dragger } = Upload;

interface MediaUploadProps {
  onFileUpload?: (file: File) => void;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ onFileUpload }) => {
  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: '',
    maxCount: 1,
    beforeUpload: (file) => {
      // 阻止默认上传行为，只获取文件信息
      if (onFileUpload) {
        onFileUpload(file);
      }
      return false; // 阻止上传
    },
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        console.log(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击或拖拽媒体文件至此区域进行上传</p>
      <p className="ant-upload-hint">支持格式：MP3, WAV, MP4, AVI, MOV 等</p>
    </Dragger>
  );
};

export default MediaUpload;
