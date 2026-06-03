"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../button/Button";
import { useWorkspace } from "../layout/WorkspaceProvider";

function formatDisplayPrice(price: string) {
  return price ? `रु ${price}` : "रु 0";
}

function sanitizeNumericInput(value: string) {
  return value.replace(/[^\d,]/g, "");
}

export default function PriceSetValues() {
  const {
    savedPriceSets,
    removeSavedPriceSet,
    clearSavedPriceSets,
    updateSavedPriceSet,
  } = useWorkspace();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState("");

  if (savedPriceSets.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-medium text-slate-700">No saved price sets yet.</p>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter a price and save it.
        </p>
      </div>
    );
  }

  const startEdit = (id: string, price: string) => {
    setEditingId(id);
    setEditingPrice(price);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingPrice("");
  };

  const saveEdit = () => {
    if (!editingId) return;

    const result = updateSavedPriceSet(editingId, editingPrice);

    if (result === "updated") {
      toast.success("Price set updated");
      cancelEdit();
      return;
    }

    if (result === "empty") {
      toast.error("Amount is required");
      return;
    }

    toast.error("Price set could not be updated");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-600">
          Saved price sets: {savedPriceSets.length}
        </p>
        <Button variant="ghost" size="sm" onClick={clearSavedPriceSets} className="rounded-xl">
          Clear all
        </Button>
      </div>

      <div className="space-y-2">
        {savedPriceSets.map((item) => {
          const isEditing = editingId === item.id;

          return (
            <div
              key={item.id}
              className="flex min-w-0 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5"
            >
              <div className="min-w-0 flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    inputMode="numeric"
                    value={editingPrice}
                    onChange={(event) => setEditingPrice(sanitizeNumericInput(event.target.value))}
                    className="w-full rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-300"
                    placeholder="Enter amount"
                  />
                ) : (
                  <p className="min-w-0 truncate text-sm font-semibold text-slate-900">
                    {formatDisplayPrice(item.price)}
                    <span className="ml-2 font-medium text-emerald-700">per {item.unitLabel}</span>
                  </p>
                )}
              </div>

              <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                {item.unitKey}
              </span>

              {isEditing ? (
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={saveEdit}
                    aria-label={`Save ${item.unitLabel} amount`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50"
                  >
                    ✓
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    aria-label={`Cancel editing ${item.unitLabel}`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-base font-medium text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => startEdit(item.id, item.price)}
                    aria-label={`Edit ${item.unitLabel} amount`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  >
                    ✎
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSavedPriceSet(item.id)}
                    aria-label={`Remove ${item.price} per ${item.unitLabel}`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-base font-medium text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-700"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
