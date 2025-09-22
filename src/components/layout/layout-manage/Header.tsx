import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

function Header({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}) {
  return (
    <div className="flex items-center h-[72px] bg-white px-8 text-lg text-gray-700">
      {!isCollapsed ? (
        <MenuFoldOutlined
          className="cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        ></MenuFoldOutlined>
      ) : (
        <MenuUnfoldOutlined
          className="cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        ></MenuUnfoldOutlined>
      )}
    </div>
  );
}

export default Header;
