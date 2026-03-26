import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, FolderOpen, FileText, Image, MessageSquare, Settings, LogOut, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";

const sidebarLinks = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/products", icon: Package, label: "Products" },
  { to: "/admin/categories", icon: FolderOpen, label: "Categories" },
  { to: "/admin/content", icon: FileText, label: "Content" },
  { to: "/admin/media", icon: Image, label: "Media" },
  { to: "/admin/leads", icon: MessageSquare, label: "Leads" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <span className="font-heading font-bold text-sidebar-foreground">Admin Panel</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-sidebar-foreground"><X className="w-5 h-5" /></button>
        </div>
        <nav className="p-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = link.end ? location.pathname === link.to : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-sidebar-border">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
            <LogOut className="w-4 h-4" /> Back to Website
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-4 border-b border-border bg-card">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2"><Menu className="w-5 h-5 text-foreground" /></button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="p-2 rounded-lg hover:bg-secondary transition-colors">
              {isDark ? <Sun className="w-4 h-4 text-foreground" /> : <Moon className="w-4 h-4 text-foreground" />}
            </button>
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-sm font-bold">A</div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
