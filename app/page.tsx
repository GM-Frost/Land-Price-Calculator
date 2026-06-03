import Card from "../components/card/Card";
import AppShell from "../components/layout/AppShell";

export default function Home() {
  return (
    <AppShell>
      <div className="space-y-6 grid md:grid-cols-[60%_40%] gap-3">
        <Card
          eyebrow="Calculator"
          title="Price Set"
          description="Set your land price and add plot to calculate the value of your land"
        >
asdf
        </Card>
         <Card
          eyebrow="Calculator"
          title="Price Set"
          description="Set your land price and add plot to calculate the value of your land"
        >
asdf
        </Card>
      </div>
    </AppShell>
  );
}
