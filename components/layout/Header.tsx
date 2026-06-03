
export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Nepal Land Price Calc
          </p>
          <h1 className="truncate text-lg font-semibold text-slate-950 sm:text-xl">
            Land Value Workspace
          </h1>
        </div>


      </div>

    </header>
  );
}
