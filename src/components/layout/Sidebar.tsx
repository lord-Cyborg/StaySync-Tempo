import { Link, useLocation } from "react-router-dom";
import {
  CalendarDays,
  ClipboardList,
  Home as HomeIcon,
  Users,
  DollarSign,
  Package,
  Settings,
  Building,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", icon: HomeIcon, path: "/" },
  { name: "Properties", icon: Building, path: "/properties" },
  { name: "Bookings", icon: CalendarDays, path: "/bookings" },
  { name: "Tasks", icon: ClipboardList, path: "/tasks" },
  { name: "Inventory", icon: Package, path: "/inventory" },
  { name: "Team", icon: Users, path: "/team" },
  { name: "Finance", icon: DollarSign, path: "/finance" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-full w-64 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold">Property Manager</h2>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
