import { deleteMediaTaskAPI } from '@/apis/data-process/media';
import { useRef } from 'react';

export default function ContextMenu() {
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const handleDelete = async () => {
    const id = contextMenuRef.current?.dataset.id;
    await deleteMediaTaskAPI(id as string);
  };

  return (
    <div
      className="context-menu bg-[#ededed] rounded-md px-2 py-1  w-[100px]  border-1 border-[#bcbdbe] hidden shadow-xl"
      ref={contextMenuRef}
    >
      <div className="context-menu-item cursor-pointer flex items-center pl-2 text-black hover:bg-[#669cf8] hover:text-white rounded-md transition-all duration-300">
        <span onClick={handleDelete}>删除</span>
      </div>
    </div>
  );
}
