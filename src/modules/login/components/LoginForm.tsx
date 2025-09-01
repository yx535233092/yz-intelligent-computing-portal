'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Logo from '@/components/common/Logo';
import LoadingContext from '@/components/common/LoadingContext';
import { authService } from '../services/login';
import styles from '../styles/login.module.css';
import { setUserInfo } from '@/lib/store/features/userInfoSlice';
import { useDispatch } from 'react-redux';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const { toggleLoading } = useContext(LoadingContext);
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();

  // 检查URL参数并显示相应提示
  useEffect(() => {
    const messageParam = searchParams.get('message');
    if (messageParam === 'token_expired') {
      messageApi.warning('登录已过期，请重新登录');
    } else if (messageParam === 'token_invalid') {
      messageApi.error('登录状态无效，请重新登录');
    } else if (messageParam === 'no_token') {
      messageApi.info('请先登录');
    }
  }, [searchParams]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    // 1.阻止默认事件
    e.preventDefault();
    // 2.切换加载状态为true
    toggleLoading(true);
    // 3.登录请求,默认延迟300ms防止闪入
    setTimeout(async () => {
      try {
        const userInfo = await authService.login({
          username,
          password,
        });
        // 存储用户信息至redux中
        dispatch(setUserInfo(userInfo));
        // 4.登录成功跳转至首页
        router.push('/');
      } catch (error) {
        // 5.登录失败，显示错误信息
        messageApi.error((error as { detail: string }).detail);
      } finally {
        // 6.切换加载状态为false
        toggleLoading(false);
      }
    }, 300);
  };

  return (
    <div className="w-[75%] h-[800px] shadow-2xl  rounded-3xl bg-white flex items-center justify-center z-10">
      {contextHolder}
      <div className="w-[50%] h-full flex flex-col items-center">
        {/* 标题 */}
        <div className="flex items-center gap-3 mt-40">
          <Logo></Logo>
          <h1 className={`text-[36px] font-bold ${styles['gradient-text']}`}>
            智算服务平台
          </h1>
        </div>
        <span className=" w-[60%] text-gray-400 text-center tracking-wider my-8">
          释放AI大模型潜能 · 加速智能应用落地
        </span>
        <form
          className="flex flex-col gap-6 w-full px-30"
          onSubmit={(e) => handleLogin(e)}
          onKeyDown={(e) => {
            // 监听enter键
            if (e.key === 'Enter') {
              // 执行登录
              handleLogin(e);
            }
          }}
        >
          {/* 用户名 */}
          <div className="relative">
            <input
              className="text-lg border-2 border-gray-300 rounded-[50px] py-2 pl-12 pr-8 focus:outline-none focus:border-brand w-full transition-all duration-300"
              type="username"
              placeholder="请输入用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <UserOutlined
              style={{
                color: '#aaa',
                fontWeight: 'bold',
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
            />
          </div>
          {/* 密码 */}
          <div className="relative">
            <input
              className="text-lg border-2 border-gray-300 rounded-[50px] py-2 pl-12 pr-8 focus:outline-none focus:border-brand w-full transition-all duration-300"
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {/* 登录 */}
          <button
            className="cursor-pointer rounded-[50px] bg-brand text-white text-lg py-2 px-8 tracking-wider bg-gradient-to-r from-orange-800 to-brand transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:scale-105"
            type="submit"
          >
            登录平台
          </button>
          {/* TODO：注册 */}
          {/* <span className="text-gray-400 text-center tracking-wider">
            还没有账号？
            <Link href="">立即注册</Link>
          </span> */}
        </form>
      </div>
      {/* 右侧 */}
      <div className="w-[50%] h-full  relative">
        <Image
          className={`rounded-r-3xl opacity-85 ${styles['no-drag']}`}
          style={{
            width: '100%',
            height: '100%',
          }}
          width={1920}
          height={1080}
          src="/12.webp"
          alt="login-bg"
          priority
        />
        <div className="flex flex-col w-full items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white gap-6">
          <div className="bg-white rounded-xl p-3 shadow-lg">
            <Logo></Logo>
          </div>
          <h1 className="text-4xl font-bold tracking-wider"> 智算服务平台</h1>
          <p className="text-md w-[70%] text-center tracking-wider text-gray-300 leading-6">
            我们提供从技术咨询、模型优化、算力管理到应用定制的全流程专家服务，致力于打通大模型从技术潜力到商业价值的“最后一公里”，助您高效构建、部署与扩展AI应用。
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
