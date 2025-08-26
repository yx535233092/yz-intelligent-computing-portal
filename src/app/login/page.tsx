export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* 大圆圈 */}
      <canvas id="circle-big"></canvas>
      {/* 登录容器 */}
      <div className="w-[75%] h-[800px] shadow-xl  rounded-xl bg-white flex items-center justify-center">
        <div className="w-[50%] h-full "></div>
        <div className="w-[50%] h-full bg-red-400 opacity-50"></div>
      </div>
      {/* 小圆圈 */}
      <canvas id="circle-small"></canvas>
    </div>
  );
}
