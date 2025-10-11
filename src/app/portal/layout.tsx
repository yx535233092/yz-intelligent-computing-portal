import Layout from '@/components/layout/layout-portal/PortalLayout';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
