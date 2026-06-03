import Card from "../components/card/Card";
import AppShell from "../components/layout/AppShell";
import PlotTable from "../components/priceBreakdown/PlotTable";
import PriceBreakdown from "../components/priceBreakdown/PriceBreakdown";
import PriceConfig from "../components/priceconfig/PriceConfig";
import PriceSummary, { summaryRows } from "../components/priceconfig/PriceSummary";

export default function Home() {
  return (
    <AppShell>
      <div className="grid min-w-0 max-w-full gap-4 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-6">
        <div className="min-w-0 space-y-4 xl:space-y-6">
          <Card
            eyebrow="Calculator"
            title="Price Set"
            className="bg-white/90"
            description="Set your land price and add plot to calculate the value of your land"
          >
            <PriceConfig />
          </Card>

          <Card title="Plot Break Down" className="bg-white/90 xl:min-h-[620px]">
            <PlotTable />
          </Card>

          <div className="grid min-w-0 gap-4 md:grid-cols-2 2xl:grid-cols-3">
            <Card eyebrow="Total Plots" className="min-h-[220px] bg-[#f7f7f7]" />
            <Card eyebrow="Total Plots" className="min-h-[220px] bg-[#f7f7f7]" />
            <Card
              eyebrow="Grand Total"
              className="min-h-[220px] bg-[#f7f7f7] md:col-span-2 2xl:col-span-1"
            />
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            {summaryRows.map(([from, to, system]) => (
              <Card
                key={`${from}-${to}`}
                className="bg-white/90"
                contentClassName="flex min-h-[160px] items-center justify-center p-4"
              >
                <PriceSummary from={from} to={to} system={system} />
              </Card>
            ))}
          </div>
        </div>

        <div className="min-w-0 xl:pt-0">
          <PriceBreakdown />
        </div>
      </div>
    </AppShell>
  );
}
