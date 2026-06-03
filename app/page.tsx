import Card from "../components/card/Card";
import AppShell from "../components/layout/AppShell";
import PlotBreakdownSection from "../components/priceBreakdown/PlotBreakdownSection";
import PriceBreakdown from "../components/priceBreakdown/PriceBreakdown";
import PlotStats from "../components/priceBreakdown/PlotStats";
import PriceConfig from "../components/priceconfig/PriceConfig";
import PriceSetValues from "../components/priceconfig/PriceSetValues";
import PriceSummary, { summaryRows } from "../components/priceconfig/PriceSummary";
import UnitConversion from "../components/priceconfig/UnitConversion";

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

          <PlotBreakdownSection />

          <div className="grid min-w-0 gap-4 md:grid-cols-2 2xl:grid-cols-3">
            <Card eyebrow="Total Plots" className="min-h-[220px] bg-[#f7f7f7]">
              <PlotStats type="plots" />
            </Card>
            <Card eyebrow="Total Area" className="min-h-[220px] bg-[#f7f7f7]">
              <PlotStats type="area" />
            </Card>
            <Card
              eyebrow="Grand Total"
              className="min-h-[220px] bg-[#f7f7f7] md:col-span-2 2xl:col-span-1"
            >
              <PlotStats type="total" />
            </Card>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            {summaryRows.map(([from, to]) => (
              <Card
                key={`${from}-${to}`}
                className="bg-white/90"
                contentClassName="flex min-h-[160px] items-center justify-center p-4"
              >
                <PriceSummary from={from} to={to}/>
              </Card>
            ))}
          </div>
        </div>

        <div className="min-w-0 space-y-4 xl:space-y-6 xl:pt-0">
          <Card
            eyebrow="Price Set Values"
            className="bg-white/90"
          >
            <PriceSetValues />
          </Card>
          <Card eyebrow="Unit Conversion" className="bg-white/90">
            <UnitConversion />
          </Card>
          <PriceBreakdown />
        </div>
      </div>
    </AppShell>
  );
}
