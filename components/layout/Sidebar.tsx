import { LAND_UNITS } from "../utils/LandCalculation";


const hillUnits = Object.entries(LAND_UNITS).filter(
  ([_, unit]) => unit.system === 'HILL'
);

const teraiUnits = Object.entries(LAND_UNITS).filter(
  ([_, unit]) => unit.system === 'TERAI'
);

const internationalUnits = Object.entries(LAND_UNITS).filter(
  ([_, unit]) => unit.system === 'INTERNATIONAL'
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
    <aside className="hidden w-full max-w-65 shrink-0 lg:block">
      <div className="sticky top-28 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.3)]">
        <div className="mb-4 rounded-2xl bg-slate-950 px-4 py-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Land Units
          </p>

        </div>

        <div className="space-y-5">
          {sidebarGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map(([_key, unit]) => (
                  <a
                    key={unit.label}
                    href="#"
                    className="flex justify-between rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    <span>{unit.label}</span>
                    <span className="text-slate-400 text-xs">{unit.squareFeet.toFixed(2)} sq.ft</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
