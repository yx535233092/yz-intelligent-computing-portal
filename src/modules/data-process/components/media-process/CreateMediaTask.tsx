import MediaTaskForm from './MediaTaskForm';

export default function CreateMediaTask({
  onTaskCreate,
  type,
}: {
  onTaskCreate: () => void;
  type: 'audio' | 'video';
}) {
  return (
    <div className="bg-white h-full flex-1 rounded-xl flex flex-col ">
      {/* 标题栏 */}
      <header className="h-[80px] flex items-center justify-between text-black text-xl p-6 font-bold border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span>新建任务</span>
        </div>
      </header>
      {/* 内容区 */}
      <div className="flex-1 py-6 overflow-y-auto">
        <MediaTaskForm onTaskCreate={onTaskCreate} type={type} />
      </div>
    </div>
  );
}
