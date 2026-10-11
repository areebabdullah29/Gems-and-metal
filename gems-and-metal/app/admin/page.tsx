import type { Metadata } from "next";
import { isAuthenticated } from "@/lib/auth";
import { listProducts } from "@/lib/products";
import LoginForm from "@/components/admin/LoginForm";
import Dashboard from "@/components/admin/Dashboard";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = await isAuthenticated();

  if (!authed) {
    return <LoginForm />;
  }

  const products = await listProducts();
  return <Dashboard products={products} />;
}
