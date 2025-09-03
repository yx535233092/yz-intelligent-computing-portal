import MediaTaskForm from './MediaTaskForm';

export default function CreateMediaTask() {
  return (
    <div className="bg-white h-full w-3/4 rounded-xl flex flex-col">
      {/* 标题栏 */}
      <header className="h-[80px] flex items-center justify-between text-black text-xl p-6 font-bold border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span>新建任务</span>
        </div>
      </header>
      {/* 内容区 */}
      <div className="flex-1 p-6">
        <div className="flex flex-col gap-4">
          <MediaTaskForm />
        </div>
      </div>
    </div>
  );
}
