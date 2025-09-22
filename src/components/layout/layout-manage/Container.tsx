function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-white rounded-md p-4">{children}</div>
  );
}
export default Container;
