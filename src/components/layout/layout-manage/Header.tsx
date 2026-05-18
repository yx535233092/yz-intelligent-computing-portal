import { MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Link from 'next/link';

function Header({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between h-[64px] bg-white px-4 md:px-6 text-gray-700 shadow-sm z-10">
      <div className="flex items-center">
        {!isCollapsed ? (
          <MenuFoldOutlined
            className="cursor-pointer text-xl hover:text-[#d32d26] transition-colors"
            onClick={() => setIsCollapsed(!isCollapsed)}
          ></MenuFoldOutlined>
        ) : (
          <MenuUnfoldOutlined
            className="cursor-pointer text-xl hover:text-[#d32d26] transition-colors"
            onClick={() => setIsCollapsed(!isCollapsed)}
          ></MenuUnfoldOutlined>
        )}
      </div>

      <div>
        <Link href="/portal/home">
          <Button
            icon={<HomeOutlined />}
            className="hover:border-[#d32d26] hover:text-[#d32d26]"
          >
            <span className="hidden sm:inline">返回前台</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
