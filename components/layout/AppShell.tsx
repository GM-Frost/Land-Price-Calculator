import type { ReactNode } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eefbf5_100%)] text-slate-900">
      <Header />
      <div className="mx-auto flex w-full  gap-6 px-4 py-6 sm:px-6 lg:py-8">
        <Sidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
