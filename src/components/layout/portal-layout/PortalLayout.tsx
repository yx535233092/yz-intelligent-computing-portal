import ClientLayout from './ClientLayout';

// 前台布局
function PortalLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}

export default PortalLayout;
