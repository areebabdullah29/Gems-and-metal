// Sample data for the dashboard prototype UI. Replace with real API data
// when wiring this up to an actual backend.

export interface Metric {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  icon: "revenue" | "subscribers" | "orderValue" | "conversion";
  sparkline: string;
  sparklineColor: string;
}

export const metrics: Metric[] = [
  {
    label: "Total Revenue",
    value: "$128,430.00",
    delta: "+14.2%",
    trend: "up",
    icon: "revenue",
    sparkline: "M0 20 Q 15 16, 25 18 T 45 8 T 64 2",
    sparklineColor: "var(--d-tertiary)",
  },
  {
    label: "Active Subscribers",
    value: "24,892",
    delta: "+8.1%",
    trend: "up",
    icon: "subscribers",
    sparkline: "M0 18 Q 20 22, 35 12 T 55 6 T 64 4",
    sparklineColor: "var(--d-primary)",
  },
  {
    label: "Avg. Order Value",
    value: "$84.50",
    delta: "-2.4%",
    trend: "down",
    icon: "orderValue",
    sparkline: "M0 6 Q 20 8, 30 16 T 50 14 T 64 20",
    sparklineColor: "var(--d-error)",
  },
  {
    label: "Conversion Rate",
    value: "3.64%",
    delta: "+0.8%",
    trend: "up",
    icon: "conversion",
    sparkline: "M0 22 Q 22 18, 32 14 T 52 10 T 64 3",
    sparklineColor: "var(--d-tertiary)",
  },
];

export interface Channel {
  rank: string;
  name: string;
  share: string;
  conversionRate: string;
  barWidth: string;
  barColor: string;
}

export const channels: Channel[] = [
  {
    rank: "01",
    name: "Organic Search",
    share: "42.8%",
    conversionRate: "4.8% CR",
    barWidth: "78%",
    barColor: "var(--d-primary)",
  },
  {
    rank: "02",
    name: "Direct Referrals",
    share: "26.4%",
    conversionRate: "6.2% CR",
    barWidth: "58%",
    barColor: "var(--d-secondary)",
  },
  {
    rank: "03",
    name: "Paid Search",
    share: "18.2%",
    conversionRate: "2.9% CR",
    barWidth: "42%",
    barColor: "var(--d-tertiary)",
  },
  {
    rank: "04",
    name: "Developer Guilds",
    share: "8.5%",
    conversionRate: "5.1% CR",
    barWidth: "25%",
    barColor: "var(--d-primary-container)",
  },
  {
    rank: "05",
    name: "Email Newsletters",
    share: "4.1%",
    conversionRate: "3.8% CR",
    barWidth: "14%",
    barColor: "var(--d-outline)",
  },
];

export type OrderStatus = "Completed" | "Processing" | "Pending";

export interface Order {
  id: string;
  customer: string;
  initials: string;
  plan: string;
  date: string;
  amount: string;
  status: OrderStatus;
}

export const orders: Order[] = [
  {
    id: "#ORD-9821",
    customer: "TechCorp Cloud LLC",
    initials: "TC",
    plan: "Enterprise Dedicated",
    date: "Oct 24, 2023 · 14:32",
    amount: "$1,450.00",
    status: "Completed",
  },
  {
    id: "#ORD-9820",
    customer: "Solaria BioLabs",
    initials: "SL",
    plan: "Growth Suite (100 Seat)",
    date: "Oct 24, 2023 · 13:15",
    amount: "$890.00",
    status: "Processing",
  },
  {
    id: "#ORD-9819",
    customer: "Nexus Vector Ltd",
    initials: "NV",
    plan: "Standard Pro Monthly",
    date: "Oct 24, 2023 · 11:45",
    amount: "$249.00",
    status: "Pending",
  },
  {
    id: "#ORD-9818",
    customer: "Kroma Labs AG",
    initials: "KL",
    plan: "Custom Query Pipeline",
    date: "Oct 24, 2023 · 09:20",
    amount: "$3,200.00",
    status: "Completed",
  },
  {
    id: "#ORD-9817",
    customer: "Apex Matrix Corp",
    initials: "AM",
    plan: "Standard Pro Monthly",
    date: "Oct 23, 2023 · 18:50",
    amount: "$249.00",
    status: "Completed",
  },
];
