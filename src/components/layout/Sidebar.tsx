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
  X,
  HelpCircle,
  LifeBuoy,
  LogOut,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mainNavItems = [
  { name: "Dashboard", icon: HomeIcon, path: "/" },
  { name: "Properties", icon: Building, path: "/properties" },
  { name: "Bookings", icon: CalendarDays, path: "/bookings" },
  { name: "Tasks", icon: ClipboardList, path: "/tasks" },
  { name: "Inventory", icon: Package, path: "/inventory" },
  { name: "Team", icon: Users, path: "/team" },
  { name: "Finance", icon: DollarSign, path: "/finance" },
  { name: "Chat", icon: MessageSquare, path: "/chat" },
];

const secondaryNavItems = [
  { name: "Settings", icon: Settings, path: "/settings" },
  { name: "Help & Support", icon: LifeBuoy, path: "/support" },
];

interface SidebarProps {
  closeSidebar?: () => void;
}

function Sidebar({ closeSidebar }: SidebarProps) {
  const location = useLocation();

  const NavLink = ({
    item,
    isActive,
  }: {
    item: (typeof mainNavItems)[0];
    isActive: boolean;
  }) => (
    <Link
      to={item.path}
      onClick={closeSidebar}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
        isActive
          ? "bg-primary/10 text-primary shadow-sm dark:bg-primary/20"
          : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
      )}
    >
      <item.icon
        className={cn(
          "h-5 w-5",
          isActive ? "text-primary" : "text-muted-foreground",
        )}
      />
      <span>{item.name}</span>
      {item.name === "Tasks" && (
        <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-medium text-primary">
          8
        </span>
      )}
    </Link>
  );

  return (
    <div className="h-full w-72 bg-card flex flex-col dark:bg-gray-900/95">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl overflow-hidden bg-gradient-to-br from-primary to-purple-600 p-2 shadow-md">
            <img
              src="https://raw.githubusercontent.com/lord-Cyborg/StaySync-Tempo/main/logo-icon.png"
              alt="StaySync Logo"
              className="w-full h-full object-contain filter brightness-0 invert"
            />
          </div>
          <img
            src="https://raw.githubusercontent.com/lord-Cyborg/StaySync-Tempo/main/StaySync_Brand.png"
            alt="StaySync Brand"
            className="h-6 object-contain"
          />
        </div>

        {/* Close button - only visible on mobile */}
        {closeSidebar && (
          <Button
            variant="ghost"
            size="icon"
            onClick={closeSidebar}
            className="lg:hidden hover:bg-secondary/80 rounded-full"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        )}
      </div>

      <div className="px-3 py-2">
        <div className="relative">
          <div className="rounded-lg bg-secondary/50 p-2 mb-4">
            <div className="flex items-center gap-3 px-2 py-1">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/80 to-purple-600/80 flex items-center justify-center shadow-sm">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">
                  admin@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto no-scrollbar">
        <div className="mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Main
        </div>
        {mainNavItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));

          return <NavLink key={item.path} item={item} isActive={isActive} />;
        })}

        <Separator className="my-4 opacity-50" />

        <div className="mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          System
        </div>
        {secondaryNavItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));

          return <NavLink key={item.path} item={item} isActive={isActive} />;
        })}
      </nav>

      <div className="p-3 mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          size="sm"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </Button>
        <div className="mt-4 px-4 py-3 rounded-lg bg-primary/5 text-xs text-center">
          <p className="text-muted-foreground">StaySync v1.2.0</p>
          <p className="text-primary text-xs mt-1 font-medium">
            Check for updates
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
