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

type WorkspaceContextValue = {
  selectedUnitKey: LandUnitKey;
  selectedUnit: (typeof LAND_UNITS)[LandUnitKey];
  pricePerUnit: string;
  savedPriceSets: SavedPriceSet[];
  currentUnitAlreadySet: boolean;
  setSelectedUnitKey: (unitKey: LandUnitKey) => void;
  setPricePerUnit: (value: string) => void;
  saveCurrentPriceSet: () => "saved" | "duplicate" | "empty";
  addPriceSetForUnit: (
    unitKey: LandUnitKey,
    price: string
  ) => "saved" | "duplicate" | "empty";
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
  const currentUnitAlreadySet = savedPriceSets.some(
    (item) => item.unitKey === selectedUnitKey
  );

  const value = useMemo(
    () => ({
      selectedUnitKey,
      selectedUnit: LAND_UNITS[selectedUnitKey],
      pricePerUnit,
      savedPriceSets,
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
      removeSavedPriceSet: (id: string) => {
        setSavedPriceSets((current) => current.filter((item) => item.id !== id));
      },
      clearSavedPriceSets: () => {
        setSavedPriceSets([]);
      },
    }),
    [currentUnitAlreadySet, pricePerUnit, savedPriceSets, selectedUnitKey]
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
