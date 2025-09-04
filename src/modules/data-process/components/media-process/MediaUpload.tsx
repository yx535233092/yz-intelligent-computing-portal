import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';

const { Dragger } = Upload;

interface MediaUploadProps {
  onFileUpload?: (file: File) => void;
  type: 'audio' | 'video';
}

const MediaUpload: React.FC<MediaUploadProps> = ({ onFileUpload, type }) => {
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

  const getAccept = () => {
    if (type === 'audio') {
      return '.aac,.mp3,.awb,.oga,.wma,.amr,.ogg,.wav,.m4a';
    } else if (type === 'video') {
      return '.mp4,.avi,.mov,.flv,.wmv,.mkv,.webm';
    }
  };

  return (
    <Dragger
      {...props}
      accept={getAccept()}
      style={{
        width: '500px',
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击或拖拽媒体文件至此区域进行上传</p>
      <p className="ant-upload-hint">支持格式：{getAccept()}</p>
    </Dragger>
  );
};

export default MediaUpload;
