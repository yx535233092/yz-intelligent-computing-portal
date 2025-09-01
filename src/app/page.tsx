import { redirect } from 'next/navigation';

export default function Page() {
  // 首页默认跳转至home页面（服务端重定向，避免渲染期更新）
  redirect('/portal/home');
}
