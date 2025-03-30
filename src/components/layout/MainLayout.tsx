import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-full w-full bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <main className="h-full w-full">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;
