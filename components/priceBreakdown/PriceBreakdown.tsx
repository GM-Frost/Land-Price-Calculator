"use client";

import Card from "../card/Card";
import { useWorkspace } from "../layout/WorkspaceProvider";

function formatCurrency(value: number) {
  return `रु ${value.toLocaleString("en-US")}`;
}

export default function PriceBreakdown() {
  const { plotRows } = useWorkspace();

  return (
    <Card title="Plots" className="relative min-h-[260px] bg-white/90 xl:min-h-[520px]">
      {plotRows.length === 0 ? (
        <p className="text-base text-slate-500">No saved plots yet.</p>
      ) : (
        <div className="space-y-3">
          {plotRows.map((plot) => (
            <div
              key={plot.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {plot.plotName}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {plot.plotSize} {plot.plotUnit}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Amount
                  </p>
                  <p className="mt-1 text-sm font-semibold text-emerald-700">
                    {formatCurrency(plot.plotAmount)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
