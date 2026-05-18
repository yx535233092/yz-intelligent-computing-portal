import Layout from '@/components/layout/layout-manage/ManageLayout';
import VisitTracker from '@/components/common/VisitTracker';

function ManageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <VisitTracker />
      {children}
    </Layout>
  );
}

export default ManageLayout;
