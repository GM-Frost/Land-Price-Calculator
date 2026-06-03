'use client'
import React, { useState } from 'react'
import { LAND_UNITS } from '../utils/LandCalculation';
import Card from '../card/Card';



const formatNepaliCurrency = (value: string) => {
  const number = value.replace(/,/g, '');

  if (!number) return '';

  return Number(number).toLocaleString('en-IN');
};

const PriceConfig = () => {
    const [price, setPrice] = useState('');
    const [selectedUnit, setSelectedUnit] = useState(LAND_UNITS.AANA);

  return (
    <div >
  <h1 className="text-sm font-semibold uppercase tracking-wider text-slate-700 sm:text-base">
    Price per unit
  </h1>

  <div className="relative mt-2 w-full sm:w-[50%]">
    {/* Left rupee prefix */}
    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-base font-bold text-emerald-700">
      रु
    </span>

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
        block w-full rounded-xl
        border border-emerald-200
        bg-white
        py-3 pl-12 pr-28
        text-base font-semibold text-slate-800
        shadow-sm transition-all duration-200

        placeholder:text-slate-400

        hover:border-emerald-300

        focus:border-emerald-500
        focus:outline-none
        focus:ring-1 focus:ring-emerald-100

        disabled:cursor-not-allowed
        disabled:border-slate-200
        disabled:bg-slate-50
        disabled:text-slate-500
      "
    />

    {/* Right unit badge */}
    <span
      className="
        pointer-events-none absolute inset-y-1 right-1
        flex items-center rounded-lg
        bg-emerald-50 px-3
        text-xs font-bold uppercase tracking-wide
        text-emerald-700
        border border-emerald-100
      "
    >
      Per {selectedUnit?.label ?? 'Unit'}
    </span>
  </div>
</div>
  )
}

export default PriceConfig
