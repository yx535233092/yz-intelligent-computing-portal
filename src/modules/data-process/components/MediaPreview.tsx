import AudioTranscriptionPreview from './AudioTranscriptionPreview';

interface MediaPreviewProps {
  selectedTask: TaskItem | null;
}

function MediaPreview({ selectedTask }: MediaPreviewProps) {
  return <AudioTranscriptionPreview task={selectedTask} />;
}

export default MediaPreview;
