import Layout from '@/components/layout/portal-layout/PortalLayout';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
