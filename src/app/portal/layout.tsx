import Layout from '@/components/layout/layout-portal/PortalLayout';
import VisitTracker from '@/components/common/VisitTracker';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <VisitTracker />
      {children}
    </Layout>
  );
}
