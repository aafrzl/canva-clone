import NavbarDashboard from "./_components/navbar-dashboard";
import SidebarDashboard from "./_components/sidebar-dashboard";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-muted h-full">
      <SidebarDashboard />
      <div className="lg:pl-[300px] flex flex-col h-full">
        <NavbarDashboard />
        <main className="bg-white flex-1 overflow-auto p-8 lg:rounded-tl-2xl border shadow-sm">
          {children}
        </main>
      </div>
    </div>
  );
}
