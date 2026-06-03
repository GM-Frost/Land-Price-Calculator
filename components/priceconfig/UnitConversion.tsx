"use client";

import { useState } from "react";

import { convertLandUnit, type LandUnitKey } from "../utils/LandCalculation";
import { useWorkspace } from "../layout/WorkspaceProvider";

const conversionUnits: Array<{ key: LandUnitKey; label: string }> = [
  { key: "ROPANI", label: "Ropani" },
  { key: "AANA", label: "Aana" },
  { key: "PAISA", label: "Paisa" },
  { key: "DAAM", label: "Daam" },
  { key: "BIGHA", label: "Bigha" },
  { key: "KATTHA", label: "Kattha" },
  { key: "DHUR", label: "Dhur" },
  { key: "SQUARE_FEET", label: "Sq.Feet" },
  { key: "SQUARE_METER", label: "Sq.Meter" },
];

const precisionByUnit: Partial<Record<LandUnitKey, number>> = {
  ROPANI: 3,
  AANA: 3,
  PAISA: 3,
  DAAM: 3,
  BIGHA: 3,
  KATTHA: 3,
  DHUR: 3,
  SQUARE_FEET: 2,
  SQUARE_METER: 2,
};

function formatForDisplay(value: number, unitKey: LandUnitKey) {
  const precision = precisionByUnit[unitKey] ?? 2;
  return value.toLocaleString("en-US", {
    minimumFractionDigits: precision === 0 ? 0 : Math.min(2, precision),
    maximumFractionDigits: precision,
  });
}

function sanitizeNumericInput(value: string) {
  const cleaned = value.replace(/[^\d.]/g, "");
  const parts = cleaned.split(".");

  if (parts.length <= 2) return cleaned;
  return `${parts[0]}.${parts.slice(1).join("")}`;
}

export default function UnitConversion() {
  const { selectedUnitKey, setSelectedUnitKey } = useWorkspace();
  const [entryUnitKey, setEntryUnitKey] = useState<LandUnitKey>("ROPANI");
  const [entryValue, setEntryValue] = useState("0");

  const numericValue = Number.parseFloat(entryValue);
  const safeValue = Number.isFinite(numericValue) ? numericValue : 0;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
      {conversionUnits.map((unit) => {
        const isActive = selectedUnitKey === unit.key;
        const displayValue =
          unit.key === entryUnitKey
            ? entryValue
            : formatForDisplay(convertLandUnit(safeValue, entryUnitKey, unit.key), unit.key);

        return (
          <label key={unit.key} className="space-y-2">
            <span className="block text-xs font-semibold text-slate-900">{unit.label}</span>
            <input
              type="text"
              inputMode="decimal"
              value={displayValue}
              onFocus={() => {
                setSelectedUnitKey(unit.key);
              }}
              onChange={(event) => {
                setEntryUnitKey(unit.key);
                setSelectedUnitKey(unit.key);
                setEntryValue(sanitizeNumericInput(event.target.value));
              }}
              className={[
                "w-full rounded-xl border bg-slate-50 px-2 py-3 text-xs font-semibold text-slate-900 outline-none transition-colors",
                isActive
                  ? "border-emerald-300 bg-emerald-50/40"
                  : "border-slate-200 focus:border-emerald-300",
              ].join(" ")}
            />
          </label>
        );
      })}
    </div>
  );
}
