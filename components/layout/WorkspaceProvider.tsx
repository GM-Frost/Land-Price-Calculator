"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import { LAND_UNITS, type LandUnitKey } from "../utils/LandCalculation";

export type SavedPriceSet = {
  id: string;
  price: string;
  unitKey: LandUnitKey;
  unitLabel: string;
};

export type PlotEntry = {
  id: string;
  plotNumber: number;
  plotName: string;
  plotDesc: string;
  plotSize: number;
  plotUnitKey: LandUnitKey;
  plotUnit: string;
  plotAmount: number;
  priceSetLabel?: string;
};

function parsePriceValue(price: string) {
  return Number(price.replace(/,/g, ""));
}

type WorkspaceContextValue = {
  selectedUnitKey: LandUnitKey;
  selectedUnit: (typeof LAND_UNITS)[LandUnitKey];
  pricePerUnit: string;
  savedPriceSets: SavedPriceSet[];
  plotRows: PlotEntry[];
  currentUnitAlreadySet: boolean;
  setSelectedUnitKey: (unitKey: LandUnitKey) => void;
  setPricePerUnit: (value: string) => void;
  saveCurrentPriceSet: () => "saved" | "duplicate" | "empty";
  addPriceSetForUnit: (
    unitKey: LandUnitKey,
    price: string
  ) => "saved" | "duplicate" | "empty";
  updateSavedPriceSet: (id: string, price: string) => "updated" | "empty" | "missing";
  addPlotRow: (plot: Omit<PlotEntry, "id" | "plotNumber">) => void;
  removePlotRow: (id: string) => void;
  removeSavedPriceSet: (id: string) => void;
  clearSavedPriceSets: () => void;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

type WorkspaceProviderProps = {
  children: ReactNode;
};

export default function WorkspaceProvider({ children }: WorkspaceProviderProps) {
  const [selectedUnitKey, setSelectedUnitKey] = useState<LandUnitKey>("AANA");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [savedPriceSets, setSavedPriceSets] = useState<SavedPriceSet[]>([]);
  const [plotRows, setPlotRows] = useState<PlotEntry[]>([]);
  const currentUnitAlreadySet = savedPriceSets.some(
    (item) => item.unitKey === selectedUnitKey
  );

  const value = useMemo(
    () => ({
      selectedUnitKey,
      selectedUnit: LAND_UNITS[selectedUnitKey],
      pricePerUnit,
      savedPriceSets,
      plotRows,
      currentUnitAlreadySet,
      setSelectedUnitKey,
      setPricePerUnit,
      saveCurrentPriceSet: () => {
        if (!pricePerUnit) return "empty";
        if (currentUnitAlreadySet) return "duplicate";

        setSavedPriceSets((current) => [
          {
            id: `${selectedUnitKey}-${pricePerUnit}-${Date.now()}`,
            price: pricePerUnit,
            unitKey: selectedUnitKey,
            unitLabel: LAND_UNITS[selectedUnitKey].label,
          },
          ...current,
        ]);
        return "saved";
      },
      addPriceSetForUnit: (unitKey: LandUnitKey, price: string) => {
        if (!price) return "empty";
        if (savedPriceSets.some((item) => item.unitKey === unitKey)) return "duplicate";

        setSavedPriceSets((current) => [
          {
            id: `${unitKey}-${price}-${Date.now()}`,
            price,
            unitKey,
            unitLabel: LAND_UNITS[unitKey].label,
          },
          ...current,
        ]);

        return "saved";
      },
      updateSavedPriceSet: (id: string, price: string) => {
        if (!price) return "empty";

        let found = false;
        let updatedUnitKey: LandUnitKey | null = null;
        let updatedUnitLabel = "";

        setSavedPriceSets((current) =>
          current.map((item) => {
            if (item.id !== id) return item;
            found = true;
            updatedUnitKey = item.unitKey;
            updatedUnitLabel = item.unitLabel;
            return {
              ...item,
              price,
            };
          })
        );

        if (found && updatedUnitKey) {
          const nextPriceValue = parsePriceValue(price);

          setPlotRows((current) =>
            current.map((row) =>
              row.plotUnitKey !== updatedUnitKey
                ? row
                : {
                    ...row,
                    plotAmount: row.plotSize * nextPriceValue,
                    priceSetLabel: `रु ${price} / ${updatedUnitLabel}`,
                  }
            )
          );

          if (updatedUnitKey === selectedUnitKey) {
            setPricePerUnit(price);
          }
        }

        return found ? "updated" : "missing";
      },
      addPlotRow: (plot: Omit<PlotEntry, "id" | "plotNumber">) => {
        setPlotRows((current) => [
          ...current,
          {
            ...plot,
            id: `plot-${Date.now()}-${current.length + 1}`,
            plotNumber: current.length + 1,
          },
        ]);
      },
      removePlotRow: (id: string) => {
        setPlotRows((current) =>
          current
            .filter((row) => row.id !== id)
            .map((row, index) => ({
              ...row,
              plotNumber: index + 1,
            }))
        );
      },
      removeSavedPriceSet: (id: string) => {
        setSavedPriceSets((current) => current.filter((item) => item.id !== id));
      },
      clearSavedPriceSets: () => {
        setSavedPriceSets([]);
      },
    }),
    [currentUnitAlreadySet, plotRows, pricePerUnit, savedPriceSets, selectedUnitKey]
  );

  return (
    <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error("useWorkspace must be used inside WorkspaceProvider");
  }

  return context;
}
