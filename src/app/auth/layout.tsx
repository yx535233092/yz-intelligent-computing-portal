import Layout from '@/components/layout/auth-layout/AuthLayout';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
