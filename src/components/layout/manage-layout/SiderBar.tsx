import ManageMenu from './Menu';

function SiderBar() {
  return (
    <div className="h-screen bg-[#041428] w-[240px] flex flex-col">
      {/* 标题栏 */}
      <div className="flex justify-center items-center h-[72px] border-b-1 border-gray-800">
        <h1 className="text-white text-lg font-bold">管理后台</h1>
      </div>
      {/* 菜单栏 */}
      <div className="flex-1 py-4">
        <ManageMenu></ManageMenu>
      </div>
    </div>
  );
}

export default SiderBar;
