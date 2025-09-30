import CanvasBackground from './CanvasBackground';
import LoginForm from './LoginForm';

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
