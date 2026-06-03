'use client'
import { useState } from 'react'
import { useWorkspace } from '../layout/WorkspaceProvider';



const formatNepaliCurrency = (value: string) => {
  const number = value.replace(/,/g, '');

  if (!number) return '';

  return Number(number).toLocaleString('en-IN');
};

const PriceConfig = () => {
  const [price, setPrice] = useState('');
  const { selectedUnit } = useWorkspace();

  return (
    <div>
      <h1 className="text-sm font-semibold uppercase tracking-wider text-slate-700 sm:text-base">
        Price per unit
      </h1>

      <div className="mt-3 flex w-full max-w-xl flex-col gap-3 sm:gap-0">
        <div className="flex min-w-0 items-stretch overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
          <div className="flex shrink-0 items-center border-r border-emerald-100 px-4 text-2xl font-bold text-emerald-700 sm:px-5">
            रु
          </div>

          <input
            type="text"
            inputMode="numeric"
            value={price}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^\d]/g, '');
              setPrice(formatNepaliCurrency(raw));
            }}
            placeholder="1,00,000"
            className="
              min-w-0 flex-1 bg-white px-4 py-4
              text-lg font-semibold text-slate-800
              placeholder:text-slate-400
              focus:outline-none
              sm:text-2xl
            "
          />

          <div className="hidden shrink-0 items-center border-l border-emerald-100 bg-emerald-50 px-4 text-sm font-bold uppercase tracking-wide text-emerald-700 sm:flex">
            Per {selectedUnit?.label ?? 'Unit'}
          </div>
        </div>

        <div className="inline-flex w-fit items-center rounded-xl border border-emerald-100 bg-emerald-50 px-5 py-3 text-sm font-bold uppercase tracking-wide text-emerald-700 sm:hidden">
          Per {selectedUnit?.label ?? 'Unit'}
        </div>
      </div>
    </div>
  )
}

export default PriceConfig
