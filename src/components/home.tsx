import {
  CalendarDays,
  ClipboardList,
  Home as HomeIcon,
  Users,
  DollarSign,
  Package,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Home() {
  return (
    <div className="p-6 space-y-6 bg-background w-full h-full">
      <h1 className="text-3xl font-bold tracking-tight">
        Property Management Dashboard
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Active bookings this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Pending tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Active team members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">Monthly revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <p className="text-xs text-muted-foreground">
              Total inventory items
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <HomeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Active properties</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Ocean View Villa</p>
                  <p className="text-sm text-muted-foreground">
                    John Smith • 4 guests
                  </p>
                </div>
                <div className="text-sm">May 15 - May 20</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Mountain Retreat</p>
                  <p className="text-sm text-muted-foreground">
                    Sarah Johnson • 2 guests
                  </p>
                </div>
                <div className="text-sm">May 18 - May 25</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Downtown Loft</p>
                  <p className="text-sm text-muted-foreground">
                    Michael Brown • 3 guests
                  </p>
                </div>
                <div className="text-sm">May 22 - May 24</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
            <CardDescription>High priority</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Replace AC filter</p>
                  <p className="text-sm text-muted-foreground">
                    Ocean View Villa • Maintenance
                  </p>
                </div>
                <div className="text-sm text-red-500">Due today</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Deep cleaning</p>
                  <p className="text-sm text-muted-foreground">
                    Mountain Retreat • Cleaning
                  </p>
                </div>
                <div className="text-sm text-amber-500">Due tomorrow</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Restock supplies</p>
                  <p className="text-sm text-muted-foreground">
                    Downtown Loft • Inventory
                  </p>
                </div>
                <div className="text-sm">Due in 3 days</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Home;
