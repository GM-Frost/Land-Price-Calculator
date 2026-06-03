"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

import Button from "../button/Button";
import Card from "../card/Card";
import { type PlotEntry, useWorkspace } from "../layout/WorkspaceProvider";
import { LAND_UNITS, type LandUnitKey } from "../utils/LandCalculation";
import PlotTable from "./PlotTable";

type PlotFormState = {
  plotName: string;
  plotDesc: string;
  plotSize: string;
  plotUnit: LandUnitKey;
  unitPrice: string;
};

const initialFormState: PlotFormState = {
  plotName: "",
  plotDesc: "",
  plotSize: "",
  plotUnit: "AANA",
  unitPrice: "",
};

function sanitizeNumeric(value: string) {
  const cleaned = value.replace(/[^\d.]/g, "");
  const parts = cleaned.split(".");
  if (parts.length <= 2) return cleaned;
  return `${parts[0]}.${parts.slice(1).join("")}`;
}

export default function PlotBreakdownSection() {
  const {
    savedPriceSets,
    selectedUnitKey,
    addPriceSetForUnit,
    plotRows,
    addPlotRow,
    removePlotRow,
  } = useWorkspace();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<PlotFormState>({
    ...initialFormState,
    plotUnit: selectedUnitKey,
  });

  const handleOpenModal = () => {
    setForm({
      ...initialFormState,
      plotUnit: selectedUnitKey,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const selectedUnitPriceSet = savedPriceSets.find((item) => item.unitKey === form.plotUnit);

  const handleSubmit = () => {
    if (!form.plotName.trim() || !form.plotSize) {
      toast.error("Plot name and size are required");
      return;
    }

    const resolvedUnitPrice = selectedUnitPriceSet?.price ?? form.unitPrice;

    if (!resolvedUnitPrice) {
      toast.error("Set a price for this plot unit");
      return;
    }

    if (!selectedUnitPriceSet) {
      addPriceSetForUnit(form.plotUnit, resolvedUnitPrice);
    }

    const plotSize = Number(form.plotSize);
    const unitPrice = Number(resolvedUnitPrice.replace(/,/g, ""));
    const totalAmount = plotSize * unitPrice;

    const nextRow: Omit<PlotEntry, "id" | "plotNumber"> = {
      plotName: form.plotName.trim(),
      plotDesc: form.plotDesc.trim(),
      plotSize,
      plotUnitKey: form.plotUnit,
      plotUnit: LAND_UNITS[form.plotUnit].label,
      plotAmount: totalAmount,
      priceSetLabel: `रु ${resolvedUnitPrice} / ${LAND_UNITS[form.plotUnit].label}`,
    };

    addPlotRow(nextRow);
    setIsModalOpen(false);
    toast.success("Plot added");
  };

  const handleDeleteRow = (id: string) => {
    removePlotRow(id);
    toast.success("Plot removed");
  };

  return (
    <>
      <Card
        title="Plot Break Down"
        className="bg-white/90 xl:min-h-[620px]"
        headerRight={
          <Button size="sm" onClick={handleOpenModal} className="rounded-xl">
            Add Plot
          </Button>
        }
      >
        <PlotTable rows={plotRows} onDeleteRow={handleDeleteRow} />
      </Card>

      <AnimatePresence>
      {isModalOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-2xl rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.45)]"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  Add Plot
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  Create a plot entry
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close add plot modal"
              >
                ×
              </button>
            </div>

            <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Plot Name</span>
                <input
                  type="text"
                  value={form.plotName}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, plotName: event.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-300"
                  placeholder="Plot A"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Plot Size</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={form.plotSize}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      plotSize: sanitizeNumeric(event.target.value),
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-300"
                  placeholder="16"
                />
              </label>

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-slate-700">Description</span>
                <input
                  type="text"
                  value={form.plotDesc}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, plotDesc: event.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-300"
                  placeholder="Optional plot description"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Plot Unit</span>
                <select
                  value={form.plotUnit}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      plotUnit: event.target.value as LandUnitKey,
                      unitPrice: "",
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-300"
                >
                  {Object.entries(LAND_UNITS).map(([unitKey, unit]) => (
                    <option key={unitKey} value={unitKey}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Unit Price</span>
                {selectedUnitPriceSet ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                    रु {selectedUnitPriceSet.price} per {selectedUnitPriceSet.unitLabel}
                  </div>
                ) : (
                  <input
                    type="text"
                    inputMode="decimal"
                    value={form.unitPrice}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        unitPrice: sanitizeNumeric(event.target.value),
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-300"
                    placeholder="Enter unit price"
                  />
                )}
              </label>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-5 sm:flex-row sm:justify-end sm:px-6">
              <Button variant="secondary" onClick={handleCloseModal} className="rounded-xl">
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="rounded-xl">
                Add Plot
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
      </AnimatePresence>
    </>
  );
}
