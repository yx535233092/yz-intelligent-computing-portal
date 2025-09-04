import Layout from '@/components/layout/manage-layout/ManageLayout';

function ManageLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

export default ManageLayout;
