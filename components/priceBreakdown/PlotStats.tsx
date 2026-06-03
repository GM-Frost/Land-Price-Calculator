"use client";

import { useWorkspace } from "../layout/WorkspaceProvider";
import { toSquareFeet } from "../utils/LandCalculation";

function formatCurrency(value: number) {
  return `रु ${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

function formatSquareFeet(value: number) {
  return `${value.toLocaleString("en-US", { maximumFractionDigits: 2 })} sq.ft`;
}

type PlotStatsProps = {
  type: "plots" | "area" | "total";
};

export default function PlotStats({ type }: PlotStatsProps) {
  const { plotRows } = useWorkspace();

  const totalPlots = plotRows.length;
  const totalAreaInSquareFeet = plotRows.reduce(
    (sum, plot) => sum + toSquareFeet(plot.plotSize, plot.plotUnitKey),
    0
  );
  const grandTotal = plotRows.reduce((sum, plot) => sum + plot.plotAmount, 0);

  if (type === "plots") {
    return (
      <div className="flex h-full flex-col justify-center">
        <p className="text-4xl font-semibold tracking-tight text-slate-900">
          {totalPlots}
        </p>
        <p className="mt-2 text-sm text-slate-500">
          {totalPlots === 1 ? "plot saved" : "plots saved"}
        </p>
      </div>
    );
  }

  if (type === "area") {
    return (
      <div className="flex h-full flex-col justify-center">
        <p className="text-3xl font-semibold tracking-tight text-slate-900">
          {formatSquareFeet(totalAreaInSquareFeet)}
        </p>
        <p className="mt-2 text-sm text-slate-500">plot area</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center">
      <p className="text-3xl font-semibold tracking-tight text-emerald-700">
        {formatCurrency(grandTotal)}
      </p>
    </div>
  );
}
