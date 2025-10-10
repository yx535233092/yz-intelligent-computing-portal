import { RollbackOutlined } from '@ant-design/icons';
import Logo from '@/components/common/Logo';
import { useRouter } from 'next/navigation';

function Header({
  menus,
  activeMenu,
}: {
  menus: { label: string; key: number; type: string }[];
  activeMenu: number;
}) {
  const router = useRouter();
  return (
    <div className="flex h-[80px]">
      <div className="h-[80px] flex items-center justify-between px-6 gap-4">
        <div className="flex gap-2 items-center">
          <Logo></Logo>
          <h1 className="text-2xl font-bold ">数据处理服务</h1>
        </div>
        {/* 返回上页 */}
        <RollbackOutlined
          onClick={() => {
            // router.back();
            router.push('/portal/service/service-data/data-process');
          }}
          className="ml-6 text-xl font-bold"
          style={{
            color: '#888',
          }}
        />
      </div>
      {/* 标题 */}
      <div className="flex-1 min-h-[80px] flex items-center text-2xl px-8 font-bold transition-all duration-300">
        {menus.find((item) => item.key === activeMenu)?.label}
      </div>
    </div>
  );
}

export default Header;
