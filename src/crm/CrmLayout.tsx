import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  LayoutDashboard, Users, UserCircle, PhoneCall, CalendarClock, Star, Flame,
  BarChart3, FileSpreadsheet, Settings, LogOut, Menu, X,
} from "lucide-react";
import { clearSession, getSession } from "../utils/storage";
import toast from "react-hot-toast";

const navItems = [
  { to: "/crm/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/crm/leads", label: "Leads", icon: Users },
  { to: "/crm/next-calls", label: "Next Calls", icon: Flame },
  { to: "/crm/customers", label: "Customers", icon: UserCircle },
  { to: "/crm/calls", label: "Calls", icon: PhoneCall },
  { to: "/crm/followups", label: "Follow-Ups", icon: CalendarClock },
  { to: "/crm/reviews", label: "Reviews", icon: Star },
  { to: "/crm/reports", label: "Reports", icon: BarChart3 },
  { to: "/crm/import", label: "Import Excel", icon: FileSpreadsheet },
  { to: "/crm/settings", label: "Settings", icon: Settings },
];

export default function CrmLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const session = getSession();

  function handleLogout() {
    clearSession();
    toast.success("Logged out successfully.");
    navigate("/crm/login");
  }

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 h-14 bg-primary flex items-center justify-between px-4 z-40">
        <img src="/assets/logo-dark.svg" alt="EliteFin CRM" className="h-7" />
        <button onClick={() => setMobileOpen(true)} className="text-white p-2" aria-label="Open menu">
          <Menu size={22} />
        </button>
      </div>

      {/* Sidebar drawer (mobile) + static (desktop) */}
      <div
        className={clsx(
          "fixed inset-0 z-50 lg:hidden transition-opacity",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
        <aside className={clsx("absolute left-0 top-0 bottom-0 w-72 bg-primary transition-transform", mobileOpen ? "translate-x-0" : "-translate-x-full")}>
          <SidebarContent onNavigate={() => setMobileOpen(false)} onLogout={handleLogout} session={session} closeBtn={
            <button onClick={() => setMobileOpen(false)} className="text-white/70 p-1" aria-label="Close menu"><X size={20} /></button>
          } />
        </aside>
      </div>

      <aside className="hidden lg:flex flex-col w-64 bg-primary shrink-0 sticky top-0 h-screen">
        <SidebarContent onLogout={handleLogout} session={session} />
      </aside>

      <main className="flex-1 min-w-0 pt-14 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );

  function SidebarContent({
    onNavigate, onLogout, session, closeBtn,
  }: { onNavigate?: () => void; onLogout: () => void; session: ReturnType<typeof getSession>; closeBtn?: React.ReactNode }) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <img src="/assets/logo-dark.svg" alt="EliteFin CRM" className="h-8" />
          {closeBtn}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onNavigate}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                  isActive ? "bg-gold text-primary" : "text-white/70 hover:bg-white/10 hover:text-white"
                )
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gold-light text-primary font-bold flex items-center justify-center text-sm shrink-0">
              {session?.name?.[0] || "A"}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{session?.name || "Admin"}</p>
              <p className="text-white/50 text-xs truncate">{session?.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut size={17} /> Logout
          </button>
        </div>
      </div>
    );
  }
}
