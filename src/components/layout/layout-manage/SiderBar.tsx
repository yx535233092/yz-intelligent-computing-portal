import ManageMenu from './Menu';

function SiderBar({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div
      className={`min-h-screen bg-[#041428] flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-[80px]' : 'min-w-[260px]'
      }`}
    >
      {/* 标题栏 */}
      <div className="flex justify-center items-center h-[72px] border-b-1 border-gray-800">
        <h1 className="text-white text-lg font-bold">
          {isCollapsed ? '后台' : '管理后台'}
        </h1>
      </div>
      {/* 菜单栏 */}
      <div className="flex-1 py-4">
        <ManageMenu isCollapsed={isCollapsed}></ManageMenu>
      </div>
    </div>
  );
}

export default SiderBar;
