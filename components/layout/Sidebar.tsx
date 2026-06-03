import { LAND_UNITS } from "../utils/LandCalculation";

const hillUnits = Object.entries(LAND_UNITS).filter(([, unit]) => unit.system === "HILL");
const teraiUnits = Object.entries(LAND_UNITS).filter(([, unit]) => unit.system === "TERAI");
const internationalUnits = Object.entries(LAND_UNITS).filter(
  ([, unit]) => unit.system === "INTERNATIONAL"
);

const sidebarGroups = [
  {
    title: "HillSide",
    label: "Hill System (पहाड)",
    items: hillUnits,
  },
  {
    title: "TeraiSide",
    label: "Terai System (तराई)",
    items: teraiUnits,
  },
  {
    title: "InternationalSide",
    label: "International (अन्तर्राष्ट्रिय)",
    items: internationalUnits,
  },
];

export default function Sidebar() {
  return (
    <aside className="min-w-0 w-full xl:max-w-[260px] xl:shrink-0">
      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.3)] xl:sticky xl:top-28">
        <div className="mb-4 rounded-2xl bg-slate-950 px-4 py-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Land Units
          </p>
        </div>

        <div className="space-y-5">
          {sidebarGroups.map((group) => (
            <section key={group.title} className="space-y-2">
              <p className="px-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {group.label}
              </p>

              <div className="grid gap-1 sm:grid-cols-2 xl:grid-cols-1">
                {group.items.map(([, unit]) => (
                  <a
                    key={unit.label}
                    href="#"
                    className="flex min-w-0 items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    <span className="truncate">{unit.label}</span>
                    <span className="shrink-0 text-xs text-slate-400">
                      {unit.squareFeet.toFixed(2)} sq.ft
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </aside>
  );
}
