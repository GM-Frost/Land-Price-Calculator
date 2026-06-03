import Card from "../components/card/Card";
import AppShell from "../components/layout/AppShell";
import PlotTable from "../components/priceBreakdown/PlotTable";
import PriceBreakdown from "../components/priceBreakdown/PriceBreakdown";
import PriceConfig from "../components/priceconfig/PriceConfig";
import PriceSummary, { summaryRows } from "../components/priceconfig/PriceSummary";



export default function Home() {
  return (
    <AppShell>

<div className="grid grid-cols-6 grid-rows-10 gap-4">
    <div className="col-span-4 row-span-2">
      <Card
          eyebrow="Calculator"
          title="Price Set"
          className="relative bg-white/90"
          description="Set your land price and add plot to calculate the value of your land"
        >
          <PriceConfig />
          </Card>
          </div>
    <div className="col-span-4 row-span-4 col-start-1 row-start-3  items-center justify-center"><Card
          title="Plot Break Down"
          className="relative bg-white/90 h-full"
        ><PlotTable /></Card></div>
    <div className="col-span-2 row-span-6 col-start-5 row-start-1"><PriceBreakdown/></div>
    <div className="col-span-2 row-span-2 row-start-7">
      <Card
          eyebrow="Total Plots"
          className="relative bg-[#f5f5f5] h-full"
        ></Card>
    </div>
    <div className="col-span-2 row-span-2 col-start-3 row-start-7"> <Card
          eyebrow="Total Area"
          className="relative bg-[#f5f5f5] h-full"
        ></Card></div>
    <div className="col-span-2 row-span-2 col-start-5 row-start-7"> <Card
          eyebrow="Grand Total"
          className="relative bg-[#f5f5f5] h-full"
        ></Card></div>
   {summaryRows.map(([from, to, system], index) => (
  <div
    key={`${from}-${to}`}
    className={index < 4 ? 'row-start-9' : 'row-start-10'}
  >
    <Card className="relative h-full bg-white/90 border border-emerald-200 p-4">
      <PriceSummary from={from} to={to} system={system} />
    </Card>
  </div>
))}
</div>
    </AppShell>
  );
}
