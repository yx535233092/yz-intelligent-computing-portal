import CanvasBackground from '@/modules/login/components/CanvasBackground';
import LoginForm from '@/modules/login/components/LoginForm';

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* 登录表单 */}
      <LoginForm></LoginForm>
      {/* 背景canvas */}
      <CanvasBackground />
    </div>
  );
}
