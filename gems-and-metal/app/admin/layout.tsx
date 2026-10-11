import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "../globals.css";

const bodoniModa = Bodoni_Moda({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Admin | Gems and Metal",
    template: "%s | Gems and Metal Admin",
  },
  robots: { index: false, follow: false },
};

export const instant = false;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${bodoniModa.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
