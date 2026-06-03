import type { ReactNode } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eefbf5_100%)] text-slate-900">
      <Header />
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 py-4 sm:gap-6 sm:px-6 sm:py-6 xl:flex-row xl:items-start xl:px-8 xl:py-8">
        <Sidebar />
        <div className="min-w-0 max-w-full flex-1">{children}</div>
      </div>
    </div>
  );
}
