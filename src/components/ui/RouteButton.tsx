import { ArrowRightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

/**
 * 路由按钮组件
 * @param text 按钮文本
 * @param routePath 路由路径
 * @param size 按钮大小
 * @param showArrow 是否显示箭头，默认为否
 * @param isHollow 是否为空心，默认为否
 */

export default function RouteButton({
  text,
  routePath,
  size,
  showArrow = false,
  isHollow = false,
}: {
  text: string;
  routePath: string;
  size: 'small' | 'medium' | 'large';
  showArrow?: boolean;
  isHollow?: boolean;
}) {
  const router = useRouter();

  const sizeClass = {
    small: 'px-2 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${sizeClass[size]} group relative ${!isHollow ? 'bg-gradient-to-r from-brand to-red-700 hover:from-red-500 hover:to-brand' : 'bg-transparent border-2 border-brand/40 hover:border-brand/80 hover:bg-gradient-to-r hover:from-brand/10 hover:to-red-600/10 text-red-50 hover:text-white'} text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-brand/30 flex items-center gap-3 overflow-hidden cursor-pointer`}
      onClick={() => {
        router.push(routePath);
      }}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
      <span className="relative z-10">{text}</span>
      {showArrow && (
        <ArrowRightOutlined className="relative z-10 text-lg transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
      )}
    </button>
  );
}
