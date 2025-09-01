export default function InComing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="text-center space-y-8">
        {/* 动画图标 */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto relative">
            {/* 外圈旋转动画 */}
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full animate-spin border-t-brand"></div>
            {/* 内圈脉冲动画 */}
            <div className="absolute inset-3 bg-brand rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 标题 */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">正在开发中</h1>
          <div className="text-xl text-brand font-semibold">敬请期待</div>
        </div>
      </div>
    </div>
  );
}
