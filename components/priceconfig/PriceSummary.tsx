import React from 'react';

export const summaryRows = [
  ['1 Ropani', '16 Aana', 'Hill System'],
  ['1 Aana', '4 Paisa', 'Hill System'],
  ['1 Paisa', '4 Daam', 'Hill System'],
  ['1 Bigha', '20 Kattha', 'Terai System'],
  ['1 Kattha', '20 Dhur', 'Terai System'],
  ['1 Square Meter', '10.7639 Sq. ft', 'International'],
  ['1 Acre', '43,560 Sq. ft', 'International'],
  ['1 Hectare', '10,000 Sq. m', 'International'],
];

type PriceSummaryProps = {
  from: string;
  to: string;
  system?: string;
};

const PriceSummary = ({ from, to, system }: PriceSummaryProps) => {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex flex-col items-center gap-2 text-sm">
        <span className="font-medium text-slate-600">{from}</span>
       <div className="my-1 h-px w-16 bg-slate-200" />
        <span className="font-bold text-emerald-700">{to}</span>
      </div>
    </div>
  );
};

export default PriceSummary;
