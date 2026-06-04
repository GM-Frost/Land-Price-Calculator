"use client";

import { useMemo, useState } from "react";

import {
  convertLandUnit,
  type LandUnitKey,
} from "../utils/LandCalculation";

type ConversionUnit = {
  key: LandUnitKey;
  label: string;
  decimals: number;
};

const CONVERSION_UNITS: ConversionUnit[] = [
  { key: "ROPANI", label: "Ropani", decimals: 3 },
  { key: "AANA", label: "Aana", decimals: 2 },
  { key: "PAISA", label: "Paisa", decimals: 2 },
  { key: "DAAM", label: "Daam", decimals: 3 },
  { key: "BIGHA", label: "Bigha", decimals: 2 },
  { key: "KATTHA", label: "Kattha", decimals: 2 },
  { key: "DHUR", label: "Dhur", decimals: 3 },
  { key: "SQUARE_FEET", label: "Sq.Feet", decimals: 2 },
  { key: "SQUARE_METER", label: "Sq.Meter", decimals: 2 },
];

function sanitizeNumericInput(value: string) {
  const cleaned = value.replace(/[^\d.]/g, "");
  const parts = cleaned.split(".");

  if (parts.length <= 2) return cleaned;
  return `${parts[0]}.${parts.slice(1).join("")}`;
}

function formatValue(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: false,
  });
}

function ConversionField({
  unit,
  value,
  onChange,
}: {
  unit: ConversionUnit;
  value: string;
  onChange: (nextValue: string) => void;
}) {
  return (
    <label className="space-y-2">
      <span className="block  font-semibold text-slate-950 sm:text-sm">
        {unit.label}
      </span>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-2 text-xs  text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-300 sm:h-16 sm:text-sm"
      />
    </label>
  );
}

export default function UnitConversion() {
  const [inputUnit, setInputUnit] = useState<LandUnitKey>("ROPANI");
  const [inputValue, setInputValue] = useState("1");

  const safeValue = useMemo(() => {
    const parsed = Number.parseFloat(inputValue);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [inputValue]);

  const formattedValues = useMemo(() => {
    return Object.fromEntries(
      CONVERSION_UNITS.map((unit) => {
        const convertedValue =
          unit.key === inputUnit
            ? safeValue
            : convertLandUnit(safeValue, inputUnit, unit.key);

        return [unit.key, formatValue(convertedValue, unit.decimals)];
      })
    ) as Record<LandUnitKey, string>;
  }, [inputUnit, safeValue]);

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {CONVERSION_UNITS.map((unit) => (
        <ConversionField
          key={unit.key}
          unit={unit}
          value={unit.key === inputUnit ? inputValue : formattedValues[unit.key]}
          onChange={(nextValue) => {
            setInputUnit(unit.key);
            setInputValue(sanitizeNumericInput(nextValue));
          }}
        />
      ))}
    </div>
  );
}
