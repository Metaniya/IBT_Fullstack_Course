import Sidebar from "./Sidebar";

export default function MenuLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}