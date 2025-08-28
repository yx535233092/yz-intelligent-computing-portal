type Item = {
  key: number;
  label: string;
};

interface FileItem {
  name: string;
  url: string;
  size: number;
  lastModified: string;
  type: string;
}

interface FileListRes {
  files: FileItem[];
}

interface TaskItem {
  id: string;
  name: string;
  status: string;
  createdAt: string;
}
