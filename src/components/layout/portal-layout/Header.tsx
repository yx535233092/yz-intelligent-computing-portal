import Link from 'next/link';
import Logo from '@/components/common/Logo';
import Nav from '@/components/features/nav/Nav';
import UserInfoDropdown from '@/components/common/UserInfoDropdown';

export default function Header() {
  return (
    <header className="sticky top-0 w-full px-16 flex items-center bg-white h-16 border-t-brand border-t-2 shadow-lg z-99">
      {/* 标题与图标 */}
      <Logo />
      <Link className="text-xl font-normal ml-4 tracking-wide title" href="/">
        天津移动智算专业服务
      </Link>
      {/* 导航栏与登录用户信息 */}
      <div className="ml-auto flex items-center">
        <Nav />
        <UserInfoDropdown
          style={{
            marginLeft: '16px',
          }}
        />
      </div>
    </header>
  );
}
