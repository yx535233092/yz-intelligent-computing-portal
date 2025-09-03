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
  type?: 'audio' | 'video';
  duration?: number; // 媒体文件时长（秒）
  fileUrl?: string; // 媒体文件URL
  transcription?: TranscriptionResult; // 转录结果
}

interface TranscriptionResult {
  text: string;
  segments: TranscriptionSegment[];
  language: string;
  confidence: number;
}

interface TranscriptionSegment {
  id: number;
  start: number; // 开始时间（秒）
  end: number; // 结束时间（秒）
  text?: string;
  word: string;
  score: number;
}

interface SpeechToTextConfigParams {
  language: string;
  task: 'transcribe' | 'translate';
  model:
    | 'tiny'
    | 'base'
    | 'small'
    | 'medium'
    | 'large-v1'
    | 'large-v2'
    | 'large-v3';
  device: 'cpu' | 'cuda' | 'gpu';
  device_index: number;
  threads: number;
  batch_size: number;
  chunk_size: number;
  compute_type: 'int8' | 'float16' | 'float32';
  interpolate_method: 'linear' | 'nearest' | 'cubic';
  return_char_alignments: boolean;
  beam_size: number;
  best_of: number;
  patience: number;
  length_penalty: number;
  temperatures: number;
  compression_ratio_threshold: number;
  log_prob_threshold: number;
  no_speech_threshold: number;
  suppress_tokens: number;
  suppress_numerals: boolean;
  vad_onset: number;
  vad_offset: number;
}

// 媒体新建表单字段
type FieldType = {
  language?: string;
  task?: string;
  model?: string;
  device?: string;
  device_index?: number;
  threads?: number;
  batch_size?: number;
  chunk_size?: number;
  compute_type?: string;
  interpolate_method?: string;
  return_char_alignments?: boolean;
  beam_size?: number;
  best_of?: number;
  patience?: number;
  length_penalty?: number;
  temperatures?: number;
  compression_ratio_threshold?: number;
  log_prob_threshold?: number;
  no_speech_threshold?: number;
  suppress_tokens?: string;
  suppress_numerals?: boolean;
  vad_onset?: number;
  vad_offset?: number;
  file?: File; // 添加媒体文件字段
};

interface CreateMediaTaskRes {
  identifier: string;
  message: string;
}

interface MediaListItem {
  identifier: string;
  status: 'completed' | 'failed' | 'processing';
  task_type: string;
  language: string;
  file_name: string;
  error: string | null;
  url: string | null;
  duration: number | null;
  audio_duration: number | null;
  start_time: string;
  end_time: string | null;
}
interface MediaListRes {
  tasks: MediaListItem[];
}
