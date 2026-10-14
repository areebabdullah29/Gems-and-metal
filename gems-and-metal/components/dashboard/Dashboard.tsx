import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import MetricCards from "./MetricCards";
import RevenueChart from "./RevenueChart";
import AcquisitionChannels from "./AcquisitionChannels";
import OrdersTable from "./OrdersTable";

export default function Dashboard() {
  return (
    <div className="dash flex min-h-screen">
      <Sidebar />
      <div className="ml-64 flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="w-full max-w-[1600px] flex-1 space-y-6 p-8">
          <MetricCards />
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <RevenueChart />
            <AcquisitionChannels />
          </section>
          <OrdersTable />
        </main>
      </div>
    </div>
  );
}
