import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div id="shell">
      <div id="app">
        <Header />
        <div id="row">
          <Sidebar />
          <div id="mc">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
