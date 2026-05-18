import ManageMenu from './Menu';

function SiderBar({
  isCollapsed,
  className = '',
}: {
  isCollapsed: boolean;
  className?: string;
}) {
  return (
    <div
      className={`h-full bg-[#001529] flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-[80px]' : 'w-[256px]'
      } ${className}`}
    >
      {/* 标题栏 */}
      <div className="flex justify-center items-center h-[64px] border-b border-white/5">
        <h1 className="text-white text-lg font-bold tracking-wider flex items-center">
          {!isCollapsed && <span className="w-2 h-2 bg-[#d32d26] rounded-full mr-2"></span>}
          {isCollapsed ? 'H' : '智算后台管理'}
        </h1>
      </div>
      {/* 菜单栏 */}
      <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
        <ManageMenu isCollapsed={isCollapsed}></ManageMenu>
      </div>
    </div>
  );
}

export default SiderBar;
