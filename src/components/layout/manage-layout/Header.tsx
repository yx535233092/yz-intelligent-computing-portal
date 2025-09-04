import { MenuFoldOutlined } from '@ant-design/icons';

function Header() {
  return (
    <div className="flex items-center h-[72px] bg-white px-8 text-lg text-gray-700">
      <MenuFoldOutlined className="cursor-pointer"></MenuFoldOutlined>
    </div>
  );
}

export default Header;
