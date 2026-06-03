import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0 flex items-center gap-3">
          <Image
            src="/logo/logo.svg"
            alt="Land Price Calculator"
            width={42}
            height={42}
            priority
          />
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Land Price Calc
            </p>
            <p className="truncate text-lg font-semibold text-slate-950 sm:text-xl">
              Land Value Workspace
            </p>
          </div>
          <Image
            src="/image/Flag_of_Nepal.gif"
            alt="Land Price Calculator"
            width={20}
            height={20}
          />
        </div>
      </div>
    </header>
  );
}
