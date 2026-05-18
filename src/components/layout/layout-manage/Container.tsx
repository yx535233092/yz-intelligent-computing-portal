function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-full bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      {children}
    </div>
  );
}
export default Container;
