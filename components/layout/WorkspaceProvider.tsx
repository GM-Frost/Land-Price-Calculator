"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import { LAND_UNITS, type LandUnitKey } from "../utils/LandCalculation";

type WorkspaceContextValue = {
  selectedUnitKey: LandUnitKey;
  selectedUnit: (typeof LAND_UNITS)[LandUnitKey];
  setSelectedUnitKey: (unitKey: LandUnitKey) => void;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

type WorkspaceProviderProps = {
  children: ReactNode;
};

export default function WorkspaceProvider({ children }: WorkspaceProviderProps) {
  const [selectedUnitKey, setSelectedUnitKey] = useState<LandUnitKey>("AANA");

  const value = useMemo(
    () => ({
      selectedUnitKey,
      selectedUnit: LAND_UNITS[selectedUnitKey],
      setSelectedUnitKey,
    }),
    [selectedUnitKey]
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
