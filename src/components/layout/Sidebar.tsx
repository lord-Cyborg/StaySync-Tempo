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
  Home,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

interface SidebarProps {
  closeSidebar?: () => void;
}

function Sidebar({ closeSidebar }: SidebarProps) {
  const location = useLocation();

  return (
    <div className="h-full w-64 bg-card border-r border-border flex flex-col shadow-md dark:bg-gray-900">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full overflow-hidden">
            <img
              src="/logo.png"
              alt="StaySync Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            StaySync
          </h2>
        </div>

        {/* Close button - only visible on mobile */}
        {closeSidebar && (
          <Button
            variant="ghost"
            size="icon"
            onClick={closeSidebar}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeSidebar} // Close sidebar when clicking a link on mobile
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all hover:translate-x-1",
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4",
                  isActive ? "text-blue-600 dark:text-blue-400" : "",
                )}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Users className="h-4 w-4 text-white" />
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
